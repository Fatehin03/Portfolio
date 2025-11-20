// Scroll-trigger animations
const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-pop, .animate-tag');

function checkAnimations() {
  const triggerBottom = window.innerHeight * 0.85;

  animatedElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.style.animationPlayState = 'running';
    }
  });
}

window.addEventListener('scroll', checkAnimations);
checkAnimations(); // Trigger on load

// (Keep your previous cursor, progress bar, typewriter, counter, and particle scripts here)
