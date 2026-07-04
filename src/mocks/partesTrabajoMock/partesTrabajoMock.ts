import type { ParteTrabajo } from "../../types/ParteTrabajo/ParteTrabajo";

export const PARTES_TRABAJO_MOCK: ParteTrabajo[] = [
    {
        id: "PART-001",
        trabajador_id: "TRAB-001",
        obra_id: "OBRA-001",
        fecha: "2026-07-01",
        horas: 8,
        descripcion: "Cimentación y replanteo de pilares principales."
    },
    {
        id: "PART-002",
        trabajador_id: "TRAB-002",
        obra_id: "OBRA-001",
        fecha: "2026-07-02",
        horas: 6.5,
        descripcion: "Instalación de fontanería en planta baja."
    }
];