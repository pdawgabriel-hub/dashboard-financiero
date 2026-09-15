import { crearCrudService } from "../CrudService/CrudService";
import { OBRAS_MOCK } from "../../mocks/obrasMock/obrasMock";
import type { Obra } from "../../types/Obra/Obra";
import { presupuestoService } from "../PresupuestoService/PresupuestoService";
import { parteTrabajoService } from "../ParteTrabajoService/ParteTrabajoService";
import { trabajadorService } from "../TrabajadorService/TrabajadorService";
import { getTotalIngresosDeObra } from "../IngresoService/IngresoService";

export const obraService = crearCrudService<Obra>('obras', OBRAS_MOCK, 'OBRA');

/**
 * Etiqueta legible para selectores de Obra: "código - primera línea de la descripción".
 */
export function getObraDisplayName(obra: Obra): string {
  const resumen = obra.descripcion?.split('\n')[0]?.slice(0, 40) ?? '';
  return resumen ? `${obra.id} - ${resumen}` : obra.id;
}

/**
 * Equivalente a _compute_total_obra de gestion.obras: suma de los presupuestos
 * vinculados a esta obra en estado "aprobado".
 */
export function getObraTotal(obra: Obra): number {
  return presupuestoService
    .getAll()
    .filter((p) => p.obra_id === obra.id && p.estado === 'aprobado')
    .reduce((suma, p) => suma + (p.total || 0), 0);
}

/**
 * Equivalente a _compute_horas_obra (horas_totales_obra) de gestion.obras.
 */
export function getObraHorasTotales(obra: Obra): number {
  return parteTrabajoService
    .getAll()
    .filter((p) => p.obra_id === obra.id)
    .reduce((suma, p) => suma + (p.horas || 0), 0);
}

/**
 * Aproximación a coste_moo_obra. En Odoo, cada línea de Parte de Trabajo congela
 * el coste/hora del trabajador en el momento de crearla (ver 3.9 del informe);
 * los Partes de Trabajo del front todavía no guardan esa tarifa congelada, así
 * que de momento se usa la tarifa ACTUAL del trabajador como aproximación.
 */
export function getObraCosteMoo(obra: Obra): number {
  const trabajadores = trabajadorService.getAll();
  return parteTrabajoService
    .getAll()
    .filter((p) => p.obra_id === obra.id)
    .reduce((suma, p) => {
      const costeHora = trabajadores.find((t) => t.id === p.trabajador_id)?.coste_hora_estandar ?? 0;
      return suma + (p.horas || 0) * costeHora;
    }, 0);
}

/**
 * Equivalente a "debe" (obra_id.total - ingresos): lo que queda pendiente de cobro.
 */
export function getObraPendienteCobro(obra: Obra): number {
  return Math.round((getObraTotal(obra) - getTotalIngresosDeObra(obra.id)) * 100) / 100;
}

/**
 * Equivalente a _compute_estado_pago de gestion.obras.
 */
export function getObraEstadoPago(obra: Obra): 'pendiente' | 'parcial' | 'pagado' {
  const total = getObraTotal(obra);
  const cobrado = getTotalIngresosDeObra(obra.id);

  if (cobrado <= 0) return 'pendiente';
  if (cobrado < total) return 'parcial';
  return 'pagado';
}
