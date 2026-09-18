# 📦 Archivos de Configuración de Sanity — Resumen

## ✅ Archivos creados

```
DemoPabloBorras/
├── .env.example                           ← Variables de entorno de ejemplo
├── README.md                              ← ✏️ Actualizado con sección de Sanity
├── src/
│   └── lib/
│       └── sanity.client.js               ← Cliente de Sanity (comentado, listo para activar)
├── scripts/
│   └── migrar-eventos-a-sanity.js         ← Script de migración automática
└── sanity/
    ├── README.md                          ← Índice de la carpeta sanity
    ├── INSTRUCCIONES-SANITY.md            ← 📖 Guía completa paso a paso
    ├── QUICK-START.md                     ← ⚡ Guía rápida en 5 pasos
    ├── schemas/
    │   └── evento.js                      ← Schema de eventos para Studio
    ├── config/
    │   ├── sanity.config.ejemplo.js       ← Config de ejemplo para Studio
    │   └── schemas-index.ejemplo.js       ← Index de schemas de ejemplo
    └── ejemplos/
        └── uso-en-componentes.astro       ← Ejemplos prácticos de uso
```

## 🎯 Cómo usar estos archivos

### Para configurar por primera vez:
1. **Empieza aquí**: `sanity/QUICK-START.md` o `sanity/INSTRUCCIONES-SANITY.md`
2. Copia `.env.example` a `.env` y completa las credenciales
3. Descomenta el código en `src/lib/sanity.client.js`

### Para crear Sanity Studio:
1. Usa `sanity/config/sanity.config.ejemplo.js` como referencia
2. Copia `sanity/schemas/evento.js` a tu Studio
3. Usa `sanity/config/schemas-index.ejemplo.js` para importar schemas

### Para migrar eventos:
1. Descomenta `scripts/migrar-eventos-a-sanity.js`
2. Ejecuta: `node scripts/migrar-eventos-a-sanity.js`

### Para aprender a usar Sanity en componentes:
- Lee `sanity/ejemplos/uso-en-componentes.astro`

## 🔑 Estado actual

| Componente | Estado | Acción requerida |
|------------|--------|------------------|
| Cliente Sanity | ✅ Configurado | Descomentar cuando tengas credenciales |
| Schemas | ✅ Listos | Copiar a Sanity Studio |
| Queries | ✅ Preparadas | Ya funcionan (con fallback a datos estáticos) |
| Scripts | ✅ Listos | Descomentar cuando esté Sanity activo |
| Documentación | ✅ Completa | Leer y seguir |

## 💡 Funcionalidades preparadas

✅ **Obtener todos los eventos**
```javascript
import { getEventos } from '../lib/sanity.client.js';
const eventos = await getEventos();
```

✅ **Filtrar eventos futuros**
```javascript
const eventosFuturos = await getEventos(true);
```

✅ **Obtener eventos destacados**
```javascript
import { getEventosDestacados } from '../lib/sanity.client.js';
const destacados = await getEventosDestacados();
```

✅ **Mostrar imágenes optimizadas**
```javascript
import { urlFor } from '../lib/sanity.client.js';
const urlImagen = urlFor(evento.imagen).width(600).url();
```

## 🚦 Próximos pasos

1. Crear cuenta en Sanity.io
2. Obtener Project ID y API Token
3. Configurar `.env`
4. Instalar dependencias: `npm install @sanity/client @sanity/image-url`
5. Descomentar `src/lib/sanity.client.js`
6. Crear Sanity Studio
7. Migrar eventos
8. ✨ ¡Listo!

---

**Diseñado para ser plug-and-play** — Solo necesitas las credenciales de Sanity 🔑
