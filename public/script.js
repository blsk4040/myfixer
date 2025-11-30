/* ============================================
   script.js - Updated for AUTOMATIC Cloudflare Turnstile + Netlify
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Add rel="noopener noreferrer" to external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        const rel = link.getAttribute('rel') || '';
        if (!rel.includes('noopener')) link.setAttribute('rel', rel + ' noopener');
        if (!rel.includes('noreferrer')) link.setAttribute('rel', (rel ? rel + ' ' : '') + 'noreferrer');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = this.getAttribute('href');
            }
        });
    });

    // ================== BOOKING FORM SUBMISSION (AUTOMATIC TURNSTILE) ==================
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Honeypot check
            const honeypot = bookingForm.querySelector('input[name="bot-field"]');
            if (honeypot && honeypot.value) {
                console.warn('Bot detected');
                return;
            }

            // Required fields validation
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

            // Get Turnstile token (automatic mode – Cloudflare adds hidden input automatically)
            const turnstileResponse = document.querySelector('input[name="cf-turnstile-response"]')?.value || '';
            if (!turnstileResponse) {
                isValid = false;
                errorMsg += '– Please complete the "I’m not a robot" verification\n';
            }

            if (!isValid) {
                alert(errorMsg);
                return;
            }

            // Step 1: Verify Turnstile token via Netlify Function
            try {
                const verifyRes = await fetch('/.netlify/functions/verify-turnstile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ 'cf-turnstile-response': turnstileResponse })
                });

                const verifyData = await verifyRes.json();
                if (!verifyRes.ok || verifyData.message !== 'Verified') {
                    alert('Security verification failed. Please try again.');
                    return;
                }
            } catch (err) {
                console.error('Turnstile verification error:', err);
                alert('Verification error. Please try again.');
                return;
            }

            // Step 2: Submit form to Netlify
            const formData = new FormData(bookingForm);

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    alert('Thank you! Your request has been submitted. We\'ll contact you shortly.');
                    bookingForm.reset();
                    // Turnstile auto-resets in automatic mode
                    if (typeof fbq !== 'undefined') fbq('track', 'Schedule');
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'booking_submitted', { event_category: 'Booking', event_label: 'Appointment' });
                    }
                } else {
                    alert('Submission failed. Please call us at +27 64 290 3654');
                }
            } catch (err) {
                console.error('Submission error:', err);
                alert('Something went wrong. Please try again or call us directly.');
            }
        });
    }

    // Facebook Pixel – Lead on button clicks
    document.querySelectorAll('.service-btn, .btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof fbq !== 'undefined') fbq('track', 'Lead');
        });
    });

    // Swiper – Testimonial slider
    if (document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            autoplay: { delay: 5000, disableOnInteraction: false },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Hero carousel
    new Swiper('.hero-swiper', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 800,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        pagination: { el: '.swiper-pagination', clickable: true },
        grabCursor: true
    });

    // AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }

    // Stats counter
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    startCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => observer.observe(c));
    }

    function startCounter(el) {
        const target = +el.getAttribute('data-target');
        const duration = 2200;
        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(update);
    }

    // Service card click → scroll to form + prefill appliance
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: service.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                });
            }
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const select = document.getElementById('appliance');
                if (select && service) select.value = service.replace('-', '_');
            }, 500);
        });
    });
});