// Animaciones y comportamiento para la sección Hero
(function(){
    const subtitle = document.querySelector('.hero-subtitle');
    const nameEl = document.querySelector('.hero-name');
    const phrase = document.querySelector('.hero-phrase');
    const dateEl = document.querySelector('.hero-date');
    const arrow = document.querySelector('.scroll-down');

    function animateHero(){
        if(!subtitle) return;
        // Añadimos clases con pequeños retrasos para efecto escalonado
        subtitle.classList.add('fade-up','animate');
        setTimeout(()=> nameEl && nameEl.classList.add('zoom','animate'),200);
        setTimeout(()=> phrase && phrase.classList.add('fade','animate'),450);
        setTimeout(()=> dateEl && dateEl.classList.add('fade-up','animate'),650);
        setTimeout(()=> arrow && arrow.classList.add('fade','animate'),900);
    }

    // Si la invitación ya fue abierta (contenido visible) animar al cargar
    document.addEventListener('DOMContentLoaded',()=>{
        const content = document.getElementById('content');
        if(content && getComputedStyle(content).display !== 'none'){
            animateHero();
        }
    });

    // Escuchar el botón de abrir invitación para disparar animación
    const openBtn = document.getElementById('openInvitation');
    if(openBtn){
        openBtn.addEventListener('click',()=>{
            // esperar a que el cover se oculte y el contenido se muestre
            setTimeout(()=>{
                animateHero();
            },150);
        });
    }

    // Scroll suave desde la flecha hacia la sección countdown
    if(arrow){
        arrow.addEventListener('click',(e)=>{
            e.preventDefault();
            const target = document.querySelector('#countdown');
            if(target){
                target.scrollIntoView({behavior:'smooth'});
            }
        });
    }

})();
