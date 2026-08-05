"use strict";

document.addEventListener("DOMContentLoaded", function () {
/* ======================= LOADER ======================= */
const loaderFill = document.getElementById('loaderFill');
requestAnimationFrame(()=>{ loaderFill.style.width = '100%'; });
window.addEventListener('load', ()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('hide');
  }, 2200);
});

/* ======================= CURSOR GLOW + SPARKLE TRAIL ======================= */
const glow = document.getElementById('cursor-glow');
let lastSpark = 0;
let lastTrailHeart = 0;
const trailEmojis = ['💗','💕','❤️'];
window.addEventListener('pointermove', (e)=>{
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
  const now = performance.now();
  // sparkle dots: frequent, tiny glints
  if(now - lastSpark > 60){
    lastSpark = now;
    const s = document.createElement('div');
    s.className = 'sparkle-dot';
    s.style.left = (e.clientX + (Math.random()*10-5)) + 'px';
    s.style.top = (e.clientY + (Math.random()*10-5)) + 'px';
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 900);
  }
  // trail hearts: sparser, float up and fade behind the cursor
  if(now - lastTrailHeart > 260){
    lastTrailHeart = now;
    const h = document.createElement('div');
    h.className = 'trail-heart';
    h.textContent = trailEmojis[Math.floor(Math.random()*trailEmojis.length)];
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    document.body.appendChild(h);
    setTimeout(()=> h.remove(), 1000);
  }
});

/* ======================= AMBIENT DECOR: hearts, roses, butterflies ======================= */
const decorLayer = document.getElementById('decorLayer');
function spawnHeart(){
  const h = document.createElement('div');
  h.className = 'heart-drop';
  h.textContent = ['❤️','💕','💖','💗'][Math.floor(Math.random()*4)];
  h.style.left = Math.random()*100 + 'vw';
  h.style.bottom = '-5vh';
  h.style.setProperty('--drift', (Math.random()*80-40)+'px');
  h.style.animationDuration = (7 + Math.random()*6) + 's';
  h.style.fontSize = (1 + Math.random()*1.2) + 'rem';
  decorLayer.appendChild(h);
  setTimeout(()=> h.remove(), 14000);
}
function spawnRose(){
  const r = document.createElement('div');
  r.className = 'rose-fall';
  r.textContent = ['🌹','🌸','🏵️'][Math.floor(Math.random()*3)];
  r.style.left = Math.random()*100 + 'vw';
  r.style.setProperty('--drift', (Math.random()*100-50)+'px');
  r.style.animationDuration = (9 + Math.random()*6) + 's';
  decorLayer.appendChild(r);
  setTimeout(()=> r.remove(), 16000);
}
function spawnButterfly(){
  const b = document.createElement('div');
  b.className = 'butterfly';
  b.textContent = '🦋';
  b.style.left = Math.random()*90 + 'vw';
  b.style.top = Math.random()*70 + 'vh';
  b.style.animationDuration = (10 + Math.random()*8) + 's';
  decorLayer.appendChild(b);
  setTimeout(()=> b.remove(), 20000);
}
setInterval(spawnHeart, 900);
setInterval(spawnRose, 1400);
setInterval(spawnButterfly, 4500);
for(let i=0;i<4;i++){ setTimeout(spawnButterfly, i*800); }

/* ======================= SKY LAYER: stars, shooting stars, fireflies ======================= */
const skyLayer = document.getElementById('sky-layer');
// a fixed field of gently twinkling stars, scattered once on load
for(let i=0;i<40;i++){
  const star = document.createElement('div');
  star.className = 'sky-star';
  star.style.left = Math.random()*100 + 'vw';
  star.style.top = Math.random()*70 + 'vh';
  star.style.animationDelay = (Math.random()*3) + 's';
  star.style.animationDuration = (2 + Math.random()*3) + 's';
  skyLayer.appendChild(star);
}
// fireflies drifting low on the page, warm and glowing
for(let i=0;i<10;i++){
  const fly = document.createElement('div');
  fly.className = 'firefly';
  fly.style.left = Math.random()*100 + 'vw';
  fly.style.top = (40 + Math.random()*55) + 'vh';
  fly.style.animationDuration = (6 + Math.random()*5) + 's, ' + (2 + Math.random()*2) + 's';
  skyLayer.appendChild(fly);
}
// an occasional shooting star streaking across
function spawnShootingStar(){
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.top = (Math.random()*35) + 'vh';
  star.style.left = (55 + Math.random()*35) + 'vw';
  skyLayer.appendChild(star);
  requestAnimationFrame(()=> star.classList.add('fire'));
  setTimeout(()=> star.remove(), 1600);
}
setInterval(spawnShootingStar, 6000);
setTimeout(spawnShootingStar, 1500);

