/* ---------- THEME TOGGLE ---------- */
const toggle = document.getElementById('theme-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  toggle.querySelector('i').classList.toggle('fa-moon', isDark);
  toggle.querySelector('i').classList.toggle('fa-sun', !isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

/* restore preference */
const saved = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', saved);
toggle.querySelector('i').className = saved === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

/* ---------- MOBILE NAV ---------- */
const navToggle = document.querySelector('.nav__toggle');
const navbar = document.querySelector('.navbar');

navToggle.addEventListener('click', () => navbar.classList.toggle('open'));
navbar.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navbar.classList.remove('open'))
);

/* ---------- PARTICLE CANVAS (bigger stars) ---------- */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.2 + 1;   // bigger
    this.speedX = Math.random() * 0.4 - 0.2;
    this.speedY = Math.random() * 0.4 - 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--primary').trim();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 90; i++) particles.push(new Particle()); // more particles
}
init();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---------- SCROLL REVEAL ---------- */
ScrollReveal().reveal('.home__content, .about__content, .contact__info', {
  origin: 'left',
  distance: '60px',
  duration: 1200,
  delay: 200
});
ScrollReveal().reveal('.home__img, .contact__form', {
  origin: 'right',
  distance: '60px',
  duration: 1200,
  delay: 200
});
ScrollReveal().reveal('.education__card, .portfolio__card', {
  origin: 'bottom',
  distance: '40px',
  duration: 1000,
  interval: 150
});

/* ---------- TYPERWRITER + CARET HIDER ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const typed = new Typed('[data-typewriter]', {
    strings: ['Aalok Sharma'],
    typeSpeed: 90,
    backSpeed: 0,
    loop: false,
    showCursor: true,
    cursorChar: '|',
    onComplete: () => {
      setTimeout(() => {
        const cursor = document.querySelector('.typed-cursor');
        if (cursor) cursor.classList.add('hide');
      }, 600);
    }
  });
});


/* ---------- MAGNETIC BUTTONS ---------- */
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ---------- CURRENT YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();