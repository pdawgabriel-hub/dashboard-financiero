# Dónde tocar para…

| Quiero… | Cambiar | No hace falta tocar |
|---|---|---|
| Añadir un campo a una entidad | Su tipo en `src/types/`, su esquema en `src/schemas/`, la lista `CAMPOS` de sus páginas de alta y edición, sus mocks y `VERSION_DATOS_ACTUAL` en `CrudService.ts` | El servicio, salvo que el campo se calcule |
| Cambiar una regla de cálculo | La función en el servicio de la entidad (`ObraService.ts`, `GastoService.ts`…) | Las páginas, el dashboard y los PDF: todos llaman a esa función |
| Cambiar una validación | El esquema de Zod en `src/schemas/` | El formulario, que muestra el mensaje del esquema |
| Añadir una entidad nueva | Tipo, esquema, mock y servicio (con `crearCrudService`); una página de listado, una de alta y una de edición; una entrada en `MODULOS_ERP` (`src/mocks/routesMock/routesMock.ts`) y en el diccionario de `VistaDinamica.tsx`, y la ruta de edición en `Main.tsx` | El menú y la barra lateral, que salen de `MODULOS_ERP` |
| Añadir un KPI o un gráfico al dashboard | El cálculo en `DashboardAnalisis.tsx`; el componente en `src/componentes/Dashboard/`; colocarlo en `PaginaDashboard.tsx` | Los servicios de cada entidad |
| Añadir un tipo de evento al calendario | `getEventosCalendario()`, `ETIQUETAS_TIPO_EVENTO` y `COLOR_TIPO_EVENTO` en `CalendarioService.ts`, el tipo `CalendarioEvento` y las opciones `evento` de `GridConsulta` | El componente del calendario |
| Añadir un documento imprimible | Una página en `src/paginas/imprimir/` con `DocumentoImprimible` y `BarraAccionesImprimir`, su ruta en `RutasImprimir.tsx` y el enlace en la ficha | `App.tsx`, que ya trata cualquier ruta con `/imprimir/` |
| Cambiar los datos de ejemplo | Los ficheros de `src/mocks/` y subir `VERSION_DATOS_ACTUAL` | Nada más: cada visitante se resiembra en su siguiente visita |
| Cambiar esta guía | El `.md` de la página en `docs/`; si es una página nueva, añadirla también al `nav` de `mkdocs.yml` | La app: el despliegue de Vercel no depende de `docs/` |
| Añadir una imagen a la guía o al README | `docs/img/` (capturas en `docs/img/capturas/`) y enlazarla desde la página | — |
