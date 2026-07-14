// Reveal sections on scroll
(function(){
    const sections = document.querySelectorAll('section');

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.15});

    sections.forEach((section)=>{
        section.classList.add('reveal');
        observer.observe(section);
    });
})();
