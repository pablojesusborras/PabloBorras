/**
 * Configuración central del sitio
 * Todos los valores de dominio, identidad y redes sociales se definen aquí
 */

export const SITE_CONFIG = {
  // Dominio oficial (con www, sin barra final)
  url: 'https://www.pablojborras.com',
  
  // Identidad
  name: 'Pablo Borrás',
  fullName: 'Pablo Jesús Borrás',
  alternateNames: [
    'Pablo Borrás',
    'Pablo J. Borrás',
    'Pablo Borras', // Sin tilde para búsquedas
  ],
  
  // Información profesional
  jobTitle: 'Médico Veterinario, Especialista en Enfermedades Infecciosas y Parasitarias',
  description: 'Especialista en enfermedades infecciosas y parasitarias de perros y gatos. Magíster en Prevención y Control de Zoonosis (UNNOBA-ANLIS). Editor asociado de Parasites and Vectors (Springer Nature). Speaker internacional y autor. Buenos Aires, Argentina.',
  
  // Ubicación
  location: {
    city: 'Buenos Aires',
    country: 'Argentina',
    countryCode: 'AR',
  },
  
  // Perfiles sociales oficiales (solo perfiles propios, URLs exactas)
  socialProfiles: [
    'https://www.instagram.com/pablojborras/',
    'https://www.linkedin.com/in/pablo-jes%C3%BAs-borr%C3%A1s-b9aa3856/',
    'https://www.researchgate.net/profile/Pablo-Borras-2',
    'https://linktr.ee/pablojesusborras',
  ],
  
  // Foto de perfil
  profileImage: '/imagenes/perfil/pablo1.jpg',
  
  // Formación académica
  alumniOf: [
    {
      name: 'Universidad de Buenos Aires',
      country: 'AR',
    },
    {
      name: 'UNNOBA - ANLIS',
      country: 'AR',
    },
  ],
  
  // Membresías profesionales
  memberOf: [
    { name: 'TroCCAP', url: 'https://www.troccap.com' },
    { name: 'ISCAID', url: 'https://www.iscaid.org' },
    { name: 'ABCD cats & vets Europe', url: 'https://www.abcdcatsvets.org' },
  ],
  
  // Áreas de conocimiento
  expertise: [
    'Enfermedades infecciosas en perros y gatos',
    'Parasitología veterinaria',
    'Infectología canina y felina',
    'Enfermedades vectoriales',
    'Zoonosis',
    'Medicina interna veterinaria',
  ],
  
  // Libros publicados
  books: [
    {
      name: 'Manual Práctico de Enfermedades Infecciosas y Parasitarias en el Perro',
      publisher: 'Multimedica Ediciones Veterinarias',
      urls: [
        'https://libros-veterinaria.multimedica.es/parasitologia/472-manual-practico-de-enfermedades-infecciosas-y-parasitarias-del-perro.html',
      ],
    },
  ],
} as const;
