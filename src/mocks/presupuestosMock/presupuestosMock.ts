import type { Presupuesto } from "../../types/Presupuesto/Presupuesto";

export const PRESUPUESTOS_MOCK: Presupuesto[] = [
  { 
    id: "PRES-0001", 
    cliente_id: "CLI-0001", 
    titulo: "Reforma Integral de Vivienda Unifamiliar", 
    fecha_emision: "2026-05-10", 
    importe_total: 45000, 
    estado: "aceptado" 
  },
  { 
    id: "PRES-0002", 
    cliente_id: "CLI-0002", 
    titulo: "Instalación Eléctrica Nave Industrial", 
    fecha_emision: "2026-06-01", 
    importe_total: 18500, 
    estado: "enviado" 
  },
  { 
    id: "PRES-0003", 
    cliente_id: "CLI-0003", 
    titulo: "Acondicionamiento y Climatización Local Comercial", 
    fecha_emision: "2026-04-20", 
    importe_total: 28900, 
    estado: "aceptado" 
  },
  { 
    id: "PRES-0004", 
    cliente_id: "CLI-0004", 
    titulo: "Excavación y Construcción de Piscina de Obra", 
    fecha_emision: "2026-05-02", 
    importe_total: 14200, 
    estado: "aceptado" 
  },
  { 
    id: "PRES-0005", 
    cliente_id: "CLI-0005", 
    titulo: "Rehabilitación de Fachada y Aislamiento Térmico", 
    fecha_emision: "2026-06-15", 
    importe_total: 32000, 
    estado: "enviado" 
  },
  { 
    id: "PRES-0006", 
    cliente_id: "CLI-0006", 
    titulo: "Instalación de Sistema Solar Fotovoltaico Autoconsumo", 
    fecha_emision: "2026-06-22", 
    importe_total: 8400, 
    estado: "aceptado" 
  },
  { 
    id: "PRES-0007", 
    cliente_id: "CLI-0007", 
    titulo: "Saneamiento de Muros e Impermeabilización de Humedades", 
    fecha_emision: "2026-03-28", 
    importe_total: 3900, 
    estado: "aceptado" 
  },
  { 
    id: "PRES-0008", 
    cliente_id: "CLI-0008", 
    titulo: "Montaje de Falsos Techos y Tabiquería de Yeso Laminado", 
    fecha_emision: "2026-07-01", 
    importe_total: 6100, 
    estado: "enviado" 
  },
  { 
    id: "PRES-0009", 
    cliente_id: "CLI-0009", 
    titulo: "Pintura Decorativa e Interiorismo Restaurante", 
    fecha_emision: "2026-06-10", 
    importe_total: 11500, 
    estado: "aceptado" 
  },
  { 
    id: "PRES-0010", 
    cliente_id: "CLI-0010", 
    titulo: "Renovación de Cocina, Fontanería y Alicatados", 
    fecha_emision: "2026-07-05", 
    importe_total: 16800, 
    estado: "enviado" 
  }
];