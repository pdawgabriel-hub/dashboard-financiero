# ERP Construcción - Dashboard Financiero · Guía técnica

**ERP Construcción - Dashboard Financiero** es la versión 100% frontend de mi **ERP a Medida para Construcción y Reformas**, el ERP que desarrollé sobre Odoo 18 para una empresa real y que está en producción. Reproduce en React su ciclo de negocio completo (cliente → presupuesto → obra → partes de trabajo, de especialista y de proveedor → gastos e ingresos → beneficio real), sus reglas financieras, su panel de Análisis Financiero, su calendario y sus informes PDF, con datos ficticios y sin backend. Esta guía explica cómo está construido: cómo se organiza el código, dónde viven los datos, cómo se calculan las cifras y cómo se ejecuta y despliega.

<div class="grid" markdown>

[Abrir la demo](https://dashboard-financiero-kappa-blue.vercel.app/){ .md-button .md-button--primary }
[Código en GitHub](https://github.com/pdawgabriel-hub/dashboard-financiero){ .md-button }
[README del proyecto](https://github.com/pdawgabriel-hub/dashboard-financiero#readme){ .md-button }

</div>

![Análisis Financiero: KPIs de la cartera de obras, costes acumulados por obra y salud de las obras](img/capturas/dashboard.png)

## El proyecto en cifras

| | |
|---|---|
| Aplicación | SPA en React 19 y TypeScript, con Vite y Tailwind CSS, sin backend |
| Modelo de negocio | Los 12 modelos de negocio del ERP, con datos propios (clientes, obras, presupuestos, tres tipos de parte, ingresos, gastos, faltas…) más un calendario que las une |
| Pantallas | 12 listados con su ficha de edición, 11 formularios de alta, Análisis Financiero, calendario mensual y 3 documentos imprimibles |
| Validación | 12 esquemas de Zod conectados a React Hook Form |
| Datos | `localStorage`, sembrado con 10 registros de ejemplo por entidad, coherentes entre sí |
| Cálculos | Total de obra, beneficio de caja, pendiente de cobro, estado de pago y salud, calculados al leer y nunca guardados |
| Despliegue | Vercel para la app; GitHub Pages para esta guía |

## Cómo leer esta guía

Si quieres entender el diseño, empieza por [Arquitectura](arquitectura.md) y sigue con [Reglas de negocio](reglas-negocio.md), que es donde está la lógica que importa. Si quieres ejecutar o modificar el proyecto, ve directamente a [Desarrollo local](desarrollo-local.md) y a [Dónde tocar para…](donde-tocar.md).

| Página | Qué explica |
|---|---|
| [Arquitectura](arquitectura.md) | Las capas de la app y por qué no hay backend |
| [Modelo de datos](modelo-datos.md) | Las entidades, sus relaciones y qué campos se calculan |
| [Reglas de negocio](reglas-negocio.md) | Las fórmulas financieras y las validaciones |
| [Recorrido por el código](codigo.md) | Los patrones que se repiten, con fragmentos reales |
| [Análisis Financiero, calendario e informes](dashboard.md) | Qué calcula cada gráfico, cómo se arma el calendario y cómo se imprime a PDF |
| [Desarrollo local](desarrollo-local.md) | Instalación, comandos y cómo reiniciar los datos |
| [Calidad](calidad.md) | Tipado, validación, lint e integración continua |
| [Despliegue](despliegue.md) | Vercel y la publicación de esta guía |
| [Origen y decisiones](decisiones.md) | Del ERP en producción a esta versión: qué se conserva, qué cambia y qué falta |
| [Dónde tocar para…](donde-tocar.md) | Qué ficheros cambiar para los cambios más habituales |

!!! info "Convenciones"
    Los importes son euros con dos decimales. Las fechas se guardan como texto `AAAA-MM-DD`. Las rutas de ficheros son relativas a la raíz del repositorio.