/* ======================= BACKGROUND CANVAS: ambient sparkle particles ======================= */
const bgCanvas = document.getElementById('bg-canvas');
const bctx = bgCanvas.getContext('2d');
let W,H;
function resizeBg(){ W = bgCanvas.width = window.innerWidth; H = bgCanvas.height = window.innerHeight; }
resizeBg();
window.addEventListener('resize', resizeBg);
const particles = Array.from({length:70}, ()=>({
  x: Math.random()*window.innerWidth,
  y: Math.random()*window.innerHeight,
  r: Math.random()*1.8+0.4,
  s: Math.random()*0.4+0.1,
  a: Math.random()
}));
function animateBg(){
  bctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.y -= p.s;
    p.a += 0.02;
    if(p.y < -10){ p.y = H+10; p.x = Math.random()*W; }
    const alpha = (Math.sin(p.a)+1)/2 * 0.7 + 0.15;
    bctx.beginPath();
    bctx.fillStyle = `rgba(255,235,210,${alpha})`;
    bctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    bctx.fill();
  });
  requestAnimationFrame(animateBg);
}
animateBg();

/* ======================= FIREWORKS CANVAS ======================= */
const fwCanvas = document.getElementById('fireworks-canvas');
const fctx = fwCanvas.getContext('2d');
function resizeFw(){ fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight; }
resizeFw();
window.addEventListener('resize', resizeFw);
let fwParticles = [];
const fwColors = ['#ff7fa8','#e85c8a','#dfb45f','#fff0f5','#ffb1cc'];
function launchFirework(x,y){
  const count = 46;
  for(let i=0;i<count;i++){
    const angle = (Math.PI*2*i)/count;
    const speed = 2 + Math.random()*3.4;
    fwParticles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      life: 1,
      color: fwColors[Math.floor(Math.random()*fwColors.length)]
    });
  }
}
let fwActive = false;
let fwLoopId = null;
function fwLoop(){
  fctx.fillStyle = 'rgba(255,246,248,0.12)';
  fctx.fillRect(0,0,fwCanvas.width,fwCanvas.height);
  fwParticles.forEach(p=>{
    p.x += p.vx; p.y += p.vy; p.vy += 0.045; p.life -= 0.014;
    fctx.globalAlpha = Math.max(p.life,0);
    fctx.fillStyle = p.color;
    fctx.beginPath();
    fctx.arc(p.x,p.y,2.6,0,Math.PI*2);
    fctx.fill();
  });
  fctx.globalAlpha = 1;
  fwParticles = fwParticles.filter(p=>p.life>0);
  if(fwActive){ fwLoopId = requestAnimationFrame(fwLoop); }
}
function startFireworks(duration){
  fwCanvas.classList.add('active');
  fwActive = true;
  fwLoop();
  const iv = setInterval(()=>{
    launchFirework(Math.random()*fwCanvas.width, fwCanvas.height*0.25 + Math.random()*fwCanvas.height*0.35);
  }, 500);
  if(duration){
    setTimeout(()=>{
      clearInterval(iv);
      fwActive = false;
      setTimeout(()=>{ fwCanvas.classList.remove('active'); fctx.clearRect(0,0,fwCanvas.width,fwCanvas.height); }, 1200);
    }, duration);
  }
}

