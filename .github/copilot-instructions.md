# Proyecto: sitio de Pablo Borrás

Sitio de marca personal de Pablo Jesús Borrás, médico veterinario especialista en
enfermedades infecciosas y parasitarias de perros y gatos. Tres públicos: tutores de
mascotas, veterinarios y empresas/instituciones.

**Idioma de las respuestas: español rioplatense.** Todo el contenido del sitio, en español.

---

# Stack

Astro + React Islands + Tailwind CSS v4 + Vite + Vercel

- **Componentes estáticos:** `.astro`
- **Componentes interactivos** (useState, eventos del DOM): `.jsx` con `client:load` o
  `client:visible`
- No mezclar lógica de React en archivos `.astro`
- Mantener el código en JavaScript. No migrar a TypeScript.
- Deploy en Vercel: no usar APIs de Node que no funcionen en edge.

---

# Estilos

- **Tailwind CSS v4** para composición: espaciados, grillas, flex, tamaños, colores planos.
  Todo lo que se lee de un vistazo en el marcado.
- **CSS puro en bloques `<style>`** para sistemas: degradados de varias paradas, keyframes,
  media queries con varias propiedades, filtros compuestos. Todo lo que en Tailwind
  quedaría como una cadena ilegible de corchetes. Para reglas verdaderamente globales,
  `src/styles/global.css`.
- Regla práctica: si la clase de Tailwind se vuelve `bg-[linear-gradient(...)]`, va al
  `<style>`.
- **No escribir estilos inline nuevos** en el atributo `style`.
- Los heros existentes ya usan estilos inline de forma extendida. **No migrarlos salvo
  pedido explícito.** Al modificarlos, recordar que un estilo inline le gana en prioridad a
  cualquier regla de un bloque `<style>`: si hay que cambiar en mobile una propiedad
  declarada inline, no alcanza con escribir una media query. Hay que sacar esa propiedad
  del atributo `style` y pasarla a clases con su versión de escritorio y su versión de
  mobile, o forzar la prioridad de la regla de mobile. Elegir un camino y aplicarlo de
  forma consistente.
- No agregar clases de Tailwind que no existan en v4.
- Usar siempre las variables CSS del proyecto.

**Reutilizar las utilidades que ya existen en `global.css`** antes de escribir CSS nuevo:
`.animate-fade-in-up`, `.animate-fade-in`, `.animate-slide-in-left`, `.animate-scale-in`,
`.animate-slide-down`, `.delay-100` a `.delay-700` para el escalonado, `.reveal` +
`.visible` para las apariciones por scroll (las activa un IntersectionObserver en
`Layout.astro`), `.card-lift`, `.dot-pattern`, `.gradient-text`, `.hero-bar-grow`,
`.avail-dot`. **No duplicar keyframes que ya existen.**

`.hero-section` y `.page-hero` ya definen la altura de los heros: un viewport menos el
header en desktop, `72svh` en mobile.

Criterio general: usar la herramienta que dé mejor resultado visual y mejor rendimiento.
Nunca forzar Tailwind por prolijidad, ni agregar JS donde alcanza con CSS.

---

# Variables de diseño

Definidas en `src/styles/global.css` dentro del bloque `@theme`.

```text
--color-primary:       #040d4e   (navy)
--color-secondary:     #183b7f
--color-accent:        #1880c9   (celeste)
--color-accent-light:  #5ba8e0
--color-business:      #303276   (índigo del logo / audiencia Empresas)

--color-neutral-dark:  #040d4e
--color-neutral-mid:   #1a367c
--color-neutral-light: #eef3fb
--color-text:          #0d0d2b
--color-text-muted:    #6b7899

--font-display:        Playfair Display, Georgia, serif
--font-body:           DM Sans, system-ui, sans-serif

--radius, --shadow, --shadow-lg, --header-height 
```
La paleta se limita a colores derivados del logo de Pablo Borrás.

El logo contiene una transición visual entre navy, índigo y azul. Por ese motivo,
`--color-business: #303276` forma parte oficialmente de la identidad visual del sitio.

Este índigo se utiliza principalmente para representar a la audiencia de
empresas/instituciones.

**El antiguo violeta `#4a3d9e` continúa excluido.** Es demasiado violeta y no representa
correctamente el tono índigo presente en el logo.

`--color-business` no debe convertirse en un color decorativo general del sitio.

---

# Sistema cromático de audiencias

Los tres públicos principales del sitio tienen una diferenciación cromática intencional.
Este sistema forma parte de la identidad visual y debe mantenerse consistente en todas
las páginas.

## Tutores de mascotas

Tratamiento principal:

