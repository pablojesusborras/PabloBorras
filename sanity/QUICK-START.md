# ⚡ Quick Start — Activar Sanity en 5 pasos

```
┌─────────────────────────────────────────────────────────┐
│  Estado actual: ⏸️  Sanity configurado pero comentado  │
│  Todo listo para activar cuando tengas las credenciales │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Los 5 pasos esenciales

### 1️⃣ Crear cuenta en Sanity (5 min)

```bash
1. Ve a https://www.sanity.io/
2. Regístrate gratis
3. Crea un proyecto llamado "Pablo Borrás Website"
4. Guarda el PROJECT_ID que te dan
5. Crea un API Token con permisos de "Editor"
```

### 2️⃣ Instalar Sanity Studio (10 min)

```bash
# En una carpeta FUERA del proyecto
cd ..
npm create sanity@latest

# Selecciona:
# - Use existing project: SI
# - Project ID: [el que guardaste]
# - Dataset: production
# - Template: Clean project

# Copia el schema de eventos
cp DemoPabloBorras/sanity/schemas/evento.js sanity-studio/schemas/

# Descomenta el código del schema
# Edita sanity-studio/schemas/index.js:
# import evento from './evento'
# export const schemaTypes = [evento]

# Inicia el studio
cd sanity-studio
npm run dev
# Abre http://localhost:3333
```

### 3️⃣ Configurar variables de entorno (2 min)

```bash
# En el proyecto DemoPabloBorras
cp .env.example .env

# Edita .env y completa:
PUBLIC_SANITY_PROJECT_ID=tu-project-id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu-token
```

### 4️⃣ Instalar dependencias e activar cliente (3 min)

```bash
# Instalar dependencias
npm install @sanity/client @sanity/image-url

# Editar src/lib/sanity.client.js:
# - Descomentar TODO el bloque de importaciones y funciones
# - Comentar el bloque de "EXPORTACIÓN TEMPORAL"
```

### 5️⃣ Migrar eventos (5 min)

```bash
# Opción A: Manual
# Ve a http://localhost:3333 y copia los eventos uno por uno

# Opción B: Automático
npm install dotenv
# Descomentar todo en scripts/migrar-eventos-a-sanity.js
node scripts/migrar-eventos-a-sanity.js
```

## ✅ Verificar que funciona

```bash
# Reinicia el servidor
npm run dev

# Abre http://localhost:4321
# Los eventos deberían cargar normalmente desde Sanity
```

## 🎨 Panel de administración

```
Sanity Studio:     http://localhost:3333
Tu sitio web:      http://localhost:4321

Pablo puede agregar eventos desde Studio
El sitio los muestra automáticamente
```

## 🚀 Producción

```bash
# Desplegar Sanity Studio
cd sanity-studio
npm run deploy
# URL: https://tu-proyecto.sanity.studio

# Configurar variables en Vercel
# Settings → Environment Variables → Agregar las 3 variables

# Deploy automático
git push
```

---

**Tiempo total: ~25 minutos** ⏱️

**¿Problemas?** Lee [INSTRUCCIONES-SANITY.md](./INSTRUCCIONES-SANITY.md) para la guía completa.
