export interface Ingreso {
  id: string; // INGR-001
  numero_factura: string; // Ej: FACT-2026-001
  fecha_emision: string; // YYYY-MM-DD
  importe_neto: number;
  iva_porcentaje: number; // Ej: 21
  total_con_iva: number;
  estado_pago: 'pendiente' | 'cobrado';
  obra_id: string; // FK
  cliente_id: string; // FK
}