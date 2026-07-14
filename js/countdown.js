// Countdown timer for the event date
(function(){
    // Cambia la fecha objetivo aquí si se necesita; formato: YYYY, M-1, D, H, M, S
    const eventDate = new Date(2026, 8, 20, 20, 0, 0); // 20 Sep 2026 20:00 (mes 8 = septiembre)

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer(){
        const now = new Date();
        let diff = Math.max(0, eventDate - now);

        const seconds = Math.floor((diff/1000) % 60);
        const minutes = Math.floor((diff/1000/60) % 60);
        const hours = Math.floor((diff/1000/60/60) % 24);
        const days = Math.floor(diff/1000/60/60/24);

        if(daysEl) daysEl.textContent = String(days).padStart(2,'0');
        if(hoursEl) hoursEl.textContent = String(hours).padStart(2,'0');
        if(minutesEl) minutesEl.textContent = String(minutes).padStart(2,'0');
        if(secondsEl) secondsEl.textContent = String(seconds).padStart(2,'0');

        if(diff <= 0){
            clearInterval(timerInterval);
            // Opcional: mostrar mensaje cuando llegue
            const timer = document.querySelector('.timer');
            if(timer){
                timer.innerHTML = '<div class="time-ended">¡El evento ha comenzado!</div>';
            }
        }
    }

    // Solo iniciar si el contenido está visible
    document.addEventListener('DOMContentLoaded',()=>{
        updateTimer();
    });

    const timerInterval = setInterval(updateTimer,1000);

})();
