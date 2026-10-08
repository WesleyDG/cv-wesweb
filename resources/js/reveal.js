// Lance les animations d'une section [data-reveal] lorsqu'elle entre dans l'écran

// Déclenchement quand le haut de la section dépasse 80 % de la hauteur de l'écran.
// Une marge plutôt qu'un seuil en % : une section plus haute que l'écran ne l'atteindrait jamais.
const ROOT_MARGIN = '0px 0px -20% 0px';

export function initReveal() {
    // Sans observer, les animations se jouent au chargement comme ailleurs
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.dataset.reveal = 'visible';
            observer.unobserve(entry.target);
        });
    }, { rootMargin: ROOT_MARGIN });

    // La mise en pause est posée ici : sans JavaScript, le contenu reste visible
    document.querySelectorAll('[data-reveal]').forEach((section) => {
        section.dataset.reveal = 'pending';
        observer.observe(section);
    });
}
