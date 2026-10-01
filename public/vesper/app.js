(() => {
'use strict';
const $ = (q) => document.querySelector(q);
const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches, progress = 0, currentChapter = -1;
const hero = $('.hero'), journey = $('.journey'), stage = $('.journey-stage'), flight = $('.ingredient-flight'), flightStage = $('.flight-stage'), spray = $('.spray-scene');
let language = 'de';
const translations = {
  '.skip': 'Skip to the fragrance',
  'nav a:nth-child(1)': 'The fragrance',
  'nav a:nth-child(2)': 'The composition',
  'nav a:nth-child(3)': 'The house <span aria-hidden="true">↗</span>',
  '#hero-title': 'For the<br><em>In-Between.</em>',
  '.hero-copy': 'No longer day. Not yet night.<br>A moment that lingers on skin.',
  '.hero-content .text-link': 'Discover L’Heure Bleue <span aria-hidden="true">↘</span>',
  '.hero-bottom>span:first-child': 'BERGAMOT · IRIS · CEDARWOOD',
  '.hero-bottom a': 'SCROLL TO EXPLORE <span aria-hidden="true">↓</span>',
  '.chapter-top>span:first-child': 'ONE SCENT. THREE MOMENTS.',
  '.chapter-track button:nth-child(1)': '<span>01</span> Top<span class="track-line"></span>',
  '.chapter-track button:nth-child(2)': '<span>02</span> Heart<span class="track-line"></span>',
  '.chapter-track button:nth-child(3)': '<span>03</span> Base<span class="track-line"></span>',
  '.journey-hint': 'Every scroll reveals another facet.',
  '.spray-copy .eyebrow': 'THE MOMENT IT MEETS SKIN',
  '#spray-title': 'One pulse.<br><em>One feeling.</em>',
  '.spray-copy p:last-child': 'A fine mist on skin. A feeling that stays.',
  '.section-intro .eyebrow': 'THE COMPOSITION',
  '.section-intro h2': 'Three notes.<br><em>One memory.</em>',
  '.section-intro>p:last-child': 'A bright opening, a velvet heart, and the quiet warmth that remains.',
  '.note:nth-child(1) .note-number': '01 / TOP NOTE',
  '.note:nth-child(2) .note-number': '02 / HEART NOTE',
  '.note:nth-child(3) .note-number': '03 / BASE NOTE',
  '#note-0': 'Sparkling freshness with a subtle bitter edge. The first impression, full of light.',
  '#note-1': 'Soft and powdery. A calm floral depth that gives the fragrance its character.',
  '#note-2': 'Dry wood and gentle warmth. A quiet trail, close to the skin.',
  '.maison>.eyebrow': 'THE HOUSE OF VESPER',
  '.maison h2': 'Some moments<br>need no words.<br><em>Only a scent.</em>',
  '.maison-bottom p': 'VESPER is devoted to the in-between.<br>Between light and shadow.<br>Between a moment and a memory.',
  '.maison-bottom .text-link': 'Experience it again <span aria-hidden="true">↑</span>',
  'footer>div span:nth-child(1)': 'A fictional perfume house. A real idea.',
  'footer>div span:nth-child(2)': 'Concept study · AI-generated imagery · No products for sale'
};
const originalCopy = Object.fromEntries(Object.keys(translations).map(selector => [selector, $(selector).innerHTML]));
const ariaTranslations = {
  '.wordmark': { 'aria-label': 'Vesper – back to the beginning' },
  'header nav': { 'aria-label': 'Main navigation' },
  '.language-switch': { 'aria-label': 'Choose language' },
  '.journey': { 'aria-label': 'How the fragrance unfolds' },
  '.chapter-track': { 'aria-label': 'Fragrance chapters' },
  '.flight-frames': { 'aria-label': 'Iris and bergamot peel open the view onto the VESPER bottle in violet and gold light' },
  '.spray-photo': { 'aria-label': 'VESPER bottle with golden atomizer in violet light' },
  '.still-life': { 'aria-label': 'Iris, bergamot peel and cedarwood arranged as a sculptural fragrance composition' }
};
const originalAria = Object.fromEntries(Object.entries(ariaTranslations).map(([selector,attrs]) => [selector,Object.fromEntries(Object.keys(attrs).map(attr => [attr,$(selector).getAttribute(attr)]))]));
const descriptions = {
  de:'VESPER. Düfte für das Dazwischen. Entdecke L’Heure Bleue – eine filmische Reise durch Bergamotte, Iris und Zedernholz. Fiktive Parfumhaus-Designstudie.',
  en:'VESPER. Fragrances for the in-between. Discover L’Heure Bleue – a cinematic journey through bergamot, iris and cedarwood. A fictional perfume house concept.'
};
function renderMotionLabel(){
  const label = language === 'en' ? (paused ? 'Enable motion' : 'Pause motion') : (paused ? 'Bewegung aktivieren' : 'Bewegung pausieren');
  $('#motion').innerHTML = `${label} <span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
  $('#motion').title = label;
  $('#motion').setAttribute('aria-label',label);
}
function applyLanguage(next, updateUrl = false){
  language = next === 'en' ? 'en' : 'de';
  document.documentElement.lang = language;
  for(const [selector,copy] of Object.entries(translations)) $(selector).innerHTML = language === 'en' ? copy : originalCopy[selector];
  for(const [selector,attrs] of Object.entries(ariaTranslations)) for(const [attr,value] of Object.entries(attrs)) $(selector).setAttribute(attr,language === 'en' ? value : originalAria[selector][attr]);
  const names = language === 'en' ? ['Bergamot','Iris','Cedarwood'] : ['Bergamotte','Iris','Zedernholz'];
  document.querySelectorAll('.note-title').forEach((el,index) => { el.firstChild.textContent = names[index]; el.querySelector('i').textContent = el.closest('.note').classList.contains('active') ? '↗' : '+'; });
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.lang === language)));
  document.title = language === 'en' ? 'VESPER — Fragrances for the In-Between' : 'VESPER — Düfte für das Dazwischen';
  $('meta[name="description"]').content = descriptions[language];
  renderMotionLabel();
  currentChapter = -1;
  syncScroll();
  try { localStorage.setItem('vesper-language',language); } catch {}
  if(updateUrl){const url = new URL(location.href);if(language === 'en') url.searchParams.set('lang','en');else url.searchParams.delete('lang');history.replaceState(null,'',url);}
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',() => applyLanguage(button.dataset.lang,true)));
function setupFilm(scene, video, isMotionPaused) {
  let visible = false, failed = false, requested = false, playPending = false;
  const shouldPlay = () => visible && !document.hidden && !isMotionPaused() && !failed;
  function sync() {
    if (!shouldPlay()) { video.pause(); return; }
    if (!requested) {
      requested = true;
      video.muted = true;
      video.src = video.dataset.src;
      video.load();
    }
    if (!video.paused || playPending) return;
    playPending = true;
    const attempt = video.play();
    if (attempt) attempt.then(() => {
      if (!shouldPlay()) video.pause();
    }).catch(() => {
      // Keep the photographic fallback; a later user gesture can retry play().
    }).finally(() => { playPending = false; });
    else playPending = false;
  }
  video.addEventListener('playing', () => {
    if (!shouldPlay()) { video.pause(); return; }
    scene.classList.add('has-film');
  });
  video.addEventListener('error', () => {
    failed = true;
    scene.classList.remove('has-film');
  });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio > .001;
    sync();
  }, { threshold: .001 });
  observer.observe(scene);
  document.addEventListener('visibilitychange', sync);
  return { sync };
}

// A single shot is scrubbed in both directions; no crossfades between scenes.
function setupScrollFilm(scene, video, isMotionPaused) {
  let nearby = false, failed = false, requested = false, raf = 0;
  let target = 0, displayed = 0, lastTick = 0;
  const frameStep = 1 / 48;
  const active = () => nearby && !document.hidden && !isMotionPaused() && !failed;
  const duration = () => Number.isFinite(video.duration) ? Math.max(0, video.duration - frameStep) : 0;
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
    lastTick = 0;
    video.pause();
  }
  function schedule() {
    if (active() && !raf && duration()) raf = requestAnimationFrame(tick);
  }
  // Only one seek may be outstanding; seeked immediately continues toward the latest position.
  function seek() {
    if (video.seeking || !active() || Math.abs(video.currentTime - displayed) < frameStep / 2) return;
    video.currentTime = Math.max(0, Math.min(duration(), displayed));
  }
  function tick(now) {
    raf = 0;
    if (!active()) { lastTick = 0; return; }
    const seconds = lastTick ? Math.min((now - lastTick) / 1000, .05) : 1 / 60;
    lastTick = now;
    const wanted = target * duration();
    displayed += (wanted - displayed) * (1 - Math.exp(-seconds / .09));
    if (Math.abs(wanted - displayed) < frameStep / 2) displayed = wanted;
    seek();
    // Keep easing while a seek is in flight; sleep once the shown frame matches the target.
    if (displayed !== wanted || video.seeking) schedule();
    else lastTick = 0;
  }
  function load() {
    requested = true;
    video.muted = true;
    // Buffer the whole shot early so later seeks never wait for the network.
    video.preload = 'auto';
    video.src = video.dataset.src;
    video.load();
  }
  function sync() {
    if (!active()) { stop(); return; }
    if (!requested) load();
    schedule();
  }
  video.addEventListener('loadeddata', () => { scene.classList.add('has-scroll-film'); sync(); });
  video.addEventListener('loadedmetadata', sync);
  video.addEventListener('seeked', () => { seek(); schedule(); });
  video.addEventListener('error', () => {
    failed = true;
    stop();
    scene.classList.remove('has-scroll-film');
  });
  new IntersectionObserver(entries => {
    nearby = entries[0].isIntersecting;
    sync();
  }, { rootMargin: '100% 0px', threshold: 0 }).observe(scene);
  document.addEventListener('visibilitychange', sync);
  return {
    sync,
    setProgress(value) {
      target = Math.max(0, Math.min(1, value));
      sync();
    }
  };
}

const scrollFilm = setupScrollFilm(flight, $('#flight-film'), () => paused);

const films = [
 setupFilm(stage, $('#materials-film'), () => paused),
 setupFilm(spray, $('#spray-film'), () => paused)
];
const chapters = [
{label:'01 — DER ERSTE IMPULS',title:'Ein heller<br><em>Auftakt.</em>',description:'Bergamotte. Klar, grün und voller Licht.<br>Wie das letzte Leuchten eines langen Tages.',en:{label:'01 — THE FIRST SPARK',title:'A bright<br><em>beginning.</em>',description:'Bergamot. Clear, green, full of light.<br>Like the last glow of a long day.'},color:[.76,.7,.27]},
{label:'02 — MITTEN IM MOMENT',title:'Ein weiches<br><em>Innehalten.</em>',description:'Iris. Pudrig, floral und voller Ruhe.<br>Die Welt wird leiser. Der Moment wird deiner.',en:{label:'02 — WITHIN THE MOMENT',title:'A soft<br><em>pause.</em>',description:'Iris. Powdery, floral, at ease.<br>The world grows quieter. The moment becomes yours.'},color:[.64,.32,.92]},
{label:'03 — WAS BLEIBT',title:'Ein warmer<br><em>Nachklang.</em>',description:'Zedernholz. Trocken, sanft und nah.<br>Eine Erinnerung, die nicht gleich weiterzieht.',en:{label:'03 — WHAT REMAINS',title:'A warm<br><em>afterglow.</em>',description:'Cedarwood. Dry, gentle, close.<br>A memory that takes its time to fade.'},color:[.86,.38,.13]}
];
const chapterButtons = [...document.querySelectorAll('[data-chapter]')];
function setChapter(index) {
 if(index === currentChapter) return;
 currentChapter = index;
 journey.dataset.chapter=String(index);
 const c = language === 'en' ? chapters[index].en : chapters[index];
 $('#chapter-label').textContent=c.label; $('#chapter-title').innerHTML=c.title; $('#chapter-description').innerHTML=c.description;
 $('#chapter-count').textContent=`0${index+1} / 03`;
 chapterButtons.forEach((b,i)=>i===index?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current'));
 if(!paused && typeof $('.chapter-copy').animate==='function') $('.chapter-copy').animate([{opacity:.35,filter:'blur(5px)'},{opacity:1,filter:'blur(0px)'}],{duration:650,easing:'ease-out'});
}
function syncScroll() {
 const r=journey.getBoundingClientRect(), span=Math.max(1,journey.offsetHeight-stage.offsetHeight);
 progress=clamp(-r.top/span);
 setChapter(Math.min(2,Math.floor(progress*3)));
 chapterButtons.forEach((b,i)=>b.style.setProperty('--progress',clamp(progress*3-i)));
 if(!paused) {
  $('.journey-image').style.transform=`scale(${1.12+progress*.15}) translate(${(progress-.5)*-4}%,${Math.sin(progress*Math.PI)*3}%)`;
  $('.journey-image').style.filter=`hue-rotate(${(progress-.4)*20}deg)`;
 }
 syncFlight();
}
function smooth(a,b,x){const t=clamp((x-a)/(b-a));return t*t*(3-2*t);}
function syncIntroCopy(){
 const video=$('#flight-film');
 const p=Number.isFinite(video.duration)&&video.duration>0?video.currentTime/video.duration:0;
 const reveal=paused||flight.classList.contains('film-failed')?1:smooth(.42,.67,p);
 flight.style.setProperty('--intro-copy',String(reveal));
 flight.style.setProperty('--intro-shift',`${(1-reveal)*24}px`);
 const crop=paused&&!flight.classList.contains('has-scroll-film')?1:smooth(.08,.67,p);
 flight.style.setProperty('--intro-crop',`${50+crop*30}%`);
 flight.style.setProperty('--intro-media-height',`${100-crop*38}%`);
 flight.style.setProperty('--intro-media-top',`${crop*3}%`);
 $('.hero-bottom a').href=reveal>.55?'#duft':'#auftakt';
 const visible=reveal>.08;
 const copy=$('.hero-content');
 copy.inert=!visible;
 copy.setAttribute('aria-hidden',String(!visible));
 document.body.classList.toggle('intro-open',reveal>.55);
}
function syncFlight(){
 const rect=flight.getBoundingClientRect();
 const span=Math.max(1,flight.offsetHeight-flightStage.offsetHeight);
 const p=clamp(-rect.top/span);
 scrollFilm.setProgress(clamp(p/.86));
 syncIntroCopy();
}
$('#flight-film').addEventListener('seeked',syncIntroCopy);
$('#flight-film').addEventListener('error',()=>{
 flight.classList.add('film-failed');
 $('.flight-poster').src='assets/hero.webp';
 syncIntroCopy();
});
let scrollPending=false;
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(()=>{syncScroll();scrollPending=false;});}}, {passive:true});
chapterButtons.forEach((button,index)=>button.addEventListener('click',()=>{
 const start=scrollY+journey.getBoundingClientRect().top;
 const span=Math.max(1,journey.offsetHeight-stage.offsetHeight);
 scrollTo({top:start+(index/3+.08)*span,behavior:paused?'instant':'smooth'});
}));
document.querySelectorAll('[data-note]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-note]').forEach(b=>{
  const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-expanded',String(on));
  b.querySelector('.note-detail').hidden=!on;b.querySelector('i').textContent=on?'↗':'+';
 });
 const poses=['58% 50%','20% 50%','85% 50%'];
 $('.still-life').style.backgroundPosition=poses[Number(button.dataset.note)];
}));
function setPaused(value){
 paused=value;document.body.classList.toggle('paused',paused);
 $('#motion').setAttribute('aria-pressed',String(paused));
 renderMotionLabel();
 if(!flight.classList.contains('has-scroll-film')) $('.flight-poster').src=paused?'assets/hero.webp':'assets/flight-film-poster.webp';
 films.forEach(film=>film.sync());
 syncScroll();
}
$('#motion').addEventListener('click',()=>setPaused(!paused));
reduced.addEventListener('change',event=>setPaused(event.matches));
addEventListener('resize',syncScroll,{passive:true});
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.section-intro,.note-layout,.maison h2,.maison-bottom').forEach(e=>{e.classList.add('reveal');reveal.observe(e);});
document.body.classList.add('js-ready');
let savedLanguage = 'de';
try { savedLanguage = localStorage.getItem('vesper-language') || 'de'; } catch {}
applyLanguage(new URLSearchParams(location.search).get('lang') || savedLanguage);
setPaused(paused);
})();
