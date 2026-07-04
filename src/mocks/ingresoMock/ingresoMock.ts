import type { Ingreso } from "../../types/Ingreso/Ingreso";

export const INGRESOS_MOCK: Ingreso[] = [
  { id: "INGR-001", obra_id: "OBRA-001", cliente_id: "CLI-001", numero_factura: "2026/F001", fecha_emision: "2026-06-30", importe_neto: 15000, iva_porcentaje: 21, total_con_iva: 18150, estado_pago: "cobrado" }
];