/* ------------------------------
   Custom Cursor
--------------------------------*/
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', e => {
  const { clientX, clientY } = e;
  // Cursor
  cursor.style.left = clientX + 'px';
  cursor.style.top = clientY + 'px';
  // Cursor Dot
  cursorDot.style.left = clientX + 'px';
  cursorDot.style.top = clientY + 'px';
});


/* ------------------------------
   Scroll Progress Bar
--------------------------------*/
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  // Calculate document height, accounting for the body/html scroll offset
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
    // Ensure cursor is removed after typing completes
    typewriter.innerHTML = typeText; 
  }
}
typeEffect();


/* ------------------------------
   Animated Number Counter
--------------------------------*/
function animateCounter(id, target) {
  let current = 0;
  // Aim for a 2-second animation duration (60 frames/sec * 2 sec = 120 increments)
  const duration = 120; 
  const increment = target / duration;
  const element = document.getElementById(id);

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16); // ~60fps interval
}

// Ensure these match the content/focus areas (Projects, Skills, Research)
animateCounter('stat-projects', 15); 
animateCounter('stat-skills', 25);
animateCounter('stat-research', 10);


/* ------------------------------
   Smooth Scroll
--------------------------------*/
// Removed active class logic here, as it's now handled by the Intersection Observer.
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}


/* ------------------------------
   NEW FEATURE 1: Intersection Observer for Active Nav State
--------------------------------*/
const sections = document.querySelectorAll('section');
const navButtons = document.querySelectorAll('.nav-btn');

const observerOptions = {
  root: null, // relative to the viewport
  rootMargin: '0px',
  threshold: 0.6 // highlight when 60% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const sectionId = entry.target.id;
    const navButton = document.querySelector(`button[onclick*='${sectionId}']`);

    if (entry.isIntersecting) {
      // Deactivate all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Activate the current section's button
      if (navButton) {
        navButton.classList.add('active');
      }
    }
  });
}, observerOptions);

// Start observing all sections
sections.forEach(section => {
  sectionObserver.observe(section);
});


/* ------------------------------
   NEW FEATURE 2: Interactive 3D Card Tilt Effect (Now includes .social-card)
--------------------------------*/

const tiltCards = document.querySelectorAll(
  '.hero-card, .stat-card, .project-card, .skill-card, .social-card' // <-- .social-card added here
);

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    // Calculate center point
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    
    // Calculate mouse position relative to center (-1 to 1)
    const x = (e.clientX - centerX) / cardRect.width;
    const y = (e.clientY - centerY) / cardRect.height;
    
    // Define maximum rotation angles
    const maxRotate = 8; 
    
    // Apply rotation (Y rotation depends on X position, X rotation depends on Y position)
    const rotateY = maxRotate * x;
    const rotateX = -maxRotate * y; // Inverted Y rotation for natural feel

    card.style.transform = `perspective(1000px) 
                            translateZ(10px) 
                            rotateX(${rotateX}deg) 
                            rotateY(${rotateY}deg)`;
    
    // Add a light gradient/highlight based on mouse position
    card.style.background = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, 
                             rgba(255, 255, 255, 0.1), 
                             rgba(255, 255, 255, 0.05) 50%, 
                             rgba(255, 255, 255, 0.0) 100%)`;
  });

  card.addEventListener('mouseleave', () => {
    // Reset transform smoothly
    card.style.transform = `perspective(1000px) translateZ(0) rotateX(0deg) rotateY(0deg)`;
    // Reset background to the default CSS defined gradient
    card.style.background = '';
  });
});


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
    // Set hue around purple/pink spectrum for consistency
    this.hue = Math.random() * 60 + 260; 
  }

  update() {
    this.x += this.speedX * 0.5; // Slowed down movement
    this.y += this.speedY * 0.5;

    // Wrap screen
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
    ctx.shadowBlur = 10; // Slightly reduced blur
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
  // Use a slight opacity background to create subtle trails
  ctx.fillStyle = 'rgba(11, 15, 26, 0.05)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height); 
  
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

// Initial call and listener retained
window.addEventListener('scroll', triggerAnimations);
triggerAnimations();
