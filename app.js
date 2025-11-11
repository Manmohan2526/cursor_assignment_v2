document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("emailInput");
  const rules = {
    nonEmpty: document.querySelector('[data-rule="nonEmpty"]'),
    noSpaces: document.querySelector('[data-rule="noSpaces"]'),
    oneAt: document.querySelector('[data-rule="oneAt"]'),
    localValid: document.querySelector('[data-rule="localValid"]'),
    domainValid: document.querySelector('[data-rule="domainValid"]'),
    tldValid: document.querySelector('[data-rule="tldValid"]'),
  };
  const bdLocal = document.getElementById("bdLocal");
  const bdAt = document.getElementById("bdAt");
  const bdDomain = document.getElementById("bdDomain");
  const bdTld = document.getElementById("bdTld");
  const finalStatus = document.getElementById("finalStatus");

  function setState(el, ok) {
    if (!el) return;
    el.classList.remove("pass", "fail");
    el.classList.add(ok ? "pass" : "fail");
  }

  function analyzeEmail(raw) {
    const value = (raw || "").trim();
    const result = {
      nonEmpty: value.length > 0,
      noSpaces: !/\s/.test(value),
      oneAt: (value.match(/@/g) || []).length === 1,
      localValid: false,
      domainValid: false,
      tldValid: false,
      parts: { local: "", domain: "", tld: "" },
      ok: false,
    };
    if (!(result.nonEmpty && result.noSpaces && result.oneAt)) {
      return result;
    }
    const [local, domainFull] = value.split("@");
    result.parts.local = local || "";
    result.parts.domain = domainFull || "";

    // Local allowed characters (simplified, common set)
    const localOk = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) && local.length > 0;
    result.localValid = localOk;

    // Domain checks: labels split by dot, each label alnum or hyphen, not start/end with hyphen
    const labels = (domainFull || "").split(".");
    const hasTld = labels.length >= 2;
    const tld = hasTld ? labels[labels.length - 1] : "";
    result.parts.tld = tld;
    const domainLabelsOk =
      hasTld &&
      labels.every((label, idx) => {
        if (!label) return false;
        if (!/^[A-Za-z0-9-]+$/.test(label)) return false;
        if (label.startsWith("-") || label.endsWith("-")) return false;
        return true;
      });
    result.domainValid = domainLabelsOk;
    result.tldValid = /^[A-Za-z]{2,24}$/.test(tld);

    // Final regex pass as last gate
    const regexOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    result.ok = result.nonEmpty && result.noSpaces && result.oneAt && result.localValid && result.domainValid && result.tldValid && regexOk;
    return result;
  }

  function render(value) {
    const r = analyzeEmail(value);
    setState(rules.nonEmpty, r.nonEmpty);
    setState(rules.noSpaces, r.noSpaces);
    setState(rules.oneAt, r.oneAt);
    setState(rules.localValid, r.localValid);
    setState(rules.domainValid, r.domainValid);
    setState(rules.tldValid, r.tldValid);

    if (bdLocal) bdLocal.textContent = r.parts.local || "—";
    if (bdAt) bdAt.textContent = r.oneAt ? "@" : "—";
    if (bdDomain) bdDomain.textContent = r.parts.domain || "—";
    if (bdTld) bdTld.textContent = r.parts.tld || "—";

    if (finalStatus) {
      finalStatus.textContent = r.ok ? "Valid email ✓" : "Invalid email";
      finalStatus.classList.toggle("ok", r.ok);
      finalStatus.classList.toggle("bad", !r.ok);
    }
  }

  input?.addEventListener("input", (e) => {
    render(e.target.value);
  });
  // Initial render
  if (input instanceof HTMLInputElement) render(input.value);
});

