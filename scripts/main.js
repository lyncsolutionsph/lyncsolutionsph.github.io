// ========================================
// SEER - Futuristic Cybersecurity UI
// Modern Animations & Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Create animated background
    createAnimatedBackground();
    
    // Initialize all modules
    initLoadingScreen();
    initNavigation();
    initSmoothScroll();
    initScrollReveal();
    initParallaxOrbs();
    initCounterAnimation();
    initMarquee();
    initHoverEffects();
    initModelViewer();
    initFormValidation();
    initIdealForOverlay();
});

// ========================================
// Animated Background
// ========================================
function createAnimatedBackground() {
    // Create page background
    const pageBg = document.createElement('div');
    pageBg.className = 'page-bg';
    document.body.insertBefore(pageBg, document.body.firstChild);
    
    // Create hero orbs
    const hero = document.querySelector('.hero');
    if (hero) {
        const orb1 = document.createElement('div');
        orb1.className = 'hero-orb hero-orb-1';
        hero.appendChild(orb1);
        
        const orb2 = document.createElement('div');
        orb2.className = 'hero-orb hero-orb-2';
        hero.appendChild(orb2);
    }
}

// ========================================
// Loading Screen
// ========================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    
    // Minimum display time for effect
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        setTimeout(() => {
            triggerHeroAnimations();
        }, 100);
    }, 1500);
}

function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons, .trust-badges');
    
    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 120);
    });
    
    // Animate hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            heroVisual.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'scale(1)';
        }, 400);
    }
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navbar) return;
    
    // Navbar scroll effect
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ========================================
// Smooth Scrolling
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Reveal Animations
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .section-header, .bento-card, .step-card, .step, .use-case-card, .feature-card, .stat-item, .stat-card, .about-feature, .certification-item');
    
    if (!revealElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// ========================================
// Parallax Orbs on Mouse Move
// ========================================
function initParallaxOrbs() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const orbs = document.querySelectorAll('.hero-orb');
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = hero.getBoundingClientRect();
        
        const x = (clientX - left - width / 2) / width;
        const y = (clientY - top - height / 2) / height;
        
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 30;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
    
    hero.addEventListener('mouseleave', () => {
        orbs.forEach(orb => {
            orb.style.transform = 'translate(0, 0)';
            orb.style.transition = 'transform 0.5s ease';
        });
    });
}

// ========================================
// Counter Animation
// ========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value, .stat-number, .stat-highlight-value');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const type = element.dataset.type;
    const duration = 2000;
    const start = performance.now();
    
    // Handle text-based animation (like "Zero")
    if (type === 'text') {
        const finalText = element.dataset.text || element.textContent;
        const scrambleChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const textLength = finalText.length;
        
        function updateText(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            let displayText = '';
            for (let i = 0; i < textLength; i++) {
                if (i < textLength * easeOutQuart) {
                    displayText += finalText[i];
                } else {
                    displayText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }
            }
            
            element.textContent = displayText;
            
            if (progress < 1) {
                requestAnimationFrame(updateText);
            } else {
                element.textContent = finalText;
            }
        }
        
        element.textContent = scrambleChars.substring(0, textLength);
        requestAnimationFrame(updateText);
        return;
    }
    
    // Handle number-based animations
    const target = parseInt(element.dataset.count) || 0;
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        // Format based on type
        if (type === 'time') {
            element.innerHTML = `${prefix}${current}<span>${suffix}</span>`;
        } else if (type === 'special') {
            element.textContent = `${current}${suffix}`;
        } else {
            element.textContent = `${prefix}${current}${suffix}`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Final value
            if (type === 'time') {
                element.innerHTML = `${prefix}${target}<span>${suffix}</span>`;
            } else if (type === 'special') {
                element.textContent = `${target}${suffix}`;
            } else {
                element.textContent = `${prefix}${target}${suffix}`;
            }
        }
    }
    
    // Start from 0
    if (type === 'time') {
        element.innerHTML = `${prefix}0<span>${suffix}</span>`;
    } else if (type === 'special') {
        element.textContent = `0${suffix}`;
    } else {
        element.textContent = `${prefix}0${suffix}`;
    }
    
    requestAnimationFrame(update);
}

// ========================================
// Marquee Animation
// ========================================
function initMarquee() {
    const marqueeContainers = document.querySelectorAll('.marquee-container');
    
    marqueeContainers.forEach(container => {
        const content = container.querySelector('.marquee-content');
        if (!content) return;
        
        // Clone content for seamless loop
        const clone = content.cloneNode(true);
        container.appendChild(clone);
    });
}

