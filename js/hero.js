// Animaciones y comportamiento para la sección Hero
(function(){
    const subtitle = document.querySelector('.hero-subtitle');
    const nameEl = document.querySelector('.hero-name');
    const phrase = document.querySelector('.hero-phrase');
    const dateEl = document.querySelector('.hero-date');
    const arrow = document.querySelector('.scroll-down');

    function animateHero(){
        if(!subtitle) return;
        // Animaciones progresivas
        subtitle.classList.add('fade-up','animate');
        setTimeout(()=> {
            if(nameEl) {
                nameEl.classList.add('typing-animation');
                nameEl.classList.add('animate');
            }
        }, 300);
        setTimeout(()=> phrase && phrase.classList.add('fade','animate'), 3800);
        setTimeout(()=> dateEl && dateEl.classList.add('fade-up','animate'), 4300);
        setTimeout(()=> arrow && arrow.classList.add('fade','animate'), 4800);
    }

    // Cuando el carrusel llega al hero
    document.addEventListener('DOMContentLoaded',()=>{
        const content = document.getElementById('content');
        const observer = new MutationObserver(() => {
            const hero = document.getElementById('hero');
            if(hero && hero.style.display !== 'none') {
                animateHero();
                observer.disconnect();
            }
        });

        observer.observe(content, { attributes: true, subtree: true });

        // Fallback si el observer no funciona
        const checkHero = setInterval(() => {
            const hero = document.getElementById('hero');
            if(hero && hero.style.display !== 'none' && !hero.hasAttribute('data-animated')) {
                hero.setAttribute('data-animated', 'true');
                animateHero();
                clearInterval(checkHero);
            }
        }, 100);

        setTimeout(() => clearInterval(checkHero), 10000);
    });

})();
