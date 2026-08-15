// ============ MENU MOBILE ============
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ RÉVÉLATION AU SCROLL ============
const revealTargets = document.querySelectorAll(
  '.about-inner, .services-grid, .destinations-grid, .testimonial-track, .contact-inner, .section-head'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ============ BOARDING PASS — léger effet parallax au survol ============
const boardingPass = document.getElementById('boarding-pass');
if (boardingPass && window.matchMedia('(hover: hover)').matches) {
  boardingPass.addEventListener('mousemove', (e) => {
    const rect = boardingPass.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    boardingPass.style.transform = 'rotate(${x * 3}deg) translateY(-4px);'
  });
  boardingPass.addEventListener('mouseleave', () => {
    boardingPass.style.transform = '';
  });
}

// ============ VALIDATION FORMULAIRE DE CONTACT ============
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

function setError(fieldId, message) {
  const errorEl = document.getElementById('error-${fieldId}');
  if (errorEl) errorEl.textContent = message;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  setError('name', '');
  setError('email', '');
  setError('message', '');

  if (name.length < 2) {
    setError('name', 'Merci d\'indiquer votre nom.');
    valid = false;
  }
  if (!isValidEmail(email)) {
    setError('email', 'Merci d\'indiquer un email valide.');
    valid = false;
  }
  if (message.length < 10) {
    setError('message', 'Dites-m\'en un peu plus sur votre projet (10 caractères min).');
    valid = false;
  }

  if (valid) {
    successMsg.hidden = false;
    form.reset();
    setTimeout(() => { successMsg.hidden = true; }, 6000);
  }
});