// sanity/config/sanity.config.ejemplo.js
// Configuración de ejemplo para Sanity Studio
//
// INSTRUCCIONES:
// Cuando crees tu Sanity Studio, copia este contenido a sanity.config.js

/*
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Pablo Borrás Website',

  projectId: 'tu-project-id', // ← Reemplazar con tu Project ID
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
*/

// ═══════════════════════════════════════════════════════════════
// Estructura de carpetas de Sanity Studio:
// ═══════════════════════════════════════════════════════════════
//
// sanity-studio/
// ├── sanity.config.js  ← Este archivo
// ├── schemas/
// │   ├── index.js      ← Importa todos los schemas
// │   └── evento.js     ← Schema de eventos (copia desde sanity/schemas/evento.js)
// ├── package.json
// └── node_modules/
