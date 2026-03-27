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

    // 4. Hero Initial Loader
    setTimeout(() => {
        document.querySelector('.hero-text')?.classList.add('active');
        document.querySelector('.profile-img')?.classList.add('active');
    }, 100);
});
