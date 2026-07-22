(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const typewriter = document.querySelector("[data-typewriter]");
  const year = document.querySelector("[data-year]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (typewriter) {
    const phrases = (typewriter.dataset.phrases || "")
      .split("|")
      .map((phrase) => phrase.trim())
      .filter(Boolean);

    if (phrases.length > 1) {
      let phraseIndex = 0;
      let characterIndex = phrases[0].length;
      let isDeleting = true;
      let typewriterTimer;

      const scheduleTypewriter = (delay) => {
        window.clearTimeout(typewriterTimer);
        typewriterTimer = window.setTimeout(runTypewriter, delay);
      };

      const runTypewriter = () => {
        if (document.hidden || reduceMotion.matches) return;

        const phrase = phrases[phraseIndex];

        if (isDeleting) {
          characterIndex = Math.max(0, characterIndex - 1);
          typewriter.textContent = phrase.slice(0, characterIndex);

          if (characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            scheduleTypewriter(260);
          } else {
            scheduleTypewriter(42);
          }
          return;
        }

        const nextPhrase = phrases[phraseIndex];
        characterIndex = Math.min(nextPhrase.length, characterIndex + 1);
        typewriter.textContent = nextPhrase.slice(0, characterIndex);

        if (characterIndex === nextPhrase.length) {
          isDeleting = true;
          scheduleTypewriter(1900);
        } else {
          scheduleTypewriter(74);
        }
      };

      const syncTypewriterMotion = () => {
        window.clearTimeout(typewriterTimer);

        if (reduceMotion.matches) {
          typewriter.textContent = "Curious & innovative";
          return;
        }

        phraseIndex = 0;
        characterIndex = phrases[0].length;
        isDeleting = true;
        typewriter.textContent = phrases[0];
        scheduleTypewriter(1900);
      };

      document.addEventListener("visibilitychange", () => {
        window.clearTimeout(typewriterTimer);
        if (!document.hidden && !reduceMotion.matches) scheduleTypewriter(240);
      });

      reduceMotion.addEventListener?.("change", syncTypewriterMotion);
      syncTypewriterMotion();
    }
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const setMenuOpen = (
    open,
    { returnFocus = false, focusFirst = false, instant = false } = {}
  ) => {
    if (!navToggle || !navMenu) return;

    if (instant) navMenu.classList.add("is-instant");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    navMenu.classList.toggle("is-open", open);
    header?.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("menu-open", open);

    if (open && focusFirst) {
      navMenu.querySelector("a")?.focus({ preventScroll: true });
    } else if (returnFocus) {
      navToggle.focus({ preventScroll: true });
    }

    if (instant) {
      requestAnimationFrame(() => navMenu.classList.remove("is-instant"));
    }
  };

  navToggle?.addEventListener("click", (event) => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    const keyboardInitiated = event.detail === 0;
    setMenuOpen(willOpen, {
      focusFirst: keyboardInitiated,
      instant: keyboardInitiated,
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, { returnFocus: true, instant: true });
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (
      navToggle?.getAttribute("aria-expanded") === "true" &&
      !navMenu?.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && navToggle?.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, { instant: true });
    }
  });

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${visible.target.id}`;
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-22% 0px -62%", threshold: [0, 0.2, 0.5] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealItems = [...document.querySelectorAll(".reveal")];

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

})();
