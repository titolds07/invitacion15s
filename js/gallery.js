// Simple lightbox gallery with keyboard navigation
(function(){
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = -1;

    function openAt(index){
        const btn = thumbs[index];
        if(!btn) return;
        const src = btn.dataset.src || btn.querySelector('img')?.src;
        lbImage.src = src;
        lbImage.alt = btn.querySelector('img')?.alt || '';
        currentIndex = index;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden','false');
        // trap focus on close button
        closeBtn.focus();
    }

    function close(){
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden','true');
        lbImage.src = '';
        currentIndex = -1;
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
