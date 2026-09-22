# Sanity Studio — Panel de Administración

Panel de administración para gestionar los eventos del sitio web de Pablo Borrás.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
cd studio
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` y agrega tus credenciales:

```env
SANITY_STUDIO_PROJECT_ID=6gkzfviu
SANITY_STUDIO_DATASET=production
```

### 3. Iniciar el Studio en local

```bash
npm run dev
```

El Studio se abrirá en [http://localhost:3333](http://localhost:3333)

### 4. Publicar el Studio en Sanity

Para que esté disponible en línea en `pablo-borras.sanity.studio`:

```bash
npm run deploy
```

---

## 📝 Cómo agregar un evento

1. Abre el Studio (local o en línea)
2. Inicia sesión con tu cuenta de Sanity
3. Haz clic en **"Eventos"** en el menú lateral
4. Haz clic en el botón **"+ Crear"**
5. Completa los campos:
   - **Nombre del Evento**: Título completo
   - **Ciudad y País**: Ej: "Buenos Aires, Argentina"
   - **Fecha**: Selecciona del calendario
   - **Tipo**: Elige de la lista
   - **Descripción**: Tu participación o resumen
   - **Imagen** (opcional): Sube una foto
   - **Enlace** (opcional): URL del evento
   - **⭐ Destacado**: Marca si quieres que aparezca en la home
6. Haz clic en **"Publicar"**

El evento aparecerá automáticamente en el sitio web.

---

## 🛠️ Comandos disponibles

```bash
npm run dev      # Inicia Studio en local (puerto 3333)
npm run build    # Compila el Studio para producción
npm run deploy   # Publica el Studio en pablo-borras.sanity.studio
```

---

## 📚 Recursos

- [Documentación de Sanity](https://www.sanity.io/docs)
- [Panel de administración de Sanity](https://www.sanity.io/manage)
