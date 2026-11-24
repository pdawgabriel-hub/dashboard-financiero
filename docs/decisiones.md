# Origen y decisiones

## De dónde viene

Este proyecto es la versión frontend de mi **ERP a Medida para Construcción y Reformas**: un módulo de **Odoo 18** (Python, PostgreSQL, vistas XML, informes QWeb y un panel de Análisis Financiero en OWL) que desarrollé para una empresa real de construcción y reformas y que está en producción desde octubre de 2026, en un VPS de la UE con dominio propio y HTTPS. Ese proyecto tiene datos reales de clientes y no se puede enseñar. Esta versión reproduce su ciclo de negocio, sus reglas y su terminología (nombres de menús, KPIs, informes y códigos `OBR0001`, `PREP0001`…) en un frontend que cualquiera puede abrir y tocar, con datos ficticios.

La mayoría de funciones de los servicios llevan un comentario que dice a qué campo o método de Odoo equivalen (`// Equivalente a _compute_estado_pago de gestion.obras`). Sirven de mapa para quien conozca el ERP.

## Qué se conserva

Las reglas que en el ERP nacieron de un problema real, y que dan sentido a las cifras:

| Regla | Por qué |
|---|---|
| El precio de la obra es la suma de sus presupuestos **aprobados** | Aprobar o desaprobar un presupuesto actualiza la obra sin tocarla |
| **Beneficio = caja** (cobrado − gastado), no presupuesto − gastado | Calcularlo con el presupuesto daba beneficios que no existían |
| El coste/hora se **congela** en cada línea de parte | Subir la tarifa de un trabajador no cambia los partes antiguos |
| Los datos del cliente se **copian** en el presupuesto | Un presupuesto ya entregado no cambia si el cliente actualiza su ficha |
| Un Seguimiento de Gastos por obra, sin alta manual | Nunca falta ni se duplica |
| El pendiente de cobro se calcula siempre en vivo | Nunca muestra un valor atrasado |
| Selectores que buscan por nombre, NIF o descripción, no solo por código | Es como la gente recuerda los registros |
| Calendario unificado de presupuestos, cobros y partes | Una sola vista de todo lo que tiene fecha |

## Qué cambia y por qué

| En Odoo | Aquí | Motivo |
|---|---|---|
| PostgreSQL | `localStorage` | Demo pública sin servidor ni cuentas (ver [Arquitectura](arquitectura.md#por-que-sin-backend)) |
| Campos calculados guardados en la tabla y recalculados por el ORM | Calculados al leer | Sin ORM, recalcular en cada escritura obligaría a mantener a mano la cadena de dependencias; al leer nunca se desincroniza, y con este volumen el coste es despreciable |
| El Seguimiento de Gastos se crea con la obra, en la misma transacción | Se crea la primera vez que se consulta | `localStorage` no tiene transacciones; crearla al consultar garantiza igualmente que exista |
| Informes PDF con QWeb y wkhtmltopdf | Páginas de impresión y `window.print()` | Sin dependencias y con PDF real desde el navegador |
| La obra no tiene dirección ni fechas propias (están en el Seguimiento de Gastos) | La obra tiene dirección, fecha de inicio y fecha de fin prevista | Para que los listados y tarjetas sean útiles sin abrir el Seguimiento de Gastos |
| El presupuesto puede existir sin obra; el ingreso, sin cliente | Ambas relaciones son obligatorias | Simplifica los formularios de la demo |
| Solo el menú "Consultar datos": cada lista tiene su botón "Nuevo" | Menús "Consultar Datos" e "Introducir Datos" | Las altas tienen su propio menú, con un formulario por modelo |

## Qué falta respecto al ERP

- **Borrado con reglas.** Odoo impide borrar una obra con cobros y, al borrar una obra, borra sus partes y su Seguimiento de Gastos y desvincula sus presupuestos. Aquí el borrado es simple: elimina solo el registro.
- **Validaciones entre entidades.** El ERP comprueba que un presupuesto o un cobro sea del mismo cliente que su obra.
- **Indicadores de la obra.** El margen proyectado (precio − gastos) y el % cobrado.
- **Análisis Financiero por período.** El ERP filtra por este mes, tres meses, este año o todo, y añade el top de trabajadores por horas y la lista de cobros pendientes.
- **Bitácoras y adjuntos.** Observaciones e incidencias con autor y fecha, y ficheros adjuntos en cada ficha.
- **Usuarios y permisos**, que en Odoo dan los grupos de seguridad.
- **Tests.** El ERP tiene una batería de tests sobre la lógica financiera; aquí aún no (ver [Calidad](calidad.md#tests)).

## Si se llevara a producción

El paso natural es sustituir `crearCrudService` por un cliente de una API REST, manteniendo la misma interfaz (`getAll`, `getById`, `create`, `update`, `remove`). Las páginas y los componentes no tendrían que cambiar, y las reglas de negocio podrían quedarse en el frontend para la vista previa o moverse al servidor, que pasaría a ser el responsable de las validaciones y de los borrados en cascada.
