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

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            themeIcon.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                themeIcon.style.transform = 'rotate(0deg)';
            }, 150);
        });
    }

    initializeTheme() {
        const saved = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = saved || (systemDark ? 'dark' : 'light');
    
        document.documentElement.setAttribute('data-theme', initial);
        document.documentElement.setAttribute('data-color-scheme', initial);
    
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
          themeIcon.textContent = initial === 'dark' ? '☀️' : '🌙';
        }
      }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; 
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
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

        const elementsToObserve = [
            ...document.querySelectorAll('.feature-card'),
            ...document.querySelectorAll('.timeline-item'),
            ...document.querySelectorAll('.testimonial-card'),
            ...document.querySelectorAll('.pricing-card'),
            ...document.querySelectorAll('.section-header')
        ];

        elementsToObserve.forEach(el => observer.observe(el));
    }

    animateFeatureCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, Math.random() * 200); 
    }

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

    animateTestimonialCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        }, Math.random() * 300);
    }

    animatePricingCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, Math.random() * 200);
    }

    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
                
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

    handlePrimaryCTA() {
        this.showNotification('🎉 Starting enrollment process...', 'success');
        
        setTimeout(() => {
            this.showNotification('📧 Redirecting to enrollment form...', 'info');
        }, 1500);
    }

    handleSecondaryCTA() {
        this.showNotification('📥 Preparing your free preview...', 'info');
        
        setTimeout(() => {
            this.showNotification('✅ Download started! Check your downloads folder.', 'success');
        }, 2000);
    }

    handleConsultationCTA() {
        this.showNotification('📞 Opening consultation booking...', 'info');
        
        setTimeout(() => {
            this.showNotification('📅 Redirecting to calendar booking...', 'success');
        }, 1500);
    }

    handlePricingCTA(button) {
        const planName = button.closest('.pricing-card').querySelector('h3').textContent;
        this.showNotification(`🎯 Selected ${planName} plan!`, 'success');
        
        setTimeout(() => {
            this.showNotification('💳 Redirecting to checkout...', 'info');
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        const getComputedColor = (variable) => {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        };
        
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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

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

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    setupMobileMenu() {
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

class AdvancedEffects {
    constructor() {
        this.setupParallax();
        this.setupCounters();
        this.setupNavbarScroll();
    }

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

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = counter.textContent;
            const numericValue = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[\d,]/g, '');
            
            if (isNaN(numericValue)) return;
            
            let current = 0;
            const increment = numericValue / 60; 
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(current);
                    counter.textContent = displayValue.toLocaleString() + suffix;
                }
            }, 16); 
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

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        
        const handleNavbarScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
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

class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.setupMonitoring();
    }
    
    setupMonitoring() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`🚀 Page loaded in ${loadTime.toFixed(2)}ms`);
            
            if (typeof PerformanceObserver !== 'undefined') {
                try {
                    const observer = new PerformanceObserver((list) => {
                        list.getEntries().forEach((entry) => {
                            if (entry.duration > 100) { 
                                console.log(`📊 ${entry.entryType}: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
                            }
                        });
                    });
                    
                    observer.observe({ entryTypes: ['navigation', 'resource'] });
                } catch (e) {
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new ScoreazyApp();
    app.addAnimationCSS();
    
    const effects = new AdvancedEffects();
    
    const perfMonitor = new PerformanceMonitor();
    
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
    
    if (window.location.hash === '#dev') {
        document.body.classList.add('dev-mode');
        console.log('🛠️ Developer mode activated!');
    }
});

window.ScoreazyApp = ScoreazyApp;