/* ======================= MUSIC TOGGLE ======================= */
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-toggle');
let musicPlaying = false;
function tryAutoplay(){
  music.volume = 0.5;
  const p = music.play();
  if(p !== undefined){
    p.then(()=>{ musicPlaying = true; musicBtn.textContent = '🔊'; musicBtn.classList.add('playing'); })
     .catch(()=>{ musicPlaying = false; musicBtn.textContent = '🔇'; });
  }
}
window.addEventListener('load', ()=> setTimeout(tryAutoplay, 2300));
musicBtn.addEventListener('click', ()=>{
  if(musicPlaying){
    music.pause(); musicPlaying = false; musicBtn.textContent = '🔇'; musicBtn.classList.remove('playing');
  } else {
    music.play().then(()=>{ musicPlaying = true; musicBtn.textContent = '🔊'; musicBtn.classList.add('playing'); }).catch(()=>{});
  }
});

/* ======================= HERO CTA -> scroll + confetti burst ======================= */
document.getElementById('openSurpriseBtn').addEventListener('click', ()=>{
  launchFirework(window.innerWidth/2, window.innerHeight/2);
  fwCanvas.classList.add('active');
  fwActive = true; fwLoop();
  setTimeout(()=>{ fwActive=false; setTimeout(()=>fwCanvas.classList.remove('active'),1000); }, 900);
  document.getElementById('messageSection').scrollIntoView({behavior:'smooth'});
});

/* ======================= SCROLL REVEAL ======================= */
const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('in-view'); }
  });
}, { threshold:0.15 });
revealEls.forEach(el=> io.observe(el));

