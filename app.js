document.addEventListener("DOMContentLoaded", () => {
  // Task 5: pricing cards on-scroll reveal
  const pricingCards = document.querySelectorAll(".price-card.reveal");
  if (pricingCards.length) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = !prefersReduced && "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 })
      : null;

    pricingCards.forEach((card, idx) => {
      if (observer) {
        card.style.animationDelay = `${idx * 120}ms`;
        observer.observe(card);
      } else {
        card.classList.add("in-view");
      }
    });
  }
});

