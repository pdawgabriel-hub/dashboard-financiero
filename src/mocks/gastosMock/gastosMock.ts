import type { Gasto } from "../../types/Gasto/Gasto";

export const GASTOS_MOCK: Gasto[] = [
  { 
    id: "GAST-001", 
    obra_id: "OBRA-001", 
    proveedor_id: "PROV-001", 
    concepto: "Hormigón, estructuras y acero corrugado", 
    fecha: "2026-06-18", 
    importe_neto: 24500, 
    iva_porcentaje: 21, 
    total_con_iva: 29645 
  },
  { 
    id: "GAST-002", 
    obra_id: "OBRA-002", 
    proveedor_id: "PROV-002", 
    concepto: "Instalación de fontanería y alicatados porcelánicos", 
    fecha: "2026-06-20", 
    importe_neto: 9800, 
    iva_porcentaje: 21, 
    total_con_iva: 11858 
  },
  { 
    id: "GAST-003", 
    obra_id: "OBRA-003", 
    proveedor_id: "PROV-003", 
    concepto: "Climatización industrial y cerramientos de cristal", 
    fecha: "2026-06-22", 
    importe_neto: 15200, 
    iva_porcentaje: 21, 
    total_con_iva: 18392 
  },
  { 
    id: "GAST-004", 
    obra_id: "OBRA-004", 
    proveedor_id: "PROV-004", 
    concepto: "Excavación, gresite y depuradora de piscina", 
    fecha: "2026-06-25", 
    importe_neto: 7600, 
    iva_porcentaje: 21, 
    total_con_iva: 9196 
  },
  { 
    id: "GAST-005", 
    obra_id: "OBRA-005", 
    proveedor_id: "PROV-001", 
    concepto: "Alquiler de andamios y mortero SATE fachadas", 
    fecha: "2026-06-28", 
    importe_neto: 17500, 
    iva_porcentaje: 21, 
    total_con_iva: 21175 
  },
  { 
    id: "GAST-006", 
    obra_id: "OBRA-006", 
    proveedor_id: "PROV-005", 
    concepto: "Placas fotovoltaicas, inversor e instalación", 
    fecha: "2026-07-02", 
    importe_neto: 4800, 
    iva_porcentaje: 21, 
    total_con_iva: 5808 
  },
  { 
    id: "GAST-007", 
    obra_id: "OBRA-007", 
    proveedor_id: "PROV-006", 
    concepto: "Inyecciones de resina e impermeabilización", 
    fecha: "2026-07-05", 
    importe_neto: 2100, 
    iva_porcentaje: 21, 
    total_con_iva: 2541 
  },
  { 
    id: "GAST-008", 
    obra_id: "OBRA-008", 
    proveedor_id: "PROV-007", 
    concepto: "Perfiles de aluminio, pladur y lana de roca", 
    fecha: "2026-07-08", 
    importe_neto: 3300, 
    iva_porcentaje: 21, 
    total_con_iva: 3993 
  },
  { 
    id: "GAST-009", 
    obra_id: "OBRA-009", 
    proveedor_id: "PROV-008", 
    concepto: "Pinturas especiales, esmaltes e interiorismo", 
    fecha: "2026-07-10", 
    importe_neto: 6200, 
    iva_porcentaje: 21, 
    total_con_iva: 7502 
  },
  { 
    id: "GAST-010", 
    obra_id: "OBRA-010", 
    proveedor_id: "PROV-009", 
    concepto: "Muebles de cocina, electrodomésticos y encimera", 
    fecha: "2026-07-12", 
    importe_neto: 10200, 
    iva_porcentaje: 21, 
    total_con_iva: 12342 
  }
];