// scripts/migrar-eventos-a-sanity.js
// Script para migrar eventos desde src/data/eventos.js a Sanity CMS
//
// USO:
// 1. Asegúrate de tener el .env configurado
// 2. npm install dotenv @sanity/client
// 3. node scripts/migrar-eventos-a-sanity.js

/* 
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Importar eventos estáticos
import { eventos } from '../src/data/eventos.js';

// Crear cliente de Sanity
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

async function migrarEventos() {
  console.log('🚀 Iniciando migración de eventos a Sanity...\n');
  console.log(`📊 Total de eventos a migrar: ${eventos.length}\n`);
  
  let exitosos = 0;
  let errores = 0;
  
  for (const evento of eventos) {
    const doc = {
      _type: 'evento',
      nombre: evento.nombre,
      ciudad: evento.ciudad,
      fecha: evento.fecha,
      tipo: evento.tipo,
      descripcion: evento.descripcion,
      destacado: false, // Por defecto ninguno destacado, puedes cambiarlo después
      enlace: evento.enlace || undefined, // Solo si existe
    };
    
    try {
      const result = await client.create(doc);
      console.log(`✅ Migrado: ${evento.nombre}`);
      console.log(`   ID en Sanity: ${result._id}`);
      exitosos++;
    } catch (error) {
      console.error(`❌ Error con "${evento.nombre}":`, error.message);
      errores++;
    }
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log('✨ Migración completada');
  console.log(`   Exitosos: ${exitosos}`);
  console.log(`   Errores: ${errores}`);
  console.log('═'.repeat(60));
  
  if (exitosos > 0) {
    console.log('\n✅ Los eventos están ahora en Sanity Studio');
    console.log('   Puedes verlos en: http://localhost:3333');
    console.log('\n⚠️  Recuerda marcar como "destacados" los eventos que');
    console.log('   quieres mostrar en la homepage');
  }
}

// Ejecutar migración
migrarEventos()
  .catch(error => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
*/

// ═══════════════════════════════════════════════════════════════
// NOTA: Este script está comentado hasta que configures Sanity
// ═══════════════════════════════════════════════════════════════
//
// Para activarlo:
// 1. Configura Sanity según sanity/INSTRUCCIONES-SANITY.md
// 2. Descomenta todo este archivo
// 3. Instala dependencias: npm install dotenv
// 4. Ejecuta: node scripts/migrar-eventos-a-sanity.js

console.log('⚠️  Este script aún no está activado');
console.log('📖 Lee sanity/INSTRUCCIONES-SANITY.md para configurar Sanity primero');
