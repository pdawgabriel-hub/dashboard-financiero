import { crearCrudService } from "../CrudService/CrudService";
import { INGRESOS_MOCK } from "../../mocks/ingresoMock/ingresoMock";
import type { Ingreso } from "../../types/Ingreso/Ingreso";

export const ingresoService = crearCrudService<Ingreso>('ingresos', INGRESOS_MOCK, 'INGR');

// Equivalente a _compute_anio de gestion.ingresos.
export function getIngresoAnio(ingreso: Ingreso): number | null {
  return ingreso.fecha ? new Date(ingreso.fecha).getFullYear() : null;
}

// Equivalente a total_ingresos: suma de todos los ingresos de la misma obra.
export function getTotalIngresosDeObra(obraId: string): number {
  return ingresoService
    .getAll()
    .filter((i) => i.obra_id === obraId)
    .reduce((suma, i) => suma + (i.importe || 0), 0);
}
