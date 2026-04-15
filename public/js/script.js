document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR ================= */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (hamburger && navMenu) {

    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // First-level dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          e.stopPropagation();

          const parentDropdown = toggle.closest('.dropdown');
          if (parentDropdown) {
            parentDropdown.classList.toggle("active");

            dropdowns.forEach(d => {
              if (d !== parentDropdown) d.classList.remove("active");
            });
          }
        }
      });
    });

    // Submenus
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          e.stopPropagation();

          const parentSubLi = toggle.parentElement;

          if (parentSubLi && parentSubLi.classList.contains('dropdown-submenu')) {
            parentSubLi.classList.toggle('active');

            const parentDropdown = toggle.closest('.dropdown');

            if (parentDropdown) {
              parentDropdown.querySelectorAll('.dropdown-submenu.active').forEach(other => {
                if (other !== parentSubLi) other.classList.remove('active');
              });
            }
          }
        }
      });
    });

    // Close menu on final link click
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (
          window.innerWidth < 992 &&
          !link.classList.contains("dropdown-toggle") &&
          !link.classList.contains("submenu-toggle")
        ) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          dropdowns.forEach(d => d.classList.remove("active"));
          document.querySelectorAll('.dropdown-submenu.active').forEach(s => s.classList.remove('active'));
        }
      });
    });

    // Reset on resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        dropdowns.forEach(d => d.classList.remove("active"));
        document.querySelectorAll('.dropdown-submenu.active').forEach(s => s.classList.remove('active'));
      }
    });
  }

  /* ================= EXTERNAL LINK SECURITY ================= */
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    let rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) rel += ' noopener';
    if (!rel.includes('noreferrer')) rel += ' noreferrer';
    link.setAttribute('rel', rel.trim());
  });

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
      }
    });
  });

  /* ================= BOOKING FORM ================= */
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const honeypot = bookingForm.querySelector('input[name="bot-field"]');
      if (honeypot && honeypot.value) return;

      const requiredFields = [
        { id: 'name', name: 'Name' },
        { id: 'phone', name: 'Phone Number' },
        { id: 'service-category', name: 'Service Category' },
        { id: 'service-type', name: 'Service Type' },
        { id: 'address', name: 'Service Address' },
        { id: 'appointment', name: 'Preferred Date & Time' }
      ];

      let isValid = true;
      let errorMsg = 'Please fill out the following required fields:\n';

      requiredFields.forEach(field => {
        const el = document.getElementById(field.id);

        if (!el || !el.value.trim()) {
          isValid = false;
          errorMsg += `– ${field.name}\n`;
          el?.classList.add('error');
        } else {
          el.classList.remove('error');
        }
      });

      if (!isValid) {
        alert(errorMsg);
        return;
      }

      bookingForm.reset();
      alert('Thank you! Your request has been submitted.');
    });
  }

  /* ================= SWIPER ================= */

  // Hero Swiper
  if (typeof Swiper !== "undefined") {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1000
    });
  } else {
    console.warn("Swiper not loaded");
  }

  // Testimonial Swiper
  const testimonialEl = document.querySelector('.testimonial-slider');

  if (testimonialEl && typeof Swiper !== "undefined") {
    new Swiper(testimonialEl, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  /* ================= AOS ================= */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: 'ease-in-out',
      disable: 'mobile'
    });

    window.addEventListener('load', () => {
      AOS.refresh();
    });
  } else {
    console.warn("AOS not loaded");
  }

  /* ================= ACTIVE LINK ================= */
  if (navMenu) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;

    navMenu.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href') || '';

      if (
        href === currentPath ||
        href === currentHash ||
        href.endsWith(currentPath) ||
        (currentHash && href.includes(currentHash))
      ) {
        link.classList.add('active');
      }
    });
  }

});

 /* ================= WhatsApp Floating ================= */


 document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("whatsappToggle");
    const chat = document.getElementById("whatsappChat");
    const closeBtn = document.getElementById("whatsappClose");

    if (toggle && chat && closeBtn) {

        toggle.addEventListener("click", () => {
            chat.style.display = chat.style.display === "flex" ? "none" : "flex";
        });

        closeBtn.addEventListener("click", () => {
            chat.style.display = "none";
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!chat.contains(e.target) && !toggle.contains(e.target)) {
                chat.style.display = "none";
            }
        });

    }

});