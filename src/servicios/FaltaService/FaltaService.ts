import { crearCrudService } from "../CrudService/CrudService";
import { FALTAS_MOCK } from "../../mocks/faltasMock/faltasMock";
import type { Falta } from "../../types/Falta/Falta";
import { trabajadorService } from "../TrabajadorService/TrabajadorService";

export const faltaService = crearCrudService<Falta>('faltas', FALTAS_MOCK, 'FAL');

// Equivalente a _compute_dias de gestion.trabajadores.falta: inclusive
// (un solo día cuenta como 1).
export function getFaltaDias(falta: Falta): number {
  const inicio = new Date(falta.fecha_inicio);
  const fin = new Date(falta.fecha_fin);
  if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) return 0;
  return Math.round((fin.getTime() - inicio.getTime()) / 86400000) + 1;
}

// Equivalente a trabajador_nombre_completo de gestion.trabajadores.falta.
export function getFaltaTrabajadorNombreCompleto(falta: Falta): string {
  const trabajador = trabajadorService.getById(falta.trabajador_id);
  return trabajador ? `${trabajador.nombre} ${trabajador.apellido}`.trim() : '';
}

// Equivalente a trabajador_coste_hora (related de trabajador_id.coste_hora_estandar).
export function getFaltaTrabajadorCosteHora(falta: Falta): number {
  return trabajadorService.getById(falta.trabajador_id)?.coste_hora_estandar ?? 0;
}
