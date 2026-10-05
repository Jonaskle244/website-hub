// VESPER – Filmbühne am Scroll. Die Scrollposition bestimmt die Filmzeit:
// An jeder Station gibt es eine Haltezone (Film steht, Animation läuft ein),
// dazwischen eine Fahrzone (Film scrubbt). Schnelles Scrollen rauscht durch;
// bleibt man in einer Fahrzone stehen, rastet die Seite sanft zur nächsten Station ein.
(() => {
'use strict';
const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];
const stage = $('.stage'), track = $('.stage-track'), box = $('.film-box'), film = $('.film-fwd'), poster = $('.film-poster');
const root = document.documentElement;

// Filmkoordinaten (1280×720): wohin der Ausschnitt schaut, wenn das Bild breiter ist als der Schirm.
const FOCUS = { start: 520, passage: 700, title: 870, anatomy: 860, pulse: 740, 'skin-1': 700, 'skin-2': 700, 'skin-3': 700, origin: 640, notes: 640, finale: 870 };
const DATA_URL = 'stations.json?v=14';
const HOLD = .75;           // Haltezone je Station in Bildschirmhöhen
const PX_PER_SEC = .55;     // Fahrzone: Bildschirmhöhen je Filmsekunde
const ease = k => k * k * (3 - 2 * k);

const S = { data: null, st: [], zones: [], total: 0, at: 0, seg: 0, k: 0, mode: 'film', film: false, listeners: new Set(), lastY: 0, dir: 1 };
const emit = (type, detail) => S.listeners.forEach(fn => fn(type, detail));

// ---------- Zonen ----------
function layout() {
  const vh = innerHeight;
  let y = 0;
  S.zones = S.st.map((s, i) => {
    if (i > 0) {
      const dt = s.t - S.st[i - 1].t;
      y += dt > .02 ? Math.min(4.5, Math.max(.6, dt * PX_PER_SEC)) * vh : .45 * vh;
    }
    const z = { a: y, b: y + HOLD * vh };
    y = z.b;
    return z;
  });
  S.total = y;
  track.style.height = S.mode === 'film' ? `${S.total + vh}px` : '';
}
// Scrollposition innerhalb der Bühne → { seg, k, at }: at = Station (Haltezone) oder -1
function locate(p) {
  const z = S.zones;
  for (let i = 0; i < z.length; i++) {
    if (p <= z[i].b) {
      if (p >= z[i].a || i === 0) return { at: i, seg: i, k: 0 };
      return { at: -1, seg: i - 1, k: (p - z[i - 1].b) / (z[i].a - z[i - 1].b) };
    }
  }
  return { at: z.length - 1, seg: z.length - 1, k: 0 };
}
const trackTop = () => track.getBoundingClientRect().top + scrollY;
// Filmzeit an einer Seiten-Scrollposition (für das Tempolimit)
function filmAt(y) {
  const { at, seg, k } = locate(Math.min(S.total, Math.max(0, y - trackTop())));
  if (at >= 0) return S.st[at].t;
  const a = S.st[seg].t, b = S.st[Math.min(seg + 1, S.st.length - 1)].t;
  return a + (b - a) * ease(Math.min(1, Math.max(0, k)));
}
// Tempolimit: Geführtes Scrollen (Rad, Trackpad, Einrasten, Play) lässt den Film in den
// Action-Momenten (fallendes Holz, Kappe, Sprühstöße, fallende Zutaten) höchstens in Echtzeit
// laufen, dazwischen (ruhige Einstellungen) bis zu dreimal so schnell. So bleibt nichts Sehenswertes
// auf der Strecke, und die ruhigen Abschnitte ziehen nicht träge dahin.
const ACTION = [[2.8, 5.6], [8.4, 10.2], [12.3, 13.4], [14.3, 15.3], [16.2, 20.6]];
const RATE_ACTION = 1, RATE_CALM = 3;
const filmRate = t => ACTION.some(([a, b]) => t >= a && t <= b) ? RATE_ACTION : RATE_CALM;
function limitStep(y, next, dt) {
  const f0 = filmAt(y), f1 = filmAt(next), room = filmRate(f0) * dt;
  if (Math.abs(f1 - f0) <= room) return next;
  let lo = 0, hi = 1; // Halbierung: größter Anteil des Schritts innerhalb des Limits
  for (let k = 0; k < 14; k++) { const m = (lo + hi) / 2; if (Math.abs(filmAt(y + (next - y) * m) - f0) <= room) lo = m; else hi = m; }
  return y + (next - y) * lo;
}
const holdCenter = i => trackTop() + (i === 0 ? 0 : (S.zones[i].a + S.zones[i].b) / 2);

// ---------- Darstellung ----------
let boxW = 0, boxH = 0;
function sizeBox() {
  const vw = innerWidth, vh = stage.clientHeight || innerHeight;
  boxW = Math.max(vw, vh * 16 / 9); boxH = boxW * 9 / 16;
  box.style.width = `${boxW}px`; box.style.height = `${boxH}px`;
}
function placeBox(focus) {
  const vw = innerWidth, vh = stage.clientHeight || innerHeight;
  const left = Math.min(0, Math.max(vw - boxW, vw / 2 - focus / 1280 * boxW));
  box.style.transform = `translate3d(${left.toFixed(1)}px, ${((vh - boxH) / 2).toFixed(1)}px, 0)`;
}
function filmToScreen(x, y) {
  const r = box.getBoundingClientRect();
  return { x: r.left + x / 1280 * r.width, y: r.top + y / 720 * r.height, scale: r.width / 1280 };
}
function setScenes(id, arrived) {
  if (stage.dataset.station !== id) stage.dataset.station = id;
  stage.classList.toggle('arrived', arrived);
  $$('.scene').forEach(sc => {
    const on = sc.dataset.on.split(' ').includes(id) && arrived;
    if (sc.classList.contains('is-on') !== on) { sc.classList.toggle('is-on', on); sc.inert = !on; }
  });
}
function markNav(i) { $$('.stations button').forEach((b, k) => b.toggleAttribute('aria-current', k === i)); }

// ---------- Film scrubben (Ziel setzen, rAF gleitet hin, ein Seek zur Zeit) ----------
let target = 0, shown = 0, raf = 0, lastTick = 0;
const fstep = () => 1 / (S.data?.fps || 48);
function seek() {
  if (!S.film || film.seeking || Math.abs(film.currentTime - shown) < fstep() / 2) return;
  film.currentTime = shown;
}
function scrubTick(now) {
  raf = 0;
  const dt = lastTick ? Math.min((now - lastTick) / 1000, .05) : 1 / 60;
  lastTick = now;
  const before = shown;
  shown += (target - shown) * (1 - Math.exp(-dt / .09));
  if (Math.abs(target - shown) < fstep() / 2) shown = target;
  // Sprühimpulse nur vorwärts auslösen
  if (shown > before) S.data.pulses.forEach(p => { if (before < p && shown >= p) emit('pulse', { t: p }); });
  seek();
  if (shown !== target || film.seeking) raf = requestAnimationFrame(scrubTick);
  else lastTick = 0;
}
function setTarget(t) {
  target = t;
  if (!raf && S.mode === 'film') raf = requestAnimationFrame(scrubTick);
}

// ---------- Scroll → Zustand ----------
// Texte hängen nicht nur an der Haltezone: Eine Station gilt als „sichtbar“, solange man
// weniger als 42 % einer Fahrt von ihr entfernt ist – also schon beim Heranfahren und
// noch beim Wegfahren. Das Ankommen löst die Einlauf-Animation aus.
let active = -2;
const clampI = i => Math.max(0, Math.min(S.st.length - 1, i));
function update() {
  if (S.mode !== 'film' || !S.data) return;
  const p = Math.min(S.total, Math.max(0, scrollY - trackTop()));
  const { at, seg, k } = locate(p);
  const a = S.st[seg], b = S.st[Math.min(seg + 1, S.st.length - 1)];
  const e = at >= 0 ? 0 : ease(Math.min(1, Math.max(0, k)));
  setTarget(at >= 0 ? S.st[at].t : a.t + (b.t - a.t) * e);
  placeBox(at >= 0 ? FOCUS[S.st[at].id] : FOCUS[a.id] + (FOCUS[b.id] - FOCUS[a.id]) * e);
  S.at = at; S.seg = seg; S.k = k;

  const pos = at >= 0 ? at : seg + k, near = Math.round(pos);
  const show = Math.abs(pos - near) <= .42 ? near : -1;
  if (show === active) return;
  const prev = active, ahead = clampI((prev >= 0 ? prev : near) + S.dir);
  active = show;
  if (prev >= 0) emit('leave', { from: S.st[prev].id, to: S.st[show >= 0 ? show : ahead].id });
  if (show >= 0) {
    const id = S.st[show].id;
    setScenes(id, true);
    markNav(show);
    if (!S.film) poster.src = `assets/station-${id}.webp`;
    $('#stage-status').textContent = `${show + 1} / ${S.st.length}`;
    emit('arrive', { id, index: show });
  } else setScenes(S.st[ahead].id, false);
}

// ---------- Mausrad/Trackpad: Rasten wie bei einem Drehregler ----------
// Jede Station ist eine Raste. Der Schwung derselben Geste bleibt an der nächsten Station
// hängen (RELEASE_SAME Pixel Widerstand); eine neue Geste nach kurzer Pause löst sofort
// (RELEASE_FRESH). Wer kräftig weiterscrollt, drückt durch und rauscht durch die Reise.
const RELEASE_SAME = 200, RELEASE_FRESH = 16, QUIET = 200;
const G = { goal: null, raf: 0, last: 0, detent: null, lastWheel: 0, set: -1, settle: 0, prevMag: 0, tau: .11, input: null, magnet: 0, mpos: null };
const centers = () => S.st.map((_, i) => holdCenter(i));
function glide(now) {
  G.raf = 0;
  if (G.goal === null) return;
  const dt = G.last ? Math.min((now - G.last) / 1000, .05) : 1 / 60;
  G.last = now;
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  const goal = Math.max(0, Math.min(max, G.goal));
  // Ziel erreicht oder Browser rundet auf halbe Pixel und kommt nicht näher → fertig
  if (Math.abs(goal - y) < 1 || (G.prevY !== undefined && Math.abs(y - G.prevY) < .01 && Math.abs(goal - y) < 3)) {
    if (G.detent && G.detent.since === Infinity) G.detent.since = now;
    if (!G.spring || Math.abs(G.v || 0) < 25) { G.last = 0; G.prevY = undefined; G.sy = undefined; G.v = 0; return; }
  }
  G.prevY = y;
  let next;
  if (G.spring) {
    // Kritisch gedämpfte Feder: sanfter Anlauf, Geschwindigkeit bleibt über mehrere Raster erhalten
    const w = G.spring, steps = Math.ceil(dt / (1 / 120));
    let pos = G.sy ?? y, v = G.v || 0;
    for (let k = 0; k < steps; k++) { const h = dt / steps; v += (w * w * (goal - pos) - 2 * w * v) * h; pos += v * h; }
    G.v = v; G.sy = pos; next = pos;
    if (Math.abs(goal - pos) < .8 && Math.abs(v) < 25) { G.sy = undefined; G.v = 0; next = goal; }
  } else {
    next = y + (goal - y) * (1 - Math.exp(-dt / G.tau));
    if (Math.abs(next - y) < 1) next = y + Math.sign(goal - y); // Browser rundet Bruchteile weg – nicht davor stehen bleiben
  }
  const lim = G.free ? next : limitStep(y, next, dt);
  if (lim !== next) { next = lim; if (G.spring) { G.sy = next; G.v = (next - y) / dt; } }
  G.set = Math.round(next);
  scrollTo(0, next);
  G.raf = requestAnimationFrame(glide);
}
const kick = () => { if (!G.raf) G.raf = requestAnimationFrame(glide); };
function goTo(i, tau = .11, spring = 0) { G.detent = { i, dir: 0, pull: 0, need: RELEASE_FRESH, since: Infinity }; G.tau = tau; G.spring = spring; G.goal = centers()[i]; kick(); }

// ---------- Eingabegerät ----------
// Pixelgenaue Trackpad-Ereignisse haben in Chrome/Safari wheelDeltaY = −3·deltaY; Mausraster
// Vielfache von 120; Firefox meldet Mäuse in Zeilen. Gilt pro Geste (bis 300 ms Ruhe).
function inputKind(e) {
  if (window.__vesperInput) return window.__vesperInput; // nur für Tests
  if (e.deltaMode === 1) return 'mouse';
  const w = e.wheelDeltaY;
  if (w && w % 120 === 0 && w !== -3 * e.deltaY && !e.deltaX) return 'mouse';
  return 'trackpad';
}
function onWheel(e) {
  if (S.mode !== 'film' || e.ctrlKey || !S.st.length) return;
  G.free = false;
  stopPlay();
  const now = performance.now();
  if (!G.input || now - G.lastWheel > 300) G.input = inputKind(e);
  if (G.input === 'mouse') onMouseWheel(e, now); else onTrackpadWheel(e);
}

// ---------- Maus: weich gekoppelt (Lenis-Prinzip) ----------
// Das Rad verschiebt nur ein Ziel; die Seite gleitet gedämpft hinterher. Nach dem
// letzten Raster zieht ein sanfter Magnet zur nächstgelegenen Station.
// Die Maus rechnet in Stationen statt in Pixeln: ein Raster (100 px) = ¼ Station,
// egal wie lang die Fahrt dazwischen ist – so fühlt sich jede Station gleich an.
const NOTCH = .25, MOUSE_SPRING = 8, MAGNET_DELAY = 450, MAGNET_SPRING = 5.5;
function posToY(pos) {
  const cs = centers(), i = Math.max(0, Math.min(cs.length - 1, Math.floor(pos))), f = pos - i;
  return i >= cs.length - 1 ? cs[cs.length - 1] : cs[i] + (cs[i + 1] - cs[i]) * f;
}
function yToPos(y) {
  const cs = centers();
  if (y <= cs[0]) return 0;
  for (let i = 0; i < cs.length - 1; i++) if (y <= cs[i + 1]) return i + (y - cs[i]) / (cs[i + 1] - cs[i]);
  return cs.length - 1;
}
function onMouseWheel(e, now) {
  const raw = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1);
  if (!raw) return;
  const top = trackTop(), cs = centers(), last = cs.length - 1;
  const cur = G.goal ?? scrollY;
  G.lastWheel = now; G.prevMag = Math.abs(raw);
  clearTimeout(G.settle); clearTimeout(G.magnet);
  // Außerhalb der Bühne oder über die letzte/erste Station hinaus: normal scrollen
  if (cur > top + S.total + 1 || cur < top - 1 || (raw > 0 && cur >= cs[last] - .5) || (raw < 0 && cur <= cs[0] + .5)) { G.goal = null; G.detent = null; G.mpos = null; return; }
  e.preventDefault();
  if (G.mpos == null || G.goal === null) G.mpos = yToPos(cur);
  // Beschleunigte Raster (z. B. 200 px) zählen anteilig, aber höchstens eine Station je Ereignis
  G.mpos = Math.max(0, Math.min(last, G.mpos + Math.sign(raw) * Math.min(1, NOTCH * Math.abs(raw) / 100)));
  G.detent = null; G.spring = MOUSE_SPRING;
  G.goal = posToY(G.mpos);
  kick();
  G.magnet = setTimeout(() => {
    if (G.input !== 'mouse' || G.goal === null) return;
    const i = clampI(Math.round(G.mpos));
    G.mpos = i;
    goTo(i, .11, MAGNET_SPRING);
  }, MAGNET_DELAY);
}

