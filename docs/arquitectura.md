# Arquitectura

![Esquema de la arquitectura: los datos de ejemplo de src/mocks siembran localStorage en la primera visita; en el navegador, las páginas usan formularios y componentes, que leen y escriben a través de los servicios; los servicios guardan en localStorage y calculan las reglas de negocio al leer. Vercel sirve la app desde el repositorio y GitHub Actions publica esta guía en GitHub Pages.](img/arquitectura.svg)

La app es una **SPA sin backend**: todo, incluida la "base de datos", vive en el navegador de quien la abre. Se organiza en cuatro capas, y cada una solo habla con la de debajo:

1. **Páginas** (`src/paginas/`): una por pantalla. Leen de los servicios, preparan lo que se va a pintar y llaman a los servicios al guardar o borrar.
2. **Componentes y formularios** (`src/componentes/`, `src/schemas/`): piezas reutilizables sin lógica de negocio (rejilla de consulta, formulario genérico, combobox, gráficos) y esquemas de validación de Zod.
3. **Servicios** (`src/servicios/`): la única capa que toca los datos. Cada entidad tiene su servicio, construido sobre un CRUD genérico, y las reglas de negocio están aquí como funciones que calculan al leer.
4. **Persistencia** (`localStorage`): una clave por entidad con un array JSON, sembrada desde `src/mocks/` la primera vez.

## Por qué sin backend

El proyecto es una pieza de portfolio de **frontend**: el objetivo es que cualquiera pueda abrir la demo y usarla entera (crear, editar, borrar, imprimir) sin cuentas, sin servidor que mantener y sin coste. `localStorage` da exactamente eso:

- **Cada visitante tiene sus propios datos.** Lo que alguien cree o borre no lo ve nadie más, y no hay riesgo de que la demo acabe llena de basura.
- **Arranca con datos.** La primera visita siembra 10 registros por entidad, relacionados entre sí, así que el dashboard y las fichas tienen contenido desde el primer segundo.
- **Despliegue estático.** Vercel solo sirve ficheros; no hay base de datos ni funciones.

El precio es que los datos no se comparten entre navegadores y que no hay transacciones: dos escrituras relacionadas (por ejemplo, una obra y su ficha de gastos) no son atómicas. Para una demo es aceptable; en [Origen y decisiones](decisiones.md) está qué cambiaría al llevarlo a producción.

## Flujo de una lectura y de una escritura {#flujo}

```
Lectura (p. ej. la ficha de Gastos de una obra)
  PaginaEditarGasto
    └─► gastoService.getBeneficioReal(gasto)
          ├─► getTotalIngresosDeObra(obra)      ─► ingresoService.getAll()        ─► localStorage['ingresos']
          └─► getGastosTotales(gasto)
                ├─► parteProveedorService.getAll()                               ─► localStorage['partes_proveedor']
                ├─► parteEspecialistaService.getAll()                            ─► localStorage['partes_especialista']
                └─► getObraCosteMoo(obra)       ─► parteTrabajoService.getAll()   ─► localStorage['partes_trabajo']

Escritura (p. ej. un presupuesto nuevo)
  PaginaFormPresupuestos ─► React Hook Form + presupuestoSchema (Zod) ─► presupuestoService.create(datos)
    └─► calcula total_linea, base_imponible, cuota_iva y total ─► crearCrudService.create() ─► localStorage['presupuestos']
```

Las cifras derivadas de varias entidades (total de la obra, beneficio, pendiente de cobro, salud) **no se guardan nunca**: se recalculan en cada lectura a partir de los datos base. Así no hay nada que mantener sincronizado al editar un parte o un cobro. Solo se guardan los totales que dependen de un único registro (las líneas de un presupuesto o de un parte), porque se calculan en el mismo momento en que se guarda ese registro.

## Navegación

`src/App.tsx` decide el layout según la ruta:

- **Rutas de impresión** (`/…/imprimir/:id`): se pintan solas, sin menú ni barra lateral, porque son un documento y no una pantalla de la app. Ver [Informes](dashboard.md#informes).
- **Consultar e Introducir**: menú superior más una barra lateral con las secciones.
- **Inicio, Análisis Financiero y Calendario**: solo el menú superior.

Las secciones de Consultar e Introducir no se declaran una a una en el router: `src/mocks/routesMock/routesMock.ts` define el árbol de menús (`MODULOS_ERP`), y `Main.tsx` resuelve `/:seccion` con ese árbol y pinta el componente correspondiente a través de `VistaDinamica`. Añadir una sección al menú es, por tanto, una línea en `MODULOS_ERP` y otra en el diccionario de `VistaDinamica`. Las fichas de edición (`/consultar/<entidad>/editar/:id`) sí son rutas explícitas.