// ========================================
// Hover Effects
// ========================================
function initHoverEffects() {
    // Card tilt effect
    const cards = document.querySelectorAll('.bento-card, .use-case-card, .feature-card, .step-card, .step, .product-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn-glow, .btn-primary, .btn-glass, .btn-secondary, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframes
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// Model Viewer
// ========================================
function initModelViewer() {
    const modelViewer = document.querySelector('model-viewer');
    if (!modelViewer) return;
    
    // Add glow effect container
    const container = modelViewer.closest('.hero-device, .model-container, .hero-visual');
    if (container && !container.querySelector('.device-glow')) {
        const glow = document.createElement('div');
        glow.className = 'device-glow';
        container.insertBefore(glow, container.firstChild);
    }
    
    // Store original camera orbit settings
    const originalOrbit = '0deg 68deg 2.8m';
    const originalFov = '30deg';
    let isAtTop = true;
    
    // Smooth scroll-based model interaction
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 800;
        
        if (modelViewer.loaded) {
            // When scrolled past hero, slightly rotate
            if (scrollY > 50) {
                if (isAtTop) {
                    // Subtle rotation when scrolling down
                    const rotationAmount = Math.min(scrollY * 0.02, 15);
                    modelViewer.cameraOrbit = `${rotationAmount}deg 68deg 2.8m`;
                    isAtTop = false;
                }
            } else {
                // Reset to original when back at top
                if (!isAtTop || scrollY <= 10) {
                    modelViewer.cameraOrbit = originalOrbit;
                    modelViewer.fieldOfView = originalFov;
                    isAtTop = true;
                }
            }
        }
    }, { passive: true });
    
    // Ensure model resets on page load/refresh
    modelViewer.addEventListener('load', () => {
        modelViewer.cameraOrbit = originalOrbit;
        modelViewer.fieldOfView = originalFov;
    });
}

// ========================================
// Form Validation
// ========================================
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// ========================================
// Utility Functions
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Preload Critical Assets
// ========================================
window.addEventListener('load', () => {
    // Preload images
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
});

