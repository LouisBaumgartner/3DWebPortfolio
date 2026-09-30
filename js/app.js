/* Rendert alle Inhalte aus content.js und steuert die Scroll-Fahrt.
   Hier musst du normalerweise nichts ändern – Inhalte gehören in content.js. */
(function () {
  const C = window.PORTFOLIO;
  const N = C.experience.length;

  const UI = {
    de: {
      "nav.experience": "Stationen", "nav.projects": "Projekte", "nav.skills": "Kompetenzen", "nav.contact": "Kontakt",
      "hero.cta": "Projekte ansehen", "hero.cv": "CV herunterladen", "hero.scroll": "↓ Scrollen, um durch die Stationen zu reisen",
      "sec.strengths": "Was ich mitbringe", "sec.experience": "Stationen", "sec.projects": "Ausgewählte Projekte",
      "sec.skills": "Kompetenzen", "sec.education": "Ausbildung", "sec.volunteering": "Engagement", "sec.languages": "Sprachen",
      "sec.contact": "Über mich & Kontakt",
      "exp.details": "Alle Details", "exp.project": "Zum Projekt →", "proj.contribution": "Mein Beitrag", "proj.original": "Ursprüngliche Projektseite ↗",
      "cs.context": "Ausgangslage", "cs.role": "Meine Rolle", "cs.approach": "Vorgehen", "cs.result": "Ergebnis", "cs.draft": "Entwurf",
      "mode.classic": "Klassisch", "mode.3d": "3D", "footer.built": "Gebaut mit Three.js",
      "contact.mail": "E-Mail", "contact.cv": "CV (PDF)",
    },
    en: {
      "nav.experience": "Journey", "nav.projects": "Projects", "nav.skills": "Skills", "nav.contact": "Contact",
      "hero.cta": "View projects", "hero.cv": "Download CV", "hero.scroll": "↓ Scroll to travel through the stations",
      "sec.strengths": "What I bring", "sec.experience": "Journey", "sec.projects": "Selected projects",
      "sec.skills": "Skills", "sec.education": "Education", "sec.volunteering": "Volunteering", "sec.languages": "Languages",
      "sec.contact": "About & contact",
      "exp.details": "All details", "exp.project": "See project →", "proj.contribution": "My contribution", "proj.original": "Original project page ↗",
      "cs.context": "Context", "cs.role": "My role", "cs.approach": "Approach", "cs.result": "Result", "cs.draft": "Draft",
      "mode.classic": "Classic", "mode.3d": "3D", "footer.built": "Built with Three.js",
      "contact.mail": "Email", "contact.cv": "CV (PDF)",
    },
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  const params = new URLSearchParams(location.search);
  const showDrafts = params.has("drafts");
  let lang = params.get("lang") || store.get("lang") || "de"; // Standard: Deutsch. Englisch per ?lang=en
  if (!UI[lang]) lang = "de";

  const t = (v) => (v == null ? "" : typeof v === "object" && !Array.isArray(v) ? (v[lang] && (!Array.isArray(v[lang]) || v[lang].length) ? v[lang] : v.de ?? "") : v);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), C);
  const $ = (id) => document.getElementById(id);
  const isPlaceholder = (v) => /\[(PLATZHALTER|PLACEHOLDER)\]/.test(String(v));
  const filled = (v) => v && !isPlaceholder(v);
  const period = (e) => (lang === "en" && e.periodEn ? e.periodEn : e.period);

  const projects = () => [
    ...C.projects.filter((p) => p.show !== false),
    ...(C.caseStudies || []).filter((p) => !p.draft || showDrafts),
  ];
  const findProject = (id) => [...C.projects, ...(C.caseStudies || [])].find((p) => p.id === id);

  let activeStation = -1;

  function render() {
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty("--stations", N);
    $("lang-toggle").textContent = lang === "de" ? "EN" : "DE";

    document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = t(get(el.dataset.bind))));
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = UI[lang][el.dataset.i18n]));
    document.querySelectorAll(".section-title").forEach((el, i) => el.setAttribute("data-num", String(i + 1).padStart(2, "0")));

    const cv = $("cv-link");
    if (filled(C.meta.cvFile)) { cv.href = C.meta.cvFile; cv.hidden = false; }
    else { cv.hidden = true; }

    $("strengths-list").innerHTML = C.strengths.map((s, i) => `
      <article class="card strength">
        <span class="idx">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p>
        ${s.proof ? `<p class="proof">${esc(t(s.proof))}</p>` : ""}
      </article>`).join("");

    // Klassische Liste
    $("experience-list").innerHTML = C.experience.map((e, i) => `
      <li class="card station" data-station="${i}">
        <div>
          <div class="when">${esc(period(e))}</div>
          <div class="org">${esc(t(e.org))}</div>
          ${e.place ? `<div class="place">${esc(e.place)}</div>` : ""}
        </div>
        <div>
          <h3>${esc(t(e.role))}</h3>
          <p class="field">${esc(t(e.field))}</p>
          <ul>${(t(e.points) || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          ${e.projectId ? `<div class="more"><button class="link-btn" data-open="${e.projectId}">${UI[lang]["exp.project"]}</button></div>` : ""}
        </div>
      </li>`).join("");

    $("station-dots").innerHTML = C.experience.map(() => "<li></li>").join("");
    renderPanel(activeStation, true);

    $("project-list").innerHTML = projects().map((p) => `
      <button class="card project" data-open="${p.id}" type="button">
        <div class="thumb">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy" />` : ""}</div>
        <div class="body">
          <div class="meta">${[p.year, t(p.org)].filter(filled).map(esc).join(" · ")}${p.draft ? `<span class="badge-draft">${UI[lang]["cs.draft"]}</span>` : ""}</div>
          <h3>${esc(t(p.title))}</h3>
          <ul class="tags">${(p.tags || []).slice(0, 4).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </button>`).join("");

    $("skills-list").innerHTML = C.skills.map((g) => `
      <div class="card skill-group"><h3>${esc(t(g.group))}</h3>
        <ul class="tags">${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");

    const listItem = (x) => `<li><span class="p">${esc(x.period || "")}</span>${esc(t(x.title))}<div class="d">${esc(t(x.detail))}</div></li>`;
    $("education-list").innerHTML = C.education.map(listItem).join("");
    $("volunteering-list").innerHTML = C.volunteering.map(listItem).join("");
    $("language-list").innerHTML = C.languages.map((l) => `<li>${esc(t(l.name))} <span class="d">· ${esc(t(l.level))}</span></li>`).join("");

    const fb = C.feedback && filled(t(C.feedback.quote));
    $("feedback").innerHTML = fb ? `<p>«${esc(t(C.feedback.quote))}»</p><cite>${esc(t(C.feedback.source))}</cite>` : "";
    $("feedback").hidden = !fb;

    $("portrait").innerHTML = filled(C.meta.photo)
      ? `<img src="${esc(C.meta.photo)}" alt="${esc(C.meta.name)}" loading="lazy" />`
      : `<span class="mono-initials">${esc(C.meta.firstName[0] + C.meta.lastName[0])}</span>`;

    const links = [];
    if (C.meta.email) links.push(`<a class="btn primary" href="mailto:${esc(C.meta.email)}">${UI[lang]["contact.mail"]}</a>`);
    if (filled(C.meta.linkedin)) links.push(`<a class="btn" href="${esc(C.meta.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
    if (filled(C.meta.cvFile)) links.push(`<a class="btn" href="${esc(C.meta.cvFile)}" target="_blank" rel="noopener">${UI[lang]["contact.cv"]}</a>`);
    $("contact-links").innerHTML = links.join("");

    $("year").textContent = new Date().getFullYear();
    updateModeLabel();
  }

  /* ---------- Info-Panel der aktiven Station ---------- */
  function panelHTML(i) {
    const e = C.experience[i];
    const hl = t(e.highlights) || [];
    return `
      <div class="count">${String(i + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}</div>
      <div class="when">${esc(period(e))}</div>
      <h3>${esc(t(e.role))}</h3>
      <div class="org">${esc(t(e.org))}${e.place ? ` · ${esc(e.place)}` : ""}</div>
      <p class="field">${esc(t(e.field))}</p>
      <ul>${hl.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
      <div class="actions">
        <button class="link-btn" data-station-open="${i}">${UI[lang]["exp.details"]}</button>
        ${e.projectId ? `<button class="link-btn" data-open="${e.projectId}">${UI[lang]["exp.project"]}</button>` : ""}
      </div>`;
  }
  let swapTimer;
  function renderPanel(i, immediate) {
    const panel = $("station-panel");
    document.querySelectorAll("#station-dots li").forEach((d, k) => d.classList.toggle("on", k === i));
    if (i < 0) { panel.classList.add("hidden"); return; }
    const wasHidden = panel.classList.contains("hidden");
    panel.classList.remove("hidden");
    if (immediate || wasHidden) { panel.innerHTML = panelHTML(i); return; }
    panel.classList.add("swap");
    clearTimeout(swapTimer);
    swapTimer = setTimeout(() => { panel.innerHTML = panelHTML(i); panel.classList.remove("swap"); }, 220);
  }

  /* ---------- Scroll -> Kamera-Position ----------
     t = 0: Überblick (Hero), t = 1..N: Stationen, t = N+1: Überblick von oben */
  const smooth = (x) => x * x * (3 - 2 * x);
  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const state = { t: 0, active: -1, classic: false };

  function onScroll() {
    const scrolly = $("scrolly");
    const vh = innerHeight;
    const step = vh * 1.1;
    const y = -scrolly.getBoundingClientRect().top;
    const last = (N - 1) * step;
    let tt;
    if (y < 0) tt = Math.max(0, 1 + y / vh);
    else if (y <= last) { const k = y / step, i = Math.floor(k); tt = 1 + i + smooth(clamp01((k - i - 0.45) / 0.55)); }
    else tt = N + smooth(clamp01((y - last - 0.5 * vh) / vh));
    state.t = tt;

    let a = -1;
    if (y > -vh * 0.35 && y < last + vh * 0.55) a = Math.max(0, Math.min(N - 1, Math.floor((y + step * 0.3) / step)));
    if (a !== activeStation) { activeStation = a; state.active = a; renderPanel(a); }
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- Dialoge ---------- */
  const dlg = $("project-dialog");
  const section = (label, body) => body ? `<div class="cs-block"><h4>${label}</h4>${body}</div>` : "";
  const para = (v) => { const s = t(v); return s && (showDrafts || filled(s)) ? `<p>${esc(s)}</p>` : ""; };
  const list = (v) => { const a = (t(v) || []).filter((x) => showDrafts || filled(x)); return a.length ? `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""; };
  const media = (p) => p.video
    ? `<div class="video"><iframe src="${esc(p.video)}" title="${esc(t(p.title))}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`
    : p.cover ? `<div class="video"><img src="${esc(p.cover)}" alt="" style="width:100%;height:100%;object-fit:cover" /></div>` : "";

  function openProject(id) {
    const p = findProject(id);
    if (!p) return;
    const meta = [p.year, t(p.org)].filter(filled).map(esc).join(" · ");
    const isCase = "context" in p || "approach" in p;
    $("dlg-body").innerHTML = `
      <div class="mono" style="color:var(--muted)">${meta}${p.draft ? `<span class="badge-draft">${UI[lang]["cs.draft"]}</span>` : ""}</div>
      <h2 id="dlg-title">${esc(t(p.title))}</h2>
      <ul class="tags">${(p.tags || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      ${media(p)}
      ${isCase
        ? section(UI[lang]["cs.context"], para(p.context)) + section(UI[lang]["cs.role"], para(p.role)) +
          section(UI[lang]["cs.approach"], list(p.approach)) + section(UI[lang]["cs.result"], para(p.result))
        : `${para(p.summary)}${list(p.contribution) ? `<h3 class="sub-title">${UI[lang]["proj.contribution"]}</h3>${list(p.contribution)}` : ""}`}
      ${p.link ? `<p style="margin-top:20px"><a href="${esc(p.link)}" target="_blank" rel="noopener">${UI[lang]["proj.original"]}</a></p>` : ""}`;
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }

  function openStation(i) {
    const e = C.experience[i];
    $("dlg-body").innerHTML = `
      <div class="mono" style="color:var(--muted)">${esc(period(e))} · ${esc(t(e.org))}${e.place ? ` · ${esc(e.place)}` : ""}</div>
      <h2 id="dlg-title">${esc(t(e.role))}</h2>
      <p class="field" style="color:var(--accent);margin-top:0">${esc(t(e.field))}</p>
      <ul>${(t(e.points) || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      ${e.projectId ? `<p style="margin-top:20px"><button class="btn primary" data-open="${e.projectId}">${UI[lang]["exp.project"]}</button></p>` : ""}`;
    dlg.showModal();
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) return openProject(b.dataset.open);
    const s = e.target.closest("[data-station-open]");
    if (s) openStation(+s.dataset.stationOpen);
  });
  dlg.querySelector(".dlg-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => ($("dlg-body").innerHTML = "")); // stoppt Videos

  /* ---------- Sprache ---------- */
  $("lang-toggle").addEventListener("click", () => {
    lang = lang === "de" ? "en" : "de";
    store.set("lang", lang);
    render();
  });

  /* ---------- 3D / Klassisch ---------- */
  // 3D startet immer (ausser ohne WebGL). Besucher können oben rechts auf "Klassisch" wechseln.
  const webgl = (() => { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; } })();
  const saved = store.get("mode");
  state.classic = params.get("mode") === "classic" || (params.get("mode") !== "3d" && saved === "classic") || !webgl;
  if (!webgl) $("mode-toggle").hidden = true;

  function applyMode() {
    document.body.classList.toggle("classic", state.classic);
    $("mode-toggle").setAttribute("aria-pressed", String(state.classic));
    updateModeLabel();
    onScroll();
    dispatchEvent(new CustomEvent("portfolio:mode", { detail: { classic: state.classic } }));
  }
  function updateModeLabel() { $("mode-toggle").textContent = state.classic ? UI[lang]["mode.3d"] : UI[lang]["mode.classic"]; }
  $("mode-toggle").addEventListener("click", () => { state.classic = !state.classic; store.set("mode", state.classic ? "classic" : "3d"); applyMode(); });

  window.PORTFOLIO_STATE = state;
  render();
  applyMode();
})();
