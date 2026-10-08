// Menu principal : fond au scroll, ouverture du menu mobile, lien de la section visible

export function initMenu() {
    const menu = document.querySelector('[data-menu]');
    if (!menu) return;

    const onScroll = () => menu.toggleAttribute('data-scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    initActiveLink(menu);

    const toggle = menu.querySelector('[data-menu-toggle]');
    if (!toggle) return;

    const setOpen = (open) => {
        menu.toggleAttribute('data-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };

    toggle.addEventListener('click', () => setOpen(!menu.hasAttribute('data-open')));

    // Fermeture au clic sur un lien ou avec Échap
    menu.querySelectorAll('#menu-mobile a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
}

// Marque aria-current sur les liens (desktop et mobile) de la section qui traverse le milieu de l'écran
function initActiveLink(menu) {
    const links = [...menu.querySelectorAll('[data-menu-link]')]
        .filter((link) => link.pathname === window.location.pathname && link.hash);
    // Toutes les sections sont observées : sur une section sans lien (le hero), aucun lien n'est actif
    const sections = document.querySelectorAll('main section[id]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const setActive = (id) => links.forEach((link) => {
        link.setAttribute('aria-current', String(decodeURIComponent(link.hash.slice(1)) === id));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
}
