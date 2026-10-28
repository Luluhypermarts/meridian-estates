/* ============================================================
   Meridian Estates — app
   state → filters → render → modal → saves → theme → nav
   ============================================================ */

(() => {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const money = (n) => n.toLocaleString("en-US");

  /* ── state ─────────────────────────────────────────────── */
  const state = {
    deal: "",        // "" | "sale" | "rent"
    type: "",        // "" | villa | apartment | penthouse | townhouse
    location: "",
    budget: "",
    sort: "featured",
    onlySaved: false,
    saved: new Set(JSON.parse(localStorage.getItem("me_saved") || "[]"))
  };

  /* ── icons ─────────────────────────────────────────────── */
  const ico = {
    bed:  `<svg viewBox="0 0 24 24"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M6 10V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3"/></svg>`,
    bath: `<svg viewBox="0 0 24 24"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM7 12V6.5A2.5 2.5 0 0 1 9.5 4c1.2 0 2 .7 2.4 1.6M8 19l-1 2M17 19l1 2"/></svg>`,
    area: `<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6"/></svg>`,
    pin:  `<svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
    arrow:`<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    heart:`<svg viewBox="0 0 24 24"><path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6C20.5 15 12 20.5 12 20.5z"/></svg>`
  };

  /* ── helpers ───────────────────────────────────────────── */
  const priceLabel = (l) =>
    l.deal === "rent"
      ? `AED ${money(l.price)} <span>/ year</span>`
      : `AED ${money(l.price)}`;

  const agentFor = (l) => {
    const i = LISTINGS.findIndex((x) => x.id === l.id);
    return AGENTS[i % AGENTS.length];
  };

  const isSaved = (id) => state.saved.has(id);

  function persistSaved() {
    localStorage.setItem("me_saved", JSON.stringify([...state.saved]));
    const n = state.saved.size;
    const badge = $("#savedCount");
    badge.textContent = n;
    badge.hidden = n === 0;
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 2600);
  }

  /* ── filtering + sorting ───────────────────────────────── */
  function filtered() {
    let out = LISTINGS.slice();

    if (state.onlySaved) out = out.filter((l) => isSaved(l.id));
    if (state.deal) out = out.filter((l) => l.deal === state.deal);
    if (state.type) out = out.filter((l) => l.type === state.type);
    if (state.location) out = out.filter((l) => l.area === state.location);

    if (state.budget) {
      const cap = Number(state.budget);
      out = cap <= 500000
        ? out.filter((l) => l.deal === "rent" && l.price <= cap)
        : out.filter((l) => l.deal === "sale" && l.price <= cap);
    }

    const by = {
      featured:  (a, b) => (b.featured - a.featured) || (b.price - a.price),
      "price-asc":  (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "size-desc":  (a, b) => b.sqft - a.sqft
    }[state.sort] || (() => 0);

    return out.sort(by);
  }

  /* ── render cards ──────────────────────────────────────── */
  function cardHTML(l, i) {
    const badgeClass =
      l.badge === "Exclusive" ? "b-exclusive" :
      l.badge === "New" ? "b-new" : "";

    return `
      <article class="card" style="animation-delay:${Math.min(i * 45, 320)}ms" data-id="${l.id}">
        <div class="card-media" data-open>
          <img src="${l.images[0]}" alt="${l.title}, ${l.area}" loading="${i < 3 ? "eager" : "lazy"}" />
          ${l.badge ? `<span class="badge ${badgeClass}">${l.badge}</span>` : ""}
          <span class="deal-tag">${l.deal === "rent" ? "For rent" : "For sale"}</span>
          <button class="save ${isSaved(l.id) ? "is-on" : ""}" data-save="${l.id}" aria-label="${isSaved(l.id) ? "Remove from saved" : "Save property"}" aria-pressed="${isSaved(l.id)}">${ico.heart}</button>
        </div>
        <div class="card-body">
          <p class="card-area">${ico.pin}${l.area}</p>
          <h3 class="card-title" data-open>${l.title}</h3>
          <p class="card-price">${priceLabel(l)}</p>
          <ul class="card-specs">
            <li>${ico.bed}${l.beds} bd</li>
            <li>${ico.bath}${l.baths} ba</li>
            <li>${ico.area}${money(l.sqft)} ft²</li>
          </ul>
        </div>
      </article>`;
  }

  function render() {
    const list = filtered();
    const grid = $("#grid");
    grid.innerHTML = list.map(cardHTML).join("");

    $("#resultCount").textContent = list.length;
    $("#empty").hidden = list.length > 0;

    const dirty = state.deal || state.type || state.location || state.budget || state.onlySaved;
    $("#resetFilters").hidden = !dirty;

    $$(".chip").forEach((c) => {
      const on =
        (c.dataset.deal === state.deal && "deal" in c.dataset && !state.type) ||
        (c.dataset.type === state.type && "type" in c.dataset && !state.deal) ||
        (c.dataset.deal === "" && !state.deal && !state.type);
      c.classList.toggle("is-on", on);
    });
  }

  /* ── modal ─────────────────────────────────────────────── */
  let lastFocus = null;

  function openModal(id) {
    const l = LISTINGS.find((x) => x.id === id);
    if (!l) return;
    const a = agentFor(l);

    $("#mMain").src = l.images[0];
    $("#mMain").alt = `${l.title}, ${l.area}`;
    $("#mThumbs").innerHTML = l.images
      .map((src, i) => `<button data-thumb="${src}" class="${i === 0 ? "is-on" : ""}" aria-label="Photo ${i + 1}"><img src="${src}" alt="" loading="lazy" /></button>`)
      .join("");

    $("#mArea").textContent = `${l.area} · ${l.id}`;
    $("#mTitle").textContent = l.title;
    $("#mPrice").innerHTML = priceLabel(l);
    $("#mSpecs").innerHTML = `
      <li><strong>${l.beds}</strong><span>Bedrooms</span></li>
      <li><strong>${l.baths}</strong><span>Bathrooms</span></li>
      <li><strong>${money(l.sqft)}</strong><span>Sq ft</span></li>
      <li><strong>${l.deal === "rent" ? "Rent" : "Sale"}</strong><span>Tenure</span></li>`;
    $("#mBlurb").textContent = l.blurb;
    $("#mAmenities").innerHTML = l.amenities.map((x) => `<li>${x}</li>`).join("");

    $("#mAgentPhoto").src = a.photo;
    $("#mAgentPhoto").alt = a.name;
    $("#mAgentName").textContent = a.name;
    $("#mAgentRole").textContent = `${a.role} · ${a.phone}`;
    $("#mRef").textContent = l.id;

    const sv = $("#mSave");
    sv.classList.toggle("is-on", isSaved(l.id));
    sv.dataset.save = l.id;
    sv.querySelector("span").textContent = isSaved(l.id) ? "Saved" : "Save";

    lastFocus = document.activeElement;
    $("#modal").hidden = false;
    document.body.classList.add("is-locked");
    $(".modal-x").focus();
  }

  function closeModal() {
    $("#modal").hidden = true;
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  function toggleSave(id) {
    if (state.saved.has(id)) state.saved.delete(id);
    else {
      state.saved.add(id);
      toast("Saved to your shortlist");
    }
    persistSaved();
    if (state.onlySaved) render();
    else {
      $$(`[data-save="${id}"]`).forEach((b) => {
        const on = state.saved.has(id);
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on);
        const label = b.querySelector("span");
        if (label) label.textContent = on ? "Saved" : "Save";
      });
    }
  }

  /* ── events: listings ──────────────────────────────────── */
  $("#grid").addEventListener("click", (e) => {
    const save = e.target.closest("[data-save]");
    if (save) {
      e.stopPropagation();
      toggleSave(save.dataset.save);
      return;
    }
    const open = e.target.closest("[data-open]");
    if (open) openModal(open.closest(".card").dataset.id);
  });

  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      if (chip.dataset.deal === "") {
        state.deal = ""; state.type = "";
      } else if ("type" in chip.dataset) {
        state.type = chip.dataset.type; state.deal = "";
      } else {
        state.deal = chip.dataset.deal; state.type = "";
      }
      render();
    });
  });

  $("#sortBy").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  $("#resetFilters").addEventListener("click", () => {
    Object.assign(state, { deal: "", type: "", location: "", budget: "", onlySaved: false });
    $("#fLocation").value = ""; $("#fType").value = ""; $("#fBudget").value = "";
    $("#savedBtn").setAttribute("aria-pressed", "false");
    render();
  });

  $("#emptyReset").addEventListener("click", () => $("#resetFilters").click());

  $("#savedBtn").addEventListener("click", () => {
    if (state.saved.size === 0) {
      toast("Nothing saved yet — tap the heart on a listing");
      return;
    }
    state.onlySaved = !state.onlySaved;
    $("#savedBtn").setAttribute("aria-pressed", String(state.onlySaved));
    render();
    if (state.onlySaved) $("#listings").scrollIntoView({ behavior: "smooth", block: "start" });
    else toast("Showing all properties");
  });

  /* ── events: hero search ───────────────────────────────── */
  $("#heroSearch").addEventListener("submit", (e) => {
    e.preventDefault();
    state.location = $("#fLocation").value;
    state.type = $("#fType").value;
    state.budget = $("#fBudget").value;
    state.deal = "";
    state.onlySaved = false;
    render();
    $("#listings").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* nav deal shortcuts */
  $$(".nav-links a[data-deal]").forEach((a) => {
    a.addEventListener("click", () => {
      state.deal = a.dataset.deal;
      state.type = "";
      render();
      closeNav();
    });
  });

  /* ── events: modal ─────────────────────────────────────── */
  $("#modal").addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { closeModal(); return; }
    const thumb = e.target.closest("[data-thumb]");
    if (thumb) {
      $("#mMain").src = thumb.dataset.thumb;
      $$("#mThumbs button").forEach((b) => b.classList.toggle("is-on", b === thumb));
    }
    const save = e.target.closest("[data-save]");
    if (save) toggleSave(save.dataset.save);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#modal").hidden) closeModal();
  });

  /* ── theme ─────────────────────────────────────────────── */
  const root = document.documentElement;
  const stored = localStorage.getItem("me_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = stored || (prefersDark ? "dark" : "light");

  $("#themeBtn").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("me_theme", next);
  });

  /* ── nav ───────────────────────────────────────────────── */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeNav() {
    nav.classList.remove("is-open");
    $("#burger").setAttribute("aria-expanded", "false");
  }
  $("#burger").addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    $("#burger").setAttribute("aria-expanded", String(open));
  });
  $$(".nav-links a").forEach((a) => a.addEventListener("click", closeNav));

  /* ── reveal on scroll ──────────────────────────────────── */
  $$(".section-head, .sell-copy, .sell-media, .agent, .contact-copy, .form, blockquote, .foot-inner")
    .forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ── agents ────────────────────────────────────────────── */
  $("#agentGrid").innerHTML = AGENTS.map((a) => `
    <article class="agent">
      <img src="${a.photo}" alt="${a.name}" loading="lazy" />
      <div>
        <strong>${a.name}</strong>
        <span>${a.role}</span>
      </div>
      <a href="tel:${a.phone.replace(/\s/g, "")}">${a.phone} ${ico.arrow}</a>
    </article>`).join("");

  /* ── contact form ──────────────────────────────────────── */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const note = $("#formNote");
    const data = new FormData(form);

    if (!data.get("name")?.trim() || !data.get("contact")?.trim() || !data.get("consent")) {
      note.textContent = "Name, contact and consent are needed before we can reply.";
      note.classList.add("is-err");
      return;
    }

    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nContact: ${data.get("contact")}\nInterest: ${data.get("interest")}\n\n${data.get("message") || "(no details)"}`
    );
    window.location.href =
      `mailto:hello@meridian.estates?subject=${encodeURIComponent("Website enquiry — " + data.get("interest"))}&body=${body}`;

    note.classList.remove("is-err");
    note.textContent = "Opening your mail app — or call us on +971 4 555 0100.";
    toast("Enquiry ready to send");
    form.reset();
  });

  /* ── boot ──────────────────────────────────────────────── */
  $("#year").textContent = new Date().getFullYear();
  persistSaved();
  render();
})();
