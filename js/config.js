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
  WHOP_URL: "#",                       // button 2 ("Already a HighLevel user? Upgrade...") + FAQ link – put the Whop $250 / upgrade link here
  SUPPORT_URL: "#",                    // "Need help getting your bonuses?" button

  /* ---- Tracking placeholders (blank = off) ------------------ */
  META_PIXEL_ID: "",
  GA_MEASUREMENT_ID: "",               // e.g. G-XXXXXXXXXX
  GTM_ID: "",                          // e.g. GTM-XXXXXXX
  TIKTOK_PIXEL_ID: "",

  /* ---- Contact (privacy / terms / help button) -------------- */
  CONTACT_EMAIL: "support@wealthlinkmedia.com",

  /* ---- Video reviews (secondary page) -----------------------
     Right now the same review is used twice. To add the second
     review: upload the files to assets/videos/ and change the
     second entry's src / poster / name.                         */
  REVIEW_VIDEOS: [
    { name: "Client review 1", src: "assets/videos/review-1.mp4", poster: "assets/videos/review-1.jpg" },
    { name: "Client review 2", src: "assets/videos/review-1.mp4", poster: "assets/videos/review-1.jpg" }
  ]
};
