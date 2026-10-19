// Simple lightbox gallery with keyboard navigation
(function(){
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    // Keep the fixed lightbox outside transformed/clipped sections in the page layout.
    if(lightbox && lightbox.parentElement !== document.body) {
        document.body.appendChild(lightbox);
    }

    let currentIndex = -1;
    let lastTrigger = null;

    function openAt(index){
        const btn = thumbs[index];
        if(!btn) return;
        const src = btn.dataset.src || btn.querySelector('img')?.src;
        if(!lightbox || !lbImage) return;
        if(currentIndex === -1) lastTrigger = btn;
        lbImage.src = src;
        lbImage.alt = btn.querySelector('img')?.alt || '';
        currentIndex = index;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden','false');
        // Keep the document at the gallery while moving keyboard focus into the lightbox.
        if(closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function close(){
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden','true');
        lbImage.src = '';
        currentIndex = -1;
        if(lastTrigger) lastTrigger.focus({ preventScroll: true });
        lastTrigger = null;
    }

    function showNext(){
        if(currentIndex < thumbs.length -1) openAt(currentIndex+1);
        else openAt(0);
    }
    function showPrev(){
        if(currentIndex > 0) openAt(currentIndex-1);
        else openAt(thumbs.length-1);
    }

    thumbs.forEach((btn, idx)=>{
        btn.addEventListener('click', ()=> openAt(idx));
    });

    if(closeBtn) closeBtn.addEventListener('click', close);
    if(nextBtn) nextBtn.addEventListener('click', showNext);
    if(prevBtn) prevBtn.addEventListener('click', showPrev);

    // Keyboard
    document.addEventListener('keydown', (e)=>{
        if(lightbox.classList.contains('open')){
            if(e.key === 'Escape') close();
            if(e.key === 'ArrowRight') showNext();
            if(e.key === 'ArrowLeft') showPrev();
        }
    });

    // Close clicking outside image
    lightbox && lightbox.addEventListener('click', (e)=>{
        if(e.target === lightbox) close();
    });

})();
