(function () {
    'use strict';

    const player = document.getElementById('audioPlayer');
    const button = document.getElementById('audioBtn');
    const icon = document.getElementById('audioIcon');
    const volumeControl = document.getElementById('audioVolume');
    const openButton = document.getElementById('openInvitation');

    if (!player || !button || !icon || typeof INVITACION === 'undefined' || !INVITACION.musica) {
        if (player) player.hidden = true;
        return;
    }

    const audio = new Audio(INVITACION.musica);
    audio.loop = true;
    audio.preload = 'none';

    let playing = false;
    let fadeTimer = null;
    let targetVolume = Number(volumeControl?.value || 38) / 100;

    const playIcon = '<path d="m9 6 10 6-10 6V6Z" fill="currentColor"/>';
    const pauseIcon = '<path d="M8 6v12M16 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

    function renderState(isPlaying) {
        playing = isPlaying;
        icon.innerHTML = isPlaying ? pauseIcon : playIcon;
        button.classList.toggle('is-playing', isPlaying);
        button.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
        button.setAttribute('aria-pressed', String(isPlaying));
    }

    function fadeTo(volume, onComplete) {
        clearInterval(fadeTimer);
        const step = volume > audio.volume ? 0.025 : -0.025;
        fadeTimer = setInterval(() => {
            const next = audio.volume + step;
            const reached = step > 0 ? next >= volume : next <= volume;
            audio.volume = reached ? volume : Math.max(0, Math.min(1, next));
            if (reached) {
                clearInterval(fadeTimer);
                if (onComplete) onComplete();
            }
        }, 60);
    }

    async function playMusic() {
        try {
            audio.volume = 0;
            await audio.play();
            renderState(true);
            fadeTo(targetVolume);
        } catch (error) {
            renderState(false);
            console.warn('No se pudo reproducir la música de la invitación.', error);
        }
    }

    function pauseMusic() {
        clearInterval(fadeTimer);
        fadeTo(0, () => {
            audio.pause();
            renderState(false);
        });
    }

    button.addEventListener('click', () => {
        if (playing) pauseMusic();
        else playMusic();
    });

    if (volumeControl) {
        volumeControl.addEventListener('input', () => {
            targetVolume = Number(volumeControl.value) / 100;
            if (playing) audio.volume = targetVolume;
        });
    }

    if (openButton) openButton.addEventListener('click', playMusic, { once: true });

    audio.addEventListener('canplay', () => { player.hidden = false; });
    audio.addEventListener('error', () => {
        player.hidden = true;
        renderState(false);
        console.warn('No se encontró el archivo local de música:', INVITACION.musica);
    });

    renderState(false);
})();
