// sanity/schemas/evento.js — Schema de eventos para Sanity Studio
//
// ⚠️ Este archivo es para configurar Sanity Studio (panel de administración)
//
// INSTRUCCIONES:
// 1. Este archivo debe ir en tu proyecto de Sanity Studio (no en el proyecto de Astro)
// 2. Cuando crees tu Sanity Studio, copia este schema a la carpeta schemas/
// 3. Impórtalo en sanity.config.js o schema.js
//
// CÓMO CREAR SANITY STUDIO:
// npm create sanity@latest -- --project <tu-project-id> --dataset production
// Esto creará una carpeta separada para el studio

/* 
export default {
  name: 'evento',
  title: 'Eventos',
  type: 'document',
  icon: () => '📅',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del Evento',
      type: 'string',
      description: 'Nombre completo del evento o congreso',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'ciudad',
      title: 'Ciudad y País',
      type: 'string',
      description: 'Ej: Buenos Aires, Argentina',
      validation: Rule => Rule.required()
    },
    {
      name: 'fecha',
      title: 'Fecha del Evento',
      type: 'date',
      description: 'Fecha en que se realiza el evento',
      validation: Rule => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD'
      }
    },
    {
      name: 'tipo',
      title: 'Tipo de Evento',
      type: 'string',
      description: 'Categoría del evento',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Congreso', value: 'Congreso' },
          { title: 'Taller', value: 'Taller' },
          { title: 'Jornada', value: 'Jornada' },
          { title: 'Evento corporativo', value: 'Evento corporativo' },
          { title: 'Charla', value: 'Charla' },
          { title: 'Webinar', value: 'Webinar' },
          { title: 'Podcast', value: 'Podcast' },
          { title: 'Otro', value: 'Otro' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      description: 'Breve descripción de tu participación o del evento',
      validation: Rule => Rule.required().max(500),
      rows: 4
    },
    {
      name: 'imagen',
      title: 'Imagen del Evento',
      type: 'image',
      description: 'Imagen representativa del evento (opcional)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          description: 'Descripción de la imagen para accesibilidad'
        }
      ]
    },
    {
      name: 'enlace',
      title: 'Enlace al Evento',
      type: 'url',
      description: 'URL del sitio web del evento (opcional)',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'destacado',
      title: '⭐ Evento Destacado',
      type: 'boolean',
      description: 'Marcar como destacado para aparecer en la homepage',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'fecha',
      ciudad: 'ciudad',
      tipo: 'tipo',
      media: 'imagen'
    },
    prepare(selection) {
      const { title, subtitle, ciudad, tipo } = selection;
      return {
        title: title,
        subtitle: `${tipo} · ${ciudad} · ${subtitle}`,
        media: selection.media
      };
    }
  },
  orderings: [
    {
      title: 'Fecha (más reciente primero)',
      name: 'fechaDesc',
      by: [
        { field: 'fecha', direction: 'desc' }
      ]
    },
    {
      title: 'Fecha (más antigua primero)',
      name: 'fechaAsc',
      by: [
        { field: 'fecha', direction: 'asc' }
      ]
    }
  ]
};
*/

// ───────────────────────────────────────────────────────────
// NOTA: Este schema debe ir en tu proyecto de Sanity Studio
// ───────────────────────────────────────────────────────────
// 
// Estructura de carpetas de tu Sanity Studio:
//
// sanity-studio/
// ├── sanity.config.js
// ├── schemas/
// │   ├── index.js
// │   └── evento.js  ← Este archivo va aquí
// └── package.json
//
// En schemas/index.js debes importarlo así:
//
// import evento from './evento'
//
// export const schemaTypes = [evento]
