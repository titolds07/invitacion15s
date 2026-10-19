// Countdown timer for the event date
(function () {
    // 11 de diciembre de 2026, 7:00 p. m. en Colombia (UTC-5).
    const eventDate = new Date('2026-12-11T19:00:00-05:00');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date();
        let diff = Math.max(0, eventDate - now);

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        if (diff <= 0) {
            clearInterval(timerInterval);
            // Opcional: mostrar mensaje cuando llegue
            const timer = document.querySelector('.timer');
            if (timer) {
                timer.innerHTML = '<div class="time-ended">¡La noche de Everlin ya comenzó! Celebremos juntos sus XV años.</div>';
            }
        }
    }

    // Solo iniciar si el contenido está visible
    document.addEventListener('DOMContentLoaded', () => {
        updateTimer();
    });

    const timerInterval = setInterval(updateTimer, 1000);

})();
