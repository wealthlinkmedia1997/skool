(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Tracking (all optional, driven by config) ---------- */
  function loadScript(src) { var s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); }
  if (C.META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", C.META_PIXEL_ID); fbq("track", "PageView");
  }
  if (C.GA_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", C.GA_MEASUREMENT_ID);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.GA_MEASUREMENT_ID));
  }
  if (C.GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    loadScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(C.GTM_ID));
  }
  if (C.TIKTOK_PIXEL_ID) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify"]; ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat([].slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (e) { var n = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); loadScript(n + "?sdkid=" + e + "&lib=" + t); };
      ttq.load(C.TIKTOK_PIXEL_ID); ttq.page();
    }(window, document, "ttq");
  }

  /* ---------- Config-driven links / text ---------- */
  $$("[data-cta='ghl']").forEach(function (a) {
    if (C.GHL_URL) {
      a.href = C.GHL_URL;
      if (a.hasAttribute("data-show-url")) a.textContent = C.GHL_URL;
    }
  });
  $$("[data-cta='whop']").forEach(function (a) { a.href = C.WHOP_URL || "#"; });
  $$("[data-cta='support']").forEach(function (a) { a.href = C.SUPPORT_URL || "support.html"; });
  $$("[data-contact]").forEach(function (a) {
    if (a.tagName === "A") {
      a.href = "mailto:" + C.CONTACT_EMAIL;
      if (a.hasAttribute("data-show-email")) a.textContent = C.CONTACT_EMAIL;
    } else a.textContent = C.CONTACT_EMAIL;
  });
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      if (!el || !navigator.clipboard) return;
      var label = btn.textContent;
      navigator.clipboard.writeText(el.innerText.trim()).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = label; }, 1600);
      }, function () {});
    });
  });
  $$(".js-year").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- Video reviews + lightbox (secondary page) ---------- */
  var grid = $("#video-grid");
  var vModal = $("#video-modal");
  if (grid && vModal) {
    (C.REVIEW_VIDEOS || []).forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "vthumb"; b.setAttribute("aria-label", "Play " + v.name);
      b.innerHTML = '<img loading="lazy" alt="' + v.name + '" src="' + v.poster + '"><span class="vplay"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>';
      b.addEventListener("click", function () { openVideo(v); });
      grid.appendChild(b);
    });
    var player = $("video", vModal);
    var openVideo = function (v) {
      player.src = v.src; player.poster = v.poster;
      vModal.classList.add("open"); document.body.classList.add("noscroll");
      var p = player.play(); if (p && p.catch) p.catch(function () {});
    };
    var closeVideo = function () {
      player.pause(); player.removeAttribute("src"); player.load();
      vModal.classList.remove("open"); document.body.classList.remove("noscroll");
    };
    $$("[data-close-video]", vModal).forEach(function (e) { e.addEventListener("click", closeVideo); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeVideo(); });
  }

  /* ---------- Click-to-zoom for result screenshots ---------- */
  var iModal = $("#img-modal");
  if (iModal) {
    var big = $("img", iModal);
    var closeImg = function () { iModal.classList.remove("open"); document.body.classList.remove("noscroll"); big.removeAttribute("src"); };
    $$("img.zoomable").forEach(function (im) {
      im.addEventListener("click", function () {
        big.src = im.currentSrc || im.src; big.alt = im.alt;
        iModal.classList.add("open"); document.body.classList.add("noscroll");
        var sc = $(".img-scroll", iModal); if (sc) sc.scrollTop = 0;
      });
    });
    iModal.addEventListener("click", function (e) { if (e.target !== big) closeImg(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeImg(); });
  }

  /* ---------- Lead form (primary page) ---------- */
  var fModal = $("#lead-modal");
  var form = $("#lead-form");
  if (fModal && form) {
    var pendingDest = "";
    var pendingLabel = "";
    var openForm = function (dest, label) {
      pendingDest = dest || "";
      pendingLabel = label || "";
      fModal.classList.add("open"); document.body.classList.add("noscroll");
      setTimeout(function () { var n = $("#lf-name"); if (n) n.focus(); }, 60);
    };
    var closeForm = function () { fModal.classList.remove("open"); document.body.classList.remove("noscroll"); };
    $$("a.btn").forEach(function (a) {
      if (fModal.contains(a)) return;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        openForm(a.href, (a.innerText || "").replace(/\s+/g, " ").trim());
      });
    });
    $$("[data-close-form]", fModal).forEach(function (b) { b.addEventListener("click", closeForm); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && fModal.classList.contains("open")) closeForm(); });

    var submitted = false;   // double-submit guard: ONE post per page load / submit
    var errBox = $("#lf-error"), btn = $("#lf-submit");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitted) return;
      var name = $("#lf-name").value.trim(), email = $("#lf-email").value.trim(), phone = $("#lf-phone").value.trim();
      var phoneDigits = phone.replace(/\D/g, "");
      errBox.textContent = "";
      if (name.length < 2) { errBox.textContent = "Please enter your name."; $("#lf-name").focus(); return; }
      if (!emailRe.test(email)) { errBox.textContent = "Please enter a valid email address."; $("#lf-email").focus(); return; }
      if (phoneDigits.length < 7) { errBox.textContent = "Please enter your phone number."; $("#lf-phone").focus(); return; }

      submitted = true; btn.disabled = true; btn.textContent = "Sending…";

      var q = new URLSearchParams(window.location.search);
      var payload = {
        name: name,
        firstName: name.split(/\s+/)[0],
        lastName: name.split(/\s+/).slice(1).join(" "),
        email: email,
        phone: phone,
        tags: ["GHL Free Path"],
        tag: "GHL Free Path",
        clicked_button: pendingLabel,
        destination: pendingDest,
        source: C.LEAD_SOURCE || "skool-lp",
        pageUrl: window.location.href,
        utm_source: q.get("utm_source") || "",
        utm_medium: q.get("utm_medium") || "",
        utm_campaign: q.get("utm_campaign") || "",
        utm_term: q.get("utm_term") || "",
        utm_content: q.get("utm_content") || ""
      };

      if (window.fbq) try { fbq("track", "Lead"); } catch (x) {}
      if (window.gtag) try { gtag("event", "generate_lead"); } catch (x) {}
      if (window.ttq) try { ttq.track("SubmitForm"); } catch (x) {}

      var dest = pendingDest || C.GHL_URL || "https://www.gohighlevel.com/?fp_ref=tegicsystems";
      if (C.LEAD_WEBHOOK_URL) {
        try {
          fetch(C.LEAD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true
          }).catch(function () {});
        } catch (x) {}
      }
      window.location.href = dest;
    });
  }
})();
