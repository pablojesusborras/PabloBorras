# 🚀 Guía de Activación de Sanity CMS

Esta guía te ayudará a activar Sanity CMS para gestionar los eventos de Pablo Borrás de forma dinámica.

## 📋 Índice

1. [¿Qué es Sanity y para qué lo usamos?](#qué-es-sanity)
2. [Configuración Inicial](#configuración-inicial)
3. [Instalación de Sanity Studio](#instalación-de-sanity-studio)
4. [Configuración del Proyecto Astro](#configuración-del-proyecto-astro)
5. [Migración de Datos](#migración-de-datos)
6. [Actualización de Componentes](#actualización-de-componentes)
7. [Deploy y Producción](#deploy-y-producción)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 ¿Qué es Sanity?

Sanity es un CMS (Content Management System) que permite a Pablo:
- ✅ Agregar, editar y eliminar eventos desde un panel web visual
- ✅ Subir imágenes de eventos
- ✅ Marcar eventos como destacados
- ✅ No necesitar código para actualizar contenido

Actualmente los eventos están en `src/data/eventos.js` (estáticos). Con Sanity, estarán en la nube y Pablo podrá administrarlos fácilmente.

---

## ⚙️ Configuración Inicial

### Paso 1: Crear cuenta en Sanity

1. Ve a [https://www.sanity.io/](https://www.sanity.io/)
2. Regístrate con Google/GitHub/Email
3. Una vez dentro, haz clic en "Create New Project"
4. Dale un nombre: **"Pablo Borrás Website"**
5. Selecciona dataset: **"production"**
6. ✅ Guarda el **Project ID** que te dan (lo necesitarás después)

### Paso 2: Obtener API Token

1. En el dashboard de Sanity, ve a tu proyecto
2. Menú lateral → **API** → **Tokens**
3. Click en "Add API Token"
4. Nombre: **"Astro Website"**
5. Permisos: **Editor** (para poder crear/editar contenido)
6. ✅ Copia el token y guárdalo en un lugar seguro (solo se muestra una vez)

---

## 🎨 Instalación de Sanity Studio

Sanity Studio es el panel de administración donde Pablo gestionará los eventos.

### Opción A: Studio en proyecto separado (Recomendado)

```bash
# Crear carpeta para Sanity Studio (fuera del proyecto de Astro)
cd ..
npm create sanity@latest

# Durante la instalación, selecciona:
# - Use existing project: SI
# - Project ID: [el que copiaste antes]
# - Dataset: production
# - Project template: Clean project with no predefined schemas
```

Esto creará una carpeta `sanity-studio` con la estructura:

```
sanity-studio/
├── sanity.config.js
├── schemas/
│   └── index.js
├── package.json
└── ...
```

### Configurar el schema de eventos

1. **Copia** el archivo `sanity/schemas/evento.js` de este proyecto
2. **Pégalo** en `sanity-studio/schemas/evento.js`
3. **Descomenta** todo el código del archivo
4. **Edita** `sanity-studio/schemas/index.js`:

```javascript
import evento from './evento'

export const schemaTypes = [evento]
```

5. **Edita** `sanity-studio/sanity.config.js` y asegúrate de que importa los schemas:

```javascript
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Pablo Borrás Website',

  projectId: 'tu-project-id',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

6. **Inicia Sanity Studio**:

```bash
cd sanity-studio
npm run dev
```

Abre http://localhost:3333 y ya podrás agregar eventos desde la interfaz visual.

---

## 🔧 Configuración del Proyecto Astro

### Paso 1: Instalar dependencias

En tu proyecto de Astro (DemoPabloBorras):

```bash
npm install @sanity/client @sanity/image-url
```

### Paso 2: Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto:

```env
PUBLIC_SANITY_PROJECT_ID=tu-project-id-aqui
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu-token-aqui
```

⚠️ **IMPORTANTE**: Agrega `.env` a tu `.gitignore` si no está ya:

```
.env
.env.local
```

### Paso 3: Activar el cliente de Sanity

Abre `src/lib/sanity.client.js` y:

1. **Descomenta** todo el bloque de importaciones y configuración
2. **Comenta o elimina** el bloque de "EXPORTACIÓN TEMPORAL" al final

El archivo debería quedar así:

```javascript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

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
```

---

## 📦 Migración de Datos

Necesitas migrar los eventos actuales de `src/data/eventos.js` a Sanity.

### Opción 1: Manual (Recomendado para pocos eventos)

1. Abre Sanity Studio (http://localhost:3333)
2. Click en "Eventos" en el menú lateral
3. Click en "+ Create" o "Crear nuevo"
4. Copia los datos de cada evento de `src/data/eventos.js`
5. Guarda cada uno

### Opción 2: Script de migración

Puedes crear un script para migrar automáticamente. Crea `scripts/migrar-eventos.js`:

```javascript
import { createClient } from '@sanity/client';
import { eventos } from '../src/data/eventos.js';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

async function migrarEventos() {
  console.log('Migrando eventos a Sanity...');
  
  for (const evento of eventos) {
    const doc = {
      _type: 'evento',
      nombre: evento.nombre,
      ciudad: evento.ciudad,
      fecha: evento.fecha,
      tipo: evento.tipo,
      descripcion: evento.descripcion,
      destacado: false
    };
    
    try {
      await client.create(doc);
      console.log(`✅ Migrado: ${evento.nombre}`);
    } catch (error) {
      console.error(`❌ Error con ${evento.nombre}:`, error.message);
    }
  }
  
  console.log('✨ Migración completada');
}

migrarEventos();
```

Ejecuta:

```bash
npm install dotenv
node scripts/migrar-eventos.js
```

---

## 🔄 Actualización de Componentes

Los componentes ya están preparados para usar `src/lib/sanity.client.js`, así que funcionarán automáticamente.

Si quieres revisar ejemplos de uso, mira `sanity/ejemplos/uso-en-componentes.astro`.

### Componentes que usan eventos:

- `src/components/home/EventosDestacados.astro`
- `src/components/eventos/AgendaEventos.astro`
- `src/pages/eventos.astro`

Todos ya deberían estar importando desde `sanity.client.js` en lugar de `eventos.js` directamente.

---

## 🚀 Deploy y Producción

### Configurar variables de entorno en Vercel/Netlify

1. Ve a tu dashboard de hosting
2. Settings → Environment Variables
3. Agrega las 3 variables:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`

### Desplegar Sanity Studio

Tienes dos opciones:

#### Opción A: Hosting gratuito de Sanity

```bash
cd sanity-studio
npm run deploy
```

Esto desplegará el studio en `https://tu-proyecto.sanity.studio`

#### Opción B: Integrar en el proyecto Astro

Puedes servir el studio desde una ruta de tu sitio (ej: `/admin`). Necesitarás configuración adicional.

---

## 🐛 Troubleshooting

### Error: "Project ID is required"

- Verifica que el `.env` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "Invalid credentials"

- Revisa que el token de API sea correcto
- Asegúrate de que el token tenga permisos de "Editor"

### Los eventos no aparecen

- Verifica que hayas creado al menos un evento en Sanity Studio
- Abre la consola del navegador para ver errores
- Revisa que la query esté correcta

### Imágenes no cargan

- Usa `urlFor(evento.imagen).url()` para generar la URL
- Verifica que la imagen tenga `hotspot: true` en el schema

---

## 📚 Recursos Adicionales

- [Documentación de Sanity](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity + Astro Guide](https://www.sanity.io/plugins/astro-sanity)

---

## ✅ Checklist de Activación

- [ ] Cuenta en Sanity creada
- [ ] Project ID obtenido
- [ ] API Token creado
- [ ] Sanity Studio instalado y configurado
- [ ] Schema de eventos configurado
- [ ] Dependencias npm instaladas
- [ ] Archivo `.env` creado con las credenciales
- [ ] Cliente de Sanity descomentado en `sanity.client.js`
- [ ] Eventos migrados a Sanity
- [ ] Sitio probado localmente
- [ ] Variables de entorno configuradas en producción
- [ ] Sanity Studio desplegado
- [ ] Sitio desplegado y funcionando

---

**¿Necesitas ayuda?** Revisa la sección de Troubleshooting o consulta la documentación oficial de Sanity.
