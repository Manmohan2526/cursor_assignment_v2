## Cursor Assignment V2 — Task 6

### What was built
- Real-time email validation visualizer that shows:
  - Rule-by-rule checklist (non-empty, no spaces, one @, valid local, valid domain, valid TLD).
  - Live breakdown of local, @, domain, and TLD parts.
  - Final status banner that flips between Valid/Invalid.

### Files
- `index.html`: Visualizer UI (input, rules, breakdown, regex view).
+- `style.css`: Panels, checklist dots (pass/fail), breakdown, status styles.
+- `app.js`: Real-time parsing and validation with UI updates.

### Preview
![Task 6 Preview](./task_6_preview.png)

### How to run
1. Open `index.html` in a browser/IDE preview.
2. Type an email like `john.doe+news@example.co.uk` to watch each rule update.
3. The final banner will indicate whether the email is considered valid.
## Cursor Assignment V2 — Task 5

### What was built
- Three-column pricing table with hover transitions.
- Mobile “stacked deck” effect: cards overlap and unstack on scroll.
- Staggered on-scroll reveal using IntersectionObserver.

### Files
- `index.html`: Pricing section with Starter, Pro, and Enterprise cards.
- `style.css`: Responsive grid, stacked mobile animation, hover styles.
- `app.js`: On-scroll staggered reveal logic.

### Preview
![Task 5 Preview](./task_5_preview.png)

### How to run
1. Open `index.html`.
2. On desktop, see 3 columns; on mobile, cards stack and reveal on scroll.
3. Hover a card to see lift and shadow transition.

