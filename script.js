// HAMAS KHAN PORTFOLIO - MAIN SCRIPT
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // 2. Mobile Menu Logic
    const els = {
        toggle: document.querySelector('.menu-toggle'),
        close: document.querySelector('.close-btn'),
        overlay: document.querySelector('.nav-overlay'),
        linksCont: document.querySelector('.nav-links'),
        links: document.querySelectorAll('.nav-links a'),
        body: document.body
    };

    const toggleMenu = (open) => {
        els.linksCont.classList.toggle('active', open);
        els.overlay.classList.toggle('active', open);
        els.body.style.overflow = open ? 'hidden' : '';

        const icon = els.toggle?.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', open ? 'x' : 'menu');
            lucide.createIcons();
        }
    };

    els.toggle?.addEventListener('click', () => toggleMenu(true));
    [els.close, els.overlay].forEach(el => el?.addEventListener('click', () => toggleMenu(false)));
    els.links.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // 3. Scroll Reveal Animations (Optimized)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Target headings and cards for scroll reveal
    const revealTargets = document.querySelectorAll('.animate-heading, .card, .course-card, .skill-card, .contact-grid');
    revealTargets.forEach((el, index) => {
        // Add a slight stagger to cards in grids
        if (el.classList.contains('card') || el.classList.contains('course-card')) {
            el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        }
        observer.observe(el);
    });

    // 5. Theme Switching Logic
    const themeSwitcher = {
        btn: document.getElementById('theme-toggle'),
        menu: document.getElementById('theme-menu'),
        options: document.querySelectorAll('.theme-option'),
        html: document.documentElement,
        storageKey: 'portfolio-theme',

        init() {
            if (!this.btn || !this.menu) return;

            // Load saved theme or default to system
            const savedTheme = localStorage.getItem(this.storageKey) || 'system';
            this.setTheme(savedTheme);

            // Toggle menu
            this.btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.menu.classList.toggle('active');
            });

            // Close menu on outside click
            document.addEventListener('click', () => {
                this.menu.classList.remove('active');
            });

            // Option selection
            this.options.forEach(opt => {
                opt.addEventListener('click', () => {
                    const theme = opt.getAttribute('data-theme');
                    this.setTheme(theme);
                    localStorage.setItem(this.storageKey, theme);
                    this.menu.classList.remove('active');
                });
            });

            // Listen for system changes if system is active
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (localStorage.getItem(this.storageKey) === 'system' || !localStorage.getItem(this.storageKey)) {
                    this.applyTheme('system');
                }
            });
        },

        setTheme(theme) {
            // Update active state in UI
            this.options.forEach(opt => {
                const isActive = opt.getAttribute('data-theme') === theme;
                opt.classList.toggle('active', isActive);
            });

            // Update button icon
            const icon = this.btn.querySelector('i');
            const iconNames = {
                light: 'sun',
                dark: 'moon',
                system: 'monitor'
            };
            if (icon && iconNames[theme]) {
                icon.setAttribute('data-lucide', iconNames[theme]);
                lucide.createIcons();
            }

            this.applyTheme(theme);
        },

        applyTheme(theme) {
            if (theme === 'system') {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.html.setAttribute('data-theme', isDark ? 'dark' : 'light');
            } else {
                this.html.setAttribute('data-theme', theme);
            }
        }
    };

    themeSwitcher.init();

    // 6. Hero Initial Loader
    setTimeout(() => {
        document.querySelector('.hero-text')?.classList.add('active');
        document.querySelector('.profile-img')?.classList.add('active');
    }, 100);
});