/* ======================= LOVE COUNTER ======================= */
function nextBirthday(){
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 7, 10, 0,0,0); // August = month 7
  if(target < now){ target = new Date(year+1, 7, 10, 0,0,0); }
  return target;
}
function updateCountdown(){
  const now = new Date();
  const target = nextBirthday();
  let diff = target - now;
  const caption = document.getElementById('counterCaption');
  if(diff <= 0){
    document.getElementById('cdDays').textContent = '00';
    document.getElementById('cdHours').textContent = '00';
    document.getElementById('cdMins').textContent = '00';
    document.getElementById('cdSecs').textContent = '00';
    caption.textContent = "it's your day, my love ❤️";
    return;
  }
  const isToday = target.getDate() === now.getDate() && target.getMonth() === now.getMonth() && target.getFullYear() === now.getFullYear();
  caption.textContent = isToday ? "counting down the last moments of your day ❤️" : "until your next birthday, my love ❤️";
  const d = Math.floor(diff/(1000*60*60*24));
  diff -= d*(1000*60*60*24);
  const h = Math.floor(diff/(1000*60*60));
  diff -= h*(1000*60*60);
  const m = Math.floor(diff/(1000*60));
  diff -= m*(1000*60);
  const s = Math.floor(diff/1000);
  document.getElementById('cdDays').textContent = String(d).padStart(2,'0');
  document.getElementById('cdHours').textContent = String(h).padStart(2,'0');
  document.getElementById('cdMins').textContent = String(m).padStart(2,'0');
  document.getElementById('cdSecs').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ======================= LOVE NOTES ======================= */
const noteTexts = [
  "You're my favourite hello and hardest goodbye.",
  "Every love story is beautiful, but ours is my favourite.",
  "You make ordinary days feel like celebrations.",
  "Home isn't a place, it's you.",
  "I fall for you a little more, every single day."
];
const notesWrap = document.getElementById('notesWrap');
noteTexts.forEach((text,i)=>{
  const n = document.createElement('div');
  n.className = 'love-note';
  n.textContent = text;
  const left = (i * 18 + Math.random()*10) % 82;
  const top = (i % 2 === 0) ? (Math.random()*40) : (60 + Math.random()*30);
  n.style.left = left + '%';
  n.style.top = top + '%';
  n.style.setProperty('--rot', (Math.random()*8-4)+'deg');
  n.style.animationDelay = (i*0.4) + 's';
  notesWrap.appendChild(n);
});

/* ======================= GIFT BOX ======================= */
const giftBox = document.getElementById('giftBox');
const giftReveal = document.getElementById('giftReveal');
let giftOpened = false;
giftBox.addEventListener('click', ()=>{
  if(giftOpened) return;
  giftOpened = true;
  giftBox.classList.add('open');
  giftReveal.classList.add('show');
  launchFirework(giftBox.getBoundingClientRect().left + 90, giftBox.getBoundingClientRect().top + 40);
  fwCanvas.classList.add('active'); fwActive = true; fwLoop();
  setTimeout(()=>{ fwActive=false; setTimeout(()=>fwCanvas.classList.remove('active'),1000); }, 700);
});

/* ======================= CAKE CUT (hero mini + big interactive) ======================= */
const bigCake = document.getElementById('bigCake');
const candleRow = document.getElementById('candleRow');
const cakeHint = document.getElementById('cakeHint');
const cakeSliceMsg = document.getElementById('cakeSliceMsg');
let cakeCut = false;
bigCake.addEventListener('click', ()=>{
  if(cakeCut) return;
  cakeCut = true;
  cakeHint.textContent = 'blowing out the candles...';
  const candles = candleRow.querySelectorAll('.c');
  candles.forEach((c,i)=>{
    setTimeout(()=> c.classList.add('blown'), 350 + i*260);
  });
  setTimeout(()=>{
    bigCake.classList.add('cut');
    cakeHint.textContent = 'wish made ✨';
    cakeSliceMsg.classList.add('show');
    launchFirework(window.innerWidth/2, window.innerHeight*0.45);
    fwCanvas.classList.add('active'); fwActive = true; fwLoop();
    setTimeout(()=>{ fwActive=false; setTimeout(()=>fwCanvas.classList.remove('active'),1000); }, 900);
  }, 350 + candles.length*260 + 300);
});

/* ======================= BALLOON GAME ======================= */
const balloonGame = document.getElementById('balloonGame');
const popScoreEl = document.getElementById('popScore');
let popScore = 0;
const balloonColors = ['#ff7fa8','#e85c8a','#dfb45f','#ffb1cc','#f3dfa8'];
function spawnGameBalloon(){
  if(!balloonGame.isConnected) return;
  const b = document.createElement('div');
  b.className = 'game-balloon';
  const left = 6 + Math.random()*84;
  b.style.left = left + '%';
  b.style.background = `radial-gradient(circle at 30% 28%, #fff8, transparent 40%), ${balloonColors[Math.floor(Math.random()*balloonColors.length)]}`;
  const dur = 5 + Math.random()*3.4;
  b.style.animationDuration = dur + 's';
  balloonGame.appendChild(b);
  b.addEventListener('click', (e)=>{
    e.stopPropagation();
    popBalloon(b);
  });
  setTimeout(()=>{ if(b.isConnected) b.remove(); }, dur*1000 + 200);
}
function popBalloon(b){
  const rect = b.getBoundingClientRect();
  const gameRect = balloonGame.getBoundingClientRect();
  b.remove();
  popScore++;
  popScoreEl.textContent = popScore;
  for(let i=0;i<14;i++){
    const conf = document.createElement('div');
    conf.style.position = 'absolute';
    conf.style.left = (rect.left - gameRect.left + rect.width/2) + 'px';
    conf.style.top = (rect.top - gameRect.top + rect.height/2) + 'px';
    conf.style.width = '7px'; conf.style.height = '10px';
    conf.style.background = balloonColors[Math.floor(Math.random()*balloonColors.length)];
    conf.style.borderRadius = '2px';
    conf.style.pointerEvents = 'none';
    conf.style.zIndex = 5;
    const angle = Math.random()*Math.PI*2;
    const dist = 40 + Math.random()*60;
    const dx = Math.cos(angle)*dist, dy = Math.sin(angle)*dist;
    conf.animate([
      { transform:'translate(0,0) rotate(0deg)', opacity:1 },
      { transform:`translate(${dx}px, ${dy+60}px) rotate(${Math.random()*360}deg)`, opacity:0 }
    ], { duration: 700 + Math.random()*300, easing:'cubic-bezier(.22,1,.36,1)' });
    balloonGame.appendChild(conf);
    setTimeout(()=> conf.remove(), 1100);
  }
}
let balloonSpawnInterval = null;
const balloonIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      if(!balloonSpawnInterval){ balloonSpawnInterval = setInterval(spawnGameBalloon, 900); }
    } else {
      if(balloonSpawnInterval){ clearInterval(balloonSpawnInterval); balloonSpawnInterval = null; }
    }
  });
}, {threshold:0.2});
balloonIO.observe(balloonGame);

