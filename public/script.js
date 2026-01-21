/* ============================================
   script.js - Final Version for MyFixer.co.za
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (!hamburger || !navMenu) return;

  /* -----------------------------
     Hamburger toggle
  ------------------------------ */
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  /* -----------------------------
     Mobile Services dropdown ONLY
  ------------------------------ */
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      }
    });
  }

  /* -----------------------------
     Close mobile menu on NORMAL link click
     (but NOT Services)
  ------------------------------ */
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 991 &&
        !link.classList.contains("dropdown-toggle")
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        if (dropdownMenu) {
          dropdownMenu.style.display = "none";
        }
      }
    });
  });

  /* -----------------------------
     Reset styles when resizing to desktop
  ------------------------------ */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      if (dropdownMenu) dropdownMenu.style.display = "";
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // ───────────────────────────────────────────────
  // Everything below this line is preserved from your original script.js
  // ───────────────────────────────────────────────

  /* ================= EXTERNAL LINK SECURITY ================= */
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) link.setAttribute('rel', rel + ' noopener');
    if (!rel.includes('noreferrer')) link.setAttribute('rel', (rel ? rel + ' ' : '') + 'noreferrer');
  });

  /* ================= SMOOTH SCROLL for .scroll-link ================= */
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Also close mobile menu if open
        document.querySelector('.nav-menu')?.classList.remove('active');
        document.querySelector('.hamburger')?.classList.remove('active');
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

      const turnstileResponse = document.querySelector('input[name="cf-turnstile-response"]')?.value || '';
      if (!turnstileResponse) {
        alert('Please complete the robot verification.');
        return;
      }

      if (!isValid) {
        alert(errorMsg);
        return;
      }

      try {
        const verifyRes = await fetch('/.netlify/functions/verify-turnstile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ 'cf-turnstile-response': turnstileResponse })
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || verifyData.message !== 'Verified') {
          alert('Security verification failed.');
          return;
        }
      } catch {
        alert('Verification error.');
        return;
      }

      const formData = new FormData(bookingForm);

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
          alert('Thank you! Your request has been submitted.');
          bookingForm.reset();
        } else {
          alert('Submission failed.');
        }
      } catch {
        alert('Something went wrong.');
      }
    });
  }

  /* ================= SWIPERS ================= */
  if (document.querySelector('.testimonial-slider')) {
    new Swiper('.testimonial-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 5000 },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 5000 },
      effect: 'fade'
    });
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }
});