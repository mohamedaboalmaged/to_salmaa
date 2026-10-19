
"use strict";

// =============================
// 1. CREATE BACKGROUND STARS
// =============================

const starsContainer = document.getElementById("stars");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reducedMotion && starsContainer) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 75; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.setProperty(
      "--duration",
      2 + Math.random() * 4 + "s"
    );

    star.style.animationDelay =
      Math.random() * 4 + "s";

    fragment.appendChild(star);
  }

  starsContainer.appendChild(fragment);
}

// =============================
// 2. BACK TO TOP BUTTON
// =============================

const topButton = document.getElementById("topButton");

function updateTopButton() {
  if (!topButton) return;

  topButton.classList.toggle(
    "visible",
    window.scrollY > 350
  );
}

window.addEventListener("scroll", updateTopButton, {
  passive: true
});

updateTopButton();

if (topButton) {
  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });
}

// =============================
// 3. ACTIVE NAVIGATION LINK
// =============================

const sections = document.querySelectorAll(
  "main section[id]"
);

const navLinks = document.querySelectorAll(
  ".nav-links a"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") ===
            "#" + entry.target.id;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// =============================
// 4. FLOATING HEARTS
// =============================

if (!reducedMotion) {
  let lastHeartTime = 0;

  document.addEventListener("click", (event) => {
    // Don't create hearts when clicking controls.
    if (
      event.target.closest(
        "a, button, summary, input, textarea, select"
      )
    ) {
      return;
    }

    const now = Date.now();

    // Prevent too many hearts from being created.
    if (now - lastHeartTime < 450) return;

    lastHeartTime = now;

    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = "♡";
    heart.style.left = event.clientX + "px";

    heart.style.fontSize =
      18 + Math.random() * 16 + "px";

    document.body.appendChild(heart);

    heart.addEventListener(
      "animationend",
      () => heart.remove(),
      { once: true }
    );
  });
}
