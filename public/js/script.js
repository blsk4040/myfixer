function initSite() {
  /* ================= NAVBAR ================= */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (hamburger && navMenu && hamburger.dataset.initialized !== "true") {
    hamburger.dataset.initialized = "true";

    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // First-level dropdowns
  document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
    if (toggle.dataset.initialized === "true") return;
    toggle.dataset.initialized = "true";

    toggle.addEventListener("click", (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();

        const parentDropdown = toggle.closest(".dropdown");
        if (parentDropdown) {
          const isActive = parentDropdown.classList.contains("active");

          dropdowns.forEach(d => {
            if (d !== parentDropdown) {
              d.classList.remove("active");
              const otherToggle = d.querySelector(".dropdown-toggle");
              if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
            }
          });

          if (isActive) {
            parentDropdown.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
          } else {
            parentDropdown.classList.add("active");
            toggle.setAttribute("aria-expanded", "true");
          }
        }
      }
    });
  });

  // Submenus
  document.querySelectorAll(".submenu-toggle").forEach(toggle => {
    if (toggle.dataset.initialized === "true") return;
    toggle.dataset.initialized = "true";

    toggle.addEventListener("click", (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();

        const parentSubLi = toggle.parentElement;

        if (parentSubLi && parentSubLi.classList.contains("dropdown-submenu")) {
          const parentDropdown = toggle.closest(".dropdown");
          const isActive = parentSubLi.classList.contains("active");

          if (parentDropdown) {
            parentDropdown.querySelectorAll(".dropdown-submenu").forEach(other => {
              if (other !== parentSubLi) other.classList.remove("active");
            });
          }

          if (isActive) {
            parentSubLi.classList.remove("active");
          } else {
            parentSubLi.classList.add("active");
          }
        }
      }
    });
  });

  // Close menu on final link click
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach(link => {
      if (link.dataset.initialized === "true") return;
      link.dataset.initialized = "true";

      link.addEventListener("click", () => {
        if (
          window.innerWidth < 992 &&
          !link.classList.contains("dropdown-toggle") &&
          !link.classList.contains("submenu-toggle")
        ) {
          hamburger?.classList.remove("active");
          navMenu.classList.remove("active");
          dropdowns.forEach(d => d.classList.remove("active"));
          document.querySelectorAll(".dropdown-submenu.active").forEach(s => s.classList.remove("active"));
          document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
            toggle.setAttribute("aria-expanded", "false");
          });
        }
      });
    });
  }

  // Reset on resize
  if (!window.siteResizeBound) {
    window.siteResizeBound = true;

    window.addEventListener("resize", () => {
      const hamburgerNow = document.querySelector(".hamburger");
      const navMenuNow = document.querySelector(".nav-menu");

      if (window.innerWidth >= 992) {
        hamburgerNow?.classList.remove("active");
        navMenuNow?.classList.remove("active");
        document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
        document.querySelectorAll(".dropdown-submenu.active").forEach(s => s.classList.remove("active"));
        document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
          toggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  /* ================= EXTERNAL LINK SECURITY ================= */
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    let rel = link.getAttribute("rel") || "";
    if (!rel.includes("noopener")) rel += " noopener";
    if (!rel.includes("noreferrer")) rel += " noreferrer";
    link.setAttribute("rel", rel.trim());
  });

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll(".scroll-link").forEach(link => {
    if (link.dataset.scrollInitialized === "true") return;
    link.dataset.scrollInitialized = "true";

    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (!href || (!href.startsWith("#") && !href.includes("#"))) return;

      const hash = href.includes("#") ? href.substring(href.indexOf("#")) : href;
      const target = document.querySelector(hash);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });

        hamburger?.classList.remove("active");
        navMenu?.classList.remove("active");
      }
    });
  });

  /* ================= BOOKING FORM ================= */
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm && bookingForm.dataset.initialized !== "true") {
    bookingForm.dataset.initialized = "true";

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const honeypot = bookingForm.querySelector('input[name="bot-field"]');
      if (honeypot && honeypot.value) return;

      const requiredFields = [
        { id: "name", name: "Name" },
        { id: "phone", name: "Phone Number" },
        { id: "appliance", name: "Appliance Type" },
        { id: "service-type", name: "Service Type" },
        { id: "address", name: "Service Address" },
        { id: "appointment", name: "Preferred Date & Time" }
      ];

      let isValid = true;
      let errorMsg = "Please fill out the following required fields:\n";

      requiredFields.forEach(field => {
        const el = document.getElementById(field.id);

        if (!el || !el.value.trim()) {
          isValid = false;
          errorMsg += `– ${field.name}\n`;
          el?.classList.add("error");
        } else {
          el.classList.remove("error");
        }
      });

      if (!isValid) {
        alert(errorMsg);
        return;
      }

      bookingForm.reset();
      alert("Thank you! Your request has been submitted.");
    });
  }

  /* ================= SWIPER ================= */
  if (typeof Swiper !== "undefined") {
    const heroSwiperEl = document.querySelector(".hero-swiper");
    if (heroSwiperEl && !heroSwiperEl.swiper) {
      new Swiper(".hero-swiper", {
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        },
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 1000
      });
    }

    const testimonialEl = document.querySelector(".testimonial-slider");
    if (testimonialEl && !testimonialEl.swiper) {
      new Swiper(testimonialEl, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    }
  } else {
    console.warn("Swiper not loaded");
  }

  /* ================= AOS ================= */
  if (window.AOS && !window.aosInitialized) {
    window.aosInitialized = true;

    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: "ease-in-out",
      disable: "mobile"
    });

    window.addEventListener("load", () => {
      AOS.refresh();
    });
  } else if (!window.AOS) {
    console.warn("AOS not loaded");
  }

  /* ================= ACTIVE LINK ================= */
  if (navMenu) {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const currentHash = window.location.hash;

    navMenu.querySelectorAll("a").forEach(link => {
      const href = link.getAttribute("href") || "";

      if (
        href === currentPath ||
        href === currentHash ||
        href.endsWith(currentPath) ||
        (currentHash && href.includes(currentHash))
      ) {
        link.classList.add("active");
      }
    });
  }

  /* ================= WHATSAPP FLOATING ================= */
  if (typeof window.initWhatsAppWidget === "function") {
    window.initWhatsAppWidget();
  }
}

/* ================= WHATSAPP FLOATING ================= */
window.initWhatsAppWidget = function () {
  const toggle = document.getElementById("whatsappToggle");
  const chat = document.getElementById("whatsappChat");
  const closeBtn = document.getElementById("whatsappClose");

  if (!toggle || !chat || !closeBtn) return;

  if (toggle.dataset.initialized === "true") return;
  toggle.dataset.initialized = "true";

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chat.style.display = "none";
  });

  document.addEventListener("click", (e) => {
    if (!chat.contains(e.target) && !toggle.contains(e.target)) {
      chat.style.display = "none";
    }
  });
};

/* ================= INITIAL LOAD ================= */
document.addEventListener("DOMContentLoaded", initSite);
window.initSite = initSite;