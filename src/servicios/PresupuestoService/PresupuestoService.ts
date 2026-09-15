import { crearCrudService } from "../CrudService/CrudService";
import { PRESUPUESTOS_MOCK } from "../../mocks/presupuestosMock/presupuestosMock";
import type { Presupuesto, PresupuestoInput, PresupuestoLinea, PresupuestoLineaInput } from "../../types/Presupuesto/Presupuesto";

const crud = crearCrudService<Presupuesto>('presupuestos', PRESUPUESTOS_MOCK, 'PRES');

// Equivalente a _compute_total_linea de gestion.presupuesto.linea.
function calcularLineas(lineas: PresupuestoLineaInput[]): PresupuestoLinea[] {
  return lineas.map((l) => ({
    ...l,
    total_linea: Math.round((l.uds || 0) * (l.precio || 0) * 100) / 100,
  }));
}

// Equivalente a _compute_totales de gestion.presupuestos.
function calcularTotales(lineas: PresupuestoLinea[], iva: number) {
  const base_imponible = Math.round(lineas.reduce((suma, l) => suma + l.total_linea, 0) * 100) / 100;
  const cuota_iva = Math.round(base_imponible * (iva / 100) * 100) / 100;
  const total = Math.round((base_imponible + cuota_iva) * 100) / 100;
  return { base_imponible, cuota_iva, total };
}

/**
 * Equivalente a _compute_display_name de gestion.presupuestos:
 * "código - nombre cliente · fecha · total €".
 */
export function getPresupuestoDisplayName(presupuesto: Presupuesto): string {
  const fecha = presupuesto.fecha ? new Date(presupuesto.fecha).toLocaleDateString('es-ES') : '';
  let etiqueta = `${presupuesto.id} - ${presupuesto.nombre_cliente}`;
  if (fecha) etiqueta += ` · ${fecha}`;
  etiqueta += ` · ${presupuesto.total.toFixed(2)}€`;
  return etiqueta;
}

/**
 * Equivalente a _compute_anio de gestion.presupuestos.
 */
export function getPresupuestoAnio(presupuesto: Presupuesto): number | null {
  return presupuesto.fecha ? new Date(presupuesto.fecha).getFullYear() : null;
}

export const presupuestoService = {
  ...crud,
  create(datos: PresupuestoInput): Presupuesto {
    const lineas = calcularLineas(datos.lineas);
    return crud.create({ ...datos, lineas, ...calcularTotales(lineas, datos.iva) });
  },
  update(id: string, datos: Partial<PresupuestoInput>): Presupuesto | undefined {
    const actual = crud.getById(id);
    if (!actual) return undefined;

    const lineas = datos.lineas ? calcularLineas(datos.lineas) : actual.lineas;
    const iva = datos.iva ?? actual.iva;
    return crud.update(id, { ...datos, lineas, ...calcularTotales(lineas, iva) });
  },
};
