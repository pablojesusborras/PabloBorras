# 📁 Carpeta Sanity — Configuración CMS

Esta carpeta contiene toda la configuración necesaria para conectar el sitio web con Sanity CMS.

## 📂 Estructura

```
sanity/
├── INSTRUCCIONES-SANITY.md      ← 📖 Guía completa paso a paso
├── schemas/
│   └── evento.js                ← Schema de eventos para Sanity Studio
├── config/
│   ├── sanity.config.ejemplo.js ← Configuración de ejemplo para Studio
│   └── schemas-index.ejemplo.js ← Index de schemas de ejemplo
└── ejemplos/
    └── uso-en-componentes.astro ← Ejemplos de cómo usar Sanity en Astro
```

## 🚀 Inicio Rápido

1. **Lee primero**: [INSTRUCCIONES-SANITY.md](./INSTRUCCIONES-SANITY.md)
2. Crea tu cuenta y proyecto en [sanity.io](https://www.sanity.io/)
3. Instala Sanity Studio (panel de administración)
4. Copia los schemas a tu Studio
5. Configura las variables de entorno
6. Descomenta el código en `src/lib/sanity.client.js`
7. ¡Listo! Pablo podrá gestionar eventos desde el panel visual

## ❓ ¿Qué hace cada archivo?

### `INSTRUCCIONES-SANITY.md`
Guía completa con todos los pasos para activar Sanity. **Empieza aquí**.

### `schemas/evento.js`
Define la estructura de un evento en Sanity:
- Nombre, ciudad, fecha, tipo
- Descripción
- Imagen (opcional)
- Enlace al evento (opcional)
- Flag de "destacado"

Este archivo va en tu proyecto de Sanity Studio.

### `config/sanity.config.ejemplo.js`
Configuración principal de Sanity Studio. Úsala como referencia cuando crees tu Studio.

### `config/schemas-index.ejemplo.js`
Muestra cómo importar schemas en Sanity Studio.

### `ejemplos/uso-en-componentes.astro`
Ejemplos prácticos de cómo usar Sanity en componentes Astro:
- Obtener eventos
- Filtrar por fecha
- Mostrar imágenes
- Eventos destacados

## 🔑 Estado Actual

✅ Cliente de Sanity configurado (comentado)  
✅ Schemas listos  
✅ Queries preparadas  
✅ Fallback a datos estáticos mientras no esté activo  
⏳ **Pendiente**: Credenciales de Sanity (Project ID + Token)

## 🎯 Beneficios de usar Sanity

- 🖼️ Pablo puede subir fotos de eventos
- ⚡ No necesita código para agregar/editar eventos
- 🔄 Contenido actualizado en tiempo real
- 📱 Panel responsive (funciona en móvil)
- 🌐 Accesible desde cualquier lugar
- 🔒 Control de permisos y versiones

## 📚 Recursos

- [Documentación oficial de Sanity](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity + Astro](https://docs.astro.build/en/guides/cms/sanity/)

---

**¿Necesitas ayuda?** Revisa [INSTRUCCIONES-SANITY.md](./INSTRUCCIONES-SANITY.md) o la documentación de Sanity.
