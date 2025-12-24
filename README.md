## Landing Page & Performance Walkthrough

This repo contains a single-page landing experience with 5–6 sections: sticky navbar, hero, solutions grid, slider, metrics, testimonials, FAQ accordion, CTA, and footer. Interactivity for the slider (auto-rotate + manual controls) and accordion is in `app.js`; all layout/theme styles are in `styles.css`.

### How to run locally
- Install a simple static server if needed: `npm install -g http-server` (or use `npx http-server`).
- Start the site: `npx http-server -p 4173 .`
- Open `http://localhost:4173` in the browser.

### Baseline performance capture (before optimization)
Use any of: Chrome Lighthouse (DevTools > Lighthouse), GTmetrix, or Pingdom.
1) Ensure the server is running (`http://localhost:4173`).
2) Run Lighthouse in a non-headless Chrome tab (headless in this environment hit a Chrome interstitial).
3) Save the report as HTML or JSON and take a screenshot of the scores.

Place your artifacts:
- `reports/baseline-lighthouse.html` (or `.json`)
- `screenshots/baseline.png`

### Optimization ideas applied/planned
- Lean, single-request page (no external JS bundles; only one CSS file).
- Efficient gradients instead of heavy images; minimal DOM depth.
- Preconnect to Google Fonts and use a single font family.
- Controlled animations/transitions to keep layout stable.

If you add further optimizations (e.g., font-display swap, inline critical CSS, image compression), re-run the same measurement and save:
- `reports/optimized-lighthouse.html` (or `.json`)
- `screenshots/optimized.png`

### FAQ: If Cursor refuses or edits wrong files
- Re-select the intended file/tab and restate the path + nearby code snippet.
- Scope by selecting the exact lines to change, then re-issue the edit.
- If it touched the wrong file, undo those edits, then re-run with explicit path.

### What to capture for the final submission
- A short screen recording or screenshots showing: running the page, pre-optimization metrics, applied optimizations, and post-optimization metrics.
- Add the screenshot paths above, then commit and push to the `final_assesmennt_v1` branch.

### Repo
Upstream repo: https://github.com/Manmohan2526/cursor_assignment_v2

