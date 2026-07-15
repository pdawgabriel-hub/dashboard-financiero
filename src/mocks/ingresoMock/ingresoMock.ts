import type { Ingreso } from "../../types/Ingreso/Ingreso";

export const INGRESOS_MOCK: Ingreso[] = [
  { 
    id: "INGR-001", 
    obra_id: "OBRA-001", 
    cliente_id: "CLI-0001", 
    numero_factura: "2026/F001", 
    fecha_emision: "2026-06-30", 
    importe_neto: 15000, 
    iva_porcentaje: 21, 
    total_con_iva: 18150, 
    estado_pago: "cobrado" 
  },
  { 
    id: "INGR-002", 
    obra_id: "OBRA-001", 
    cliente_id: "CLI-0001", 
    numero_factura: "2026/F002", 
    fecha_emision: "2026-07-15", 
    importe_neto: 8500, 
    iva_porcentaje: 21, 
    total_con_iva: 10285, 
    estado_pago: "pendiente" 
  },
  { 
    id: "INGR-003", 
    obra_id: "OBRA-002", 
    cliente_id: "CLI-0002", 
    numero_factura: "2026/F003", 
    fecha_emision: "2026-07-18", 
    importe_neto: 22000, 
    iva_porcentaje: 21, 
    total_con_iva: 26620, 
    estado_pago: "cobrado" 
  },
  { 
    id: "INGR-004", 
    obra_id: "OBRA-003", 
    cliente_id: "CLI-0003", 
    numero_factura: "2026/F004", 
    fecha_emision: "2026-07-20", 
    importe_neto: 45000, 
    iva_porcentaje: 21, 
    total_con_iva: 54450, 
    estado_pago: "cobrado" 
  },
  { 
    id: "INGR-005", 
    obra_id: "OBRA-002", 
    cliente_id: "CLI-0002", 
    numero_factura: "2026/F005", 
    fecha_emision: "2026-07-25", 
    importe_neto: 12500, 
    iva_porcentaje: 21, 
    total_con_iva: 15125, 
    estado_pago: "pendiente" 
  },
  { 
    id: "INGR-006", 
    obra_id: "OBRA-004", 
    cliente_id: "CLI-0004", 
    numero_factura: "2026/F006", 
    fecha_emision: "2026-07-28", 
    importe_neto: 6800, 
    iva_porcentaje: 21, 
    total_con_iva: 8228, 
    estado_pago: "cobrado" 
  },
  { 
    id: "INGR-007", 
    obra_id: "OBRA-001", 
    cliente_id: "CLI-0001", 
    numero_factura: "2026/F007", 
    fecha_emision: "2026-08-01", 
    importe_neto: 19300, 
    iva_porcentaje: 21, 
    total_con_iva: 23353, 
    estado_pago: "pendiente" 
  },
  { 
    id: "INGR-008", 
    obra_id: "OBRA-005", 
    cliente_id: "CLI-0005", 
    numero_factura: "2026/F008", 
    fecha_emision: "2026-08-05", 
    importe_neto: 31000, 
    iva_porcentaje: 21, 
    total_con_iva: 37510, 
    estado_pago: "cobrado" 
  },
  { 
    id: "INGR-009", 
    obra_id: "OBRA-003", 
    cliente_id: "CLI-0003", 
    numero_factura: "2026/F009", 
    fecha_emision: "2026-08-10", 
    importe_neto: 15000, 
    iva_porcentaje: 21, 
    total_con_iva: 18150, 
    estado_pago: "pendiente" 
  },
  { 
    id: "INGR-010", 
    obra_id: "OBRA-005", 
    cliente_id: "CLI-0005", 
    numero_factura: "2026/F010", 
    fecha_emision: "2026-08-12", 
    importe_neto: 5400, 
    iva_porcentaje: 21, 
    total_con_iva: 6534, 
    estado_pago: "pendiente" 
  }
];