import { crearCrudService } from "../CrudService/CrudService";
import { ESPECIALISTAS_MOCK } from "../../mocks/especialistasMock/especialistasMock";
import type { Especialista } from "../../types/Especialista/Especialista";

export const especialistaService = crearCrudService<Especialista>('especialistas', ESPECIALISTAS_MOCK, 'ESP');

/**
 * Equivalente a _compute_display_name de gestion.especialistas:
 * "código - nombre (tipo) · teléfono".
 */
export function getEspecialistaDisplayName(especialista: Especialista): string {
  let etiqueta = `${especialista.id} - ${especialista.nombre}`;
  if (especialista.tipo) etiqueta += ` (${especialista.tipo})`;
  if (especialista.telf) etiqueta += ` · ${especialista.telf}`;
  return etiqueta;
}