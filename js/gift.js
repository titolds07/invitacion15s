const giftChest = document.getElementById('giftChest');
const giftChestVisual = document.getElementById('giftChestVisual');
const giftMessage = document.getElementById('giftMessage');
const giftHint = document.getElementById('giftHint');
const giftModel = document.querySelector('.gift-chest__model');
const mobileChestView = window.matchMedia('(max-width: 600px)');
const setChestCamera = () => {
    if (giftModel) {
        giftModel.setAttribute('camera-orbit', mobileChestView.matches
            ? '0deg 75deg 150%'
            : '0deg 75deg 115%');
    }
};
setChestCamera();
mobileChestView.addEventListener('change', setChestCamera);

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
