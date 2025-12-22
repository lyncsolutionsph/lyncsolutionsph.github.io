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
    initModelViewer();
    hideLoadingScreen(); // Hide loading screen immediately
});

// ========================================
// Button Handlers
// ========================================
function initButtonHandlers() {
    // Handle Contact Us, Get Started, and product buttons - scroll to contact
    const contactButtons = document.querySelectorAll('.btn-primary, .cta-btn, .product-btn');
    
    contactButtons.forEach((button, index) => {
        // Ensure button type is set to 'button' not 'submit'
        if (!button.hasAttribute('type')) {
            button.setAttribute('type', 'button');
        }
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle Learn More button - scroll to about section
    const learnMoreButtons = document.querySelectorAll('.btn-secondary');
    
    learnMoreButtons.forEach((button, index) => {
        // Ensure button type is set to 'button' not 'submit'
        if (!button.hasAttribute('type')) {
            button.setAttribute('type', 'button');
        }
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Scroll to about section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
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
        // Canvas not found - using model-viewer instead
        console.log('3D Model canvas not found - using model-viewer component instead');
        return;
    }

    if (typeof THREE === 'undefined' || typeof THREE.OBJLoader === 'undefined' || typeof THREE.MTLLoader === 'undefined') {
        console.error('THREE.js, OBJLoader, or MTLLoader not loaded');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 21/9, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });

    // Set size
    const container = canvas.parentElement;
    const width = container.offsetWidth || 900;
    const height = width * (9/21);
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Handle WebGL context loss
    canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
    }, false);
    
    canvas.addEventListener('webglcontextrestored', () => {
        // Context restored, continue rendering
    }, false);

    // Camera position - moved back to show more of the model
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0);

    // Lighting - Enhanced for stunning visuals
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.8);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x8b5cf6, 1.2);
    directionalLight1.position.set(8, 8, 8);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x06b6d4, 0.8);
    directionalLight2.position.set(-8, -8, 8);
    scene.add(directionalLight2);
    
    const directionalLight3 = new THREE.DirectionalLight(0xa855f7, 0.6);
    directionalLight3.position.set(0, -8, 5);
    scene.add(directionalLight3);
    
    // Add subtle rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 0, -10);
    scene.add(rimLight);

    // Create Nexus Lines background effect
    const particleCount = 80;
    const particles = [];
    const lines = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(2, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x6366f1,
            transparent: true,
            opacity: 0.8
        });
        const particle = new THREE.Mesh(geometry, material);
        
        particle.position.set(
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 300 - 250
        );
        
        particle.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.3
        );
        
        particles.push(particle);
        scene.add(particle);
    }
    
    // Function to update lines between nearby particles
    function updateNexusLines() {
        // Remove old lines
        lines.forEach(line => scene.remove(line));
        lines.length = 0;
        
        // Create new lines between nearby particles
        const maxDistance = 200;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const distance = particles[i].position.distanceTo(particles[j].position);
                if (distance < maxDistance) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        particles[i].position,
                        particles[j].position
                    ]);
                    const material = new THREE.LineBasicMaterial({ 
                        color: 0x8b5cf6,
                        transparent: true,
                        opacity: (1 - distance / maxDistance) * 0.6
                    });
                    const line = new THREE.Line(geometry, material);
                    lines.push(line);
                    scene.add(line);
                }
            }
        }
    }

    // Load OBJ model with MTL materials
    const mtlLoader = new THREE.MTLLoader();
    const objLoader = new THREE.OBJLoader();
    
    // Start animation loop
    let mesh = null;
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate model to showcase all sides (turntable rotation)
        if (mesh) {
            mesh.rotation.y += 0.003;
        }
        
        // Animate particles
        particles.forEach(particle => {
            particle.position.add(particle.velocity);
            
            // Bounce off boundaries
            if (Math.abs(particle.position.x) > 500) particle.velocity.x *= -1;
            if (Math.abs(particle.position.y) > 250) particle.velocity.y *= -1;
            if (particle.position.z > 0 || particle.position.z < -500) particle.velocity.z *= -1;
        });
        
        // Update nexus lines
        updateNexusLines();
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Load MTL (material) file first to preserve colors
    mtlLoader.load(
        'models/model-new.mtl',
        (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            
            // Then load OBJ file
            objLoader.load(
                'models/model-new.obj',
                (object) => {
                    // Create a wrapper group for proper transformations
                    const modelGroup = new THREE.Group();
                    
                    // Calculate initial bounding box
                    let box = new THREE.Box3().setFromObject(object);
                    let center = new THREE.Vector3();
                    box.getCenter(center);
                    
                    // Center the object in its local space first
                    object.position.sub(center);
                    
                    // Apply rotations to the object
                    object.rotation.x = Math.PI / 2;
                    object.rotation.y = Math.PI;
                    
                    // Add object to group
                    modelGroup.add(object);
                    
                    // Update transformations
                    modelGroup.updateMatrixWorld(true);
                    
                    // Recalculate bounding box after rotation to get correct dimensions
                    box = new THREE.Box3().setFromObject(modelGroup);
                    const size = new THREE.Vector3();
                    box.getSize(size);
                    
                    // Calculate scale based on the longest dimension
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 700 / maxDim;
                    modelGroup.scale.set(scale, scale, scale);
                    
                    // Update again after scaling
                    modelGroup.updateMatrixWorld(true);
                    
                    // Final centering - get the bounding box of the scaled group
                    box = new THREE.Box3().setFromObject(modelGroup);
                    center = new THREE.Vector3();
                    box.getCenter(center);
                    
                    // Position the group so its center is at origin (0,0,0)
                    modelGroup.position.sub(center);
                    
                    // Create a pivot point at the origin for clean rotation
                    const pivot = new THREE.Group();
                    pivot.add(modelGroup);
                    
                    mesh = pivot;
                    scene.add(mesh);
                    
                    // Hide loading screen after model is loaded
                    hideLoadingScreen();
                },
                undefined,
                (error) => {
                    console.error('Error loading OBJ model:', error);
                    // Hide loading screen even if there's an error
                    hideLoadingScreen();
                }
            );
        },
        undefined,
        (error) => {
            console.error('Error loading MTL materials:', error);
            // Hide loading screen even if there's an error
            hideLoadingScreen();
        }
    );

    // Handle window resize
    window.addEventListener('resize', () => {
        const container = canvas.parentElement;
        const newWidth = container.offsetWidth || 900;
        const newHeight = newWidth * (9/21);
        renderer.setSize(newWidth, newHeight);
        camera.aspect = 21/9;
        camera.updateProjectionMatrix();
    });
}

