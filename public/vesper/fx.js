// VESPER – Code-Ebenen über dem Film: Partikelnebel (Sprühstoß, Duftwolke, Finale),
// Uhr/Kurve der Duftentwicklung und Zähler. Ein einziges Canvas, das nur rechnet,
// solange etwas lebt; danach steht die Schleife still und das Canvas ist verborgen.
(() => {
'use strict';
const $ = q => document.querySelector(q);
const canvas = $('.mist'), ctx = canvas.getContext('2d');
const NOTE = { top: [200, 196, 150], heart: [170, 132, 226], base: [214, 146, 96], mist: [200, 170, 228], gold: [240, 206, 150] };
const NOZZLE = { x: 852, y: 157 };
let W = 0, H = 0, DPR = 1, raf = 0, last = 0, ps = [], mode = 'off', modeT = 0, tint = NOTE.mist.slice(), tintTo = NOTE.mist;
let reduced = false;

function resize() {
  DPR = Math.min(devicePixelRatio || 1, 1.5);
  W = innerWidth; H = innerHeight;
  canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

// Weicher Sprite, einmal vorgerendert – drawImage ist viel billiger als Gradienten je Partikel.
const SPRITE = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.35, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return c;
})();
const tinted = new Map();
function sprite(rgb) {
  const key = rgb.map(v => Math.round(v / 8) * 8).join(',');
  if (tinted.has(key)) return tinted.get(key);
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  g.drawImage(SPRITE, 0, 0); g.globalCompositeOperation = 'source-in';
  g.fillStyle = `rgb(${key})`; g.fillRect(0, 0, 64, 64);
  if (tinted.size > 40) tinted.clear();
  tinted.set(key, c); return c;
}
const rnd = (a, b) => a + Math.random() * (b - a);

function start() {
  canvas.classList.add('is-live');
  if (!raf) { last = 0; raf = requestAnimationFrame(tick); }
}
function tick(now) {
  raf = 0;
  const dt = last ? Math.min((now - last) / 1000, .05) : 1 / 60;
  last = now; modeT += dt;
  for (let k = 0; k < 3; k++) tint[k] += (tintTo[k] - tint[k]) * Math.min(1, dt * 2.5);

  if (mode === 'cloud' && ps.length < 150 && modeT < 7) for (let k = 0; k < 4; k++) ps.push(cloudParticle());

  ctx.clearRect(0, 0, W, H);
  let alive = 0, moving = false;
  const cloudSprite = sprite(tint);
  for (const p of ps) {
    p.age += dt;
    if (p.kind === 'text') {
      // Ziel ansteuern (gedämpfte Feder), danach ganz leicht flimmern
      const k = p.age < p.delay ? 0 : 1 - Math.exp(-(p.age - p.delay) * 3.2);
      p.x += (p.tx - p.x) * k * .2; p.y += (p.ty - p.y) * k * .2;
      if (Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > .3) moving = true;
      p.a = Math.min(1, p.a + dt * 1.5);
    } else {
      p.vx *= Math.pow(p.drag, dt * 60); p.vy *= Math.pow(p.drag, dt * 60);
      p.vy += p.lift * dt;
      p.x += p.vx * dt; p.y += (p.vy + (p.sway ? Math.sin(p.age * 1.7 + p.phase) * p.sway : 0)) * dt;
      p.r += p.grow * dt;
      moving = true;
    }
    const life = p.life ? p.age / p.life : 0;
    const fade = p.out ? Math.max(0, 1 - (p.age - p.outAt) / .8) : 1;
    const alpha = p.a * (p.life ? Math.sin(Math.min(1, life) * Math.PI) : 1) * fade;
    if ((p.life && life >= 1) || fade <= 0) { p.dead = true; continue; }
    alive++;
    ctx.globalCompositeOperation = p.kind === 'text' ? 'lighter' : 'source-over';
    ctx.globalAlpha = alpha;
    ctx.drawImage(p.kind === 'cloud' ? cloudSprite : p.sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
  }
  ctx.globalAlpha = 1;
  if (ps.some(p => p.dead)) ps = ps.filter(p => !p.dead);

  const still = mode === 'text' && !moving;
  if (alive && !still) raf = requestAnimationFrame(tick);
  else if (!alive) { canvas.classList.remove('is-live'); ctx.clearRect(0, 0, W, H); }
}

// ---------- Partikelarten ----------
function burst() {
  if (reduced) return;
  const n = VesperStage.filmToScreen(NOZZLE.x, NOZZLE.y), s = n.scale;
  const spr = sprite(NOTE.mist);
  for (let k = 0; k < 170; k++) {
    const speed = rnd(300, 1700) * s, ang = Math.PI + rnd(-.42, .2) * (speed < 700 * s ? 1.6 : 1);
    ps.push({ kind: 'burst', sprite: spr, x: n.x + rnd(-4, 4) * s, y: n.y + rnd(-3, 3) * s, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed,
      drag: rnd(.962, .984), lift: rnd(-26, 10) * s, r: rnd(6, 16) * s, grow: rnd(40, 120) * s, a: rnd(.03, .085), age: 0, life: rnd(2.6, 5.5),
      sway: rnd(8, 30) * s, phase: rnd(0, 6.28) });
  }
  start();
}
function cloudParticle() {
  return { kind: 'cloud', x: rnd(-.1, .75) * W, y: rnd(.05, 1.05) * H, vx: rnd(4, 22), vy: rnd(-16, -3), drag: 1, lift: 0,
    r: rnd(90, 240), grow: rnd(4, 14), a: rnd(.025, .06), age: 0, life: rnd(6, 11) };
}
function fadeAll() { ps.forEach(p => { if (!p.out) { p.out = true; p.outAt = p.age; } }); }

function textParticles() {
  const el = $('.finale-word');
  if (!el) return;
  const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
  const off = document.createElement('canvas'); off.width = Math.ceil(r.width); off.height = Math.ceil(r.height);
  const g = off.getContext('2d');
  g.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  g.textBaseline = 'middle'; g.fillStyle = '#fff';
  g.letterSpacing = cs.letterSpacing;
  g.fillText(el.textContent.trim(), 0, r.height / 2);
  const img = g.getImageData(0, 0, off.width, off.height).data;
  const stepPx = Math.max(3, Math.round(r.height / 34));
  const pts = [];
  for (let y = 0; y < off.height; y += stepPx) for (let x = 0; x < off.width; x += stepPx) if (img[(y * off.width + x) * 4 + 3] > 140) pts.push([r.left + x, r.top + y]);
  const spr = sprite(NOTE.gold), max = 1600, skip = Math.max(1, pts.length / max);
  // Bestehender Nebel wird zum Material des Schriftzugs
  const pool = ps.filter(p => p.kind !== 'text');
  ps = [];
  for (let k = 0; k < pts.length; k += skip) {
    const [tx, ty] = pts[Math.floor(k)], src = pool[Math.floor(Math.random() * pool.length)];
    ps.push({ kind: 'text', sprite: spr, x: src ? src.x : rnd(0, W), y: src ? src.y : rnd(H * .6, H * 1.1), tx: tx + rnd(-.6, .6), ty: ty + rnd(-.6, .6),
      r: stepPx * rnd(.9, 1.5), a: 0, age: 0, delay: rnd(0, .7) });
  }
  start();
}

// ---------- Uhr, Kurve, Zähler ----------
const MIN_X = [[1, 40], [15, 140], [60, 260], [180, 380], [360, 500], [720, 620]];
function minutesToX(m) {
  for (let k = 1; k < MIN_X.length; k++) {
    const [m0, x0] = MIN_X[k - 1], [m1, x1] = MIN_X[k];
    if (m <= m1) return x0 + (x1 - x0) * Math.log(m / m0) / Math.log(m1 / m0);
  }
  return 620;
}
const SKIN = { 'skin-1': { min: 10, tint: NOTE.top }, 'skin-2': { min: 120, tint: NOTE.heart }, 'skin-3': { min: 480, tint: NOTE.base } };
let clockMin = 1, clockRaf = 0;
function setClock(target) {
  cancelAnimationFrame(clockRaf);
  const from = clockMin, t0 = performance.now(), dur = reduced ? 0 : 1100;
  const out = $('.clock-value'), line = $('.curve .now');
  const run = now => {
    const k = dur ? Math.min(1, (now - t0) / dur) : 1, e = 1 - Math.pow(1 - k, 3);
    clockMin = Math.exp(Math.log(from) + (Math.log(target) - Math.log(from)) * e);
    const m = Math.round(clockMin);
    out.textContent = `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
    line.setAttribute('transform', `translate(${minutesToX(clockMin).toFixed(1)} 0)`);
    if (k < 1) clockRaf = requestAnimationFrame(run);
  };
  clockRaf = requestAnimationFrame(run);
}
function countUp() {
  document.querySelectorAll('.count').forEach((el, k) => {
    const to = +el.dataset.to, t0 = performance.now() + 400 + k * 200, dur = reduced ? 0 : 1400;
    const fmt = v => Math.round(v).toLocaleString(document.documentElement.lang === 'en' ? 'en-GB' : 'de-DE');
    const run = now => {
      const k2 = dur ? Math.max(0, Math.min(1, (now - t0) / dur)) : 1;
      el.textContent = fmt(to * (1 - Math.pow(1 - k2, 3)));
      if (k2 < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  });
}
function showFinal() { // statischer Modus: alles in Endstellung
  document.querySelectorAll('.count').forEach(el => { el.textContent = (+el.dataset.to).toLocaleString(document.documentElement.lang === 'en' ? 'en-GB' : 'de-DE'); });
}

function setMode(m, opts = {}) {
  mode = m; modeT = 0;
  if (opts.tint) tintTo = opts.tint;
  if (m === 'cloud') { start(); }
  if (m === 'off') fadeAll();
  if (m === 'text') textParticles();
  if (ps.length) start();
}

function init() {
  resize();
  addEventListener('resize', () => { resize(); if (mode === 'text') textParticles(); }, { passive: true });
  VesperStage.on((type, d) => {
    if (type === 'pulse') burst();
    if (type === 'mode') { reduced = d.mode !== 'film'; if (reduced) { ps = []; ctx.clearRect(0, 0, W, H); canvas.classList.remove('is-live'); showFinal(); setClock(480); } }
    if (type === 'leave') {
      if (!SKIN[d.to] && d.to !== 'pulse') setMode('off');
      if (d.to === 'finale' || d.to === 'release') { /* Nebel bleibt bis zur Ankunft als Material */ }
    }
    if (type === 'arrive' && !reduced) {
      if (SKIN[d.id]) { setMode('cloud', { tint: SKIN[d.id].tint }); setClock(SKIN[d.id].min); }
      if (d.id === 'pulse') setMode('burst');
      if (d.id === 'origin') countUp();
      if (d.id === 'finale' || d.id === 'release') { if (mode !== 'text') setMode('text'); }
    }
  });
}
window.VesperFX = { init, burst };
})();
