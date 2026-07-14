// ── Audio Controller — Invitación XV Años ──
(function () {
    'use strict';

    const btn   = document.getElementById('audioBtn');
    const icon  = document.getElementById('audioIcon');
    if (!btn) return;

    // Crear elemento de audio
    const audio = new Audio(INVITACION.musica);
    audio.loop   = true;
    audio.volume = 0.38;

    let playing = false;
    let fadeId  = null;

    // ── Iconos SVG ──
    const iconPlay = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#D4AF37"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#D4AF37" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#D4AF37" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`;

    const iconMute = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#D4AF37"/>
            <line x1="23" y1="9" x2="17" y2="15" stroke="#D4AF37" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="#D4AF37" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`;

    // ── Fade in/out suave ──
    function fadeIn() {
        clearInterval(fadeId);
        audio.volume = 0;
        audio.play().catch(() => {});
        fadeId = setInterval(() => {
            if (audio.volume < 0.36) {
                audio.volume = Math.min(audio.volume + 0.03, 0.38);
            } else {
                clearInterval(fadeId);
            }
        }, 80);
    }

    function fadeOut(callback) {
        clearInterval(fadeId);
        fadeId = setInterval(() => {
            if (audio.volume > 0.03) {
                audio.volume = Math.max(audio.volume - 0.03, 0);
            } else {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 0.38;
                clearInterval(fadeId);
                if (callback) callback();
            }
        }, 80);
    }

    // ── Actualizar UI ──
    function setPlayingState(isPlaying) {
        playing = isPlaying;
        icon.innerHTML = isPlaying ? iconPlay : iconMute;
        btn.classList.toggle('is-playing', isPlaying);
        btn.setAttribute('aria-label', isPlaying ? 'Silenciar música' : 'Reproducir música');
    }

    // ── Toggle ──
    btn.addEventListener('click', () => {
        if (!playing) {
            fadeIn();
            setPlayingState(true);
        } else {
            fadeOut(() => setPlayingState(false));
            icon.innerHTML = iconMute;
        }
    });

    // ── Arrancar automáticamente al abrir la invitación ──
    const openBtn = document.getElementById('openInvitation');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            // Pequeño delay para que el usuario interactuó (política de autoplay)
            setTimeout(() => {
                if (!playing) {
                    fadeIn();
                    setPlayingState(true);
                }
            }, 600);
        });
    }

    // ── Si el audio falla (archivo no encontrado), ocultar botón ──
    audio.addEventListener('error', () => {
        btn.style.display = 'none';
    });

})();
