/* ============================================
   script.js - Final Version for MyFixer.co.za
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navControls = document.querySelector('.nav-controls'); // For closing on outside click

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside (on overlay or logo area)
        document.addEventListener('click', (e) => {
            if (
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navControls.contains(e.target)
            ) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu on link click (better UX on mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
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
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                if (navMenu?.classList.contains('active')) {
                    hamburger?.classList.remove('active');
                    navMenu.classList.remove('active');
                }
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

            // Get Turnstile token
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
    if (document.querySelector('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
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
    if (document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            speed: 800,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            pagination: { el: '.swiper-pagination', clickable: true },
            grabCursor: true
        });
    }

    // AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
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

// Smooth scroll without changing URL (prevents anchor indexing)
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Stop the default # jump and URL change

        const targetId = this.getAttribute('href'); // e.g., "#about"
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Optional: Close mobile menu if open (common on hamburger menus)
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});