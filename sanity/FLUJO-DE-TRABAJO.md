# 🔄 Flujo de Trabajo con Sanity

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ANTES (Datos Estáticos)                          │
└─────────────────────────────────────────────────────────────────────┘

  Pablo quiere agregar un evento nuevo
           ↓
  Necesita contactar al desarrollador
           ↓
  Desarrollador edita src/data/eventos.js
           ↓
  Git commit + push
           ↓
  Deploy automático
           ↓
  Evento visible en el sitio

  ⏱️  Tiempo: 30-60 minutos
  🔧 Requiere: Conocimientos técnicos



┌─────────────────────────────────────────────────────────────────────┐
│                    DESPUÉS (Con Sanity CMS)                         │
└─────────────────────────────────────────────────────────────────────┘

  Pablo quiere agregar un evento nuevo
           ↓
  Abre Sanity Studio (https://tu-proyecto.sanity.studio)
           ↓
  Click en "Crear nuevo evento"
           ↓
  Completa formulario visual:
    • Nombre del evento
    • Ciudad y país
    • Fecha
    • Tipo (dropdown)
    • Descripción
    • Sube foto (opcional)
    • Marca como destacado
           ↓
  Click en "Publish"
           ↓
  Evento visible en el sitio INMEDIATAMENTE

  ⏱️  Tiempo: 2-3 minutos
  🔧 Requiere: Solo saber usar un formulario web
```

---

## 📊 Arquitectura del Sistema

```
┌──────────────────┐
│  Sanity Cloud    │  ← Base de datos en la nube
│  (Eventos)       │     (Gratis hasta 100K requests/mes)
└────────┬─────────┘
         │
         │ API Request
         │
         ↓
┌──────────────────────────────────┐
│  src/lib/sanity.client.js        │  ← Cliente de Sanity
│  • getEventos()                  │
│  • getEventosDestacados()        │
│  • getEventoPorId()              │
└────────┬─────────────────────────┘
         │
         │ Import + await
         │
         ↓
┌────────────────────────────────────────────────┐
│  Componentes Astro                             │
│  • src/pages/eventos.astro                     │
│  • src/components/eventos/AgendaEventos.astro  │
│  • src/components/home/EventosDestacados.astro │
└────────┬───────────────────────────────────────┘
         │
         │ Renderiza HTML
         │
         ↓
┌──────────────────┐
│  Usuario final   │  ← Ve los eventos en el sitio
└──────────────────┘
```

---

## 🎨 Panel de Sanity Studio

```
┌────────────────────────────────────────────────────┐
│  Sanity Studio                            [Pablo]  │
├────────────────────────────────────────────────────┤
│                                                    │
│  📋 Eventos                           [+ Create]   │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ 📅 ECVIM-CA 35th Annual Congress             │ │
│  │    Congreso · Maastricht · 2025-09-01        │ │
│  │    ⭐ Destacado                               │ │
│  ├──────────────────────────────────────────────┤ │
│  │ 📅 WAAVP 2025                                │ │
│  │    Congreso · Curitiba · 2025-08-01          │ │
│  ├──────────────────────────────────────────────┤ │
│  │ 📅 Congreso AVEACA 2025                      │ │
│  │    Congreso · Buenos Aires · 2025-10-01      │ │
│  │    ⭐ Destacado                               │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
└────────────────────────────────────────────────────┘

Al hacer click en un evento:

┌────────────────────────────────────────────────────┐
│  ← Eventos / ECVIM-CA 35th Annual Congress         │
├────────────────────────────────────────────────────┤
│                                                    │
│  Nombre del evento                                 │
│  ┌──────────────────────────────────────────────┐ │
│  │ ECVIM-CA 35th Annual Congress                │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Ciudad y país                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ Maastricht, Países Bajos                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Fecha del evento                                  │
│  ┌──────────────────────────────────────────────┐ │
│  │ 2025-09-01            📅                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Tipo de evento                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Congreso                          ▼          │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Descripción                                       │
│  ┌──────────────────────────────────────────────┐ │
│  │ Póster científico en el Congreso...          │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Imagen del evento                                 │
│  ┌──────────────────────────────────────────────┐ │
│  │  [Subir imagen]  📷                          │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Enlace al evento                                  │
│  ┌──────────────────────────────────────────────┐ │
│  │ https://ecvim.org/...                        │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ☐ ⭐ Evento destacado                            │
│                                                    │
│  [Publish]  [Delete]                               │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 🔒 Seguridad y Permisos

- ✅ Solo usuarios autorizados pueden acceder al Studio
- ✅ Historial de cambios (versionado automático)
- ✅ Rollback a versiones anteriores
- ✅ Tokens de API con permisos granulares
- ✅ HTTPS en todas las comunicaciones

---

## 💰 Costos

**Plan Gratis de Sanity incluye:**
- ✅ 100,000 API requests/mes
- ✅ 5GB de almacenamiento (imágenes/archivos)
- ✅ Usuarios ilimitados
- ✅ Versionado ilimitado
- ✅ Soporte comunitario

**Para este proyecto:** El plan gratis es más que suficiente.

---

## 🚀 Ventajas vs. Datos Estáticos

| Característica | Datos Estáticos | Con Sanity |
|----------------|-----------------|------------|
| Agregar evento | Editar código | Click en formulario |
| Subir fotos | FTP/Git | Drag & drop |
| Requiere desarrollador | ✅ Sí | ❌ No |
| Tiempo de actualización | 30-60 min | 2-3 min |
| Riesgo de errores de código | Alto | Cero |
| Múltiples editores | Difícil | Fácil |
| Preview antes de publicar | ❌ No | ✅ Sí |
| Historial de cambios | Git | Automático |
| Buscar en eventos | ❌ No | ✅ Sí |

---

**En resumen:** Sanity permite que Pablo gestione el contenido sin tocar código ni depender de un desarrollador 🎉
