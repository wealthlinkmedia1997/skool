# WealthLink Media – Skool community landing site

Static 2-page funnel (no build step).

| File | Purpose |
|---|---|
| `index.html` | Primary page – CTA opens a name + email form → POSTs to GHL webhook → redirects to `main.html` |
| `main.html` | Secondary page – button 1 = GoHighLevel link, button 2 = Whop $250 / upgrade link (`WHOP_URL`), support button = `SUPPORT_URL` |
| `privacy.html`, `terms.html` | Legal pages (linked in every footer) |
| `support.html` | Bonus troubleshooting (linked in every header and footer; `SUPPORT_URL`) |
| `js/config.js` | **All settings**: `LEAD_WEBHOOK_URL`, `WHOP_URL`, `SUPPORT_URL`, `GHL_URL`, pixel IDs, contact email, video reviews |

## Swapping assets
- Client result screenshots: `assets/results/{melissa,bilal,kaden,adelina}.jpg` plus `.webp` (about 900px wide, native aspect ratios, shown uncropped, click to zoom). Order on the page: Melissa, Kaden, Bilal, Adelina (desktop columns: Melissa+Bilal, Kaden+Adelina).
- Video review: `assets/videos/review-1.mp4` + `review-1.jpg`. Second review: add `review-2.mp4/.jpg` and edit the 2nd entry of `REVIEW_VIDEOS` in `js/config.js`.
- Bonus visuals: `assets/bonus/*.svg` (replace with screenshots, keep the filename or edit `main.html`).
- Founder photo: `assets/andre.jpg` (about section on `main.html`).
- Logo: `assets/logo.webp` with `assets/logo.png` fallback. Favicon: `assets/favicon.png`.
