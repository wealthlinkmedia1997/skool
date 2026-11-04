/* ============================================================
   WealthLink Media – Skool landing site config
   Everything you will likely need to change lives in this file.
   ============================================================ */
window.SITE_CONFIG = {
  /* ---- Lead capture (primary page form) ---------------------
     Paste the GoHighLevel inbound-webhook URL here.
     While this is empty ("") the form skips the POST and just
     redirects to the secondary page.                           */
  LEAD_WEBHOOK_URL: "",
  LEAD_SOURCE: "skool-lp-primary",     // sent as "source" in the payload
  NEXT_PAGE: "main.html",              // where the form sends people after submit

  /* ---- Secondary page buttons ------------------------------- */
  GHL_URL: "https://www.gohighlevel.com/?fp_ref=tegicsystems",  // button 1
  WHOP_URL: "https://whop.com/checkout/ch_pkWE0RMULDRdLfG/",  // $250/mo for people already on HighLevel
  SUPPORT_URL: "support.html",        // "Need help getting your bonuses?" button

  /* ---- Tracking placeholders (blank = off) ------------------ */
  META_PIXEL_ID: "",
  GA_MEASUREMENT_ID: "",               // e.g. G-XXXXXXXXXX
  GTM_ID: "",                          // e.g. GTM-XXXXXXX
  TIKTOK_PIXEL_ID: "",

  /* ---- Contact (privacy / terms / help button) -------------- */
  CONTACT_EMAIL: "support@wealthlinkmedia.com",

  /* ---- Video reviews (index + main) -------------------------
     Left card is review 2. Right card is review 3.              */
  REVIEW_VIDEOS: [
    { name: "Client review 2", src: "assets/videos/review2.mp4", poster: "assets/review2-poster.jpg" },
    { name: "Client review 3", src: "assets/videos/review3.mp4", poster: "assets/review3-poster.jpg" }
  ]
};
