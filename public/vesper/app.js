// VESPER – Sprache, Bewegungsschalter und Start der Filmbühne.
(() => {
'use strict';
const $ = q => document.querySelector(q);
const EN = {
  skip: 'Skip the film journey', home: 'Vesper – back to the beginning', nav: 'Main navigation', lang: 'Choose language',
  navScent: 'The fragrance', navNotes: 'The composition', navHouse: 'The house <span aria-hidden="true">↗</span>',
  stage: 'A film journey through L’Heure Bleue', stations: 'Moments of the film journey', hint: 'Scroll',
  startEyebrow: 'PARFUMS DE CARACTÈRE · N° 01', startCopy: 'A journey in twelve moments. Scroll slowly, or rush straight through.',
  passageSr: 'Bergamot, iris and cedarwood drift past.', w1: 'BERGAMOT', w2: 'IRIS', w3: 'CEDARWOOD',
  titleEyebrow: 'EXTRAIT DE PARFUM · 50 ML', title: 'For the<br><em>In-Between.</em>', titleCopy: 'No longer day. Not yet night.<br>A moment that lingers on skin.',
  anatomyEyebrow: 'ANATOMY OF A FLACON',
  a1t: 'Atomiser', a1: 'Gold-plated, for an even, fine mist', a2t: 'Collar', a2: 'Brushed brass, set by hand',
  a3t: 'Label', a3: 'Linen-textured paper, N° 01', a4t: 'Glass', a4: 'Faceted, heavy base, it breaks the light',
  pulseEyebrow: 'THE MOMENT IT MEETS SKIN', pulseTitle: 'One pulse.<br><em>One feeling.</em>',
  skinEyebrow: 'WHAT HAPPENS ON SKIN', clockUnit: 'hrs on skin',
  s1t: 'A bright<br><em>beginning.</em>', s1: 'Bergamot. Clear, green, full of light. It fades first – within the first quarter hour.',
  s2t: 'A soft<br><em>pause.</em>', s2: 'Iris. Powdery and calm. The heart carries the scent through the first hours.',
  s3t: 'A warm<br><em>afterglow.</em>', s3: 'Cedarwood. Dry and close. It stays when everything else is gone.',
  lTop: 'Top', lHeart: 'Heart', lBase: 'Base',
  originEyebrow: 'WHERE IT COMES FROM', originTitle: 'Three places.<br><em>One scent.</em>', years: 'years',
  f1: 'of bergamots for one kilo of essence, cold-pressed from the peel', f2: 'the iris root rests before it is distilled', f3: 'altitude – where the Atlas cedar for the base grows',
  notesEyebrow: 'THE COMPOSITION', n1n: '01 / TOP NOTE', n1t: 'Bergamot', n1: 'Sparkling freshness with a subtle bitter edge. The first impression, full of light.',
  n2n: '02 / HEART NOTE', n2: 'Soft and powdery. A calm floral depth that gives the fragrance its character.',
  n3n: '03 / BASE NOTE', n3t: 'Cedarwood', n3: 'Dry wood and gentle warmth. A quiet trail, close to the skin.',
  finaleWord: 'VESPER', finaleLine: 'L’Heure Bleue · Extrait de Parfum<br>For the in-between.', finaleLink: 'Discover the house <span aria-hidden="true">↓</span>',
  maisonEyebrow: 'THE HOUSE OF VESPER', maisonTitle: 'Some moments<br>need no words.<br><em>Only a scent.</em>',
  maisonCopy: 'VESPER is devoted to the in-between.<br>Between light and shadow.<br>Between a moment and a memory.', again: 'Experience it again <span aria-hidden="true">↑</span>',
  foot1: 'A fictional perfume house. A real idea.', foot2: 'Concept study · AI-generated imagery · No products for sale',
};
const META = {
  de: { title: 'VESPER — Düfte für das Dazwischen', desc: 'VESPER. Düfte für das Dazwischen. Entdecke L’Heure Bleue – eine filmische Reise durch Bergamotte, Iris und Zedernholz. Fiktive Parfumhaus-Designstudie.' },
  en: { title: 'VESPER — Fragrances for the In-Between', desc: 'VESPER. Fragrances for the in-between. Discover L’Heure Bleue – a cinematic journey through bergamot, iris and cedarwood. A fictional perfume house concept.' },
};
const DE = {}, DE_ARIA = {};
document.querySelectorAll('[data-i18n]').forEach(el => { DE[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-i18n-aria-label]').forEach(el => { DE_ARIA[el.dataset.i18nAriaLabel] = el.getAttribute('aria-label'); });

let language = 'de';
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedQuery.matches;

function renderMotion() {
  const label = language === 'en' ? (paused ? 'Enable motion' : 'Pause motion') : (paused ? 'Bewegung aktivieren' : 'Bewegung pausieren');
  const b = $('#motion');
  b.innerHTML = `${label} <span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
  b.setAttribute('aria-label', label); b.title = label;
  b.setAttribute('aria-pressed', String(paused));
}
function applyLanguage(next, updateUrl) {
  language = next === 'en' ? 'en' : 'de';
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n, v = language === 'en' ? EN[k] : DE[k];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const k = el.dataset.i18nAriaLabel, v = language === 'en' ? EN[k] : DE_ARIA[k];
    if (v) el.setAttribute('aria-label', v);
  });
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === language)));
  document.title = META[language].title;
  $('meta[name="description"]').content = META[language].desc;
  renderMotion();
  window.VesperStage?.renderPlay();
  try { localStorage.setItem('vesper-language', language); } catch {}
  if (updateUrl) { const u = new URL(location.href); if (language === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang'); history.replaceState(null, '', u); }
}
function setPaused(v) {
  paused = v;
  document.body.classList.toggle('paused', paused);
  renderMotion();
  VesperStage.setMode(paused ? 'static' : 'film');
}

document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => applyLanguage(b.dataset.lang, true)));
$('#motion').addEventListener('click', () => setPaused(!paused));
reducedQuery.addEventListener('change', e => setPaused(e.matches));

let saved = 'de';
try { saved = localStorage.getItem('vesper-language') || 'de'; } catch {}
applyLanguage(new URLSearchParams(location.search).get('lang') || saved);
VesperFX.init();
VesperStage.init().then(() => { if (paused) setPaused(true); });
document.body.classList.add('js-ready');
})();
