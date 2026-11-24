# Despliegue

## La app, en Vercel

La demo está en **[dashboard-financiero-kappa-blue.vercel.app](https://dashboard-financiero-kappa-blue.vercel.app/)**. Vercel está conectado al repositorio: cada push a `main` lanza `pnpm build` y publica `dist/` en su CDN. No hay servidor ni base de datos que desplegar; cada visitante trae sus propios datos en su navegador.

`vercel.json` contiene una sola regla:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Es necesaria porque la app es una SPA: las rutas (`/consultar/obras`, `/consultar/presupuestos/imprimir/PREP0001`…) no existen como ficheros, las resuelve React Router en el navegador. Sin el *rewrite*, abrir directamente una ruta profunda o recargar en ella daba un 404 de Vercel. Afectaba sobre todo a los documentos imprimibles, que se abren en una pestaña nueva con su propia URL.

## Esta guía, en GitHub Pages

La guía técnica se publica en **[pdawgabriel-hub.github.io/dashboard-financiero](https://pdawgabriel-hub.github.io/dashboard-financiero/)**. La publica `.github/workflows/docs.yml`:

1. En cada push a `main` que cambie `docs/`, `mkdocs.yml`, `requirements-docs.txt` o el propio workflow (y a mano desde *Actions*).
2. Instala MkDocs Material y construye con `mkdocs build --strict`: un enlace roto o una página que no está en el menú hacen fallar la construcción.
3. Sube `site/` a GitHub Pages.

Necesita, una sola vez, *Settings → Pages → Source: GitHub Actions* en el repositorio. Cómo verla en local: [Desarrollo local](desarrollo-local.md#ver-esta-guia-en-local).
