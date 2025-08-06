// Modern Interactive Features for Scoreazy Landing Page

class ScoreazyApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupFAQ();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupCTAButtons();
        this.setupProgressBars();
        this.setupMobileMenu();
        this.initializeTheme();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon with smooth transition
            themeIcon.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                themeIcon.style.transform = 'rotate(0deg)';
            }, 150);
        });
    }

    // Initialize theme from localStorage or system preference
    initializeTheme() {
        const saved = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = saved || (systemDark ? 'dark' : 'light');
    
        document.documentElement.setAttribute('data-theme', initial);
        document.documentElement.setAttribute('data-color-scheme', initial);
    
        // Set correct icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
          themeIcon.textContent = initial === 'dark' ? '☀️' : '🌙';
        }
      }

    // FAQ Accordion Functionality
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Smooth Scrolling for Navigation
    setupSmoothScrolling() {
        // Handle navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for different elements
                    if (entry.target.classList.contains('feature-card')) {
                        this.animateFeatureCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    }
                    
                    if (entry.target.classList.contains('testimonial-card')) {
                        this.animateTestimonialCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('pricing-card')) {
                        this.animatePricingCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToObserve = [
            ...document.querySelectorAll('.feature-card'),
            ...document.querySelectorAll('.timeline-item'),
            ...document.querySelectorAll('.testimonial-card'),
            ...document.querySelectorAll('.pricing-card'),
            ...document.querySelectorAll('.section-header')
        ];

        elementsToObserve.forEach(el => observer.observe(el));
    }

    // Feature Card Animation
    animateFeatureCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, Math.random() * 200); // Stagger animation
    }

    // Timeline Item Animation
    animateTimelineItem(item) {
        const isEven = Array.from(item.parentNode.children).indexOf(item) % 2 === 1;
        const direction = isEven ? '30px' : '-30px';
        
        item.style.opacity = '0';
        item.style.transform = `translateX(${direction})`;
        item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    }

    // Testimonial Card Animation
    animateTestimonialCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        }, Math.random() * 300);
    }

    // Pricing Card Animation
    animatePricingCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, Math.random() * 200);
    }

    // CTA Button Interactions
    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
                
                // Handle different button types based on data-cta attribute
                const ctaType = button.getAttribute('data-cta');
                
                switch(ctaType) {
                    case 'primary':
                    case 'final-primary':
                        this.handlePrimaryCTA();
                        break;
                    case 'secondary':
                        this.handleSecondaryCTA();
                        break;
                    case 'consultation':
                        this.handleConsultationCTA();
                        break;
                    case 'pricing':
                        this.handlePricingCTA(button);
                        break;
                    default:
                        // Fallback for buttons without data-cta
                        if (button.textContent.includes('Start Your Child\'s Journey') || 
                            button.textContent.includes('Start Your Child\'s Confidence Journey')) {
                            this.handlePrimaryCTA();
                        } else if (button.textContent.includes('Download Free Preview')) {
                            this.handleSecondaryCTA();
                        } else if (button.textContent.includes('Book Parent Consultation')) {
                            this.handleConsultationCTA();
                        } else if (button.textContent.includes('Choose') || button.textContent.includes('Get Started')) {
                            this.handlePricingCTA(button);
                        }
                        break;
                }
            });
        });

        // Add hover effects to all buttons
        const allButtons = document.querySelectorAll('.btn');
        allButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    // Handle Primary CTA
    handlePrimaryCTA() {
        // Simulate enrollment process
        this.showNotification('🎉 Starting enrollment process...', 'success');
        
        setTimeout(() => {
            this.showNotification('📧 Redirecting to enrollment form...', 'info');
        }, 1500);
    }

    // Handle Secondary CTA
    handleSecondaryCTA() {
        // Simulate download
        this.showNotification('📥 Preparing your free preview...', 'info');
        
        setTimeout(() => {
            this.showNotification('✅ Download started! Check your downloads folder.', 'success');
        }, 2000);
    }

    // Handle Consultation CTA
    handleConsultationCTA() {
        this.showNotification('📞 Opening consultation booking...', 'info');
        
        setTimeout(() => {
            this.showNotification('📅 Redirecting to calendar booking...', 'success');
        }, 1500);
    }

    // Handle Pricing CTA
    handlePricingCTA(button) {
        const planName = button.closest('.pricing-card').querySelector('h3').textContent;
        this.showNotification(`🎯 Selected ${planName} plan!`, 'success');
        
        setTimeout(() => {
            this.showNotification('💳 Redirecting to checkout...', 'info');
        }, 1500);
    }

    // Show Notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Get CSS variables for colors
        const getComputedColor = (variable) => {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        };
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '12px',
            backgroundColor: type === 'success' ? getComputedColor('--color-success') || '#32C877' : 
                            type === 'error' ? getComputedColor('--color-error') || '#EF4444' : 
                            getComputedColor('--color-info') || '#3B82F6',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            maxWidth: '300px',
            wordWrap: 'break-word',
            fontFamily: 'var(--font-family-base)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Progress Bar Animations
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const animateProgressBar = (bar) => {
            const targetWidth = bar.style.width || '25%';
            bar.style.width = '0%';
            bar.style.transition = 'width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        };

        // Animate progress bars when they come into view
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // Mobile Menu (for future enhancement)
    setupMobileMenu() {
        // Add mobile menu toggle if needed
        const navMenu = document.querySelector('.nav-menu');
        let isMobile = window.innerWidth <= 768;
        
        const handleResize = () => {
            isMobile = window.innerWidth <= 768;
            if (!isMobile) {
                navMenu.classList.remove('mobile-menu-open');
            }
        };
        
        window.addEventListener('resize', handleResize);
    }

    // Utility function to add CSS animations
    addAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translate(0) scale(1) !important;
            }
            
            .notification {
                animation: slideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            .pulse-animation {
                animation: pulse 2s infinite;
            }

            /* Enhanced button hover effects */
            .btn {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .btn:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }
}