/* ======================= WISHES SEQUENTIAL REVEAL ======================= */
const wishItems = document.querySelectorAll('.wish-item');
const wishesIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      wishItems.forEach((w,i)=> setTimeout(()=> w.classList.add('show'), i*350));
      wishesIO.disconnect();
    }
  });
}, {threshold:0.25});
wishesIO.observe(document.getElementById('wishesSection'));

/* ======================= FINAL SURPRISE ======================= */
let finaleTriggered = false;
const finaleSection = document.getElementById('finaleSection');
const finaleIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !finaleTriggered){
      finaleTriggered = true;
      finaleSection.classList.add('deepen');
      document.getElementById('auroraGlow').classList.add('show');
      startFireworks(6000);
      finaleIO.disconnect();
    }
  });
}, {threshold:0.5});
finaleIO.observe(finaleSection);

/* ======================= GALLERY LIGHTBOX ======================= */
const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightboxFrame');
document.querySelectorAll('#galleryGrid .gallery-frame').forEach(frame=>{
  frame.addEventListener('click', ()=>{
    lightboxFrame.innerHTML = `<span class="icon">${frame.dataset.icon}</span><span>${frame.dataset.caption}</span>`;
    lightbox.classList.add('show');
  });
});
document.getElementById('lightboxClose').addEventListener('click', ()=> lightbox.classList.remove('show'));
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) lightbox.classList.remove('show'); });

/* ======================= HIDDEN SECRET MESSAGE ======================= */
const secretOverlay = document.getElementById('secretOverlay');
document.getElementById('secretTrigger').addEventListener('click', ()=> secretOverlay.classList.add('show'));
document.getElementById('secretClose').addEventListener('click', ()=> secretOverlay.classList.remove('show'));
secretOverlay.addEventListener('click', (e)=>{ if(e.target === secretOverlay) secretOverlay.classList.remove('show'); });

/* ======================= KEYBOARD ACCESSIBILITY ======================= */
// elements that behave like buttons via role="button" also respond to Enter/Space
function makeKeyboardClickable(el){
  if(!el) return;
  el.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      el.click();
    }
  });
}
['secretTrigger','giftBox','bigCake'].forEach(id=> makeKeyboardClickable(document.getElementById(id)));
document.querySelectorAll('.gallery-frame').forEach(makeKeyboardClickable);

/* ======================= TOAST NOTIFICATIONS ======================= */
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(message, duration){
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toastEl.classList.remove('show'), duration || 2600);
}

/* ======================= THEME: light / dark / system, saved to localStorage ======================= */
const THEME_KEY = 'kuchupuchuu-theme';
const themeToggleBtn = document.getElementById('theme-toggle');
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved === 'dark' || saved === 'light'){
    applyTheme(saved);
  } else {
    // no saved preference yet -> follow system setting
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}
initTheme();
themeToggleBtn.addEventListener('click', ()=>{
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});
// keep following the system theme live, only while the user hasn't chosen manually
if(window.matchMedia){
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e)=>{
    if(!localStorage.getItem(THEME_KEY)){ applyTheme(e.matches ? 'dark' : 'light'); }
  });
}

/* ======================= SCROLL PROGRESS BAR ======================= */
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
  scrollProgress.setAttribute('aria-valuenow', Math.round(pct));
}
window.addEventListener('scroll', updateScrollProgress, { passive:true });
updateScrollProgress();

/* ======================= SCROLL TO TOP BUTTON ======================= */
const scrollTopBtn = document.getElementById('scrollTopBtn');
function updateScrollTopVisibility(){
  if(window.scrollY > window.innerHeight * 0.8){ scrollTopBtn.classList.add('show'); }
  else{ scrollTopBtn.classList.remove('show'); }
}
window.addEventListener('scroll', updateScrollTopVisibility, { passive:true });
scrollTopBtn.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
updateScrollTopVisibility();

/* ======================= FAB CLUSTER: ripple effect on click ======================= */
document.querySelectorAll('.fab').forEach(fab=>{
  fab.addEventListener('click', function(e){
    const rect = fab.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'fab-ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    fab.appendChild(ripple);
    setTimeout(()=> ripple.remove(), 650);
  });
});

