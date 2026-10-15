/* 화면 동작 파일입니다. 소개와 이력은 content.js에서 수정하세요. */
(() => {
  "use strict";

  const content = window.CV_CONTENT;
  if (!content || !content.ko || !content.en) return;

  const svgNamespace = "http://www.w3.org/2000/svg";
  const storageKey = "personal-portfolio-language";
  function getSectionFocusOffset() {
    const navigation = document.querySelector('.section-navigation');
    const firstSection = sectionsRoot.querySelector('.cv-section');
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const margin = firstSection ? parseFloat(getComputedStyle(firstSection).scrollMarginTop) || 0 : 0;
    const navigationHeight = navigation ? navigation.getBoundingClientRect().height : 0;
    return Math.max(navigationHeight + 20, padding + margin + 2);
  }
  const sectionsRoot = document.getElementById("sections");
  const tocRoot = document.getElementById("table-of-contents");
  let currentLanguage = "ko";
  let sectionObserver;
  let scrollFrame = 0;
  const slidePositions = new Map();
  const slideViewers = new Map();
  let slideDialog;
  let dialogProjectId = null;
  let dialogOrigin = null;
  let dialogParts;

  if (!sectionsRoot || !tocRoot) return;

  function makeElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function makeIcon(name) {
    const icon = document.createElementNS(svgNamespace, "svg");
    icon.setAttribute("class", "icon");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");
    const use = document.createElementNS(svgNamespace, "use");
    use.setAttribute("href", `#icon-${name}`);
    icon.append(use);
    return icon;
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value == null ? "" : String(value);
    });
  }

  function safeHref(rawUrl) {
    try {
      const url = new URL(rawUrl);
      return ["https:", "http:", "mailto:", "tel:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  function makeLink(data, className, iconName) {
    const href = safeHref(data.url);
    if (!href) return null;
    const link = makeElement("a", className);
    link.href = href;
    if (/^https?:/i.test(href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    if (iconName) link.append(makeIcon(iconName));
    link.append(makeElement("span", "", data.label));
    return link;
  }

  function renderContact(profile) {
    const list = document.getElementById("contact-list");
    if (!list) return;
    list.replaceChildren();
    const links = Array.isArray(profile.links) ? profile.links : [];
    links.forEach((item) => {
      const link = makeLink(item, "contact-link", item.icon);
      if (!link) return;
      list.append(link);
    });
    list.hidden = !list.childElementCount;
    const email = links.find((item) => typeof item.url === "string" && item.url.startsWith("mailto:"));
    const sidebarContact = document.querySelector(".sidebar-contact");
    if (email && sidebarContact) sidebarContact.setAttribute("href", safeHref(email.url));
  }

  function renderEntry(item) {
    const entry = makeElement("article", "cv-entry");
    const body = makeElement("div", "entry-body");
    const heading = makeElement("div", "entry-heading");
    heading.append(makeElement("h3", "", item.title));
    if (item.date) heading.append(makeElement("p", "entry-date", item.date));
    body.append(heading);
    if (item.subtitle) body.append(makeElement("p", "entry-subtitle", item.subtitle));
    if (item.details && item.details.length) {
      const details = makeElement("ul", "entry-details");
      item.details.forEach((text) => details.append(makeElement("li", "", text)));
      body.append(details);
    }
    if (item.link) {
      const link = makeLink(item.link, "entry-link");
      if (link) {
        link.append(makeIcon("arrow"));
        body.append(link);
      }
    }
    entry.append(body);
    return entry;
  }

  function viewerLabels() {
    const defaults = currentLanguage === "ko"
      ? {
        previous: "이전", next: "다음", expand: "확대 보기", close: "닫기",
        slidesLabel: "프로젝트 슬라이드", empty: "슬라이드를 준비하고 있습니다.",
        imageError: "슬라이드 이미지를 불러오지 못했습니다."
      }
      : {
        previous: "Previous", next: "Next", expand: "Expand", close: "Close",
        slidesLabel: "Project slides", empty: "Slides are being prepared.",
        imageError: "The slide image could not be loaded."
      };
    const supplied = content[currentLanguage].ui.viewer || {};
    Object.keys(defaults).forEach((key) => {
      if (typeof supplied[key] === "string" && supplied[key]) defaults[key] = supplied[key];
    });
    return defaults;
  }

  // 슬라이드 이미지는 현재 사이트 폴더 안의 래스터 이미지 파일만 허용합니다.
  function safeSlideSource(rawSource) {
    if (typeof rawSource !== "string" || !rawSource.trim()) return "";
    const source = rawSource.trim();
    if (/^[a-z][a-z\d+.-]*:/i.test(source) || /^[\\/]/.test(source) || /[\\\u0000-\u001f]/.test(source)) return "";
    try {
      const base = new URL(".", document.baseURI);
      const image = new URL(source, base);
      if (!image.href.startsWith(base.href) || !/\.(?:png|jpe?g|webp|avif|gif)$/i.test(image.pathname)) return "";
      return image.href;
    } catch {
      return "";
    }
  }

  function localizedSlideText(value) {
    if (typeof value === "string") return value;
    if (!value || typeof value !== "object") return "";
    if (typeof value[currentLanguage] === "string") return value[currentLanguage];
    if (typeof value.ko === "string") return value.ko;
    return typeof value.en === "string" ? value.en : "";
  }

  function projectSlides(projectId) {
    const manifest = window.CV_SLIDES || {};
    const items = Array.isArray(manifest[projectId]) ? manifest[projectId] : [];
    return items.map((slide) => ({
      src: safeSlideSource(slide.src),
      alt: localizedSlideText(slide.alt),
      title: localizedSlideText(slide.title)
    })).filter((slide) => slide.src);
  }

  function makeButton(className, label) {
    const button = makeElement("button", className, label);
    button.type = "button";
    button.setAttribute("aria-label", label);
    return button;
  }

  function selectedSlideIndex(projectId, length) {
    const selected = slidePositions.get(projectId) || 0;
    return Math.max(0, Math.min(selected, length - 1));
  }

  function setProjectSlide(projectId, requestedIndex) {
    const viewer = slideViewers.get(projectId);
    if (!viewer || !viewer.slides.length) return;
    const index = Math.max(0, Math.min(requestedIndex, viewer.slides.length - 1));
    slidePositions.set(projectId, index);
    viewer.update(index);
    if (dialogProjectId === projectId) updateSlideDialog();
  }

  function moveProjectSlide(projectId, delta) {
    const viewer = slideViewers.get(projectId);
    if (!viewer) return;
    setProjectSlide(projectId, selectedSlideIndex(projectId, viewer.slides.length) + delta);
  }

  function handleSlideKey(event, projectId) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const viewer = slideViewers.get(projectId);
    if (!viewer || !viewer.slides.length) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.key === "ArrowLeft") moveProjectSlide(projectId, -1);
    if (event.key === "ArrowRight") moveProjectSlide(projectId, 1);
    if (event.key === "Home") setProjectSlide(projectId, 0);
    if (event.key === "End") setProjectSlide(projectId, viewer.slides.length - 1);
  }

  function restoreDialogFocus() {
    const previousProject = dialogProjectId;
    dialogProjectId = null;
    const viewer = slideViewers.get(previousProject);
    const target = dialogOrigin && dialogOrigin.isConnected && !dialogOrigin.disabled
      ? dialogOrigin
      : viewer && viewer.stage;
    dialogOrigin = null;
    if (target && !target.disabled) target.focus({ preventScroll: true });
  }

  function closeSlideDialog() {
    if (!slideDialog || !slideDialog.open) return;
    if (typeof slideDialog.close === "function") slideDialog.close();
    else {
      slideDialog.removeAttribute("open");
      restoreDialogFocus();
    }
  }

  function ensureSlideDialog() {
    if (slideDialog) return;
    slideDialog = makeElement("dialog", "slide-dialog");
    slideDialog.id = "slide-dialog";
    slideDialog.setAttribute("aria-labelledby", "slide-dialog-title");
    const header = makeElement("div", "dialog-header");
    const title = makeElement("h2", "dialog-title");
    title.id = "slide-dialog-title";
    const close = makeButton("dialog-close", "");
    header.append(title, close);
    const stage = makeElement("div", "dialog-stage");
    const image = makeElement("img", "dialog-image");
    image.width = 1600;
    image.height = 900;
    image.decoding = "async";
    const error = makeElement("p", "slide-error");
    error.hidden = true;
    stage.append(image, error);
    const controls = makeElement("div", "dialog-controls");
    const previous = makeButton("dialog-prev", "");
    const counter = makeElement("span", "dialog-counter");
    counter.setAttribute("aria-live", "polite");
    counter.setAttribute("aria-atomic", "true");
    const next = makeButton("dialog-next", "");
    controls.append(previous, counter, next);
    slideDialog.append(header, stage, controls);
    document.body.append(slideDialog);
    dialogParts = { title, close, image, error, previous, counter, next };
    close.addEventListener("click", closeSlideDialog);
    previous.addEventListener("click", () => moveProjectSlide(dialogProjectId, -1));
    next.addEventListener("click", () => moveProjectSlide(dialogProjectId, 1));
    slideDialog.addEventListener("close", restoreDialogFocus);
    slideDialog.addEventListener("click", (event) => {
      if (event.target === slideDialog) closeSlideDialog();
    });
    slideDialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && typeof slideDialog.showModal !== "function") {
        event.preventDefault();
        closeSlideDialog();
      } else handleSlideKey(event, dialogProjectId);
    });
    image.addEventListener("error", () => {
      image.hidden = true;
      error.textContent = viewerLabels().imageError;
      error.hidden = false;
    });
    image.addEventListener("load", () => {
      image.hidden = false;
      error.hidden = true;
    });
  }

  function updateSlideDialog() {
    if (!slideDialog || dialogProjectId === null) return;
    const viewer = slideViewers.get(dialogProjectId);
    if (!viewer || !viewer.slides.length) {
      closeSlideDialog();
      return;
    }
    const labels = viewerLabels();
    const index = selectedSlideIndex(dialogProjectId, viewer.slides.length);
    const slide = viewer.slides[index];
    dialogParts.title.textContent = `${viewer.project.title} · ${slide.title || labels.slidesLabel}`;
    dialogParts.image.alt = slide.alt || `${viewer.project.title} · ${index + 1}`;
    if (dialogParts.image.getAttribute("src") !== slide.src) {
      dialogParts.error.hidden = true;
      dialogParts.image.hidden = false;
      dialogParts.image.src = slide.src;
    }
    [ [dialogParts.previous, labels.previous], [dialogParts.next, labels.next], [dialogParts.close, labels.close] ].forEach(([button, label]) => {
      button.textContent = label;
      button.setAttribute("aria-label", label);
    });
    dialogParts.previous.disabled = index === 0;
    dialogParts.next.disabled = index === viewer.slides.length - 1;
    dialogParts.counter.textContent = `${index + 1} / ${viewer.slides.length}`;
  }

  function openSlideDialog(projectId, origin) {
    const viewer = slideViewers.get(projectId);
    if (!viewer || !viewer.slides.length) return;
    ensureSlideDialog();
    dialogProjectId = projectId;
    dialogOrigin = origin;
    updateSlideDialog();
    if (!slideDialog.open) {
      if (typeof slideDialog.showModal === "function") slideDialog.showModal();
      else slideDialog.setAttribute("open", "");
    }
    dialogParts.close.focus({ preventScroll: true });
  }

  function renderSlideViewer(project) {
    const labels = viewerLabels();
    const slides = projectSlides(project.id);
    const root = makeElement("div", "slide-viewer");
    root.dataset.viewer = project.id;
    root.setAttribute("role", "region");
    root.setAttribute("aria-label", `${project.title} · ${labels.slidesLabel}`);
    if (!slides.length) {
      root.append(makeElement("p", "slide-empty", labels.empty));
      return root;
    }
    root.tabIndex = 0;
    const figure = makeElement("figure", "slide-figure");
    const stage = makeButton("slide-stage", labels.expand);
    stage.textContent = "";
    const image = makeElement("img", "slide-image");
    image.width = 1600;
    image.height = 900;
    image.loading = "eager";
    image.decoding = "async";
    stage.append(image);
    const caption = makeElement("figcaption", "slide-caption");
    const title = makeElement("span", "slide-title");
    caption.append(title);
    const error = makeElement("p", "slide-error", labels.imageError);
    error.hidden = true;
    figure.append(stage, caption, error);
    const controls = makeElement("div", "slide-controls");
    const previous = makeButton("slide-prev", labels.previous);
    const counter = makeElement("span", "slide-counter");
    counter.setAttribute("aria-live", "polite");
    counter.setAttribute("aria-atomic", "true");
    const next = makeButton("slide-next", labels.next);
    const expand = makeButton("slide-expand", labels.expand);
    controls.append(previous, counter, next, expand);
    const printImage = makeElement("img", "slide-print-image");
    printImage.src = slides[0].src;
    printImage.alt = slides[0].alt || `${project.title} · 1`;
    printImage.width = 1600;
    printImage.height = 900;
    printImage.decoding = "async";
    root.append(figure, controls, printImage);

    const viewer = {
      project, slides, stage,
      update(index) {
        const slide = slides[index];
        title.textContent = slide.title || `${labels.slidesLabel} ${index + 1}`;
        image.alt = slide.alt || `${project.title} · ${index + 1}`;
        if (image.getAttribute("src") !== slide.src) {
          image.hidden = false;
          error.hidden = true;
          stage.disabled = false;
          expand.disabled = false;
          image.src = slide.src;
        }
        previous.disabled = index === 0;
        next.disabled = index === slides.length - 1;
        counter.textContent = `${index + 1} / ${slides.length}`;
      }
    };
    slideViewers.set(project.id, viewer);
    const selected = selectedSlideIndex(project.id, slides.length);
    slidePositions.set(project.id, selected);
    viewer.update(selected);
    previous.addEventListener("click", () => moveProjectSlide(project.id, -1));
    next.addEventListener("click", () => moveProjectSlide(project.id, 1));
    stage.addEventListener("click", () => openSlideDialog(project.id, stage));
    expand.addEventListener("click", () => openSlideDialog(project.id, expand));
    root.addEventListener("keydown", (event) => handleSlideKey(event, project.id));
    image.addEventListener("error", () => {
      image.hidden = true;
      error.hidden = false;
      stage.disabled = true;
      expand.disabled = true;
    });
    image.addEventListener("load", () => {
      image.hidden = false;
      error.hidden = true;
      stage.disabled = false;
      expand.disabled = false;
    });
    return root;
  }

  function renderProject(project, index) {
    const entry = makeElement("article", "project-entry");
    entry.dataset.project = project.id;
    entry.setAttribute("aria-labelledby", `${project.id}-project-title`);
    const copy = makeElement("div", "project-copy");
    copy.append(makeElement("p", "project-index", `PROJECT ${String(index + 1).padStart(2, "0")}`));
    const title = makeElement("h3", "project-title", project.title);
    title.id = `${project.id}-project-title`;
    copy.append(title);
    if (project.date) copy.append(makeElement("p", "project-period", project.date));
    const ui = content[currentLanguage].ui;
    if (Array.isArray(project.tools) && project.tools.length) {
      const tools = makeElement("div", "project-tools");
      tools.append(makeElement("span", "tool-label", ui.toolsLabel || (currentLanguage === "ko" ? "사용 기술" : "Tools")));
      project.tools.forEach((tool) => tools.append(makeElement("span", "project-tool", tool)));
      copy.append(tools);
    }
    if (project.summary) copy.append(makeElement("p", "project-summary", project.summary));
    if (Array.isArray(project.details) && project.details.length) {
      const details = makeElement("ul", "project-details");
      project.details.forEach((text) => details.append(makeElement("li", "", text)));
      copy.append(details);
    }
    if (Array.isArray(project.outcomes) && project.outcomes.length) {
      const outcomes = makeElement("div", "project-outcomes");
      outcomes.append(makeElement("p", "small-label", ui.outcomesLabel || (currentLanguage === "ko" ? "주요 결과" : "Outcomes")));
      const items = makeElement("ul");
      project.outcomes.forEach((text) => items.append(makeElement("li", "", text)));
      outcomes.append(items);
      copy.append(outcomes);
    }
    if (project.link) {
      const link = makeLink(project.link, "entry-link project-link", "github");
      if (link) {
        link.append(makeIcon("arrow"));
        copy.append(link);
      }
    }
    entry.append(copy, renderSlideViewer(project));
    return entry;
  }

  function renderSections(sections) {
    slideViewers.clear();
    const fragment = document.createDocumentFragment();
    const navigation = document.createDocumentFragment();
    tocRoot.classList.add("toc-list");
    sections.forEach((item, index) => {
      const section = makeElement("section", `cv-section${item.type === "topics" ? " research-section" : ""}${item.type === "projects" ? " projects-section" : ""}`);
      section.id = item.id;
      section.setAttribute("aria-labelledby", `${item.id}-heading`);
      const heading = makeElement("div", "section-heading");
      const sectionIndex = makeElement("span", "section-index", String(index + 1).padStart(2, "0"));
      sectionIndex.setAttribute("aria-hidden", "true");
      heading.append(sectionIndex);
      const title = makeElement("h2", "", item.title);
      title.id = `${item.id}-heading`;
      heading.append(title);
      if (currentLanguage === "ko" && item.translation) {
        const translation = makeElement("span", "section-translation", item.translation);
        translation.lang = "en";
        heading.append(translation);
      }
      section.append(heading);

      if (item.type === "topics") {
        if (item.statement) section.append(makeElement("p", "research-statement", item.statement));
        if (Array.isArray(item.topics) && item.topics.length) {
          const topics = makeElement("ul", "research-topics");
          item.topics.forEach((topic) => topics.append(makeElement("li", "", topic)));
          section.append(topics);
        }
      } else if (item.type === "projects") {
        const entries = makeElement("div", "project-entries");
        item.entries.forEach((project, projectIndex) => entries.append(renderProject(project, projectIndex)));
        section.append(entries);
      } else if (item.type === "skills") {
        const skills = makeElement("dl", "skills-list");
        item.rows.forEach((row) => {
          const group = makeElement("div");
          group.append(makeElement("dt", "", row.label), makeElement("dd", "", row.value));
          skills.append(group);
        });
        section.append(skills);
      } else {
        const entries = makeElement("div", "entries");
        item.entries.forEach((entry) => entries.append(renderEntry(entry)));
        section.append(entries);
      }
      fragment.append(section);

      const listItem = makeElement("li");
      const link = makeElement("a", "toc-link");
      link.href = `#${item.id}`;
      link.dataset.section = item.id;
      const navIndex = makeElement("span", "nav-index", String(index + 1).padStart(2, "0"));
      navIndex.setAttribute("aria-hidden", "true");
      link.append(navIndex, document.createTextNode(item.title));
      listItem.append(link);
      navigation.append(listItem);
    });
    sectionsRoot.replaceChildren(fragment);
    tocRoot.replaceChildren(navigation);
    if (dialogProjectId !== null) updateSlideDialog();
  }

  function setActiveSection(id) {
    tocRoot.querySelectorAll("a[data-section]").forEach((link) => {
      const isActive = link.dataset.section === id;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function updateActiveSection() {
    const sections = Array.from(sectionsRoot.querySelectorAll(".cv-section"));
    if (!sections.length) return;
    const focusLine = getSectionFocusOffset();
    let active = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= focusLine) active = section;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
      active = sections[sections.length - 1];
    }
    setActiveSection(active.id);
  }

  function scheduleActiveSectionUpdate() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      updateActiveSection();
    });
  }

  function observeSections() {
    if (sectionObserver) sectionObserver.disconnect();
    if ("IntersectionObserver" in window) {
      sectionObserver = new IntersectionObserver(scheduleActiveSectionUpdate, {
        rootMargin: `-${getSectionFocusOffset()}px 0px -55% 0px`,
        threshold: [0, 1]
      });
      sectionsRoot.querySelectorAll(".cv-section").forEach((section) => sectionObserver.observe(section));
    }
    updateActiveSection();
  }

  function rememberLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // file:// 또는 브라우저 설정이 저장을 막아도 페이지는 정상 동작합니다.
    }
  }

  function render(language, preservePosition = false) {
    if (!content[language]) return;
    const previousSections = Array.from(sectionsRoot.querySelectorAll(".cv-section"));
    const previousSection = preservePosition
      ? previousSections.filter((section) => section.getBoundingClientRect().top <= getSectionFocusOffset()).pop()
      : null;
    const previousOffset = previousSection ? previousSection.getBoundingClientRect().top : 0;
    const previousScroll = window.scrollY;
    currentLanguage = language;
    const data = content[language];
    document.documentElement.lang = language;
    document.title = data.ui.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = data.ui.description;

    setText(".brand-label", data.ui.brand);
    const brand = document.querySelector(".brand");
    if (brand) brand.setAttribute("aria-label", data.ui.brandAriaLabel);
    const cvDocument = document.querySelector("article.cv-document");
    if (cvDocument) cvDocument.setAttribute("aria-label", `${data.profile.name} · ${data.ui.documentAriaLabel}`);
    setText('[data-label="print"]', data.ui.print);
    setText("#sidebar-title", data.ui.sidebarTitle);
    setText('[data-label="contact"]', data.ui.contact);
    setText("#profile-kicker", data.ui.kicker);
    setText("#profile-label", data.ui.profileLabel);
    setText('[data-label="profileTagline"]', data.ui.profileTagline);
    setText("#profile-name", data.profile.name);
    setText("#profile-summary", data.profile.summary);
    setText("#print-url", data.profile.printAddress);
    const printUrl = document.getElementById("print-url");
    if (printUrl) printUrl.hidden = !data.profile.printAddress;
    setText("#footer-label", data.ui.footer);
    setText('[data-label="backToTop"]', data.ui.backToTop);
    setText(".skip-link", data.ui.skipLink);
    const languageSwitch = document.querySelector(".language-switch");
    if (languageSwitch) languageSwitch.setAttribute("aria-label", data.ui.languageLabel);
    const printButton = document.querySelector(".print-button");
    if (printButton) printButton.setAttribute("aria-label", data.ui.print);
    document.querySelectorAll(".language-button[data-language]").forEach((button) => {
      const active = button.dataset.language === language;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("is-active", active);
    });

    renderContact(data.profile);
    renderSections(data.sections);
    if (preservePosition) {
      const anchor = previousSection && document.getElementById(previousSection.id);
      const target = anchor ? window.scrollY + anchor.getBoundingClientRect().top - previousOffset : previousScroll;
      // CSS의 부드러운 스크롤을 임시로 해제해 언어 전환 위치를 즉시 복원합니다.
      const oldBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, Math.max(0, target));
      document.documentElement.style.scrollBehavior = oldBehavior;
    }
    observeSections();
  }

  try {
    const storedLanguage = window.localStorage.getItem(storageKey);
    if (storedLanguage && content[storedLanguage]) currentLanguage = storedLanguage;
  } catch {
    // 언어 저장이 불가능한 환경에서는 한국어로 시작합니다.
  }

  document.querySelectorAll(".language-button[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      if (language === currentLanguage || !content[language]) return;
      render(language, true);
      rememberLanguage(language);
    });
  });
  const printButton = document.querySelector(".print-button");
  if (printButton) printButton.addEventListener("click", () => window.print());
  window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveSectionUpdate, { passive: true });
  window.addEventListener("hashchange", scheduleActiveSectionUpdate);
  render(currentLanguage);

  // 저장된 목차 주소로 파일을 열었을 때도 해당 항목으로 이동합니다.
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target && target.classList.contains("cv-section")) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView();
        updateActiveSection();
      });
    }
  }
})();
