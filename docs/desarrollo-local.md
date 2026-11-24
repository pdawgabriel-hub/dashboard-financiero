# Desarrollo local

## Requisitos

- **Node.js** 24 (el CI usa Node 24).
- **pnpm** 12. Si no lo tienes: `corepack enable`, o `npm install -g pnpm`.

Dependencias principales (`package.json`):

| Paquete | Uso |
|---|---|
| `react`, `react-dom` | Interfaz |
| `react-router-dom` | Navegación entre pantallas |
| `react-hook-form`, `@hookform/resolvers`, `zod` | Formularios y validación |
| `recharts` | Gráficos del dashboard |
| `lucide-react` | Iconos |
| `tailwindcss`, `@tailwindcss/vite` | Estilos |
| `vite`, `typescript`, `eslint` | Build, tipos y lint |

## Puesta en marcha

```bash
git clone https://github.com/pdawgabriel-hub/dashboard-financiero.git
cd dashboard-financiero
pnpm install
pnpm dev          # servidor de desarrollo en http://localhost:5173
```

No hace falta configurar nada más: no hay variables de entorno, backend ni base de datos. La primera vez que se abre la app, cada entidad se siembra con sus datos de ejemplo.

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo con recarga en caliente |
| `pnpm build` | Comprueba los tipos (`tsc -b`) y genera la versión de producción en `dist/` |
| `pnpm preview` | Sirve `dist/` para probar la versión de producción |
| `pnpm lint` | ESLint sobre todo el proyecto |

## Volver a los datos de ejemplo

Los datos se guardan en el `localStorage` del navegador, por origen: lo que crees en `localhost:5173` no aparece en la demo publicada ni al revés. Para empezar de cero:

- **Desde el navegador:** herramientas de desarrollo → *Application* (Chrome) o *Almacenamiento* (Firefox) → *Local Storage* → borrar las claves del sitio y recargar.
- **Para todos los visitantes:** si cambias la forma de algún tipo o de los mocks, sube `VERSION_DATOS_ACTUAL` en `src/servicios/CrudService/CrudService.ts`. En su siguiente visita, cada navegador borrará sus datos antiguos y volverá a sembrar los nuevos.

## Ver esta guía en local {#ver-esta-guia-en-local}

La guía es un sitio de [MkDocs Material](https://squidfunk.github.io/mkdocs-material/). Necesita Python 3:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-docs.txt
.venv/bin/mkdocs serve          # http://127.0.0.1:8000, se recarga al guardar
.venv/bin/mkdocs build --strict # lo mismo que hace el workflow de publicación
```

`.venv/` y `site/` están en `.gitignore`.
