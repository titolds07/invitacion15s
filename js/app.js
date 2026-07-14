const boton=document.getElementById("openInvitation");

const contenido=document.getElementById("content");

boton.addEventListener("click",()=>{

    document.getElementById("cover").style.display="none";

    contenido.style.display="block";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});