// ========================================
// Accessibility Enhancements
// ========================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// ========================================
// Ideal For Dropdown
// ========================================
function initIdealForOverlay() {
    const dropdown = document.getElementById('ideal-dropdown');
    const dropdownArrow = dropdown?.querySelector('.ideal-dropdown-arrow');
    const tagsContainer = document.querySelector('.ideal-for-tags');
    const tags = document.querySelectorAll('.ideal-tag');
    
    if (!dropdown || !tags.length) return;
    
    let currentActiveTag = null;
    
    // Content for each category
    const categoryContent = {
        homes: {
            icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
            title: 'Perfect for Homes',
            description: 'Protect your family and personal data with enterprise-grade security that\'s simple to set up and use.',
            features: [
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                    title: 'Family-Safe Browsing',
                    description: 'Automatically blocks malicious websites and protects all connected devices.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/></svg>',
                    title: 'Smart Home Protection',
                    description: 'Secure your smart home devices from hackers with zero technical skills required.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
                    title: 'Simple Management',
                    description: 'View security status and manage parental controls through an intuitive dashboard.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
                    title: 'Set and Forget',
                    description: 'Automatic updates and 24/7 monitoring ensure continuous protection.'
                }
            ]
        },
        offices: {
            icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/></svg>',
            title: 'Built for Small & Medium Offices',
            description: 'Enterprise-grade protection designed specifically for businesses without dedicated IT teams.',
            features: [
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                    title: 'Business Data Protection',
                    description: 'Safeguard customer data, financial records, and intellectual property.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
                    title: 'Compliance Made Easy',
                    description: 'Meet PCI DSS, ISO 27001, and GDPR requirements with automated reporting.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
                    title: 'Minimize Downtime',
                    description: 'Prevent costly ransomware attacks and data breaches that halt operations.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
                    title: 'Cost-Effective Security',
                    description: 'Enterprise-level protection at SME-friendly pricing with no hidden fees.'
                }
            ]
        },
        schools: {
            icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
            title: 'Designed for Schools',
            description: 'Create a safe digital learning environment while protecting student data and educational resources.',
            features: [
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                    title: 'Student Safety First',
                    description: 'Block inappropriate content and protect students from online threats.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
                    title: 'Protect Student Records',
                    description: 'Secure academic records and comply with data privacy regulations.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
                    title: 'Network Segmentation',
                    description: 'Separate student, faculty, and administrative networks for enhanced security.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
                    title: 'Easy IT Management',
                    description: 'Monitor threats and manage policies without extensive training.'
                }
            ]
        },
        clinics: {
            icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
            title: 'Healthcare & Clinics',
            description: 'HIPAA-ready security for medical facilities to protect patient health information and ensure compliance.',
            features: [
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
                    title: 'PHI Protection',
                    description: 'Safeguard Protected Health Information with encryption and access controls.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/></svg>',
                    title: 'Medical Device Security',
                    description: 'Protect connected medical devices from cyber threats.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
                    title: 'HIPAA Compliance',
                    description: 'Built-in features for HIPAA compliance including audit logging.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
                    title: 'No Downtime',
                    description: 'Ensure patient care continuity with 24/7 protection.'
                }
            ]
        },
        cafes: {
            icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
            title: 'Perfect for Cafes & Public Spaces',
            description: 'Provide safe public WiFi while protecting your business operations and customer data.',
            features: [
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
                    title: 'Safe Guest WiFi',
                    description: 'Offer customers secure internet access while protecting your business network.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>',
                    title: 'Network Separation',
                    description: 'Isolate customer WiFi from your POS systems and business operations.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
                    title: 'POS Protection',
                    description: 'Secure payment systems with PCI DSS-compliant network security.'
                },
                {
                    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
                    title: 'Simple Setup',
                    description: 'Plug in SEER and start protecting in under 5 minutes.'
                }
            ]
        }
    };
    
    // Open dropdown
    function openDropdown(category, clickedTag) {
        const content = categoryContent[category];
        if (!content) return;
        
        // Close if clicking the same tag
        if (currentActiveTag === clickedTag && dropdown.classList.contains('active')) {
            closeDropdown();
            return;
        }
        
        // Set content
        dropdown.querySelector('.ideal-dropdown-icon').innerHTML = content.icon;
        dropdown.querySelector('.ideal-dropdown-title').textContent = content.title;
        dropdown.querySelector('.ideal-dropdown-description').textContent = content.description;
        
        // Set features
        const featuresContainer = dropdown.querySelector('.ideal-dropdown-features');
        featuresContainer.innerHTML = content.features.map(feature => `
            <div class="ideal-dropdown-feature">
                <div class="ideal-dropdown-feature-icon">
                    ${feature.icon}
                </div>
                <div class="ideal-dropdown-feature-content">
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            </div>
        `).join('');
        
        // Remove active from all tags
        tags.forEach(tag => tag.classList.remove('active'));
        
        // Add active to clicked tag
        clickedTag.classList.add('active');
        currentActiveTag = clickedTag;
        
        // Position arrow to point at clicked tag
        if (dropdownArrow && tagsContainer) {
            const tagRect = clickedTag.getBoundingClientRect();
            const containerRect = tagsContainer.getBoundingClientRect();
            const dropdownRect = dropdown.getBoundingClientRect();
            
            // Calculate the center of the tag relative to the dropdown
            const tagCenterX = tagRect.left + (tagRect.width / 2);
            const dropdownLeft = containerRect.left + (containerRect.width / 2) - (dropdown.offsetWidth / 2);
            const arrowPosition = tagCenterX - dropdownLeft;
            
            // Clamp arrow position to stay within dropdown bounds
            const minPos = 30;
            const maxPos = dropdown.offsetWidth - 30;
            const clampedPos = Math.max(minPos, Math.min(maxPos, arrowPosition));
            
            dropdownArrow.style.left = `${clampedPos}px`;
        }
        
        // Show dropdown
        dropdown.classList.add('active');
    }
    
    // Close dropdown
    function closeDropdown() {
        dropdown.classList.remove('active');
        tags.forEach(tag => tag.classList.remove('active'));
        currentActiveTag = null;
    }
    
    // Event listeners
    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = tag.getAttribute('data-category');
            openDropdown(category, tag);
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (dropdown.classList.contains('active') && 
            !dropdown.contains(e.target) && 
            !Array.from(tags).some(tag => tag.contains(e.target))) {
            closeDropdown();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown.classList.contains('active')) {
            closeDropdown();
        }
    });
}

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--ease', 'linear');
    
    // Disable animations
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
