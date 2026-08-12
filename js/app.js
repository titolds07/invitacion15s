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
        cover.style.transition = 'opacity 0.7s ease, transform 0.9s ease';
        cover.style.opacity = '0';
        cover.style.transform = 'scale(0.995) translateY(-8px)';

        // Partículas plateadas elegantes
        try { spawnParticles(28); } catch (e) { /* no crítico */ }

        setTimeout(() => {
            cover.style.display = 'none';
            contenido.style.display = 'block';
            // Fade in del contenido
            contenido.style.opacity = '0';
            contenido.style.transition = 'opacity 0.5s ease';
            setTimeout(() => { contenido.style.opacity = '1'; }, 30);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 650);
    });

    // ── Partículas discretas tipo 'glitter' ──
    function spawnParticles(amount) {
        const container = document.querySelector('#cover .particles');
        if (!container) return;
        for (let i = 0; i < amount; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            const left = Math.random() * 100;
            const size = 2 + Math.random() * 6;
            p.style.left = left + '%';
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.opacity = (0.6 + Math.random() * 0.6).toFixed(2);
            p.style.transform = `translateY(${10 + Math.random() * 20}px) scale(${0.6 + Math.random() * 1.2})`;
            p.style.animationDelay = (Math.random() * 0.25) + 's';
            p.style.animationDuration = (1.1 + Math.random() * 1.3) + 's';
            container.appendChild(p);
            // Eliminar luego
            setTimeout(() => { p.remove(); }, 2000 + Math.random() * 800);
        }
    }

    // ── Soporte para cargar pista de audio local (botón en footer) ──
    const audioUploadBtn = document.getElementById('audioUploadBtn');
    const audioUpload = document.getElementById('audioUpload');
    if (audioUploadBtn && audioUpload) {
        audioUploadBtn.addEventListener('click', () => audioUpload.click());
        audioUpload.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            if (window.setCustomAudio) {
                window.setCustomAudio(url);
            } else {
                // fallback: create a new Audio
                const a = new Audio(url);
                a.loop = true;
                a.volume = 0.38;
                a.play().catch(() => {});
            }
        });
    }

})();