// ---------- Trackpad: Rasten mit Tempolimit ----------
// Wie die Maus rechnet das Trackpad in Stationen statt in Pixeln (TP_PX Trackpad-Pixel = eine
// Station, höchstens TP_RATE Stationen/s); wie schnell die Seite tatsächlich folgt, bestimmt das
// Film-Tempolimit (FILM_RATE). An der Station hält die Raste: bis zur Ankunft und DWELL ms danach
// schluckt sie jede Eingabe, dann löst eine neue Geste sofort, anhaltendes Scrollen nach RELEASE_SAME px.
const TP_PX = 600, TP_RATE = 1.6, DWELL = 450;
function onTrackpadWheel(e) {
  const d = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1);
  const dir = Math.sign(d);
  if (!dir) return;
  const top = trackTop(), end = top + S.total, cur = G.goal ?? scrollY, last = S.st.length - 1;
  G.tau = .14; G.spring = 0; G.sy = undefined; G.v = 0;
  if (cur > end + 1 || cur < top - 1) { G.goal = null; G.detent = null; G.mpos = null; return; } // außerhalb: nativ
  const now = performance.now(), fresh = now - G.lastWheel > QUIET;
  const dt = fresh ? 1 / 60 : Math.min(now - G.lastWheel, 50) / 1000;
  G.lastWheel = now;
  const mag = Math.abs(d), decaying = !fresh && mag < G.prevMag * .985;
  G.prevMag = mag;
  clearTimeout(G.settle);
  if (G.detent) {
    const D = G.detent, resting = now - (D.since || 0) < DWELL;
    // Neue Geste oder Richtungswechsel: Raste löst fast sofort (nach der Mindest-Ruhe)
    if (fresh || dir !== D.dir) { D.need = RELEASE_FRESH; D.dir = dir; D.pull = 0; }
    // Ausrollender Schwung (immer kleinere Werte) drückt nie durch – nur echtes Weiterscrollen
    if (!resting && (!decaying || D.need === RELEASE_FRESH)) D.pull += mag;
    if (resting || D.pull < D.need) {
      e.preventDefault(); G.goal = centers()[D.i] + dir * Math.min(24, D.pull * .08); kick(); return;
    }
    G.mpos = D.i; G.detent = null;
  }
  if (G.mpos == null || G.goal === null) G.mpos = yToPos(cur);
  // Nächste Station in Scrollrichtung
  const idx = dir > 0 ? Math.floor(G.mpos + .001) + 1 : Math.ceil(G.mpos - .001) - 1;
  if (idx < 0 || idx > last) { G.goal = null; G.mpos = null; return; } // keine Station mehr → normal weiterscrollen
  e.preventDefault();
  G.mpos += dir * Math.min(mag / TP_PX, TP_RATE * dt);
  if ((dir > 0 && G.mpos >= idx) || (dir < 0 && G.mpos <= idx)) { G.mpos = idx; G.detent = { i: idx, dir, pull: 0, need: RELEASE_SAME, since: Infinity }; }
  G.goal = posToY(G.mpos); kick();
  // Kleiner Schubs, der zwischen zwei Stationen endet: nach der Pause gemächlich zur nächsten Station
  if (!G.detent) G.settle = setTimeout(() => { if (!G.detent && G.goal !== null) { G.mpos = idx; goTo(idx, .16); } }, QUIET + 40);
}

