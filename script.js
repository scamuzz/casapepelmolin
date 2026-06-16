document.addEventListener('DOMContentLoaded', function() {

  // ── NAVBAR TOGGLE (mobile) ──
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Chiudi menu quando si clicca un link
    navLinks.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });

    // Chiudi menu quando si clicca fuori
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  // ── NAVBAR SCROLL SHADOW ──
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 40 ? '0 4px 20px rgba(0,0,0,0.3)' : 'none';
    }
    const scrolltop = document.getElementById('scrolltop');
    if (scrolltop) {
      scrolltop.classList.toggle('visible', window.scrollY > 400);
    }
  });

  // ── SCROLL TO TOP ──
  const scrolltop = document.getElementById('scrolltop');
  if (scrolltop) {
    scrolltop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── LIGHTBOX ──
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(function(item) {
      item.addEventListener('click', function() {
        lightbox.classList.add('active');
      });
    });
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
      });
    }
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') lightbox.classList.remove('active');
    });
  }

  // ── EVIDENZIA GIORNO CORRENTE NEGLI ORARI ──
  const giorni = ['domenica','lunedi','martedi','mercoledi','giovedi','venerdi','sabato'];
  const oggi = giorni[new Date().getDay()];
  document.querySelectorAll('.orari-table tr[data-giorno]').forEach(function(tr) {
    if (tr.dataset.giorno === oggi) tr.classList.add('oggi');
  });

  // ── ANIMAZIONE SCROLL (Intersection Observer) ──
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.menu-card, .luogo-card, .about-feat, .gallery-item').forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

});