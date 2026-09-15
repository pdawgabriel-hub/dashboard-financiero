// Servicio para gestionar las operaciones del Crud Service
import { crearCrudService } from "../CrudService/CrudService";
import { TRABAJADORES_MOCK } from "../../mocks/trabajadoresMock/trabajadoresMock";
import type { Trabajador } from "../../types/Trabajador/Trabajador";

export const trabajadorService = crearCrudService<Trabajador>('trabajadores', TRABAJADORES_MOCK, 'TRAB')

/**
 * Equivalente a _compute_display_name de gestion.trabajadores:
 * "código - nombre apellido · coste/h €/h".
 */
export function getTrabajadorDisplayName(trabajador: Trabajador): string {
  const nombreCompleto = `${trabajador.nombre} ${trabajador.apellido}`.trim();
  return `${trabajador.id} - ${nombreCompleto} · ${trabajador.coste_hora_estandar}€/h`;
}