// ---------- Touch, Tastatur, Scrollleiste: nativ scrollen, danach einrasten ----------
// Ein Wisch rückt höchstens eine Station weiter, außer man ist deutlich weiter gefahren (> 2,5 Stationen).
let quiet = 0, touching = false, anchor = { i: 0, y: 0 }, from = null, lastInput = 0;
function userInput() {
  lastInput = performance.now();
  if (!from) from = { ...anchor };
  clearTimeout(quiet); quiet = setTimeout(snap, 160);
}
function snap() {
  if (S.mode !== 'film' || touching || !from) return;
  const y = scrollY, p = y - trackTop(), g = from;
  from = null;
  if (p < -2 || p > S.total + 2) return;
  const pos = S.at >= 0 ? S.at : S.seg + S.k;
  let i = g.i;
  if (Math.abs(y - g.y) > 24) {
    const far = Math.abs(pos - g.i) > 2.5;
    i = S.dir > 0 ? (far ? Math.ceil(pos - .05) : g.i + 1) : (far ? Math.floor(pos + .05) : g.i - 1);
  }
  i = clampI(i);
  anchor = { i, y: holdCenter(i) };
  G.free = false;
  goTo(i);
}
function onScroll() {
  const y = scrollY;
  if (y !== S.lastY) S.dir = y > S.lastY ? 1 : -1;
  S.lastY = y;
  if (P.on && Math.abs(y - P.y) > 3) stopPlay(); // Scrollleiste o. Ä. übernimmt
  // Fremde Bewegung (Scrollleiste, Taste, Touch) → eigene Gleitfahrt abbrechen
  if (G.raf && Math.abs(y - G.set) > 3) { cancelAnimationFrame(G.raf); G.raf = 0; G.goal = null; G.detent = null; G.mpos = null; G.sy = undefined; G.v = 0; }
  if (!G.raf && G.goal !== null && Math.abs(y - G.goal) > 3) { G.goal = null; G.detent = null; }
  update();
  if (S.at >= 0 && !G.raf) anchor = { i: S.at, y };
  if (from) { clearTimeout(quiet); quiet = setTimeout(snap, 160); }
}

