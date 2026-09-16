export interface Ingreso {
  id: string; // ingreso_id
  obra_id: string; // FK
  cliente_id: string; // FK
  tipo?: string; // Ej: Transferencia, Cheque, Efectivo
  fecha: string; // YYYY-MM-DD, por defecto hoy
  documento?: string;
  num_documento?: string;
  importe: number; // obligatorio: un cobro ya recibido (no una factura pendiente)
}

// Tipo para crear: sin id, lo genera el servicio
export type IngresoInput = Omit<Ingreso, 'id'>;
