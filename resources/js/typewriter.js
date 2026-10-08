// Effet machine à écrire : fait défiler les mots de data-typewriter (tableau JSON)

const TYPE_DELAY = 80;
const ERASE_DELAY = 45;
const PAUSE_DELAY = 1800;

export function initTypewriter() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('[data-typewriter]').forEach((el) => {
        const words = JSON.parse(el.dataset.typewriter || '[]');
        if (words.length < 2) return;

        let wordIndex = 0;
        let length = words[0].length;
        let typing = false;

        const tick = () => {
            const word = words[wordIndex];

            if (typing && length < word.length) {
                length++;
            } else if (typing) {
                typing = false;
                return setTimeout(tick, PAUSE_DELAY);
            } else if (length > 0) {
                length--;
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                typing = true;
            }

            el.textContent = words[wordIndex].slice(0, length);
            setTimeout(tick, typing ? TYPE_DELAY : ERASE_DELAY);
        };

        // Le premier mot est déjà affiché par le template : on commence par la pause
        setTimeout(tick, PAUSE_DELAY);
    });
}
