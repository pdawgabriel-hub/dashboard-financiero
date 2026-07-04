import type { Presupuesto } from "../../types/Presupuesto/Presupuesto";

export const PRESUPUESTOS_MOCK: Presupuesto[] = [
  { id: "PRES-001", cliente_id: "CLI-001", titulo: "Reforma Integral de Vivienda Unifamiliar", fecha_emision: "2026-05-10", importe_total: 45000, estado: "aceptado" },
  { id: "PRES-002", cliente_id: "CLI-002", titulo: "Instalación Eléctrica Nave Industrial", fecha_emision: "2026-06-01", importe_total: 18500, estado: "enviado" }
];