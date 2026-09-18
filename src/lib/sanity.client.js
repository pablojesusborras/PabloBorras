// src/lib/sanity.client.js — Cliente de Sanity CMS
// 
// ⚠️ CONFIGURACIÓN COMENTADA — Activar cuando tengas las credenciales de Sanity
//
// PASO 1: Instalar dependencias
// npm install @sanity/client @sanity/image-url
//
// PASO 2: Crear un proyecto en https://www.sanity.io/
// - Crear nuevo proyecto
// - Configurar dataset (por ejemplo: 'production')
// - Obtener Project ID
// - Generar token de API (Settings > API > Add New Token)
//   - Permisos: Editor (para poder crear/editar desde el dashboard)
//
// PASO 3: Crear archivo .env en la raíz del proyecto con:
// PUBLIC_SANITY_PROJECT_ID=tu-project-id-aqui
// PUBLIC_SANITY_DATASET=production
// SANITY_API_TOKEN=tu-token-aqui
//
// PASO 4: Descomentar el código a continuación

/* 
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Cliente de Sanity
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01', // Usa la fecha de hoy
  useCdn: true, // `false` si quieres contenido siempre fresco
  token: import.meta.env.SANITY_API_TOKEN, // Solo necesario para mutaciones
});

// Builder de URLs de imágenes
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// ───────────────────────────────────────────────────────────
// QUERIES — Funciones para obtener datos
// ───────────────────────────────────────────────────────────

/**
 * Obtiene todos los eventos ordenados por fecha
 * @param {boolean} soloFuturos - Si true, filtra solo eventos futuros
 * @returns {Promise<Array>} Array de eventos
 */
export async function getEventos(soloFuturos = false) {
  const hoy = new Date().toISOString().split('T')[0];
  
  const query = soloFuturos
    ? `*[_type == "evento" && fecha >= "${hoy}"] | order(fecha asc) {
        _id,
        nombre,
        ciudad,
        fecha,
        tipo,
        descripcion,
        imagen,
        enlace,
        destacado
      }`
    : `*[_type == "evento"] | order(fecha desc) {
        _id,
        nombre,
        ciudad,
        fecha,
        tipo,
        descripcion,
        imagen,
        enlace,
        destacado
      }`;
  
  return await sanityClient.fetch(query);
}

/**
 * Obtiene eventos destacados
 * @returns {Promise<Array>} Array de eventos destacados
 */
export async function getEventosDestacados() {
  const query = `*[_type == "evento" && destacado == true] | order(fecha desc) [0...3] {
    _id,
    nombre,
    ciudad,
    fecha,
    tipo,
    descripcion,
    imagen,
    enlace
  }`;
  
  return await sanityClient.fetch(query);
}

/**
 * Obtiene un evento por ID
 * @param {string} id - ID del evento
 * @returns {Promise<Object>} Evento
 */
export async function getEventoPorId(id) {
  const query = `*[_type == "evento" && _id == "${id}"][0] {
    _id,
    nombre,
    ciudad,
    fecha,
    tipo,
    descripcion,
    imagen,
    enlace,
    destacado
  }`;
  
  return await sanityClient.fetch(query);
}
*/

// ───────────────────────────────────────────────────────────
// EXPORTACIÓN TEMPORAL — Usar datos estáticos mientras tanto
// ───────────────────────────────────────────────────────────

// Mientras Sanity no esté configurado, importa desde el archivo estático
import { eventos } from '../data/eventos.js';

export async function getEventos(soloFuturos = false) {
  if (soloFuturos) {
    const hoy = new Date().toISOString().split('T')[0];
    return eventos.filter(evento => evento.fecha >= hoy);
  }
  return eventos;
}

export async function getEventosDestacados() {
  return eventos.slice(0, 3);
}

export async function getEventoPorId(id) {
  return eventos.find(evento => evento.id === id);
}
