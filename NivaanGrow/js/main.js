(() => {
  "use strict";

  const business = {
    email: "nivaangrowth@gmail.com",
    phoneDisplay: "",
    phoneInternational: "",
    whatsappNumber: "",
    location: "",
    social: {
      instagram: "",
      facebook: "",
      linkedin: ""
    }
  };

  const navigation = [
    ["Home", "./index.html", "home"],
    ["About", "./about.html", "about"],
    ["Services", "./services.html", "services"],
    ["Pricing", "./pricing.html", "pricing"],
    ["Our Work", "./portfolio.html", "portfolio"],
    ["Contact", "./contact.html", "contact"]
  ];

  const page = document.body.dataset.page || "";
  const themeStorageKey = "nivaan-grow-theme";
  const getStoredTheme = () => {
    try {
      const theme = window.localStorage.getItem(themeStorageKey);
      return theme === "dark" || theme === "light" ? theme : "light";
    } catch (error) {
      console.error("Could not read the saved theme preference:", error);
      return "light";
    }
  };
  const applyTheme = (theme, persist) => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#101722" : "#ffffff");
    if (persist) {
      try {
        window.localStorage.setItem(themeStorageKey, theme);
      } catch (error) {
        console.error("Could not save the theme preference:", error);
      }
    }
  };
  applyTheme(getStoredTheme(), false);

  const announcement = document.createElement("div");
  announcement.className = "announcement-bar";
  announcement.textContent = "Helping Indian Businesses Grow Smarter.";

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <nav class="navbar" aria-label="Main navigation">
      <a class="brand" href="./index.html" aria-label="NivaanGrow home">
        <img src="./assets/images/nivaan-growth-logo-upload.png" alt="NivaanGrow — Your Brand, Our Strategy, Real Growth" width="88" height="88">
      </a>
      <button class="nav-toggle" type="button" aria-label="Open navigation menu" aria-controls="site-navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-content" id="site-navigation">
        <div class="nav-links">${navigation.map(([label, href, key]) => `<a class="nav-link" href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</div>
        <a class="nav-cta" href="./contact.html">Let’s talk <span aria-hidden="true">→</span></a>
      </div>
      <button class="theme-toggle" type="button" aria-label="Switch to dark mode" aria-pressed="false" title="Switch to dark mode"><span class="theme-toggle-icon" aria-hidden="true">☾</span></button>
    </nav>`;
  document.body.insertBefore(header, document.querySelector("main"));
  document.body.insertBefore(announcement, header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  const emailLine = business.email
    ? `<a href="mailto:${encodeURIComponent(business.email)}">${business.email}</a>`
    : "<span>Add your business email in js/main.js</span>";
  const phoneLine = business.phoneDisplay && business.phoneInternational
    ? `<a href="tel:${business.phoneInternational.replace(/[^\d+]/g, "")}">${business.phoneDisplay}</a>`
    : "<span>Add your business phone in js/main.js</span>";
  const socialLinks = Object.entries(business.social)
    .filter(([, url]) => url.trim())
    .map(([network, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${network[0].toUpperCase()}${network.slice(1)}</a>`)
    .join("");

  footer.innerHTML = `
    <div class="footer-main">
      <div class="footer-brand">
        <a class="brand" href="./index.html" aria-label="NivaanGrow home">
          <img src="./assets/images/nivaan-growth-logo-upload.png" alt="NivaanGrow — Your Brand, Our Strategy, Real Growth" width="108" height="108">
        </a>
        <p>Thoughtful strategy and practical marketing support for businesses ready to grow with purpose.</p>
        <div class="footer-social">${socialLinks || '<span class="social-placeholder">Add your social profile links in js/main.js.</span>'}</div>
      </div>
      <div><h2 class="footer-heading">Explore</h2><div class="footer-links"><a href="./about.html">About us</a><a href="./services.html">Services</a><a href="./pricing.html">Pricing approach</a><a href="./process.html">Our process</a><a href="./portfolio.html">Creative concepts</a></div></div>
      <div><h2 class="footer-heading">Resources &amp; services</h2><div class="footer-links"><a href="./services.html#social-media">Social media management</a><a href="./services.html#google-ads">Google Ads</a><a href="./services.html#seo">SEO</a><a href="./services.html#websites">Website design</a><a href="./contact.html">Contact</a><a href="./privacy-policy.html">Privacy policy</a><a href="./terms.html">Terms &amp; conditions</a></div></div>
      <div class="footer-contact-column"><h2 class="footer-heading">Get in touch</h2><div class="footer-contact">${emailLine}${phoneLine}${business.location ? `<span>${business.location}</span>` : "<span>Add your business location in js/main.js</span>"}</div></div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} NivaanGrow. Add your legal business details before publishing.</span><div class="footer-legal"><a href="./privacy-policy.html">Privacy</a><a href="./terms.html">Terms</a></div></div>
    <a class="back-to-top" href="#main-content" aria-label="Back to top">↑</a>`;
  document.body.append(footer);

  const toggle = header.querySelector(".nav-toggle");
  const menu = header.querySelector(".nav-content");
  const themeToggle = header.querySelector(".theme-toggle");
  const updateThemeToggle = () => {
    const darkMode = document.documentElement.dataset.theme === "dark";
    const label = darkMode ? "Switch to light mode" : "Switch to dark mode";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
    themeToggle.setAttribute("aria-pressed", String(darkMode));
    themeToggle.querySelector(".theme-toggle-icon").textContent = darkMode ? "☀" : "☾";
  };
  updateThemeToggle();
  themeToggle.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
    updateThemeToggle();
  });

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    menu.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    menu.classList.toggle("is-open", !isOpen);
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });

  const backToTop = footer.querySelector(".back-to-top");
  const updateBackToTop = () => backToTop.classList.toggle("is-visible", window.scrollY > 450);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  const emailTarget = document.querySelector("[data-business-email]");
  if (emailTarget && business.email) {
    const link = document.createElement("a");
    link.href = `mailto:${business.email}`;
    link.textContent = business.email;
    emailTarget.replaceWith(link);
  }
  const phoneTarget = document.querySelector("[data-business-phone]");
  if (phoneTarget && business.phoneDisplay && business.phoneInternational) {
    const link = document.createElement("a");
    link.href = `tel:${business.phoneInternational.replace(/[^\d+]/g, "")}`;
    link.textContent = business.phoneDisplay;
    phoneTarget.replaceWith(link);
  }
  const locationTarget = document.querySelector("[data-business-location]");
  if (locationTarget && business.location) locationTarget.textContent = business.location;

  const revealItems = document.querySelectorAll(
    ".value-card, .service-card, .project-card, .step-card, .audience-card, .price-card, " +
    ".section-heading, .about-image, .about-copy, .why-item, .faq-item, .cta-panel, " +
    ".mission-card, .service-detail"
  );
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => {
      item.classList.add("reveal");
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const quickContact = document.querySelector("[data-quick-contact]");
  if (quickContact) {
    const configuredLinks = [];
    if (business.email) configuredLinks.push(`<a class="button button-secondary" href="mailto:${encodeURIComponent(business.email)}">Email us</a>`);
    if (business.whatsappNumber) {
      const number = business.whatsappNumber.replace(/\D/g, "");
      const message = encodeURIComponent("Hello NivaanGrow, I would like to discuss digital marketing services for my business.");
      configuredLinks.push(`<a class="button button-secondary" href="https://wa.me/${number}?text=${message}" target="_blank" rel="noopener noreferrer">WhatsApp us</a>`);
    }
    if (configuredLinks.length) quickContact.innerHTML = configuredLinks.join("");
  }
})();
