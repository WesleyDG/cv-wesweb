// Réalisations : le bouton « + » déplie ou replie le détail de sa carte (indispensable sans survol, sur écran tactile).
// Avec une souris, le survol déplie déjà la carte : le bouton doit alors pouvoir la refermer malgré le survol.

const mouse = window.matchMedia('(pointer: fine)');

export function initProjects() {
    document.querySelectorAll('[data-project-toggle]').forEach((toggle) => {
        const card = toggle.closest('[data-project]');
        if (!card) return;

        // Libellé d'origine (« Afficher le détail de … ») décliné pour l'état ouvert
        const label = toggle.getAttribute('aria-label');

        const setOpen = (open) => {
            card.toggleAttribute('data-open', open);
            // data-closed neutralise le survol (variant project-open, voir site.css)
            card.toggleAttribute('data-closed', !open && mouse.matches && card.matches(':hover'));
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? label.replace('Afficher', 'Masquer') : label);
        };

        // État réellement affiché : ouvert au bouton, ou au survol s'il n'a pas été refermé
        const isOpen = () => card.hasAttribute('data-open')
            || (mouse.matches && card.matches(':hover') && !card.hasAttribute('data-closed'));

        toggle.addEventListener('click', () => setOpen(!isOpen()));

        // En quittant la carte à la souris, retour au simple survol
        card.addEventListener('pointerleave', (e) => {
            if (e.pointerType !== 'mouse') return;
            setOpen(false);
            card.removeAttribute('data-closed');
        });
    });
}
