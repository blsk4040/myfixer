/* ============================================
   script.js - FULLY UPDATED FOR NETLIFY FORM SUBMISSION & CENTURION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.location.href = this.getAttribute('href');
            }
        });
    });

    // Booking form submission with AJAX for Netlify
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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

            if (isValid) {
                const formData = new FormData(bookingForm);
                
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                })
                .then(response => {
                    if (response.ok) {
                        alert('Thank you! Your request has been submitted. We\'ll contact you soon to confirm.');
                        bookingForm.reset();
                        if (typeof fbq !== 'undefined') fbq('track', 'Schedule');
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'booking_submitted', {
                                'event_category': 'Booking',
                                'event_label': 'Appointment'
                            });
                        }
                    } else {
                        alert('Error submitting your form. Please try again or contact us at +27642903654.');
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    alert('Error submitting your form. Please try again or contact us at +27642903654.');
                });
            } else {
                alert(errorMessage);
            }
        });
    }

    // Facebook Pixel events
    const bookButtons = document.querySelectorAll('.service-btn, .btn-primary');
    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (typeof fbq !== 'undefined') fbq('track', 'Lead');
        });
    });

    // Initialize Swiper for testimonials
    if (document.querySelector('.swiper-container')) {
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // Google Maps initialization for Centurion
    if (document.getElementById('map')) {
        window.initMap = function() {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -25.8603, lng: 28.1891 },
                zoom: 14,
            });
            new google.maps.Marker({
                position: { lat: -25.8603, lng: 28.1891 },
                map: map,
                title: 'MyFixer - Centurion',
            });
        };
    }

    /* ============================================
       Fade-in / Slide-in Scroll Animation
    ============================================ */
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        fadeElements.forEach(el => fadeInOnScroll.observe(el));
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }

    // Service Card Click Tracking & Smooth Scroll
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceType = this.getAttribute('data-service');
            console.log('Service clicked:', serviceType);
            
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: serviceType.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                });
            }
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'service_clicked', {
                    'event_category': 'Services',
                    'event_label': serviceType,
                    'value': 1
                });
            }
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                setTimeout(() => {
                    const applianceSelect = document.getElementById('appliance');
                    if (applianceSelect && serviceType) {
                        const serviceValue = serviceType.replace('-', '_');
                        applianceSelect.value = serviceValue;
                        applianceSelect.dispatchEvent(new Event('change'));
                    }
                }, 500);
            }
        });
    });

    // Initialize Hero Carousel
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 800,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        grabCursor: true,
    });

    /* ============================================
       STATS COUNTER - FINAL, CLEAN, WORKING
       ============================================ */
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                startCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    function startCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2200;
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);
            counter.textContent = current.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        requestAnimationFrame(update);
    }
});