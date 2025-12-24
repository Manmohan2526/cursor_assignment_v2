// Basic slider + accordion interactions
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.querySelector('[data-direction="prev"]');
const nextBtn = document.querySelector('[data-direction="next"]');
let currentIndex = 0;
let autoRotate;

function setActiveSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function goTo(direction) {
  currentIndex = (currentIndex + direction + slides.length) % slides.length;
  setActiveSlide(currentIndex);
}

function startAutoRotate() {
  stopAutoRotate();
  autoRotate = setInterval(() => goTo(1), 4800);
}

function stopAutoRotate() {
  if (autoRotate) clearInterval(autoRotate);
}

prevBtn?.addEventListener('click', () => {
  goTo(-1);
  startAutoRotate();
});

nextBtn?.addEventListener('click', () => {
  goTo(1);
  startAutoRotate();
});

slides.forEach((slide) => {
  slide.addEventListener('mouseenter', stopAutoRotate);
  slide.addEventListener('mouseleave', startAutoRotate);
});

setActiveSlide(currentIndex);
startAutoRotate();

// Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
  const header = item.querySelector('.accordion-header');
  header?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    accordionItems.forEach((it) => it.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
