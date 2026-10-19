(function () {
    'use strict';

    const form = document.getElementById('rsvpForm');
    const message = document.getElementById('rsvp-msg');
    const whatsappNumber = '573023818512';
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const guests = Number.parseInt(form.elements.guests.value, 10) || 0;

        if (!name) {
            showMessage('Por favor escribe tu nombre.', '#E3CB91');
            form.elements.name.focus();
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage('Por favor ingresa un correo válido.', '#E3CB91');
            form.elements.email.focus();
            return;
        }

        const guestLabel = guests === 0 ? 'Asistiré sin acompañantes' : `Llevaré ${guests} acompañante${guests === 1 ? '' : 's'}`;
        const text = `Hola, soy ${name}. Confirmo mi asistencia a los XV años de Everlin. ${guestLabel}. Mi correo es ${email}.`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        showMessage('Se abrió WhatsApp con tu confirmación lista. Recuerda pulsar Enviar para hacérnosla llegar.', '#E3CB91');
    });

    function showMessage(text, color) {
        if (!message) return;
        message.textContent = text;
        message.style.color = color;
        message.setAttribute('role', 'status');
    }
})();
