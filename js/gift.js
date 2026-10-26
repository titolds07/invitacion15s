const giftChest = document.getElementById('giftChest');
const giftChestVisual = document.getElementById('giftChestVisual');
const giftMessage = document.getElementById('giftMessage');
const giftHint = document.getElementById('giftHint');
const giftModel = document.querySelector('.gift-chest__model');
const mobileLayout = window.matchMedia('(max-width: 600px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const updateGiftModel = () => {
    if (!giftModel) return;

    const isMobile = mobileLayout.matches;
    const modelPath = isMobile ? 'assets/images/model-mobile.glb' : 'assets/images/model.glb';

    if (giftModel.getAttribute('src') !== modelPath) {
        giftModel.setAttribute('src', modelPath);
    }

    if (isMobile || reducedMotion.matches) {
        giftModel.removeAttribute('auto-rotate');
    } else {
        giftModel.setAttribute('auto-rotate', '');
    }
};

updateGiftModel();
mobileLayout.addEventListener('change', updateGiftModel);
reducedMotion.addEventListener('change', updateGiftModel);

if (giftChest && giftChestVisual && giftMessage && giftHint) {
    giftChest.addEventListener('click', () => {
        const willOpen = giftChest.getAttribute('aria-expanded') !== 'true';

        giftChest.setAttribute('aria-expanded', String(willOpen));
        giftChestVisual.classList.toggle('is-open', willOpen);
        giftMessage.hidden = !willOpen;
        giftChest.textContent = willOpen ? 'Cerrar mensaje' : 'Ver mensaje';
        giftHint.textContent = willOpen
            ? 'Un detalle recibido con mucho cariño'
            : 'Arrastra el cofre para girarlo';
    });
}
