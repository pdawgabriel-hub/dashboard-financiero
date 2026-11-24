# Modelo de datos

La app recorre el ciclo de negocio de una constructora: un **cliente** pide un **presupuesto**; si lo aprueba, el presupuesto fija el precio de la **obra**; durante la obra se registran **partes** (horas propias y facturas de proveedores y especialistas) y **cobros**; la ficha de **gastos** de la obra junta todo y dice si se gana o se pierde dinero.

```
Cliente ──► Presupuesto (líneas + IVA) ──► Obra
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              ▼                               ▼                               ▼
     Partes de Trabajo              Partes de Especialista           Partes de Proveedor
  (horas × coste/h congelado)            (importe)                       (importe)
              └───────────────────────────────┴───────────────────────────────┘
                                              ▼
                            Gastos (ficha 1:1 de seguimiento financiero)
                                              ▲
                                       Ingresos (cobros)
```

Los tipos están en `src/types/`, uno por entidad. Cada tipo tiene además un `…Input` (lo que recibe el servicio al crear), que omite el `id` y los campos que calcula el servicio.

## Entidades

| Entidad | Clave en `localStorage` | Código | Relaciones | Campos calculados al guardar |
|---|---|---|---|---|
| **Cliente** | `clientes` | `CLI-001` | — | — |
| **Trabajador** | `trabajadores` | `TRAB-001` | — | — |
| **Proveedor** | `proveedores` | `PROV-001` | — | `total = base × (1 + iva/100)` |
| **Especialista** | `especialistas` | `ESP-001` | — | — |
| **Presupuesto** | `presupuestos` | `PRES-001` | cliente, obra | `total_linea`, `base_imponible`, `cuota_iva`, `total` |
| **Obra** | `obras` | `OBRA-001` | cliente | — (todo lo financiero se calcula al leer) |
| **Parte de Trabajo** | `partes_trabajo` | `PRT-001` | obra; cada línea, un trabajador | `coste_subtotal` por línea, `horas_totales`, `coste_total_parte` |
| **Parte de Proveedor** | `partes_proveedor` | `PPR-001` | obra, proveedor | — |
| **Parte de Especialista** | `partes_especialista` | `PES-001` | obra, especialista | — |
| **Ingreso** | `ingresos` | `INGR-001` | obra, cliente | — |
| **Gastos** | `gastos` | `GAS-001` | obra (1:1), presupuesto | — (todo lo financiero se calcula al leer) |
| **Falta de Trabajador** | `faltas` | `FAL-001` | trabajador | — |
| **Evento de calendario** | — (no se guarda) | — | presupuestos, ingresos y los tres tipos de parte | Se construye al leer, ver [Calendario](dashboard.md#calendario) |

Los códigos los genera `crearCrudService` al crear: busca el número más alto con el prefijo de la entidad y suma uno (`OBRA-011` tras `OBRA-010`).

## Dos tipos de campos calculados

- **Guardados con el registro.** Si un total solo depende del propio registro (las líneas de un presupuesto o de un parte, el total de un proveedor), el servicio lo calcula en `create()` y `update()` y lo guarda junto al resto. Es lo que hace `presupuestoService.create()` con las líneas y el IVA.
- **Calculados al leer.** Si depende de varias entidades (el total de una obra sale de sus presupuestos; su beneficio, de partes e ingresos), no se guarda: lo calcula una función del servicio cada vez que se pide. Es el caso de toda la ficha de Gastos y de los indicadores de la obra. Las fórmulas están en [Reglas de negocio](reglas-negocio.md).

## Valores congelados

Dos datos se **copian** en el momento de crear el registro y no se vuelven a recalcular, a propósito:

- **El coste/hora de cada línea de parte de trabajo.** Al elegir el trabajador se copia su `coste_hora_estandar` en la línea. Si mañana sube su tarifa, los partes ya registrados no cambian.
- **Los datos del cliente en el presupuesto** (`nombre_cliente`, `nif`, `direccion`, `telf`). Un presupuesto ya entregado no debe cambiar si el cliente actualiza su ficha.

## La ficha de Gastos

Cada obra tiene una única ficha de Gastos. No tiene formulario de alta: `gastoService.obtenerOCrearFicha(obraId)` devuelve la de la obra o, si aún no existe, la crea con valores por defecto, vinculada al presupuesto aprobado de la obra. Se llama al abrir el listado de Gastos, la ficha o su documento imprimible, así que una obra nueva tiene su ficha en cuanto alguien la consulta.

La ficha solo guarda los datos administrativos que se escriben a mano (fechas de inicio, fin y solicitud, dirección, mandante, licencia, ICIO). Todo lo económico (costes, ingresos, beneficio, pendiente de cobro, estado) lo calcula `GastoService` al leer.
