const giftChest = document.getElementById('giftChest');
const giftChestVisual = document.getElementById('giftChestVisual');
const giftMessage = document.getElementById('giftMessage');
const giftHint = document.getElementById('giftHint');

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