- blanco y tonos neutros claros;
- navy para textos;
- celeste como acento.

Referencia visual:

`Soy tutor de mascotas` → tratamiento claro.

## Veterinarios

Tratamiento principal:

- `--color-accent`;
- `--color-accent-light`;
- azules de la marca.

Referencia visual:

`Soy veterinario` → azul/celeste.

## Empresas e instituciones

Tratamiento principal:

- `--color-business`;
- navy;
- tonos derivados del índigo presente en el logo.

Referencia visual:

`Represento una empresa` → índigo de marca.

## Regla de uso

Los colores de audiencia funcionan como identificadores semánticos.

Pueden utilizarse en:

- CTAs;
- botones;
- cards;
- badges;
- iconos;
- pequeños acentos vinculados claramente con cada público.

No utilizar estos colores arbitrariamente en secciones sin relación con las audiencias.

Especialmente, `--color-business` no debe convertirse en un color decorativo general
del sitio.

---
# Heros

`src/components/home/Hero.astro` es el estándar visual del sitio. Todos los heros deben
seguirlo; cualquier desvío es un bug a corregir, no una decisión de diseño.

**Desktop:**
- Fondo del `<section>` transparente. Nunca un color de fondo detrás de una foto
  semitransparente: el color atraviesa la imagen y la tiñe.
- Foto a color pleno, sin bajarle opacidad.
- Degradado lateral que cubre solo el sector izquierdo, no todo el ancho.
- Difuminado radial negro detrás del bloque de texto.
- Contenido alineado al margen izquierdo, con barra vertical celeste a la izquierda del
  título.
- Fade inferior hacia el color de la sección siguiente.
- La mitad derecha de la foto queda limpia, sin capas encima.

**Mobile:**
- Degradado vertical: transparente arriba (para que se vea la foto y las caras),
  progresivamente opaco hacia abajo (donde se apoya el texto).
- Contenido anclado abajo y alineado a la izquierda.
- Títulos en blanco sólido.
- Tarjetitas de credenciales y botones apilados en columna.
- El hero crece en alto según su contenido: altura mínima, no altura fija.

---

# Reglas aprendidas

- **Texto con gradiente:** la clase `.gradient-text` usa `-webkit-text-fill-color:
  transparent`. Cualquier sombra sobre ella debe ser `filter: drop-shadow`, nunca
  `text-shadow` — sobre relleno transparente la sombra de texto no se renderiza.
- **Para anular un gradiente de texto** no alcanza con cambiar el color: hay que anular
  también el `background` y devolver el recorte de fondo a su comportamiento normal, o
  queda un rectángulo de color detrás de las palabras.
- **Los títulos con gradiente celeste se pierden en mobile** contra el fondo navy. En
  mobile van en blanco sólido; el gradiente queda solo en desktop.
- **Nunca velos planos de opacidad uniforme** sobre las fotos: lavan la imagen. El
  oscurecimiento viene siempre de degradados progresivos.
- **`object-position` no sirve si no hay excedente.** Si la imagen tiene una relación de
  aspecto parecida a la del contenedor, no hay nada que desplazar. Para generar excedente:
  anclar la imagen al borde inferior (`bottom: 0`, sin `top` numérico) y darle una altura
  mayor a la del contenedor.
- **Sin scroll indicators** en ninguna parte del sitio.
- Preferir ajustes mínimos y localizados. Nunca cambiar el layout general para resolver un
  problema visual puntual.

---

# Rendimiento

- Animaciones en CSS, o con JS mínimo (IntersectionObserver, un solo `setInterval`). Nada
  que perjudique Lighthouse.
- Imágenes en WebP. Rutas siempre con barra inicial (`/imagenes/...`), nunca con `public/`
  adelante.
- **Excepción:** la imagen de Open Graph queda en `.jpg`, por compatibilidad con los
  crawlers de WhatsApp y Facebook.
- Las imágenes de hero llevan `loading="eager"` y `fetchpriority="high"`, y su preload en
  el `<head>` debe apuntar exactamente al archivo que se renderiza.

---

# Reglas generales

- No tocar archivos que no se mencionen explícitamente en el prompt.
- No agregar librerías externas sin que Pablo lo pida.
- No reorganizar imports ni la estructura de carpetas.
- Al trabajar en desktop, no filtrar cambios a mobile, y viceversa. Si un cambio se filtra,
  compensarlo con una media query.

---

# Integraciones activas

- **Sanity CMS:** variables en `.env.local` (`SANITY_PROJECT_ID`, `SANITY_DATASET`)
- **Web3Forms:** variable en `.env.local` (`WEB3FORMS_KEY`)