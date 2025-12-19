// ========================================
// SEER - Modern Interactive Features
// ========================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initSmoothScroll();
    initParticles();
    initButtonHandlers();
    init3DModel();
});

// ========================================
// Button Handlers
// ========================================
function initButtonHandlers() {
    // Handle Contact Us, Get Started, and product buttons - scroll to contact
    const contactButtons = document.querySelectorAll('.btn-primary, .cta-btn, .product-btn');
    
    console.log('Contact buttons found:', contactButtons.length);
    
    contactButtons.forEach((button, index) => {
        console.log(`Attaching listener to button ${index}:`, button.className);
        // Ensure button type is set to 'button' not 'submit'
        if (!button.hasAttribute('type')) {
            button.setAttribute('type', 'button');
        }
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Contact button clicked, scrolling to #contact');
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                console.log('Scrolling to:', offsetTop);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error('Contact section not found');
            }
        });
    });
    
    // Handle Learn More button - scroll to about section
    const learnMoreButtons = document.querySelectorAll('.btn-secondary');
    
    console.log('Learn More buttons found:', learnMoreButtons.length);
    
    learnMoreButtons.forEach((button, index) => {
        console.log(`Attaching listener to Learn More button ${index}:`, button.className);
        // Ensure button type is set to 'button' not 'submit'
        if (!button.hasAttribute('type')) {
            button.setAttribute('type', 'button');
        }
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Learn More button clicked, scrolling to #about');
            
            // Scroll to about section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                console.log('Scrolling to:', offsetTop);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error('About section not found');
            }
        });
    });
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ========================================
// Smooth Scrolling
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const animateElements = document.querySelectorAll(
        '.about-card, .product-card, .feature-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ========================================
// Form Handling
// ========================================
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you! We\'ll be in touch soon.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
            }, 1500);
        });
    }
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close">×</button>
        </div>
    `;
    
    // Style notification
    const bgColor = type === 'success' ? '#10b981' : '#6366f1';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ========================================
// Particle Effect (Simple)
// ========================================
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create subtle floating particles
    const particleContainer = hero.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Card Hover Effects
// ========================================
document.querySelectorAll('.product-card, .feature-card, .about-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        // Subtle 3D tilt effect
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ========================================
// Page Load Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Parallax Effect for Hero
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground && scrolled < hero.offsetHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroBackground.style.opacity = 1 - (scrolled / hero.offsetHeight);
    }
});

// ========================================
// 3D Model Loader (Three.js)
// ========================================
function init3DModel() {
    const canvas = document.getElementById('model-canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    console.log('Initializing 3D model...');
    console.log('THREE:', typeof THREE);
    console.log('STLLoader:', typeof THREE.STLLoader);

    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded');
        return;
    }

    if (typeof THREE.STLLoader === 'undefined') {
        console.error('STLLoader not loaded');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });

    // Set size
    const container = canvas.parentElement;
    const size = container.offsetWidth || 500;
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    console.log('Container size:', size);
    console.log('Canvas parent:', container);
    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
    console.log('Canvas offsetWidth/Height:', canvas.offsetWidth, 'x', canvas.offsetHeight);
    console.log('Canvas display:', window.getComputedStyle(canvas).display);
    console.log('Canvas visibility:', window.getComputedStyle(canvas).visibility);
    console.log('Canvas opacity:', window.getComputedStyle(canvas).opacity);

    // Camera position
    camera.position.set(0, 0, 120);
    camera.lookAt(0, 0, 0);
    
    console.log('Camera position:', camera.position);
    console.log('Camera looking at: 0, 0, 0');

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x06b6d4, 0.4);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    // Load STL model
    console.log('Loading STL model from: models/model.stl');
    const loader = new THREE.STLLoader();
    loader.load(
        'models/model.stl',
        (geometry) => {
            console.log('STL model loaded successfully');
            
            // Log geometry details
            geometry.computeBoundingBox();
            const boundingBox = geometry.boundingBox;
            console.log('Model bounding box min:', boundingBox.min.x, boundingBox.min.y, boundingBox.min.z);
            console.log('Model bounding box max:', boundingBox.max.x, boundingBox.max.y, boundingBox.max.z);
            
            // Center the geometry itself
            const center = new THREE.Vector3();
            boundingBox.getCenter(center);
            geometry.translate(-center.x, -center.y, -center.z);
            
            // Recompute bounding box after centering
            geometry.computeBoundingBox();
            console.log('Model center after translation:', geometry.boundingBox.min, geometry.boundingBox.max);
            
            const material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                emissive: 0x6366f1,
                emissiveIntensity: 0.3,
                specular: 0x8b5cf6,
                shininess: 100,
                flatShading: false
            });

            const mesh = new THREE.Mesh(geometry, material);
            
            // Rotate model so bottom view becomes front view, right-side up
            mesh.rotation.x = Math.PI / 2; // 90 degrees
            mesh.rotation.y = Math.PI; // 180 degrees to flip right-side up
            
            // Now the mesh is already centered at origin, just scale it
            const size = new THREE.Vector3();
            boundingBox.getSize(size);
            console.log('Model size:', size.x, size.y, size.z);
            console.log('Original center was:', center.x, center.y, center.z);
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 75 / maxDim; // Larger scale for better visibility
            mesh.scale.set(scale, scale, scale);
            
            console.log('Model scale:', scale);
            console.log('Mesh position:', mesh.position.x, mesh.position.y, mesh.position.z);

            scene.add(mesh);
            console.log('Mesh added to scene');
            console.log('Scene children:', scene.children.length);

            // Animation
            function animate() {
                requestAnimationFrame(animate);
                mesh.rotation.z += 0.003; // Continuous slow rotation
                renderer.render(scene, camera);
            }
            animate();
            console.log('Model animation started');
            
            // Force a render to test
            renderer.render(scene, camera);
            console.log('Initial render complete');
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('Error loading STL model:', error);
        }
    );

    // Handle window resize
    window.addEventListener('resize', () => {
        const container = canvas.parentElement;
        const newSize = container.offsetWidth || 400;
        renderer.setSize(newSize, newSize);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    });
}

// ========================================
// Console Message
// ========================================
console.log('%c🛡️ SEER Cybersecurity', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #9ca3af;');
console.log('%cBuilt with ❤️ by LYNC Solutions', 'font-size: 12px; color: #6b7280;');