// ========================================
// Model Viewer Handler
// ========================================
function initModelViewer() {
    const modelViewer = document.querySelector('model-viewer');
    if (!modelViewer) {
        console.log('Model viewer element not found');
        return;
    }

    // Handle model loading events
    modelViewer.addEventListener('load', () => {
        console.log('✓ 3D Model loaded successfully');
    });

    modelViewer.addEventListener('error', (event) => {
        console.error('× Failed to load 3D model:', event);
        // Optionally show a fallback message to the user
        const container = modelViewer.parentElement;
        if (container) {
            const fallbackMsg = document.createElement('div');
            fallbackMsg.className = 'model-fallback';
            fallbackMsg.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin: 0 auto 1rem;">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p style="font-size: 0.9rem;">3D Model Preview</p>
                    <p style="font-size: 0.8rem; opacity: 0.7;">Interactive view temporarily unavailable</p>
                </div>
            `;
            modelViewer.style.display = 'none';
            container.insertBefore(fallbackMsg, modelViewer);
        }
    });

    modelViewer.addEventListener('progress', (event) => {
        const progress = event.detail.totalProgress;
        if (progress < 1) {
            console.log(`Loading 3D model: ${Math.round(progress * 100)}%`);
        }
    });

    // Add a timeout fallback (10 seconds)
    setTimeout(() => {
        if (!modelViewer.loaded && !modelViewer.classList.contains('error-shown')) {
            console.warn('Model loading is taking longer than expected...');
        }
    }, 10000);
}

// ========================================
// Loading Screen
// ========================================
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// ========================================
// Console Message
// ========================================
console.log('%c🛡️ SEER Cybersecurity', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #9ca3af;');
console.log('%cBuilt with ❤️ by LYNC Solutions', 'font-size: 12px; color: #6b7280;');
