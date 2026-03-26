// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToReveal = document.querySelectorAll('.reveal, .reveal-text, .fade-in, .card, .timeline-item, .contact-grid');
    
    // Add staggered delay for project cards
    const projectCards = document.querySelectorAll('.card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transitionProperty = 'opacity, transform';
        el.style.transitionDuration = '0.8s';
        el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Custom active class to restore element state
    setTimeout(() => {
        const initialElements = document.querySelectorAll('#hero .reveal-text, #hero .fade-in, .hero-text, .hero-image-wrapper');
        initialElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});
