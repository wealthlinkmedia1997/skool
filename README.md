# WealthLink Media – Skool community landing site

Static one-page funnel (no build step).

| File | Purpose |
|---|---|
| `index.html` | Offer page. Popup collects name, email, and phone, POSTs to the lead webhook, then sends people to `GHL_URL`. The $250 button uses `WHOP_URL`. |
| `privacy.html`, `terms.html` | Legal pages (linked in every footer) |
| `support.html` | Bonus troubleshooting (linked in every header and footer; `SUPPORT_URL`) |
| `js/config.js` | **All settings**: `LEAD_WEBHOOK_URL`, `WHOP_URL` ($250/mo checkout), `SUPPORT_URL`, `GHL_URL`, pixel IDs, contact email, video reviews |

## Swapping assets
- Client result screenshots: `assets/results/{melissa,bilal,kaden,adelina}.jpg` plus `.webp` (about 900px wide, native aspect ratios, shown uncropped, click to zoom). Order on the page: Melissa, Kaden, Bilal, Adelina. Desktop columns: left Melissa then Bilal, right Kaden then Adelina.
- Video reviews (`REVIEW_VIDEOS` in `js/config.js`, shown on `index.html`): left card is the original `assets/videos/review-1.mp4` with `assets/videos/review-1.jpg`; right card is `assets/videos/review3.mp4` with `assets/review3-poster.jpg`.
- Bonus visuals: `assets/bonus/*.svg` (replace with screenshots, keep the filename or edit `index.html`).
- Founder photo: `assets/andre.jpg` (about section on `index.html`).
- Logo: `assets/logo.webp` with `assets/logo.png` fallback. Favicon: `assets/favicon.png`.
