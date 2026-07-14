// ── RSVP Form Handler ──
(function () {
    'use strict';

    const form = document.getElementById('rsvpForm');
    const msg  = document.getElementById('rsvp-msg');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name   = form.name.value.trim();
        const email  = form.email.value.trim();
        const guests = parseInt(form.guests.value, 10) || 0;

        // Validación
        if (!name) {
            showMsg('⚠ Por favor escribe tu nombre.', '#ffcc44');
            form.querySelector('#rsvp-name').focus();
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMsg('⚠ Por favor ingresa un correo válido.', '#ffcc44');
            form.querySelector('#rsvp-email').focus();
            return;
        }

        // Guardar en localStorage
        const submissions = JSON.parse(localStorage.getItem('rsvps') || '[]');
        submissions.push({ name, email, guests, when: new Date().toISOString() });
        localStorage.setItem('rsvps', JSON.stringify(submissions));

        // Feedback positivo
        showMsg(`🎀 ¡Listo, ${name}! Tu asistencia fue confirmada. ¡Te esperamos!`, '#D4AF37');
        form.reset();

        // Animación de éxito en el botón
        const btn = form.querySelector('.btn');
        if (btn) {
            btn.textContent = '✓ Confirmado';
            btn.style.background = 'linear-gradient(135deg, #25d366, #1ebe5d)';
            setTimeout(() => {
                btn.textContent = '✉ Confirmar asistencia';
                btn.style.background = '';
            }, 3500);
        }
    });

    function showMsg(text, color) {
        if (!msg) return;
        msg.textContent = text;
        msg.style.color = color || '#D4AF37';
        msg.style.opacity = '0';
        msg.style.transition = 'opacity .3s';
        setTimeout(() => { msg.style.opacity = '1'; }, 10);
    }

})();
