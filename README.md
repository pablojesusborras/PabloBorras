# Pablo Borrás — Sitio web profesional

Stack: **Astro 4.x + Tailwind CSS + React Islands**  
Deploy: Vercel — [demo-pablo-borras.vercel.app](https://demo-pablo-borras.vercel.app)

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando               | Acción                                              |
| :-------------------- | :-------------------------------------------------- |
| `npm install`         | Instala dependencias                                |
| `npm run dev`         | Inicia servidor de desarrollo en `localhost:4321`   |
| `npm run build`       | Genera el sitio de producción en `./dist/`          |
| `npm run preview`     | Previsualiza el build localmente antes de desplegar |

## ✅ Checklist antes de salir a producción

### 🔴 Requiere datos del cliente
- [ ] Reemplazar `REEMPLAZAR_CON_API_KEY_WEB3FORMS` en `src/components/contacto/FormularioContacto.jsx`
- [ ] Reemplazar `REEMPLAZAR_VIDEO_1/2/3` con IDs reales de YouTube en `src/data/videos.js`
- [ ] Subir `/public/imagenes/libro/tapa-libro.jpg` (portada real del libro)
- [ ] Subir `/public/og/og-pablo-borras.jpg` (1200x630px para compartir en redes)
- [ ] Subir `/public/favicon.svg` e `/public/favicon.ico` reales
- [ ] Reemplazar `G-XXXXXXXXXX` con ID real de Google Analytics 4 en `src/layouts/Layout.astro`
- [ ] Actualizar eventos en `/eventos` con fechas reales
- [ ] Subir las 9 fotos de congresos a `/public/imagenes/congresos/`

### 🟡 Configuración de deploy
- [ ] Configurar dominio personalizado en Vercel
- [ ] Actualizar `SITE_URL` en `src/layouts/Layout.astro` con dominio real
- [ ] Conectar Sanity CMS para eventos dinámicos (ver [sanity/INSTRUCCIONES-SANITY.md](sanity/INSTRUCCIONES-SANITY.md))

## 🎨 Configurar Sanity CMS (Opcional pero recomendado)

Actualmente los eventos están en `src/data/eventos.js` (estáticos). Para que Pablo pueda gestionarlos desde un panel visual:

1. **Lee la guía completa**: [sanity/INSTRUCCIONES-SANITY.md](sanity/INSTRUCCIONES-SANITY.md)
2. **Crea cuenta en Sanity**: [sanity.io](https://www.sanity.io/)
3. **Configura variables de entorno**: Copia `.env.example` a `.env` y completa las credenciales
4. **Instala dependencias**: `npm install @sanity/client @sanity/image-url`
5. **Descomenta el código** en `src/lib/sanity.client.js`
6. **Migra los eventos**: `node scripts/migrar-eventos-a-sanity.js`

Todo el código ya está preparado y comentado, solo necesitas las credenciales de Sanity para activarlo.