// ---------- Automatik: die ganze Reise in ~21 s, gleichmäßig durchgescrollt ----------
// Jede Eingabe (Rad, Touch, Taste, Stationspunkt, Scrollleiste) übernimmt sofort wieder.
const AUTO_SECONDS = 21;
const P = { on: false, raf: 0, last: 0, y: 0, btn: null };
function renderPlay() {
  if (!P.btn) return;
  const en = root.lang === 'en';
  const label = P.on ? (en ? 'Pause the journey' : 'Reise anhalten') : (en ? 'Play the journey automatically' : 'Reise automatisch abspielen');
  P.btn.textContent = P.on ? 'Ⅱ' : '▶';
  P.btn.setAttribute('aria-label', label); P.btn.title = label;
}
function playTick(now) {
  P.raf = 0;
  if (!P.on) return;
  const dt = P.last ? Math.min((now - P.last) / 1000, .05) : 1 / 60;
  P.last = now;
  const a = holdCenter(0), b = holdCenter(S.st.length - 1);
  P.y = Math.min(b, limitStep(P.y, P.y + (b - a) * dt / AUTO_SECONDS, dt));
  scrollTo(0, P.y);
  if (P.y >= b) { setPlay(false); return; }
  P.raf = requestAnimationFrame(playTick);
}
function setPlay(on) {
  if (on === P.on) return;
  P.on = on;
  cancelAnimationFrame(P.raf); P.raf = 0; P.last = 0;
  if (on) {
    // Laufende Gleitfahrt/Rasten abbrechen, damit nichts dagegen arbeitet
    cancelAnimationFrame(G.raf); G.raf = 0; G.goal = null; G.detent = null; G.mpos = null; G.sy = undefined; G.v = 0;
    clearTimeout(G.settle); clearTimeout(G.magnet); clearTimeout(quiet); from = null;
    const a = holdCenter(0), b = holdCenter(S.st.length - 1);
    P.y = scrollY >= b - 2 || scrollY < a - 2 ? a : scrollY; // am Ende oder außerhalb → von vorn
    if (P.y !== scrollY) scrollTo(0, P.y);
    P.raf = requestAnimationFrame(playTick);
  }
  renderPlay();
}
const stopPlay = () => { if (P.on) setPlay(false); };

