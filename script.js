document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("teamGrid");
  const searchInput = document.getElementById("search");
  const deptSelect = document.getElementById("departmentFilter");
  const summary = document.getElementById("summary");

  let team = [];

  function renderTeam(list) {
    if (!grid) return;
    grid.innerHTML = "";
    if (!list.length) {
      const empty = document.createElement("p");
      empty.textContent = "No team members match your search.";
      empty.style.color = "#64748b";
      grid.appendChild(empty);
      return;
    }
    list.forEach((member) => {
      const card = document.createElement("article");
      card.className = "team-card";
      const initials = member.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
      card.innerHTML = `
        <div class="avatar">${initials}</div>
        <div class="info">
          <p class="name">${member.name}</p>
          <p class="role">${member.role}</p>
        </div>
        <div class="meta">
          <span class="pill">${member.department}</span>
          <span>${member.location}</span>
          <span>${member.email}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function updateSummary(filteredCount) {
    if (!summary) return;
    const total = team.length;
    if (!total) {
      summary.textContent = "No team data loaded.";
      return;
    }
    if (filteredCount === total) {
      summary.textContent = `Showing all ${total} team members.`;
    } else {
      summary.textContent = `Showing ${filteredCount} of ${total} team members.`;
    }
  }

  function applyFilters() {
    const term = (searchInput?.value || "").toLowerCase().trim();
    const dept = deptSelect?.value || "all";
    const filtered = team.filter((m) => {
      const inDept = dept === "all" || m.department === dept;
      const haystack = `${m.name} ${m.role} ${m.location}`.toLowerCase();
      const matches = !term || haystack.includes(term);
      return inDept && matches;
    });
    renderTeam(filtered);
    updateSummary(filtered.length);
  }

  function populateDepartments() {
    if (!deptSelect) return;
    const depts = Array.from(new Set(team.map((m) => m.department))).sort();
    depts.forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      deptSelect.appendChild(opt);
    });
  }

  fetch("team.json")
    .then((res) => res.json())
    .then((data) => {
      team = Array.isArray(data) ? data : [];
      populateDepartments();
      applyFilters();
    })
    .catch(() => {
      if (summary) {
        summary.textContent = "Failed to load team.json. Make sure you are running over HTTP (not using the file:// protocol).";
      }
    });

  searchInput?.addEventListener("input", () => applyFilters());
  deptSelect?.addEventListener("change", () => applyFilters());
});