/* ======================= SHARE BUTTON: Web Share API with clipboard fallback ======================= */
document.getElementById('shareBtn').addEventListener('click', async ()=>{
  const shareData = {
    title: 'Happy Birthday, kuchupuchuu 😘😗',
    text: 'A little romantic surprise made just for you ❤️',
    url: window.location.href
  };
  try{
    if(navigator.share){
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      showToast('Link copied to clipboard 💌');
    }
  }catch(err){
    // user cancelled the share sheet, or clipboard was blocked — fail silently either way
    if(err && err.name !== 'AbortError'){
      showToast('Could not share right now — please copy the link manually.');
    }
  }
});

/* ======================= DOWNLOAD THIS MEMORY (client-side screenshot) ======================= */
// html2canvas is loaded on demand only when the button is used, keeping initial page load light
function loadHtml2Canvas(){
  return new Promise((resolve, reject)=>{
    if(window.html2canvas){ resolve(window.html2canvas); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = ()=> resolve(window.html2canvas);
    script.onerror = ()=> reject(new Error('html2canvas failed to load'));
    document.head.appendChild(script);
  });
}
const downloadBtn = document.getElementById('downloadMemoryBtn');
downloadBtn.addEventListener('click', async ()=>{
  downloadBtn.disabled = true;
  const originalLabel = downloadBtn.textContent;
  downloadBtn.textContent = 'preparing your memory...';
  try{
    const html2canvas = await loadHtml2Canvas();
    const canvas = await html2canvas(document.getElementById('finaleSection'), {
      backgroundColor: null,
      useCORS: true,
      scale: Math.min(window.devicePixelRatio || 1, 2)
    });
    const link = document.createElement('a');
    link.download = 'kuchupuchuu-birthday-memory.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Memory saved 📸');
  }catch(err){
    showToast('Could not generate the image — please check your connection and try again.');
  }finally{
    downloadBtn.disabled = false;
    downloadBtn.textContent = originalLabel;
  }
});

/* ======================= CLICK-ANYWHERE FLOATING HEARTS ======================= */
document.addEventListener('click', (e)=>{
  // skip interactive controls so this doesn't visually clash with their own feedback
  if(e.target.closest('button, a, .gallery-frame, .game-balloon, .gift-box, .big-cake')) return;
  const h = document.createElement('div');
  h.className = 'click-heart';
  h.textContent = ['❤️','💕','💖'][Math.floor(Math.random()*3)];
  h.style.left = e.clientX + 'px';
  h.style.top = e.clientY + 'px';
  document.body.appendChild(h);
  setTimeout(()=> h.remove(), 900);
});

/* ======================= DYNAMIC GREETING BASED ON TIME OF DAY ======================= */
(function setDynamicGreeting(){
  const hour = new Date().getHours();
  let greeting;
  if(hour < 5) greeting = '🌙 A magical late night just for you';
  else if(hour < 12) greeting = '☀️ Good morning, my love';
  else if(hour < 17) greeting = '🌸 Good afternoon, kuchupuchuu';
  else if(hour < 21) greeting = '🌇 Good evening, my forever person';
  else greeting = '🌙 A magical night, just for you';
  document.getElementById('dynamicGreeting').textContent = `✨ ${greeting} ✨`;
})();

/* ======================= RANDOM CUTE COMPLIMENTS ======================= */
const compliments = [
  "your smile could out-shine every light on this page ✨",
  "you make ordinary moments feel like magic 💫",
  "the world got a little softer the day you arrived 🌷",
  "you're proof that some people are just built out of sunshine ☀️",
  "loving you is the easiest, best decision I keep making 🥹❤️",
  "you're someone's whole heart — mine 🫶"
];
const complimentChip = document.getElementById('complimentChip');
complimentChip.addEventListener('click', ()=>{
  const pick = compliments[Math.floor(Math.random()*compliments.length)];
  showToast(pick, 3200);
});

/* ======================= AUTO-PAUSE MUSIC WHEN TAB IS INACTIVE ======================= */
document.addEventListener('visibilitychange', ()=>{
  if(document.hidden){
    if(musicPlaying){ music.pause(); }
  } else {
    if(musicPlaying){ music.play().catch(()=>{}); }
  }
});

/* ======================= PWA: SERVICE WORKER REGISTRATION ======================= */
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{
      // offline support is a progressive enhancement — a failed registration should never block the page
    });
  });
}
});
