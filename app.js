document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const wrapper = document.getElementById("interactiveForm");
  const btnShine = document.querySelector(".btn-shine");

  function setError(name, message) {
    const err = document.querySelector(`.error[data-for="${name}"]`);
    if (err) err.textContent = message || "";
  }
  function validateEmail(value) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
  }

  // Real-time validation
  form?.addEventListener("input", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    const { id, value } = target;
    if (id === "name") {
      setError("name", value.trim().length >= 2 ? "" : "Please enter your full name.");
    }
    if (id === "email") {
      setError("email", validateEmail(value) ? "" : "Please enter a valid email.");
    }
    if (id === "password") {
      setError("password", value.length >= 8 ? "" : "Password must be at least 8 characters.");
      const confirm = document.getElementById("confirm");
      if (confirm instanceof HTMLInputElement) {
        setError("confirm", confirm.value && confirm.value === value ? "" : "Passwords must match.");
      }
    }
    if (id === "confirm") {
      const password = document.getElementById("password");
      if (password instanceof HTMLInputElement) {
        setError("confirm", value === password.value ? "" : "Passwords must match.");
      }
    }
  });

  // Submit validation
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    let valid = true;
    if (name instanceof HTMLInputElement) {
      if (name.value.trim().length < 2) { setError("name", "Please enter your full name."); valid = false; }
    }
    if (email instanceof HTMLInputElement) {
      if (!validateEmail(email.value)) { setError("email", "Please enter a valid email."); valid = false; }
    }
    if (password instanceof HTMLInputElement) {
      if (password.value.length < 8) { setError("password", "Password must be at least 8 characters."); valid = false; }
    }
    if (confirm instanceof HTMLInputElement && password instanceof HTMLInputElement) {
      if (confirm.value !== password.value) { setError("confirm", "Passwords must match."); valid = false; }
    }
    if (valid) {
      alert("Registration successful!");
      form.reset();
      ["name","email","password","confirm"].forEach((n) => setError(n, ""));
    }
  });

  // Interactive hover: tilt and gradient follow mouse
  function updateMouseVars(ev) {
    const rect = wrapper?.getBoundingClientRect();
    if (!rect || !wrapper) return;
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    wrapper.style.setProperty("--mx", `${Math.round(px * 100)}%`);
    wrapper.style.setProperty("--my", `${Math.round(py * 100)}%`);
    // tilt based on direction from center
    const ry = (px - 0.5) * 6; // rotateY
    const rx = (0.5 - py) * 6; // rotateX
    wrapper.style.setProperty("--ry", `${ry}deg`);
    wrapper.style.setProperty("--rx", `${rx}deg`);
    // button shine
    btnShine?.style.setProperty("--bx", `${Math.round(px * 100)}%`);
  }
  wrapper?.addEventListener("mousemove", updateMouseVars);
  wrapper?.addEventListener("mouseleave", () => {
    if (!wrapper) return;
    wrapper.style.setProperty("--mx", `50%`);
    wrapper.style.setProperty("--my", `50%`);
    wrapper.style.setProperty("--ry", `0deg`);
    wrapper.style.setProperty("--rx", `0deg`);
    btnShine?.style.setProperty("--bx", `50%`);
  });
});

