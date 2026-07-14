// Simple RSVP form handler: validate and save to localStorage
(function(){
    const form = document.getElementById('rsvpForm');
    const msg = document.getElementById('rsvp-msg');

    if(!form) return;

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const guests = parseInt(form.guests.value,10) || 0;

        if(!name || !email){
            msg.textContent = 'Por favor completa los campos requeridos.';
            return;
        }

        // guardar en localStorage (simulación de envío)
        const submissions = JSON.parse(localStorage.getItem('rsvps') || '[]');
        submissions.push({name,email,guests,when:new Date().toISOString()});
        localStorage.setItem('rsvps', JSON.stringify(submissions));

        msg.innerHTML = '¡Confirmación recibida! Gracias por acompañarnos en esta celebración.';
        form.reset();
    });

})();
