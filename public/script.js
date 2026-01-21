document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR ================= */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdown = document.querySelector(".dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  if (hamburger && navMenu) {
    // Hamburger toggle
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Mobile Services dropdown ONLY
    if (dropdown && dropdownToggle) {
      dropdownToggle.addEventListener("click", (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle("active");
        }
      });
    }

    // Close mobile menu on normal link click
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (
          window.innerWidth < 992 &&
          !link.classList.contains("dropdown-toggle")
        ) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          dropdown?.classList.remove("active");
        }
      });
    });

    // Reset on desktop resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        dropdown?.classList.remove("active");
      }
    });
  }

  /* ================= EXTERNAL LINK SECURITY ================= */
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) link.setAttribute('rel', rel + ' noopener');
    if (!rel.includes('noreferrer')) link.setAttribute('rel', (rel ? rel + ' ' : '') + 'noreferrer');
  });

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
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
    bookingForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const honeypot = bookingForm.querySelector('input[name="bot-field"]');
      if (honeypot && honeypot.value) return;

      const requiredFields = [
        { id: 'name', name: 'Name' },
        { id: 'phone', name: 'Phone Number' },
        { id: 'appliance', name: 'Appliance Type' },
        { id: 'address', name: 'Service Address' },
        { id: 'service-type', name: 'Service Type' },
        { id: 'appointment', name: 'Preferred Appointment Time' }
      ];

      let isValid = true;
      let errorMsg = 'Please fill out the following required fields:\n';

      requiredFields.forEach(field => {
        const el = document.getElementById(field.id);
        if (!el?.value.trim()) {
          isValid = false;
          errorMsg += `– ${field.name}\n`;
          el?.classList.add('error');
        } else {
          el?.classList.remove('error');
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

  /* ================= SWIPERS ================= */
  if (window.Swiper && document.querySelector('.testimonial-slider')) {
    new Swiper('.testimonial-slider', {
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 5000 }
    });
  }

  if (window.AOS) {
    AOS.init({ duration: 800, once: true });
  }

});