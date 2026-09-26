(() => {
'use strict';
const $ = (q) => document.querySelector(q);
const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(pointer: fine)');
let paused = reduced.matches, progress = 0, currentChapter = -1, frame = 0, lastTime = 0, animationTime = 0;
let heroVisible = true;
const hero = $('.hero'), journey = $('.journey'), stage = $('.journey-stage'), spray = $('.spray-scene');
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
  '.hero-media': { 'aria-label': 'Glass perfume bottle with amber fragrance in violet backlight' },
  '.journey': { 'aria-label': 'How the fragrance unfolds' },
  '.chapter-track': { 'aria-label': 'Fragrance chapters' },
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
    startAnimation();
  });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio > .001;
    sync();
  }, { threshold: .001 });
  observer.observe(scene);
  document.addEventListener('visibilitychange', sync);
  return { sync };
}

const films = [
 setupFilm(hero, $('#hero-film'), () => paused),
 setupFilm(stage, $('#materials-film'), () => paused),
 setupFilm(spray, $('#spray-film'), () => paused)
];
const needsCanvas = () => heroVisible;
const pointer = { x: .7, y: .5, tx: .7, ty: .5 };
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
}
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
 if(paused){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;startAnimation();}
 films.forEach(film=>film.sync());
 syncScroll();
}
$('#motion').addEventListener('click',()=>setPaused(!paused));
reduced.addEventListener('change',event=>setPaused(event.matches));
hero.addEventListener('pointermove',e=>{if(fine.matches){const r=hero.getBoundingClientRect();pointer.tx=e.clientX/r.width;pointer.ty=1-(e.clientY-r.top)/r.height;}},{passive:true});
hero.addEventListener('pointerleave',()=>{pointer.tx=.7;pointer.ty=.5;});

// Native WebGL: restrained refraction on the product photograph and a changing light field.
const vertex=`attribute vec2 a;varying vec2 uv;void main(){uv=a*.5+.5;gl_Position=vec4(a,0.,1.);}`;
const common=`precision mediump float;varying vec2 uv;uniform vec2 resolution;uniform float time;uniform float progress;uniform vec2 mouse;uniform vec3 tint;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+3.7;a*=.5;}return v;}`;
const heroFragment=common+`
uniform sampler2D picture;uniform vec2 imageSize;uniform float alignX;
vec2 cover(vec2 p){float a=resolution.x/resolution.y,b=imageSize.x/imageSize.y;vec2 scale=vec2(min(a/b,1.),min(b/a,1.));return p*scale+vec2((1.-scale.x)*alignX,(1.-scale.y)*.5);}
void main(){
 vec2 p=uv;vec2 aspect=vec2(resolution.x/resolution.y,1.);
 float d=length((p-mouse)*aspect);float lens=exp(-d*d*17.);
 float sweep=pow(max(0.,sin(p.x*4.+p.y*2.-time*.34)),18.);
 vec2 offset=vec2(sin(p.y*13.+time*.45),cos(p.x*11.-time*.35))*.00045;
 offset+=(p-mouse)*lens*.007;
 vec2 q=cover(p+offset);
 float chroma=.00012+lens*.0004;
 vec3 col=vec3(texture2D(picture,q+vec2(chroma,0)).r,texture2D(picture,q).g,texture2D(picture,q-vec2(chroma,0)).b);
 float bright=dot(col,vec3(.3,.5,.2));
 col+=vec3(.15,.08,.19)*sweep*bright;
 gl_FragColor=vec4(col,1.);
}`;
function makeRenderer(canvas,fragment){
 const gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false,powerPreference:'low-power'});if(!gl)return null;
 const shaders=[];
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}shaders.push(s);return s;}
 const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);if(!vs||!fs)return null;
 const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return null;
 shaders.forEach(s=>gl.deleteShader(s));gl.useProgram(program);
 const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 const uniforms={};['resolution','time','progress','mouse','tint','picture','imageSize','alignX'].forEach(n=>uniforms[n]=gl.getUniformLocation(program,n));
 let alive=true;canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();alive=false;canvas.style.opacity='0';});
 function resize(){const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.max(1,Math.round(r.width*dpr));canvas.height=Math.max(1,Math.round(r.height*dpr));gl.viewport(0,0,canvas.width,canvas.height);}
 resize();
 return {gl,uniforms,resize,draw(t){if(!alive)return;gl.useProgram(program);gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);gl.uniform1f(uniforms.time,t);gl.uniform1f(uniforms.progress,progress);gl.uniform2f(uniforms.mouse,pointer.x,pointer.y);const blend=clamp(progress*3-.5,0,2),i=Math.floor(blend),j=Math.min(2,i+1),k=blend-i;const a=chapters[i].color,b=chapters[j].color;gl.uniform3f(uniforms.tint,...a.map((c,x)=>c+(b[x]-c)*k));gl.uniform1f(uniforms.alignX,innerWidth<=600?.65:innerWidth<=1000?.58:.5);gl.drawArrays(gl.TRIANGLES,0,6);}};
}
let glass=null,textureReady=false;
try{
 glass=makeRenderer($('#glass'),heroFragment);
 if(glass){const image=new Image();image.onload=()=>{const{gl,uniforms}=glass;const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.uniform2f(uniforms.imageSize,image.naturalWidth,image.naturalHeight);textureReady=true;$('#glass').style.opacity='1';startAnimation();};image.src='assets/hero.webp';}
}catch{/* The photographs and all content remain usable without WebGL. */}
function animate(timestamp){
 frame=0;if(paused||document.hidden||!needsCanvas())return;
 if(timestamp-lastTime<32){frame=requestAnimationFrame(animate);return;}
 animationTime+=Math.min((timestamp-lastTime)/1000||0,.05);lastTime=timestamp;
 pointer.x+=(pointer.tx-pointer.x)*.08;pointer.y+=(pointer.ty-pointer.y)*.08;
 if(heroVisible&&!hero.classList.contains('has-film')&&textureReady&&glass)glass.draw(animationTime);
 frame=requestAnimationFrame(animate);
}
function startAnimation(){if(!frame&&!paused&&!document.hidden&&needsCanvas())frame=requestAnimationFrame(animate);}
const visibility=new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting&&entries[0].intersectionRatio>.001;startAnimation();},{threshold:.001});visibility.observe(hero);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;startAnimation();}});
addEventListener('resize',()=>{glass?.resize();syncScroll();startAnimation();},{passive:true});
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.section-intro,.note-layout,.maison h2,.maison-bottom').forEach(e=>{e.classList.add('reveal');reveal.observe(e);});
document.body.classList.add('js-ready');
let savedLanguage = 'de';
try { savedLanguage = localStorage.getItem('vesper-language') || 'de'; } catch {}
applyLanguage(new URLSearchParams(location.search).get('lang') || savedLanguage);
setPaused(paused);
})();
