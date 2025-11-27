/* ------------------------------
   Custom Cursor
--------------------------------*/
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', e => {
  const { clientX, clientY } = e;
  cursor.style.left = clientX + 'px';
  cursor.style.top = clientY + 'px';
  cursorDot.style.left = clientX + 'px';
  cursorDot.style.top = clientY + 'px';
});


/* ------------------------------
   Scroll Progress Bar
--------------------------------*/
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector('.progress-bar').style.width =
    scrollPercent + '%';
});


/* ------------------------------
   Typewriter Effect
--------------------------------*/
const typewriter = document.getElementById('typewriter');
const typeText = "Fatehin Alam";
let typeIndex = 0;

function typeEffect() {
  if (typeIndex < typeText.length) {
    typewriter.innerHTML =
      typeText.slice(0, typeIndex + 1) +
      '<span class="typing-cursor">|</span>';
    typeIndex++;
    setTimeout(typeEffect, 150);
  } else {
    typewriter.innerHTML = typeText;
  }
}
typeEffect();


/* ------------------------------
   Animated Number Counter
--------------------------------*/
function animateCounter(id, target) {
  let current = 0;
  const increment = target / 60;
  const element = document.getElementById(id);

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 30);
}

animateCounter('stat-projects', 15);
animateCounter('stat-skills', 25);
animateCounter('stat-research', 10);


/* ------------------------------
   Smooth Scroll + Active Nav
--------------------------------*/
function scrollToSection(id, event) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });

  document.querySelectorAll('.nav-btn').forEach(btn =>
    btn.classList.remove('active')
  );

  if (event?.target) event.target.classList.add('active');
}


/* ------------------------------
   Particle System Background
--------------------------------*/
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.hue = Math.random() * 60 + 260;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap screen
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsla(${this.hue}, 70%, 60%, 0.8)`;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


/* ------------------------------
   Scroll-Triggered Animations
--------------------------------*/
const animatedElements = document.querySelectorAll(
  '.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-pop, .animate-tag'
);

function triggerAnimations() {
  const triggerBottom = window.innerHeight * 0.85;

  animatedElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.style.animationPlayState = 'running';
  });
}

window.addEventListener('scroll', triggerAnimations);
triggerAnimations();
