# Reglas de negocio

Estas son las reglas que hacen que la app sea un ERP y no solo un CRUD. Vienen del ERP en Odoo del que parte el proyecto (ver [Origen y decisiones](decisiones.md)) y están en `src/servicios/`, cada una en el servicio de su entidad, con un comentario que indica a qué campo de Odoo equivale.

Todos los importes se redondean a dos decimales.

## Presupuesto

```
linea.total_linea   = uds × precio
base_imponible      = Σ total_linea
cuota_iva           = base_imponible × iva / 100        # iva por defecto 21
total               = base_imponible + cuota_iva
```

`presupuestoService` lo calcula al crear y al editar. Un presupuesto puede estar `aprobado` o `no_aprobado`; **solo los aprobados cuentan** para el precio de la obra.

## Obra

```
total                = Σ total de sus presupuestos aprobados     # 0 si no hay ninguno
horas_totales        = Σ horas_totales de sus partes de trabajo
coste_moo            = Σ coste_total_parte de sus partes de trabajo
cobrado              = Σ importe de sus ingresos
pendiente_de_cobro   = total − cobrado
estado_pago          = 'pendiente'  si cobrado ≤ 0
                       'parcial'    si cobrado < total
                       'pagado'     en otro caso
```

El precio de la obra **no se escribe a mano**: aprobar o desaprobar un presupuesto lo cambia solo. Las funciones están en `ObraService.ts` (`getObraTotal`, `getObraCosteMoo`, `getObraEstadoPago`…).

## Parte de trabajo

```
linea.coste_subtotal = horas × coste_hora                    # coste_hora copiado del trabajador al elegirlo
horas_totales        = Σ horas de sus líneas
coste_total_parte    = Σ coste_subtotal de sus líneas
```

## Ficha de Gastos

```
coste_proveedores    = Σ importe de los partes de proveedor de la obra
coste_especialistas  = Σ importe de los partes de especialista de la obra
coste_moo            = coste de mano de obra de la obra (ver Obra)
gastos               = coste_proveedores + coste_especialistas + coste_moo
ingresos             = Σ importe de los ingresos de la obra
beneficio_real       = ingresos − gastos
debe                 = total de la obra − ingresos
estado               = 'finalizado'  si debe ≤ 0 y ingresos > 0
                       'proceso'     en otro caso
coste_hora_medio     = coste_moo / horas  (0 si no hay horas)
salud de la obra     = 'rojo'   si beneficio_real < 0
                       'verde'  si estado_pago = 'pagado'
                       'ambar'  en otro caso
```

Todas están en `GastoService.ts`. `getSaludObra` vive ahí y no en `ObraService` porque depende del beneficio, que sale de la ficha de Gastos, y `ObraService` no puede importar `GastoService` sin crear una dependencia circular.

!!! warning "Beneficio de caja, no beneficio proyectado"
    `beneficio_real` es **lo cobrado menos lo gastado**, nunca *lo presupuestado menos lo gastado*. En el ERP original, calcularlo con el presupuesto daba beneficios que todavía no existían, y fue el error más caro que hubo que corregir. El dashboard usa la misma regla: sus KPIs son la suma de las fichas de Gastos de todas las obras.

## Validaciones

Las comprueban los esquemas de Zod (`src/schemas/`) antes de llegar al servicio; el formulario muestra el mensaje junto al campo.

| Regla | Entidad |
|---|---|
| `0 ≤ iva ≤ 100` | Presupuestos y Proveedores |
| Al menos una línea; `uds ≥ 0` y `precio ≥ 0` en cada una | Presupuestos |
| `0 ≤ horas ≤ 24` por línea; al menos una línea | Partes de Trabajo |
| `coste_hora_estandar ≥ 0` | Trabajadores (y `coste_hora ≥ 0` en cada línea de parte) |
| `importe > 0` | Partes de Proveedor, Partes de Especialista e Ingresos |
| `base ≥ 0` | Proveedores |
| `importe ≥ 0` (opcional) | Especialistas |
| Fecha de fin no anterior a la de inicio | Faltas y ficha de Gastos |
| Fechas con formato `AAAA-MM-DD` | Todas las entidades con fecha |
| Obligatorios | Cliente: nombre, NIF, dirección, teléfono · Trabajador: nombre, apellido, coste/h · Obra: descripción, dirección, fechas, cliente · Presupuesto: fecha, cliente, obra · Partes: fecha, obra y trabajador, proveedor o especialista · Ingreso: fecha, obra, cliente, importe · Falta: trabajador, fechas, tipo |

## Comportamientos que conviene conocer

- **Se puede cobrar más de lo presupuestado** (por imprevistos): entonces `debe` sale negativo.
- **Una obra con total 0 y algún cobro** queda como `pagado`, porque lo cobrado ya no es menor que el total.
- **Las faltas de los trabajadores no intervienen** en ningún cálculo económico. Sus días se cuentan con ambos extremos incluidos: un solo día cuenta como 1.
