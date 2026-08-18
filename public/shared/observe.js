// Reveal elements marked .scroll-animate as they enter the viewport.
// Shared by both storefronts so scroll behaviour matches exactly.

export const observeElements = () => {
    const targets = document.querySelectorAll('.scroll-animate');
    if (!targets.length) return;

    // Respect the viewer's motion preference: show everything immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        targets.forEach(el => { el.style.opacity = '1'; });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    targets.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
};
