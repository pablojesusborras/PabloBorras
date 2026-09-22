// scripts/migrar-eventos-a-sanity.js
// Script para migrar eventos desde src/data/eventos.js a Sanity CMS
//
// USO: npm run migrate:eventos
//
// CARACTERÍSTICAS:
// - Usa IDs fijos para evitar duplicados (seguro ejecutar múltiples veces)
// - Marca los primeros 3 eventos como destacados
// - Mantiene todos los campos originales

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Importar eventos estáticos
import { eventos } from '../src/data/eventos.js';

// Validar variables de entorno
const requiredEnvVars = ['PUBLIC_SANITY_PROJECT_ID', 'PUBLIC_SANITY_DATASET', 'SANITY_API_TOKEN'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Error: Faltan variables de entorno requeridas:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error('\n💡 Asegurate de tener un archivo .env en la raíz con:');
  console.error('   PUBLIC_SANITY_PROJECT_ID=tu-project-id');
  console.error('   PUBLIC_SANITY_DATASET=production');
  console.error('   SANITY_API_TOKEN=tu-token-de-api');
  process.exit(1);
}

// Crear cliente de Sanity
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

async function migrarEventos() {
  console.log('🚀 Iniciando migración de eventos a Sanity...');
  console.log(`📂 Project ID: ${process.env.PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`📊 Dataset: ${process.env.PUBLIC_SANITY_DATASET}`);
  console.log(`📝 Total de eventos a migrar: ${eventos.length}\n`);
  
  let exitosos = 0;
  let actualizados = 0;
  let errores = 0;
  
  // Determinar cuáles son destacados (primeros 3 en orden original)
  const idsDestacados = eventos.slice(0, 3).map(e => e.id);
  
  for (const evento of eventos) {
    // Usar ID fijo basado en el ID original para evitar duplicados
    const eventoId = `evento-${evento.id}`;
    
    const doc = {
      _type: 'evento',
      _id: eventoId, // ID fijo para que createOrReplace no duplique
      nombre: evento.nombre,
      ciudad: evento.ciudad,
      fecha: evento.fecha,
      tipo: evento.tipo,
      descripcion: evento.descripcion,
      destacado: idsDestacados.includes(evento.id), // Marcar primeros 3 como destacados
      enlace: evento.enlace || undefined, // Solo si existe
    };
    
    try {
      // createOrReplace: crea si no existe, reemplaza si existe
      const result = await client.createOrReplace(doc);
      
      const esNuevo = result._rev.includes('-0');
      
      if (esNuevo) {
        console.log(`✅ Creado: ${evento.nombre}`);
        exitosos++;
      } else {
        console.log(`🔄 Actualizado: ${evento.nombre}`);
        actualizados++;
      }
      
      if (doc.destacado) {
        console.log(`   ⭐ Marcado como destacado`);
      }
      console.log(`   📍 ${evento.ciudad} | ${evento.fecha}`);
      
    } catch (error) {
      console.error(`❌ Error con "${evento.nombre}":`, error.message);
      errores++;
    }
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log('✨ Migración completada');
  console.log(`   ✅ Creados: ${exitosos}`);
  console.log(`   🔄 Actualizados: ${actualizados}`);
  console.log(`   ❌ Errores: ${errores}`);
  console.log('═'.repeat(60));
  
  if (exitosos > 0 || actualizados > 0) {
    console.log('\n✅ Los eventos están ahora en Sanity Studio');
    console.log('   📱 Local: http://localhost:3333');
    console.log('   🌐 Online: https://pablo-borras.sanity.studio');
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Abrí el Studio y revisá los eventos');
    console.log('   2. Los primeros 3 eventos están marcados como destacados');
    console.log('   3. Podés agregar imágenes y enlaces a cada evento');
    console.log('   4. Reconstruí el sitio: npm run build');
  }
  
  if (errores > 0) {
    process.exit(1);
  }
}

// Ejecutar migración
migrarEventos()
  .catch(error => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