function jumpTo(id) {
  const i = S.st.findIndex(s => s.id === id);
  if (i < 0) return;
  stopPlay();
  anchor = { i, y: holdCenter(i) };
  if (S.mode !== 'film') { const sc = $$('.scene').find(s => s.dataset.on.split(' ').includes(id)); sc && sc.scrollIntoView(); return; }
  if (Math.abs(i - Math.round(S.at >= 0 ? S.at : S.seg + S.k)) > 3) { G.goal = null; scrollTo(0, holdCenter(i)); G.detent = { i, dir: 0, pull: 0, need: RELEASE_FRESH }; }
  else { goTo(i); G.free = true; } // Stationspunkt/Link: direkt hin, ohne Film-Tempolimit
}

// ---------- Modus: Film / statisch ----------
function setMode(mode) {
  if (mode === S.mode) return;
  stopPlay();
  const id = S.st[Math.max(0, S.at >= 0 ? S.at : S.seg)]?.id || 'start';
  S.mode = mode;
  root.classList.toggle('static', mode !== 'film');
  layout();
  if (mode === 'film') {
    active = -2; jumpTo(id); requestAnimationFrame(update);
  } else {
    film.pause();
    $$('.scene').forEach(sc => { sc.inert = false; sc.classList.add('is-on'); });
    const sc = $$('.scene').find(s => s.dataset.on.split(' ').includes(id));
    if (sc) requestAnimationFrame(() => sc.scrollIntoView({ behavior: 'auto' }));
  }
  emit('mode', { mode });
}

