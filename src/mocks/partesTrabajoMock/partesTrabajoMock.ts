import type { ParteTrabajo } from "../../types/ParteTrabajo/ParteTrabajo";

export const PARTES_TRABAJO_MOCK: ParteTrabajo[] = [
  {
    id: "PRT-001",
    obra_id: "OBRA-001",
    fecha: "2026-07-01",
    descripcion: "Cimentación y replanteo de pilares principales.",
    horas_totales: 8,
    coste_total_parte: 124.0,
    lineas: [
      {
        trabajador_id: "TRAB-001",
        horas: 8,
        coste_hora: 15.5,
        coste_subtotal: 124.0,
      },
    ],
  },
  {
    id: "PRT-002",
    obra_id: "OBRA-001",
    fecha: "2026-07-02",
    descripcion: "Instalación de fontanería en planta baja.",
    horas_totales: 6.5,
    coste_total_parte: 91.0,
    lineas: [
      {
        trabajador_id: "TRAB-002",
        horas: 6.5,
        coste_hora: 14.0,
        coste_subtotal: 91.0,
      },
    ],
  },
  {
    id: "PRT-003",
    obra_id: "OBRA-002",
    fecha: "2026-07-02",
    descripcion: "Demolición de tabiquería existente y retirada de escombros en contenedor.",
    horas_totales: 8,
    coste_total_parte: 128.0,
    lineas: [
      {
        trabajador_id: "TRAB-003",
        horas: 8,
        coste_hora: 16.0,
        coste_subtotal: 128.0,
      },
    ],
  },
  {
    id: "PRT-004",
    obra_id: "OBRA-001",
    fecha: "2026-07-03",
    descripcion: "Colocación de ferralla y encofrado para vigas de carga.",
    horas_totales: 7.5,
    coste_total_parte: 116.25,
    lineas: [
      {
        trabajador_id: "TRAB-001",
        horas: 7.5,
        coste_hora: 15.5,
        coste_subtotal: 116.25,
      },
    ],
  },
  {
    id: "PRT-005",
    obra_id: "OBRA-003",
    fecha: "2026-07-03",
    descripcion: "Rozas y colocación de tubos corrugados para preinstalación eléctrica en local.",
    horas_totales: 8,
    coste_total_parte: 132.0,
    lineas: [
      {
        trabajador_id: "TRAB-004",
        horas: 8,
        coste_hora: 16.5,
        coste_subtotal: 132.0,
      },
    ],
  },
  {
    id: "PRT-006",
    obra_id: "OBRA-002",
    fecha: "2026-07-04",
    descripcion: "Modificación de tomas de agua y desagües en zona de baño principal.",
    horas_totales: 5,
    coste_total_parte: 70.0,
    lineas: [
      {
        trabajador_id: "TRAB-002",
        horas: 5,
        coste_hora: 14.0,
        coste_subtotal: 70.0,
      },
    ],
  },
  {
    id: "PRT-007",
    obra_id: "OBRA-004",
    fecha: "2026-07-06",
    descripcion: "Excavación manual y perfilado del terreno para la losa de la piscina.",
    horas_totales: 8,
    coste_total_parte: 124.0,
    lineas: [
      {
        trabajador_id: "TRAB-005",
        horas: 8,
        coste_hora: 15.5,
        coste_subtotal: 124.0,
      },
    ],
  },
  {
    id: "PRT-008",
    obra_id: "OBRA-003",
    fecha: "2026-07-07",
    descripcion: "Enlucido de paredes con yeso y nivelado de suelo para tarima posterior.",
    horas_totales: 8,
    coste_total_parte: 128.0,
    lineas: [
      {
        trabajador_id: "TRAB-003",
        horas: 8,
        coste_hora: 16.0,
        coste_subtotal: 128.0,
      },
    ],
  },
  {
    id: "PRT-009",
    obra_id: "OBRA-001",
    fecha: "2026-07-08",
    descripcion: "Recepción de camión hormigonera y supervisión del vertido en forjado.",
    horas_totales: 4.5,
    coste_total_parte: 69.75,
    lineas: [
      {
        trabajador_id: "TRAB-001",
        horas: 4.5,
        coste_hora: 15.5,
        coste_subtotal: 69.75,
      },
    ],
  },
  {
    id: "PRT-010",
    obra_id: "OBRA-006",
    fecha: "2026-07-11",
    descripcion: "Montaje de estructura de aluminio coplanar sobre cubierta para paneles solares.",
    horas_totales: 8,
    coste_total_parte: 132.0,
    lineas: [
      {
        trabajador_id: "TRAB-004",
        horas: 8,
        coste_hora: 16.5,
        coste_subtotal: 132.0,
      },
    ],
  },
];
