// Ficha de seguimiento financiero de una Obra (1:1), equivalente a gestion.gastos.
// Se crea automáticamente al consultar por primera vez la ficha de una Obra
// (no existe alta manual: en Odoo tampoco tiene botón "Nuevo").
// El resto de campos del informe (horas_trabajadas, coste_moo_total, coste_hora,
// ingresos, gastos, beneficio_real, debe, coste_proveedores, coste_especialistas,
// coste_moo, estado) son computados y se calculan bajo demanda en GastoService,
// no se guardan aquí.
export interface Gasto {
  id: string; // gasto_id
  obra_id: string; // FK obligatoria, relación 1:1 con la Obra
  presupuesto_id: string; // FK, debe pertenecer a la misma obra
  direccion_obra?: string;
  inicio_obra?: string; // YYYY-MM-DD
  fin_obra?: string; // YYYY-MM-DD
  solicitud_obra?: string; // YYYY-MM-DD
  mandante: 'si' | 'no';
  gestion_licencia: 'si' | 'no';
  pago_icio: 'si' | 'no';
}

export type GastoInput = Omit<Gasto, 'id'>;
