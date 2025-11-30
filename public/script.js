/* ============================================
   script.js - FULLY UPDATED FOR NETLIFY + EXPLICIT TURNSTILE RENDERING
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // AUTO-FIX: Add rel="noopener noreferrer" to all target="_blank" links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        const rel = link.getAttribute('rel') || '';
        if (!rel.includes('noopener')) link.setAttribute('rel', rel + ' noopener');
        if (!rel.includes('noreferrer')) link.setAttribute('rel', (rel ? rel + ' ' : '') + 'noreferrer');
    });

    // Smooth scrolling
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

    // ================== TURNSTILE EXPLICIT RENDERING ==================
    let turnstileWidgetId = null;

    function renderTurnstile() {
        if (!window.turnstile) {
            console.warn('Turnstile script not loaded yet');
            return;
        }

        const container = document.getElementById('turnstile-widget');
        if (!container) return;

        // Remove any existing widget
        if (turnstileWidgetId !== null) {
            window.turnstile.remove(turnstileWidgetId);
        }

        turnstileWidgetId = window.turnstile.render('#turnstile-widget', {
            sitekey: '0x4AAAAAACDxyOBfz7nDkjnq',
            theme: 'light',
            size: 'normal',
            retry: 'auto',
            'retry-delay': 8000,
            callback: function (token) {
                console.log('Turnstile solved:', token);
            },
            'error-callback': function () {
                console.error('Turnstile error');
            },
            'expired-callback': function () {
                console.log('Turnstile token expired');
            }
        });
    }

    // Render as soon as script is ready
    if (window.turnstile) {
        renderTurnstile();
    } else {
        // Fallback: wait for onload
        window.onloadTurnstileCallback = function () {
            renderTurnstile();
        };
    }

    // ================== Booking form submission ==================
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Honeypot check
            const honeypotField = bookingForm.querySelector('input[name="bot-field"]');
            if (honeypotField && honeypotField.value) {
                console.warn('Bot detected via honeypot');
                return;
            }

            // Basic field validation
            const requiredFields = [
                { id: 'name', name: 'Name' },
                { id: 'phone', name: 'Phone Number' },
                { id: 'appliance', name: 'Appliance Type' },
                { id: 'address', name: 'Service Address' },
                { id: 'service-type', name: 'Service Type' },
                { id: 'appointment', name: 'Preferred Appointment Time' }
            ];

            let isValid = true;
            let errorMessage = 'Please fill out the following required fields:\n';

            requiredFields.forEach(field => {
                const input = document.getElementById(field.id);
                if (!input.value.trim()) {
                    isValid = false;
                    errorMessage += `- ${field.name}\n`;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            // Get Turnstile token
            let turnstileToken = '';
            if (window.turnstile && turnstileWidgetId !== null) {
                turnstileToken = window.turnstile.getResponse(turnstileWidgetId);
            }

            if (!turnstileToken) {
                isValid = false;
                errorMessage += '- Please complete the "I’m not a robot" verification\n';
            }

            if (!isValid) {
                alert(errorMessage);
                return;
            }

            // Step 1: Verify Turnstile via Netlify Function
            try {
                const verifyResponse = await fetch('/.netlify/functions/verify-turnstile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ 'cf-turnstile-response': turnstileToken }).toString()
                });

                const verifyResult = await verifyResponse.json();

                if (!verifyResponse.ok || verifyResult.message !== 'Verified') {
                    alert('Security check failed. Please try again.');
                    window.turnstile.reset(turnstileWidgetId);
                    return;
                }
            } catch (error) {
                console.error('Turnstile verification error:', error);
                alert('Verification error. Please try again.');
                window.turnstile.reset(turnstileWidgetId);
                return;
            }

            // Step 2: Submit form to Netlify
            const formData = new FormData(bookingForm);

            try {
                const netlifyResponse = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (netlifyResponse.ok) {
                    alert('Thank you! Your request has been submitted. We\'ll contact you shortly.');
                    bookingForm.reset();
                    if (turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);

                    // Analytics
                    if (typeof fbq !== 'undefined') fbq('track', 'Schedule');
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'booking_submitted', {
                            event_category: 'Booking',
                            event_label: 'Appointment'
                        });
                    }
                } else {
                    alert('Submission failed. Please call us at +27 64 290 3654');
                }
            } catch (error) {
                console.error('Netlify submission error:', error);
                alert('Submission error. Please try again or call us directly.');
            }
        });
    }

    // Facebook Pixel events
    document.querySelectorAll('.service-btn, .btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            if (typeof fbq !== 'undefined') fbq('track', 'Lead');
        });
    });

    // Swiper testimonial slider
    if (document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            autoplay: { delay: 5005 },
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
        grabCursor: true,
    });

    // AOS init
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }

    // Stats counter
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
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
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2200;
        const start = performance.now();
        const update = now => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(update);
    }

    // Service card tracking
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', { content_name: service.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) });
            }
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const select = document.getElementById('appliance');
                if (select && service) select.value = service.replace('-', '_');
            }, 500);
        });
    });
});