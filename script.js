// ── NAVBAR TOGGLE (mobile) ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── NAVBAR SCROLL SHADOW ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow = window.scrollY > 40 ? '0 4px 20px rgba(0,0,0,0.3)' : 'none';
  document.getElementById('scrolltop').classList.toggle('visible', window.scrollY > 400);
});

// ── SCROLL TO TOP ──
document.getElementById('scrolltop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightbox.classList.add('active');
  });
});
document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('active'); });

// ── EVIDENZIA GIORNO CORRENTE NEGLI ORARI ──
const giorni = ['domenica','lunedi','martedi','mercoledi','giovedi','venerdi','sabato'];
const oggi = giorni[new Date().getDay()];
document.querySelectorAll('.orari-table tr[data-giorno]').forEach(tr => {
  if (tr.dataset.giorno === oggi) tr.classList.add('oggi');
});

// ── ANIMAZIONE SCROLL (Intersection Observer) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-card, .luogo-card, .about-feat, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});