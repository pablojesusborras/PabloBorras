// src/lib/sanity.client.js — Cliente de Sanity CMS

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Fallback: datos estáticos para cuando Sanity no esté disponible
import { eventos as eventosFallback } from '../data/eventos.js';

// Cliente de Sanity
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-01',
  useCdn: true,
  token: import.meta.env.SANITY_API_TOKEN,
});

// Builder de URLs de imágenes
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// ───────────────────────────────────────────────────────────
// HELPERS — Transformación de datos
// ───────────────────────────────────────────────────────────

/**
 * Transforma un evento de Sanity al formato esperado por los componentes
 * Mantiene compatibilidad con el formato de eventos.js
 */
function transformarEvento(eventoSanity) {
  if (!eventoSanity) return null;
  
  return {
    id: eventoSanity._id,
    nombre: eventoSanity.nombre,
    ciudad: eventoSanity.ciudad,
    fecha: eventoSanity.fecha,
    tipo: eventoSanity.tipo,
    descripcion: eventoSanity.descripcion,
    // Campos opcionales (por ahora no se usan en los componentes)
    imagen: eventoSanity.imagen,
    enlace: eventoSanity.enlace,
    destacado: eventoSanity.destacado,
  };
}

// ───────────────────────────────────────────────────────────
// QUERIES — Funciones para obtener datos
// ───────────────────────────────────────────────────────────

/**
 * Obtiene todos los eventos
 * @param {boolean} soloFuturos - Si true, filtra solo eventos futuros
 * @returns {Promise<Array>} Array de eventos
 */
export async function getEventos(soloFuturos = false) {
  try {
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
    
    const eventos = await sanityClient.fetch(query);
    
    // Si Sanity responde con array vacío, devolver vacío (no usar fallback)
    // Solo usar fallback si hay error de red o credenciales
    return eventos.map(transformarEvento);
    
  } catch (error) {
    // Error de red o credenciales: usar fallback y avisar
    console.warn('⚠️ Sanity CMS no disponible, usando datos estáticos como fallback:', error.message);
    
    if (soloFuturos) {
      const hoy = new Date().toISOString().split('T')[0];
      return eventosFallback.filter(evento => evento.fecha >= hoy);
    }
    return eventosFallback;
  }
}

/**
 * Obtiene eventos destacados
 * @returns {Promise<Array>} Array de eventos destacados
 */
export async function getEventosDestacados() {
  try {
    const query = `*[_type == "evento" && destacado == true] | order(fecha desc) [0...3] {
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
    
    const eventos = await sanityClient.fetch(query);
    return eventos.map(transformarEvento);
    
  } catch (error) {
    console.warn('⚠️ Sanity CMS no disponible, usando datos estáticos como fallback:', error.message);
    // Los primeros 3 eventos como destacados (para compatibilidad)
    return eventosFallback.slice(0, 3);
  }
}

/**
 * Obtiene un evento por ID
 * @param {string} id - ID del evento
 * @returns {Promise<Object|null>} Evento o null
 */
export async function getEventoPorId(id) {
  try {
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
    
    const evento = await sanityClient.fetch(query);
    return transformarEvento(evento);
    
  } catch (error) {
    console.warn('⚠️ Sanity CMS no disponible, usando datos estáticos como fallback:', error.message);
    return eventosFallback.find(evento => evento.id === id) || null;
  }
}
