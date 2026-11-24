# Origen y decisiones

## De dónde viene

El modelo de negocio sale de un ERP que desarrollé a medida para una empresa de construcción y reformas, como módulo de **Odoo 18** (Python, PostgreSQL, vistas XML, informes QWeb y un dashboard en OWL), hoy en producción. Ese proyecto tiene datos reales de clientes y no se puede enseñar. Esta versión reproduce su ciclo de negocio y sus reglas en un frontend que cualquiera puede abrir y tocar, con datos ficticios.

La mayoría de funciones de los servicios llevan un comentario que dice a qué campo o método de Odoo equivalen (`// Equivalente a _compute_estado_pago de gestion.obras`). Sirven de mapa para quien conozca el original.

## Qué se conserva

Las reglas que en el ERP original nacieron de un problema real, y que dan sentido a las cifras:

| Regla | Por qué |
|---|---|
| El precio de la obra es la suma de sus presupuestos **aprobados** | Aprobar o desaprobar un presupuesto actualiza la obra sin tocarla |
| **Beneficio = caja** (cobrado − gastado), no presupuesto − gastado | Calcularlo con el presupuesto daba beneficios que no existían |
| El coste/hora se **congela** en cada línea de parte | Subir la tarifa de un trabajador no cambia los partes antiguos |
| Los datos del cliente se **copian** en el presupuesto | Un presupuesto ya entregado no cambia si el cliente actualiza su ficha |
| Una ficha de Gastos por obra, sin alta manual | Nunca falta ni se duplica |
| El pendiente de cobro se calcula siempre en vivo | Nunca muestra un valor atrasado |
| Selectores que buscan por nombre, NIF o descripción, no solo por código | Es como la gente recuerda los registros |
| Calendario unificado de presupuestos, cobros y partes | Una sola vista de todo lo que tiene fecha |

## Qué cambia y por qué

| En Odoo | Aquí | Motivo |
|---|---|---|
| PostgreSQL | `localStorage` | Demo pública sin servidor ni cuentas (ver [Arquitectura](arquitectura.md#por-que-sin-backend)) |
| Campos calculados guardados en la tabla y recalculados por el ORM | Calculados al leer | Sin ORM, recalcular en cada escritura obligaría a mantener a mano la cadena de dependencias; al leer nunca se desincroniza, y con este volumen el coste es despreciable |
| La ficha de Gastos se crea con la obra, en la misma transacción | Se crea la primera vez que se consulta | `localStorage` no tiene transacciones; crearla al consultar garantiza igualmente que exista |
| Informes PDF con QWeb y wkhtmltopdf | Páginas de impresión y `window.print()` | Sin dependencias y con PDF real desde el navegador |
| Códigos `OBR0001` | Códigos `OBRA-001` | Formato propio de esta versión |
| La obra no tiene dirección ni fechas propias (están en la ficha de Gastos) | La obra tiene dirección, fecha de inicio y fecha de fin prevista | Para que los listados y tarjetas sean útiles sin abrir la ficha de Gastos |
| El presupuesto puede existir sin obra; el ingreso, sin cliente | Ambas relaciones son obligatorias | Simplifica los formularios de la demo |

## Qué falta respecto al original

- **Borrado con reglas.** Odoo impide borrar una obra con cobros y, al borrar una obra, borra sus partes y su ficha de Gastos y desvincula sus presupuestos. Aquí el borrado es simple: elimina solo el registro.
- **Validaciones entre entidades.** El original comprueba que un presupuesto o un cobro sea del mismo cliente que su obra.
- **Indicadores de la obra.** El margen proyectado (precio − gastos) y el % cobrado.
- **Dashboard por período.** El original filtra por este mes, tres meses, este año o todo, y añade el top de trabajadores por horas y la lista de cobros pendientes.
- **Bitácoras y adjuntos.** Observaciones e incidencias con autor y fecha, y ficheros adjuntos en cada ficha.
- **Usuarios y permisos**, que en Odoo dan los grupos de seguridad.
- **Tests.** El original tiene una batería de tests sobre la lógica financiera; aquí aún no (ver [Calidad](calidad.md#tests)).

## Si se llevara a producción

El paso natural es sustituir `crearCrudService` por un cliente de una API REST, manteniendo la misma interfaz (`getAll`, `getById`, `create`, `update`, `remove`). Las páginas y los componentes no tendrían que cambiar, y las reglas de negocio podrían quedarse en el frontend para la vista previa o moverse al servidor, que pasaría a ser el responsable de las validaciones y de los borrados en cascada.
