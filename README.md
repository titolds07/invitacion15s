# Invitación XV - Proyecto

Sitio estático de invitación para eventos (template de XV años).

Estructura principal:
- `index.html` - página principal con secciones: Hero, Countdown, Gallery, Video, Event, RSVP, etc.
- `css/` - estilos (variables, sections, responsive, animations)
- `js/` - lógica: `hero.js`, `countdown.js`, `gallery.js`, `rsvp.js`, `app.js`, `loader.js`
- `assets/images/` - imágenes de ejemplo (placeholders SVG)

Correr en local:
```powershell
py -m http.server 8000
# Abrir http://localhost:8000
```

Sugerencias antes de subir a Git:
- Reemplaza las imágenes en `assets/images/` por las reales.
- Actualiza el `iframe` de video en `#video` con el enlace correcto.
- Si deseas enviar RSVP a un servidor, reemplaza el almacenamiento local en `js/rsvp.js`.

Licencia: este repositorio es tu plantilla privada. Ajusta contenidos y estilos según tu gusto.
