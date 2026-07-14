// ── App.js — Apertura de la invitación ──
(function () {
    'use strict';

    const boton    = document.getElementById('openInvitation');
    const cover    = document.getElementById('cover');
    const contenido = document.getElementById('content');

    if (!boton || !cover || !contenido) return;

    // Aplicar imagen de portada si el archivo existe
    var img = new Image();
    img.onload = function () { cover.classList.add('has-bg-image'); };
    img.src = 'assets/images/portada.webp';

    boton.addEventListener('click', () => {
        // Transición suave: fade out del cover
        cover.style.transition = 'opacity 0.6s ease';
        cover.style.opacity = '0';

        setTimeout(() => {
            cover.style.display = 'none';
            contenido.style.display = 'block';
            // Fade in del contenido
            contenido.style.opacity = '0';
            contenido.style.transition = 'opacity 0.5s ease';
            setTimeout(() => { contenido.style.opacity = '1'; }, 30);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 550);
    });

})();