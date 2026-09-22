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
      description: 'Nombre completo del evento o congreso (ej: "ECVIM-CA 35th Annual Congress")',
      validation: (Rule) => Rule.required().max(200).error('El nombre es obligatorio y debe tener menos de 200 caracteres'),
    },
    {
      name: 'ciudad',
      title: 'Ciudad y País',
      type: 'string',
      description: 'Ubicación del evento (ej: "Buenos Aires, Argentina")',
      validation: (Rule) => Rule.required().error('La ciudad es obligatoria'),
    },
    {
      name: 'fecha',
      title: 'Fecha del Evento',
      type: 'date',
      description: 'Fecha en que se realiza el evento',
      validation: (Rule) => Rule.required().error('La fecha es obligatoria'),
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      name: 'tipo',
      title: 'Tipo de Evento',
      type: 'string',
      description: 'Categoría del evento',
      validation: (Rule) => Rule.required().error('El tipo de evento es obligatorio'),
      options: {
        list: [
          { title: 'Congreso', value: 'Congreso' },
          { title: 'Taller', value: 'Taller' },
          { title: 'Jornada', value: 'Jornada' },
          { title: 'Evento corporativo', value: 'Evento corporativo' },
          { title: 'Charla', value: 'Charla' },
          { title: 'Webinar', value: 'Webinar' },
          { title: 'Podcast', value: 'Podcast' },
          { title: 'Otro', value: 'Otro' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      description: 'Breve descripción de tu participación o del evento (ej: "Ponente invitado en infectología veterinaria")',
      validation: (Rule) => Rule.required().max(500).error('La descripción es obligatoria y debe tener menos de 500 caracteres'),
      rows: 4,
    },
    {
      name: 'imagen',
      title: 'Imagen del Evento',
      type: 'image',
      description: 'Imagen representativa del evento (opcional, se puede subir luego)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          description: 'Descripción de la imagen para accesibilidad',
        },
      ],
    },
    {
      name: 'enlace',
      title: 'Enlace al Evento',
      type: 'url',
      description: 'URL del sitio web del evento (opcional)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'destacado',
      title: '⭐ Evento Destacado',
      type: 'boolean',
      description: 'Marcá este evento para que aparezca en la página principal',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'fecha',
      ciudad: 'ciudad',
      tipo: 'tipo',
      media: 'imagen',
    },
    prepare(selection) {
      const { title, subtitle, ciudad, tipo } = selection
      return {
        title: title,
        subtitle: `${tipo} · ${ciudad} · ${subtitle}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha (más reciente primero)',
      name: 'fechaDesc',
      by: [{ field: 'fecha', direction: 'desc' }],
    },
    {
      title: 'Fecha (más antigua primero)',
      name: 'fechaAsc',
      by: [{ field: 'fecha', direction: 'asc' }],
    },
  ],
}
