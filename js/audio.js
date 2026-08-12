// ── Audio Controller — Invitación XV Años ──
(function () {
    'use strict';

    const btn   = document.getElementById('audioBtn');
    const icon  = document.getElementById('audioIcon');
    if (!btn) return;

    // Variables de reproducción: soporte para YouTube IFrame (si se provee) o Audio local
    let playing = false;
    let fadeId = null;

    // Si se indica `INVITACION.youtubeId`, usaremos un player de YouTube embebido como fuente de audio
    let ytPlayer = null;
    let audio = null;
    const USE_YT = typeof INVITACION !== 'undefined' && INVITACION.youtubeId;

    if (USE_YT) {
        // placeholder: volumen 38% equivalente (YouTube volume 0-100)
        var targetVolPct = 38;
    } else {
        // Crear elemento de audio HTML5
        audio = new Audio(INVITACION.musica);
        audio.loop = true;
        audio.volume = 0.38;
    }

    // ── Iconos SVG ──
    const iconPlay = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#B0C4DE"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#B0C4DE" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#B0C4DE" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`;

    const iconMute = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#B0C4DE"/>
            <line x1="23" y1="9" x2="17" y2="15" stroke="#B0C4DE" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="#B0C4DE" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`;

    // ── Fade in/out suave ──
    function fadeIn() {
        clearInterval(fadeId);
        if (USE_YT && ytPlayer && typeof ytPlayer.playVideo === 'function') {
            // start with minimal volume then ramp to targetVolPct
            try {
                ytPlayer.setVolume(0);
                ytPlayer.playVideo();
            } catch (e) { /* ignore */ }
            let vol = 0;
            fadeId = setInterval(() => {
                if (vol < targetVolPct) {
                    vol = Math.min(vol + 3, targetVolPct);
                    ytPlayer.setVolume(vol);
                } else {
                    clearInterval(fadeId);
                }
            }, 90);
        } else if (audio) {
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
    }

    function fadeOut(callback) {
        clearInterval(fadeId);
        if (USE_YT && ytPlayer && typeof ytPlayer.setVolume === 'function') {
            let vol = ytPlayer.getVolume ? ytPlayer.getVolume() : targetVolPct;
            fadeId = setInterval(() => {
                if (vol > 3) {
                    vol = Math.max(vol - 3, 0);
                    ytPlayer.setVolume(vol);
                } else {
                    try { ytPlayer.pauseVideo(); } catch (e) {}
                    clearInterval(fadeId);
                    if (callback) callback();
                }
            }, 90);
        } else if (audio) {
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
            // Si se está usando YouTube y el player aún no existe, esperar a que la API inicialice
            if (USE_YT && !ytPlayer) {
                console.log('YouTube player no inicializado aún — inténtalo de nuevo en breve.');
                return;
            }
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
                    // If using YouTube ensure player is ready
                    if (USE_YT && !ytPlayer) {
                        // If API not ready yet, do nothing — user can press audio button
                    } else {
                        fadeIn();
                        setPlayingState(true);
                    }
                }
            }, 600);
        });
    }

    // ── Si el audio falla (archivo no encontrado), ocultar botón ──
    if (audio) {
        audio.addEventListener('error', () => {
            btn.style.display = 'none';
        });
    }

    // Permitir reemplazar la pista desde código (por ejemplo con URL.createObjectURL)
    window.setCustomAudio = function (url) {
        try {
            if (USE_YT) {
                console.warn('setCustomAudio: modo YouTube activo; use URL directa a mp3 o cambie config.js');
                return;
            }
            audio.pause();
            audio.src = url;
            audio.load();
            // iniciar con fadeIn para consistencia
            fadeIn();
            setPlayingState(true);
        } catch (e) {
            console.warn('No se pudo establecer audio personalizado', e);
        }
    };

    // ── YouTube IFrame API integration ──
    if (USE_YT) {
        // `onYouTubeIframeAPIReady` será llamada por la API cuando esté lista
        window.onYouTubeIframeAPIReady = function () {
            try {
                ytPlayer = new YT.Player('yt-player', {
                    height: '0',
                    width: '0',
                    videoId: INVITACION.youtubeId,
                    playerVars: {
                        'playsinline': 1,
                        'controls': 0,
                        'rel': 0,
                        'iv_load_policy': 3,
                        'showinfo': 0
                    },
                    events: {
                        'onReady': function (e) {
                            // Mantener en silencio hasta que se reproduzca con fadeIn
                            try { e.target.setVolume(0); } catch (er) {}
                        },
                        'onStateChange': function (e) {
                            // cuando termina, reiniciar (loop)
                            if (e.data === YT.PlayerState.ENDED) {
                                try { e.target.playVideo(); } catch (er) {}
                            }
                        }
                    }
                });
            } catch (err) {
                console.warn('No se pudo inicializar el reproductor de YouTube', err);
            }
        };
    }

})();
