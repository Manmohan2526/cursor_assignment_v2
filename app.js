document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const closeBtn = document.querySelector(".nav-close");

  function setRevealOriginFromToggle() {
    if (!toggle || !nav) return;
    const rect = toggle.getBoundingClientRect();
    const cx = Math.round(rect.left + rect.width / 2);
    const cy = Math.round(rect.top + rect.height / 2);
    nav.style.setProperty("--cx", cx + "px");
    nav.style.setProperty("--cy", cy + "px");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      setRevealOriginFromToggle();
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  if (closeBtn && nav) {
    closeBtn.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle && toggle.setAttribute("aria-expanded", "false");
    });
  }

  // Close on link click (mobile)
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        nav.classList.remove("open");
        toggle && toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
});