// Advanced Effects
class AdvancedEffects {
    constructor() {
        this.setupParallax();
        this.setupCounters();
        this.setupNavbarScroll();
    }

    // Parallax scrolling for hero shapes
    setupParallax() {
        const heroShapes = document.querySelectorAll('.hero-shape, .hero-shape-2');
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    heroShapes.forEach((shape, index) => {
                        const speed = index === 0 ? 0.3 : 0.2;
                        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll);
    }

    // Counter animations for statistics
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = counter.textContent;
            const numericValue = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[\d,]/g, '');
            
            if (isNaN(numericValue)) return;
            
            let current = 0;
            const increment = numericValue / 60; // 60 frames for smooth animation
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(current);
                    counter.textContent = displayValue.toLocaleString() + suffix;
                }
            }, 16); // ~60fps
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Navbar scroll effects
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        
        const handleNavbarScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            // Add backdrop blur effect based on scroll
            if (scrollTop > 50) {
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid var(--color-border)';
            } else {
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.borderBottom = '1px solid transparent';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };
        
        window.addEventListener('scroll', handleNavbarScroll);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.setupMonitoring();
    }
    
    setupMonitoring() {
        // Log page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`🚀 Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Log performance metrics if available
            if (typeof PerformanceObserver !== 'undefined') {
                try {
                    const observer = new PerformanceObserver((list) => {
                        list.getEntries().forEach((entry) => {
                            if (entry.duration > 100) { // Only log slower operations
                                console.log(`📊 ${entry.entryType}: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
                            }
                        });
                    });
                    
                    observer.observe({ entryTypes: ['navigation', 'resource'] });
                } catch (e) {
                    // Silently handle observer errors
                }
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    const app = new ScoreazyApp();
    app.addAnimationCSS();
    
    // Initialize advanced effects
    const effects = new AdvancedEffects();
    
    // Initialize performance monitoring
    const perfMonitor = new PerformanceMonitor();
    
    // Add some fun Easter eggs for developers
    console.log(`
    🎯 Welcome to Scoreazy's Confidence Building Landing Page!
    🚀 Built with modern web technologies
    💜 Designed for both developers and families
    🌟 Check out our interactive features!
    
    Theme: Use the toggle in the top right
    Animations: Scroll through the page
    Interactions: Try the CTA buttons
    Navigation: Click the menu links for smooth scrolling
    `);
    
    // Add developer-friendly features
    if (window.location.hash === '#dev') {
        document.body.classList.add('dev-mode');
        console.log('🛠️ Developer mode activated!');
    }
});

// Export for potential use in other scripts
window.ScoreazyApp = ScoreazyApp;