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
    let scrollTicking = false;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        // Navbar shadow + hide/show
        if (currentScroll > 100) {
            navbar.classList.add('shadow-lg', 'scrolled');
        } else {
            navbar.classList.remove('shadow-lg', 'scrolled');
        }
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('-translate-y-full');
            navbar.classList.remove('translate-y-0');
        } else {
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('translate-y-0');
        }

        // Parallax
        if (heroSection && currentScroll < heroSection.offsetHeight) {
            heroSection.style.transform = `translateY(${currentScroll * 0.5}px) scale(1.1)`;
        }

        // Active nav section
        let current = '';
        sections.forEach(section => {
            if (currentScroll >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('nav-active');
            }
        });

        // Scroll-to-top button visibility
        if (currentScroll > 500) {
            scrollToTopBtn.classList.remove('opacity-0');
            scrollToTopBtn.classList.add('opacity-100');
        } else {
            scrollToTopBtn.classList.remove('opacity-100');
            scrollToTopBtn.classList.add('opacity-0');
        }

        lastScroll = currentScroll;
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(handleScroll);
            scrollTicking = true;
        }
    }, { passive: true });


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
    // PARALLAX EFFECT FOR HERO (handled in unified scroll handler)
    // ========================================
    
    const heroSection = document.querySelector('.hero-scale');


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
    // NAVBAR LINK ACTIVE STATE (handled in unified scroll handler)
    // ========================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');


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

    // Scroll-to-top visibility handled in unified scroll handler

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

    // ========================================
    // MENU BUTTON TOGGLE FUNCTIONALITY
    // ========================================
    const menuButtons = document.querySelectorAll('.menu-btn');
    const submenuButtons = document.querySelectorAll('.submenu-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuType = this.getAttribute('data-menu');
            
            // Hide all menu contents
            menuContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Remove active state from all buttons
            menuButtons.forEach(btn => {
                btn.classList.remove('bg-gold', 'text-cream');
                btn.classList.add('text-navy');
            });
            
            // Show selected menu content if it exists
            const selectedMenu = document.getElementById(`menu-${menuType}`);
            if (selectedMenu) {
                selectedMenu.classList.remove('hidden');
                // Add active state to clicked button
                this.classList.remove('text-navy');
                this.classList.add('bg-gold', 'text-cream');
            }
        });
    });

    // Submenu button functionality for Menu I/II selection
    submenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenuType = this.getAttribute('data-submenu');
            
            // Hide all menu contents except the submenu selector
            menuContents.forEach(content => {
                if (content.id !== 'menu-15') {
                    content.classList.add('hidden');
                }
            });
            
            // Remove active state from all submenu buttons
            submenuButtons.forEach(btn => {
                btn.classList.remove('bg-gold', 'text-cream');
                btn.classList.add('text-navy');
            });
            
            // Show selected submenu content
            const selectedSubmenu = document.getElementById(`menu-${submenuType}`);
            if (selectedSubmenu) {
                selectedSubmenu.classList.remove('hidden');
                // Add active state to clicked button
                this.classList.remove('text-navy');
                this.classList.add('bg-gold', 'text-cream');
            }
        });
    });

}); // End DOMContentLoaded


/**
 * Optional: Add more advanced animations here
 * - Sticky header with blur effect
 * - Image gallery lightbox
 * - Form validation animations
 * - Loading states
 * - etc.
 */
