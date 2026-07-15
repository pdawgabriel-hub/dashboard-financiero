import type { Gasto } from "../../types/Gasto/Gasto";

export const GASTOS_MOCK: Gasto[] = [
  { 
    id: "GAST-001", 
    obra_id: "OBRA-001", 
    proveedor_id: "PROV-001", 
    concepto: "Compra 10 palets de cemento gris", 
    fecha: "2026-06-18", 
    importe_neto: 1200, 
    iva_porcentaje: 21, 
    total_con_iva: 1452 
  },
  { 
    id: "GAST-002", 
    obra_id: "OBRA-001", 
    proveedor_id: "PROV-002", 
    concepto: "Adquisición de mallas de acero corrugado", 
    fecha: "2026-06-20", 
    importe_neto: 2500, 
    iva_porcentaje: 21, 
    total_con_iva: 3025 
  },
  { 
    id: "GAST-003", 
    obra_id: "OBRA-002", 
    proveedor_id: "PROV-003", 
    concepto: "Suministro de tuberías de cobre de 15mm y 22mm", 
    fecha: "2026-06-22", 
    importe_neto: 850, 
    iva_porcentaje: 21, 
    total_con_iva: 1028.5 
  },
  { 
    id: "GAST-004", 
    obra_id: "OBRA-002", 
    proveedor_id: "PROV-004", 
    concepto: "Alquiler de andamios de cremallera (Fase 1)", 
    fecha: "2026-06-25", 
    importe_neto: 1500, 
    iva_porcentaje: 21, 
    total_con_iva: 1815 
  },
  { 
    id: "GAST-005", 
    obra_id: "OBRA-003", 
    proveedor_id: "PROV-001", 
    concepto: "Compra de arena de río de cantos finos (15 toneladas)", 
    fecha: "2026-06-28", 
    importe_neto: 450, 
    iva_porcentaje: 21, 
    total_con_iva: 544.5 
  },
  { 
    id: "GAST-006", 
    obra_id: "OBRA-001", 
    proveedor_id: "PROV-005", 
    concepto: "Suministro de cables de cobre libre de halógenos", 
    fecha: "2026-07-02", 
    importe_neto: 1350, 
    iva_porcentaje: 21, 
    total_con_iva: 1633.5 
  },
  { 
    id: "GAST-007", 
    obra_id: "OBRA-003", 
    proveedor_id: "PROV-006", 
    concepto: "Compra de bloques de yeso laminado y perfiles", 
    fecha: "2026-07-05", 
    importe_neto: 980, 
    iva_porcentaje: 21, 
    total_con_iva: 1185.8 
  },
  { 
    id: "GAST-008", 
    obra_id: "OBRA-002", 
    proveedor_id: "PROV-007", 
    concepto: "Pintura plástica lavable blanca mate (20 botes)", 
    fecha: "2026-07-08", 
    importe_neto: 620, 
    iva_porcentaje: 21, 
    total_con_iva: 750.2 
  },
  { 
    id: "GAST-009", 
    obra_id: "OBRA-004", 
    proveedor_id: "PROV-008", 
    concepto: "Materiales de aislamiento termoacústico con lana de roca", 
    fecha: "2026-07-10", 
    importe_neto: 1800, 
    iva_porcentaje: 21, 
    total_con_iva: 2178 
  },
  { 
    id: "GAST-010", 
    obra_id: "OBRA-004", 
    proveedor_id: "PROV-009", 
    concepto: "Suministro de baldosas cerámicas de gres porcelánico", 
    fecha: "2026-07-12", 
    importe_neto: 3100, 
    iva_porcentaje: 21, 
    total_con_iva: 3751 
  }
];