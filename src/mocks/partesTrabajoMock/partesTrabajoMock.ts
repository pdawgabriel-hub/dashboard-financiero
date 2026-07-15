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
  },
  {
    id: "PART-003",
    trabajador_id: "TRAB-003",
    obra_id: "OBRA-002",
    fecha: "2026-07-02",
    horas: 8,
    descripcion: "Demolición de tabiquería existente y retirada de escombros en contenedor."
  },
  {
    id: "PART-004",
    trabajador_id: "TRAB-001",
    obra_id: "OBRA-001",
    fecha: "2026-07-03",
    horas: 7.5,
    descripcion: "Colocación de ferralla y encofrado para vigas de carga."
  },
  {
    id: "PART-005",
    trabajador_id: "TRAB-004",
    obra_id: "OBRA-003",
    fecha: "2026-07-03",
    horas: 8,
    descripcion: "Rozas y colocación de tubos corrugados para preinstalación eléctrica en local."
  },
  {
    id: "PART-006",
    trabajador_id: "TRAB-002",
    obra_id: "OBRA-002",
    fecha: "2026-07-04",
    horas: 5,
    descripcion: "Modificación de tomas de agua y desagües en zona de baño principal."
  },
  {
    id: "PART-007",
    trabajador_id: "TRAB-005",
    obra_id: "OBRA-004",
    fecha: "2026-07-06",
    horas: 8,
    descripcion: "Excavación manual y perfilado del terreno para la losa de la piscina."
  },
  {
    id: "PART-008",
    trabajador_id: "TRAB-003",
    obra_id: "OBRA-003",
    fecha: "2026-07-07",
    horas: 8,
    descripcion: "Enlucido de paredes con yeso y nivelado de suelo para tarima posterior."
  },
  {
    id: "PART-009",
    trabajador_id: "TRAB-001",
    obra_id: "OBRA-001",
    fecha: "2026-07-08",
    horas: 4.5,
    descripcion: "Recepción de camión hormigonera y supervisión del vertido en forjado."
  },
  {
    id: "PART-010",
    trabajador_id: "TRAB-004",
    obra_id: "OBRA-006",
    fecha: "2026-07-11",
    horas: 8,
    descripcion: "Montaje de estructura de aluminio coplanar sobre cubierta para paneles solares."
  }
];