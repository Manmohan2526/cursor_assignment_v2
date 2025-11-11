document.addEventListener("DOMContentLoaded", () => {
  // On-load and on-scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Immediately animate items in viewport at load
  function animateInitial() {
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH * 0.9) {
        el.classList.add("in-view");
      }
    });
  }

  if (!prefersReduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // If we only want to animate once, unobserve
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    reveals.forEach((el, idx) => {
      // Optional stagger effect
      el.style.transitionDelay = `${(idx % 6) * 40}ms`;
      observer.observe(el);
    });

    animateInitial();
  } else {
    // Fallback: show all without animation
    reveals.forEach((el) => el.classList.add("in-view"));
  }
});

