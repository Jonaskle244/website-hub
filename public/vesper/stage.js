// VESPER – Filmbühne in Schritten (Emons-Prinzip).
// Ein Scroll-Impuls = ein Schritt. Zwischen zwei Stationen spielt der Masterfilm
// per play() (vorwärts) bzw. die gespiegelte Datei (rückwärts). Keyframes liegen
// auf allen Stationszeiten, deshalb ist jeder Seek billig.
(() => {
'use strict';
const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];
const stage = $('.stage'), box = $('.film-box'), fwd = $('.film-fwd'), rev = $('.film-rev'), poster = $('.film-poster');
const root = document.documentElement;

// Filmkoordinaten (1280×720): wohin auf dem Handy der Ausschnitt schaut.
const FOCUS = { start: 520, passage: 700, title: 870, anatomy: 860, pulse: 740, 'skin-1': 700, 'skin-2': 700, 'skin-3': 700, origin: 640, notes: 640, finale: 870, release: 870 };
const DATA_URL = 'stations.json?v=10';

const S = {
  data: null, i: 0, busy: false, locked: true, film: false, mode: 'film',
  listeners: new Set(),
};
const ids = () => S.data ? S.data.stations.map(s => s.id) : [];
const station = i => S.data?.stations[i];
const last = () => S.data ? S.data.stations.length - 1 : 0;
const frame = () => 1 / S.data.fps;

// ---------- Darstellung ----------
function layoutBox() {
  const vw = innerWidth, vh = stage.clientHeight || innerHeight;
  const w = Math.max(vw, vh * 16 / 9), h = w * 9 / 16;
  const fx = FOCUS[station(S.i)?.id] ?? 640;
  const left = Math.min(0, Math.max(vw - w, vw / 2 - fx / 1280 * w));
  box.style.width = `${w}px`; box.style.height = `${h}px`;
  box.style.transform = `translate3d(${left}px, ${(vh - h) / 2}px, 0)`;
}
// Filmpunkt → Bildschirmpunkt (für Partikel)
function filmToScreen(x, y) {
  const r = box.getBoundingClientRect();
  return { x: r.left + x / 1280 * r.width, y: r.top + y / 720 * r.height, scale: r.width / 1280 };
}

function setScenes(id, arrived) {
  stage.dataset.station = id;
  stage.classList.toggle('arrived', arrived);
  $$('.scene').forEach(sc => {
    const on = sc.dataset.on.split(' ').includes(id);
    sc.classList.toggle('is-on', on && arrived);
    sc.classList.toggle('is-near', on);
    sc.inert = !(on && arrived);
  });
  $$('.stations button').forEach((b, k) => b.toggleAttribute('aria-current', k === S.i));
}

function emit(type, detail) { S.listeners.forEach(fn => fn(type, detail)); }

// ---------- Video ----------
function waitSeek(v, t) {
  return new Promise(res => {
    if (Math.abs(v.currentTime - t) < 1e-3 && v.readyState >= 2) return res();
    const done = () => { v.removeEventListener('seeked', done); res(); };
    v.addEventListener('seeked', done);
    v.currentTime = t;
  });
}
function showVideo(which) {
  fwd.classList.toggle('is-shown', which === fwd);
  rev.classList.toggle('is-shown', which === rev);
}
// Spielt v von seiner aktuellen Zeit bis `until`, ruft onTime(mediaTime) je Bild.
function playUntil(v, until, rate, onTime) {
  return new Promise(res => {
    let finished = false;
    const stop = t => {
      if (finished) return;
      finished = true;
      v.pause();
      res(t);
    };
    const check = t => {
      onTime && onTime(t);
      if (t >= until - frame() * .6) { stop(t); return true; }
      return false;
    };
    v.playbackRate = rate;
    if ('requestVideoFrameCallback' in v) {
      const cb = (_, meta) => { if (!check(meta.mediaTime)) v.requestVideoFrameCallback(cb); };
      v.requestVideoFrameCallback(cb);
    } else {
      const loop = () => { if (!finished && !check(v.currentTime)) requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
    v.addEventListener('ended', () => stop(v.currentTime), { once: true });
    const p = v.play();
    if (p) p.catch(() => stop(v.currentTime));
  });
}
const rateFor = d => Math.min(2.4, Math.max(1, d / 2.3));

// ---------- Schritte ----------
async function travel(to) {
  const from = S.i;
  if (to === from || to < 0 || to > last() || S.busy) return;
  S.busy = true;
  const t0 = station(from).t, t1 = station(to).t, D = S.data.duration;
  const id = station(to).id;
  emit('leave', { from: station(from).id, to: id });
  S.i = to;
  setScenes(id, false);
  layoutBox();
  if (!S.film) poster.src = `assets/station-${id}.webp`;

  if (!S.film || Math.abs(t1 - t0) < frame() / 2) {
    if (S.film) await waitSeek(fwd, t1);
    await new Promise(r => setTimeout(r, 380));
  } else if (Math.abs(to - from) > 1) {
    // Sprung über mehrere Stationen (Navigation): kurz abblenden statt alles abzuspielen.
    stage.classList.add('cut');
    await new Promise(r => setTimeout(r, 260));
    await waitSeek(fwd, t1); showVideo(fwd);
    stage.classList.remove('cut');
  } else if (t1 > t0) {
    showVideo(fwd);
    const pulses = S.data.pulses.filter(p => p > t0 && p <= t1 + frame());
    let next = 0;
    await playUntil(fwd, t1, rateFor(t1 - t0), t => {
      while (next < pulses.length && t >= pulses[next] - frame()) emit('pulse', { t: pulses[next++] });
    });
    await waitSeek(fwd, t1);
  } else {
    await waitSeek(rev, D - t0);
    showVideo(rev);
    await playUntil(rev, D - t1, rateFor(t0 - t1));
    await waitSeek(fwd, t1);
    showVideo(fwd);
  }
  setScenes(id, true);
  emit('arrive', { id, index: to });
  $('#stage-status').textContent = `${to + 1} / ${last() + 1}`;
  if (id === 'release') release(true);
  setTimeout(() => { S.busy = false; }, 120);
}

function step(dir) {
  if (S.busy || !S.data) return;
  if (dir > 0 && S.i === last()) { release(true); return; }
  travel(S.i + dir);
}

// Letzte Station: Bühne gibt das normale Scrollen frei.
function release(scroll) {
  S.locked = false;
  root.classList.remove('locked');
  if (scroll) $('#maison').scrollIntoView({ behavior: S.mode === 'film' ? 'smooth' : 'auto' });
}
function relock() {
  S.locked = true;
  root.classList.add('locked');
  scrollTo(0, 0);
}

function jumpTo(id, { scroll = true } = {}) {
  if (id === 'maison') { if (S.mode === 'film') { if (S.i !== last()) travel(last()).then(() => release(true)); else release(true); } else $('#maison').scrollIntoView(); return; }
  const k = ids().indexOf(id);
  if (k < 0) return;
  if (S.mode !== 'film') { $(`#${$$('.scene').find(s => s.dataset.on.split(' ').includes(id)).id}`).scrollIntoView(); return; }
  if (!S.locked) relock();
  travel(k);
}

// ---------- Eingaben ----------
let armed = true, acc = 0, lastWheel = 0, lastMag = 0;
function onWheel(e) {
  if (S.mode !== 'film') return;
  if (!S.locked) {
    if (scrollY <= 0 && e.deltaY < 0) { e.preventDefault(); relock(); armed = false; travel(last() - 1); }
    return;
  }
  e.preventDefault();
  const now = performance.now(), mag = Math.abs(e.deltaY), gap = now - lastWheel;
  lastWheel = now;
  // Neue Geste erst nach einer Ruhepause oder bei deutlich frischem Schub –
  // so löst das Ausrollen eines Trackpads keinen zweiten Schritt aus.
  if (gap > 200 || (mag > lastMag * 1.8 && mag > 30 && gap > 40)) { armed = true; acc = 0; }
  lastMag = mag;
  if (S.busy) { armed = false; return; }
  if (!armed) return;
  acc += e.deltaY;
  if (Math.abs(acc) > 24) { armed = false; acc = 0; step(Math.sign(e.deltaY)); }
}
let touchY = null;
function onTouchStart(e) { touchY = e.touches[0].clientY; }
function onTouchMove(e) {
  if (S.mode !== 'film' || touchY === null) return;
  const dy = touchY - e.touches[0].clientY;
  if (S.locked) { e.preventDefault(); return; }
  if (scrollY <= 0 && dy < -10) { e.preventDefault(); }
}
function onTouchEnd(e) {
  if (S.mode !== 'film' || touchY === null) return;
  const dy = touchY - e.changedTouches[0].clientY;
  touchY = null;
  if (Math.abs(dy) < 40) return;
  if (S.locked) step(Math.sign(dy));
  else if (scrollY <= 0 && dy < 0) { relock(); travel(last() - 1); }
}
function onKey(e) {
  if (S.mode !== 'film' || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.target.closest('input,textarea,select')) return;
  const down = ['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey);
  const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
  if (S.locked && (down || up)) { if (e.key === ' ' && e.target.closest('button,a')) return; e.preventDefault(); step(down ? 1 : -1); }
  else if (!S.locked && up && scrollY <= 0) { e.preventDefault(); relock(); travel(last() - 1); }
  if (S.locked && e.key === 'Home') { e.preventDefault(); travel(0); }
  if (S.locked && e.key === 'End') { e.preventDefault(); travel(last()); }
}

// ---------- Modus: Film / statisch (Pause, reduzierte Bewegung, Fehler) ----------
function setMode(mode) {
  if (mode === S.mode) return;
  const id = station(S.i).id;
  S.mode = mode;
  root.classList.toggle('static', mode !== 'film');
  if (mode === 'film') {
    relock();
    layoutBox();
    if (S.film) waitSeek(fwd, station(S.i).t).then(() => showVideo(fwd));
    setScenes(id, true);
  } else {
    root.classList.remove('locked');
    fwd.pause(); rev.pause();
    $$('.scene').forEach(sc => { sc.inert = false; sc.classList.add('is-on'); });
    const sc = $$('.scene').find(s => s.dataset.on.split(' ').includes(id));
    if (sc) requestAnimationFrame(() => sc.scrollIntoView({ behavior: 'auto' }));
  }
  emit('mode', { mode });
}

// ---------- Start ----------
async function init() {
  S.data = await fetch(DATA_URL).then(r => r.json());
  const nav = $('.stations');
  S.data.stations.forEach((s, k) => {
    if (s.id === 'release') return;
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.goto = s.id;
    b.innerHTML = `<span class="sr-only">${k + 1}</span>`;
    b.addEventListener('click', () => jumpTo(s.id));
    nav.append(b);
  });
  // Filme erst nach dem ersten Bild laden; Poster deckt bis dahin ab.
  const ready = v => new Promise((res, rej) => {
    v.addEventListener('loadeddata', res, { once: true });
    v.addEventListener('error', rej, { once: true });
    v.preload = 'auto'; v.src = v.dataset.src; v.load();
  });
  Promise.all([ready(fwd), ready(rev)]).then(async () => {
    await waitSeek(fwd, station(S.i).t);
    S.film = true;
    showVideo(fwd);
    stage.classList.add('has-film');
  }).catch(() => { stage.classList.add('film-failed'); });

  addEventListener('wheel', onWheel, { passive: false });
  addEventListener('touchstart', onTouchStart, { passive: true });
  addEventListener('touchmove', onTouchMove, { passive: false });
  addEventListener('touchend', onTouchEnd, { passive: true });
  addEventListener('keydown', onKey);
  addEventListener('resize', layoutBox, { passive: true });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (id === 'maison' || ids().includes(id)) { e.preventDefault(); jumpTo(id); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { fwd.pause(); rev.pause(); } });

  const hash = location.hash.slice(1), alias = { duft: 'skin-1', noten: 'notes', anfang: 'start', materialien: 'start' };
  const startId = alias[hash] || hash;
  root.classList.add('locked');
  layoutBox();
  setScenes('start', true);
  emit('arrive', { id: 'start', index: 0 });
  if (startId && startId !== 'start') requestAnimationFrame(() => jumpTo(startId));
}

window.VesperStage = {
  init, setMode, jumpTo, filmToScreen,
  on(fn) { S.listeners.add(fn); },
  get state() { return { i: S.i, id: station(S.i)?.id, busy: S.busy, locked: S.locked, film: S.film, mode: S.mode, t: fwd.currentTime }; },
};
})();
