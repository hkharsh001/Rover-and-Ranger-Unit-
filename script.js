// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Mobile nav toggle ===== */
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });
  // close nav when link clicked (mobile)
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('show'); toggle.setAttribute('aria-expanded','false');
  }));
}

/* ===== External links dropdown ===== */
const dropBtn = document.querySelector('.drop-btn');
const dropMenu = document.querySelector('.drop-menu');
if (dropBtn) {
  dropBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dropBtn.getAttribute('aria-expanded') === 'true';
    dropBtn.setAttribute('aria-expanded', String(!open));
    dropMenu.style.display = open ? 'none' : 'block';
  });
  // close on outside click
  document.addEventListener('click', (e) => {
    if (!dropMenu.contains(e.target) && e.target !== dropBtn) {
      dropMenu.style.display = 'none';
      dropBtn.setAttribute('aria-expanded','false');
    }
  });
}

/* ===== Fade-in on scroll ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
},{ threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== Slider (autoplay + swipe) ===== */
document.querySelectorAll('.slider').forEach((slider) => {
  const track = slider.querySelector('.slides');
  const slides = Array.from(track.children);
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let index = 0, startX = 0, currentX = 0, dragging = false;
  const interval = Number(slider.dataset.interval || 4500);
  const autoplay = slider.dataset.autoplay === 'true';
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };
  const nextSlide = () => go(index + 1);
  const prevSlide = () => go(index - 1);

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  // touch/swipe
  track.addEventListener('touchstart', (e) => { dragging = true; startX = e.touches[0].clientX; currentX = startX; }, {passive:true});
  track.addEventListener('touchmove', (e) => { if(!dragging) return; currentX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', () => {
    if(!dragging) return; dragging = false;
    const dx = currentX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? nextSlide() : prevSlide());
  });

  // autoplay
  let timer;
  const start = () => { if (autoplay) timer = setInterval(nextSlide, interval); };
  const stop  = () => { if (timer) clearInterval(timer); };
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  start();
});

/* ===== Lightbox for gallery grid ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
document.querySelectorAll('[data-lightbox]').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

/* ===== Contact form -> mailto ===== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const to = 'rrunit@nscbm.edu.in';
    const subject = encodeURIComponent('Joining Interest — Rover & Ranger Unit');
    const body = encodeURIComponent(
`Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Why join:
${data.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}  });
  document.addEventListener('click', (e) => {
    if (!dropMenu.contains(e.target) && e.target !== dropBtn) closeDropdown();
  });
}

/* ===== Fade-in on Scroll ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
},{ threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== Slider (autoplay + swipe) ===== */
document.querySelectorAll('.slider').forEach((slider) => {
  const track = slider.querySelector('.slides');
  const slides = Array.from(track.children);
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let index = 0, startX = 0, currentX = 0, dragging = false;
  const interval = Number(slider.dataset.interval || 4500);
  const autoplay = slider.dataset.autoplay === 'true';
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };
  const nextSlide = () => go(index + 1);
  const prevSlide = () => go(index - 1);

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  // Touch swipe
  track.addEventListener('touchstart', (e) => {
    dragging = true; startX = e.touches[0].clientX; currentX = startX;
  }, {passive:true});
  track.addEventListener('touchmove', (e) => {
    if (!dragging) return; currentX = e.touches[0].clientX;
  }, {passive:true});
  track.addEventListener('touchend', () => {
    if (!dragging) return; dragging = false;
    const dx = currentX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? nextSlide() : prevSlide());
  });

  // Autoplay (pause on hover for desktop)
  let timer;
  const start = () => { if (autoplay) timer = setInterval(nextSlide, interval); };
  const stop  = () => { if (timer) clearInterval(timer); };
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  start();
});

/* ===== Lightbox for Gallery Grid ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

/* ===== Contact Form -> mailto ===== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const to = 'rrunit@nscbm.edu.in'; // change to official unit email
    const subject = encodeURIComponent('Joining Interest — Rover & Ranger Unit');
    const body = encodeURIComponent(
`Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Why join:
${data.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