// ---------- Start ----------
async function init() {
  S.data = await fetch(DATA_URL).then(r => r.json());
  S.st = S.data.stations.filter(s => s.id !== 'release');
  const nav = $('.stations');
  S.st.forEach((s, k) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `<span class="sr-only">${k + 1}</span>`;
    b.addEventListener('click', () => jumpTo(s.id));
    nav.append(b);
  });
  P.btn = document.createElement('button');
  P.btn.type = 'button'; P.btn.className = 'stage-play';
  P.btn.addEventListener('click', () => setPlay(!P.on));
  nav.append(P.btn);
  renderPlay();
  film.addEventListener('loadeddata', () => {
    S.film = true;
    film.classList.add('is-shown');
    stage.classList.add('has-film');
    shown = -1; setTarget(target);
  }, { once: true });
  film.addEventListener('seeked', () => { if (!raf && Math.abs(shown - film.currentTime) > fstep() / 2) raf = requestAnimationFrame(scrubTick); });
  film.addEventListener('error', () => stage.classList.add('film-failed'));
  film.preload = 'auto'; film.src = film.dataset.src; film.load();

  sizeBox(); layout();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('wheel', onWheel, { passive: false });
  addEventListener('keydown', e => { if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key)) { stopPlay(); userInput(); } });
  addEventListener('pointerup', e => { if (e.pointerType === 'mouse') userInput(); });
  addEventListener('touchstart', () => { stopPlay(); touching = true; clearTimeout(quiet); }, { passive: true });
  addEventListener('touchend', () => { touching = false; userInput(); }, { passive: true });
  addEventListener('resize', () => {
    const i = Math.max(0, S.at);
    sizeBox(); layout();
    if (S.at >= 0) scrollTo(0, holdCenter(i));
    update();
  }, { passive: true });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (S.st.some(s => s.id === id)) { e.preventDefault(); jumpTo(id); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); });

  const hash = location.hash.slice(1), alias = { duft: 'skin-1', noten: 'notes', anfang: 'start', materialien: 'start' };
  active = -2;
  update();
  const startId = alias[hash] || hash;
  if (startId && S.st.some(s => s.id === startId)) requestAnimationFrame(() => jumpTo(startId));
  else anchor = { i: 0, y: scrollY };
}

window.VesperStage = {
  init, setMode, jumpTo, filmToScreen, renderPlay,
  play: on => setPlay(on ?? !P.on),
  on(fn) { S.listeners.add(fn); },
  get state() { return { input: G.input, at: S.at, active, id: active >= 0 ? S.st[active]?.id : null, seg: S.seg, k: +S.k.toFixed(3), film: S.film, mode: S.mode, playing: P.on, t: film.currentTime, target, total: S.total }; },
  get stations() { return S.st; },
  holdCenter,
};
})();
