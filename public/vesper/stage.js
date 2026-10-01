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
const DATA_URL = 'stations.json?v=11';
const HOLD = .5;            // Haltezone je Station in Bildschirmhöhen
const PX_PER_SEC = .42;     // Fahrzone: Bildschirmhöhen je Filmsekunde
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
      y += dt > .02 ? Math.min(1.4, Math.max(.45, dt * PX_PER_SEC)) * vh : .28 * vh;
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
const G = { goal: null, raf: 0, last: 0, detent: null, lastWheel: 0, set: -1, settle: 0, prevMag: 0 };
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
    G.last = 0; G.prevY = undefined; return;
  }
  G.prevY = y;
  const next = y + (goal - y) * (1 - Math.exp(-dt / .11));
  G.set = Math.round(next);
  scrollTo(0, next);
  G.raf = requestAnimationFrame(glide);
}
const kick = () => { if (!G.raf) G.raf = requestAnimationFrame(glide); };
function goTo(i) { G.detent = { i, dir: 0, pull: 0, need: RELEASE_FRESH }; G.goal = centers()[i]; kick(); }

function onWheel(e) {
  if (S.mode !== 'film' || e.ctrlKey || !S.st.length) return;
  let d = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1);
  const dir = Math.sign(d);
  if (!dir) return;
  const top = trackTop(), end = top + S.total, cur = G.goal ?? scrollY;
  if (cur > end + 1 || cur < top - 1) { G.goal = null; G.detent = null; return; } // außerhalb: nativ
  const now = performance.now(), fresh = now - G.lastWheel > QUIET;
  G.lastWheel = now;
  const mag = Math.abs(d), decaying = !fresh && mag < G.prevMag * .985;
  G.prevMag = mag;
  clearTimeout(G.settle);
  // Neue Geste oder Richtungswechsel: Raste löst fast sofort
  if (G.detent && (fresh || dir !== G.detent.dir)) { G.detent.need = RELEASE_FRESH; G.detent.dir = dir; G.detent.pull = 0; }
  if (G.detent) {
    // Ausrollender Schwung (immer kleinere Werte) drückt nicht durch – nur echtes Weiterscrollen
    if (!decaying || G.detent.need === RELEASE_FRESH) G.detent.pull += mag;
    if (G.detent.pull < G.detent.need) { e.preventDefault(); G.goal = centers()[G.detent.i] + dir * Math.min(36, G.detent.pull * .1); kick(); return; }
    d = dir * Math.min(G.detent.pull - G.detent.need, 60);
    G.detent = null;
  }
  const cs = centers();
  let idx = -1;
  if (dir > 0) idx = cs.findIndex(c => c > cur + .5);
  else for (let k = cs.length - 1; k >= 0; k--) if (cs[k] < cur - .5) { idx = k; break; }
  if (idx < 0) { G.goal = null; return; } // keine Station mehr in dieser Richtung → normal weiterscrollen
  e.preventDefault();
  let next = cur + d;
  if ((dir > 0 && next >= cs[idx]) || (dir < 0 && next <= cs[idx])) { next = cs[idx]; G.detent = { i: idx, dir, pull: 0, need: RELEASE_SAME }; }
  G.goal = next; kick();
  // Kleiner Schubs, der zwischen zwei Stationen endet: nach der Pause zur nächsten Station
  if (!G.detent) G.settle = setTimeout(() => { if (!G.detent && G.goal !== null) goTo(idx); }, QUIET + 40);
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
  goTo(i);
}
function onScroll() {
  const y = scrollY;
  if (y !== S.lastY) S.dir = y > S.lastY ? 1 : -1;
  S.lastY = y;
  // Fremde Bewegung (Scrollleiste, Taste, Touch) → eigene Gleitfahrt abbrechen
  if (G.raf && Math.abs(y - G.set) > 3) { cancelAnimationFrame(G.raf); G.raf = 0; G.goal = null; G.detent = null; }
  if (!G.raf && G.goal !== null && Math.abs(y - G.goal) > 3) { G.goal = null; G.detent = null; }
  update();
  if (S.at >= 0 && !G.raf) anchor = { i: S.at, y };
  if (from) { clearTimeout(quiet); quiet = setTimeout(snap, 160); }
}

function jumpTo(id) {
  const i = S.st.findIndex(s => s.id === id);
  if (i < 0) return;
  anchor = { i, y: holdCenter(i) };
  if (S.mode !== 'film') { const sc = $$('.scene').find(s => s.dataset.on.split(' ').includes(id)); sc && sc.scrollIntoView(); return; }
  if (Math.abs(i - Math.round(S.at >= 0 ? S.at : S.seg + S.k)) > 3) { G.goal = null; scrollTo(0, holdCenter(i)); G.detent = { i, dir: 0, pull: 0, need: RELEASE_FRESH }; }
  else goTo(i);
}

// ---------- Modus: Film / statisch ----------
function setMode(mode) {
  if (mode === S.mode) return;
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
  addEventListener('keydown', e => { if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key)) userInput(); });
  addEventListener('pointerup', e => { if (e.pointerType === 'mouse') userInput(); });
  addEventListener('touchstart', () => { touching = true; clearTimeout(quiet); }, { passive: true });
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
  init, setMode, jumpTo, filmToScreen,
  on(fn) { S.listeners.add(fn); },
  get state() { return { at: S.at, active, id: active >= 0 ? S.st[active]?.id : null, seg: S.seg, k: +S.k.toFixed(3), film: S.film, mode: S.mode, t: film.currentTime, target, total: S.total }; },
  get stations() { return S.st; },
  holdCenter,
};
})();
