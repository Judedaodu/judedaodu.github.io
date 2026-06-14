/* ================================================================
   JUDE DAODU — PORTFOLIO  |  js/main.js
   ================================================================ */
'use strict';

/* ── REFS ─────────────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const yearSpan  = document.getElementById('year');

/* ── YEAR ─────────────────────────────────────────────────────── */
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ── NAVBAR SCROLL SHADOW ─────────────────────────────────────── */
if (navbar) {
  const handleScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ── HAMBURGER ────────────────────────────────────────────────── */
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  const closeMenu = () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) closeMenu();
  });
}

/* ── SMOOTH SCROLL ────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target || !navbar) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 10;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ── SCROLL FADE-INS (IntersectionObserver) ───────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const fadeObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => fadeObserver.observe(el));
}

/* ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

if (sections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAnchors.forEach(a => {
          const match = a.getAttribute('href') === `#${id}` || a.getAttribute('href')?.endsWith(`#${id}`);
          a.classList.toggle('active', match);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ── SKILL PILL TOGGLE ────────────────────────────────────────── */
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});

/* ── CARD TILT (subtle 3-D on hover) ─────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s';
  });
});

/* ── HERO GREETING TYPEWRITER ─────────────────────────────────── */
const greetingEl = document.querySelector('.hero-greeting');
if (greetingEl) {
  const text = greetingEl.textContent;
  greetingEl.textContent = '';
  greetingEl.style.opacity = '1';
  greetingEl.style.animation = 'none';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      greetingEl.textContent += text[i++];
      setTimeout(type, 45);
    }
  };
  setTimeout(type, 400);
}
