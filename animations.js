/**
 * ========================================
 * MEZEMER CATERING - ANIMATIONS JS
 * ========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ========================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add reveal-active class
                entry.target.classList.add('reveal-active');
                
                // For images, add img-scale-active
                const img = entry.target.querySelector('.img-scale');
                if (img) {
                    img.classList.add('img-scale-active');
                }
                
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });


    // ========================================
    // NAVBAR SCROLL EFFECT - Hide on scroll down, show on scroll up
    // ========================================
    
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow and scrolled class when past 100px
        if (currentScroll > 100) {
            navbar.classList.add('shadow-lg');
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.remove('scrolled');
        }
        
        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - hide navbar
            navbar.classList.add('-translate-y-full');
            navbar.classList.remove('translate-y-0');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('translate-y-0');
        }
        
        lastScroll = currentScroll;
    });


    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ========================================
    // PARALLAX EFFECT FOR HERO
    // ========================================
    
    const heroSection = document.querySelector('.hero-scale');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
            }
        });
    }


    // ========================================
    // IMAGE LAZY LOADING
    // ========================================
    
    const imageObserverOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, imageObserverOptions);

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });


    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================
    
    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });


    // ========================================
    // NAVBAR LINK ACTIVE STATE
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-gold');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-gold');
            }
        });
    });


    // ========================================
    // BUTTON HOVER EFFECTS
    // ========================================
    
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });


    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'fixed bottom-8 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-gold text-cream rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-50';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.remove('opacity-0');
            scrollToTopBtn.classList.add('opacity-100');
        } else {
            scrollToTopBtn.classList.remove('opacity-100');
            scrollToTopBtn.classList.add('opacity-0');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ========================================
    // PREVENT FLASH OF UNSTYLED CONTENT
    // ========================================
    
    document.body.classList.add('loaded');


    // ========================================
    // ACCESSIBILITY: REDUCE MOTION
    // ========================================
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.reveal, .img-scale, .hero-scale').forEach(el => {
            el.classList.add('reveal-active');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // ========================================
    // MOBILE HAMBURGER TOGGLE
    // ========================================
    const mobileHamburger = document.getElementById('mobile-hamburger');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileHamburger && mobileMenuOverlay) {
        const closeMenu = () => {
            mobileHamburger.setAttribute('aria-expanded', 'false');
            mobileMenuOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            mobileHamburger.setAttribute('aria-label', 'Open menu');
            mobileHamburger.blur();
        };

        const openMenu = () => {
            mobileHamburger.setAttribute('aria-expanded', 'true');
            mobileMenuOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            mobileHamburger.setAttribute('aria-label', 'Close menu');
            // Do not auto-focus the first menu item so it does not appear pre-selected
            // Auto-close after 5 seconds
            setTimeout(() => {
                if (mobileMenuOverlay.getAttribute('aria-hidden') === 'false') {
                    closeMenu();
                }
            }, 5000);
        };

        mobileHamburger.addEventListener('click', () => {
            const expanded = mobileHamburger.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMenu(); else openMenu();
        });

        // Close when clicking overlay background
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) closeMenu();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.getAttribute('aria-hidden') === 'false') {
                closeMenu();
            }
        });

        // Ensure links close menu when navigating
        mobileMenuOverlay.querySelectorAll('.mobile-menu-item').forEach(a => {
            a.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

}); // End DOMContentLoaded


/**
 * Optional: Add more advanced animations here
 * - Sticky header with blur effect
 * - Image gallery lightbox
 * - Form validation animations
 * - Loading states
 * - etc.
 */