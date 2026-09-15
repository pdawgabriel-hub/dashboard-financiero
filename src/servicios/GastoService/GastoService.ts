import { crearCrudService } from "../CrudService/CrudService";
import { GASTOS_MOCK } from "../../mocks/gastosMock/gastosMock";
import type { Gasto } from "../../types/Gasto/Gasto";
import { obraService, getObraHorasTotales, getObraCosteMoo, getObraTotal } from "../ObraService/ObraService";
import { parteProveedorService } from "../ParteProveedorService/ParteProveedorService";
import { ingresoService } from "../IngresoService/IngresoService";
import { presupuestoService } from "../PresupuestoService/PresupuestoService";
import { clienteService } from "../ClienteService/ClienteService";

const crud = crearCrudService<Gasto>('gastos', GASTOS_MOCK, 'GAS');

/**
 * Equivalente al create() de gestion.gastos + la relación 1:1 con Obra:
 * si la obra ya tiene ficha, la devuelve; si no, la crea con los valores
 * por defecto (mandante/gestion_licencia/pago_icio = "no").
 */
function obtenerOCrearFicha(obraId: string): Gasto {
  const existente = crud.getAll().find((g) => g.obra_id === obraId);
  if (existente) return existente;

  return crud.create({
    obra_id: obraId,
    mandante: 'no',
    gestion_licencia: 'no',
    pago_icio: 'no',
  });
}

// Equivalente a horas_trabajadas (related de obra_id.horas_totales_obra)
function getHorasTrabajadas(gasto: Gasto): number {
  const obra = obraService.getById(gasto.obra_id);
  return obra ? getObraHorasTotales(obra) : 0;
}

// Equivalente a coste_moo / coste_moo_total (related/copia de obra_id.coste_moo_obra)
function getCosteMoo(gasto: Gasto): number {
  const obra = obraService.getById(gasto.obra_id);
  return obra ? getObraCosteMoo(obra) : 0;
}

// Equivalente a _compute_coste_medio_hora
function getCosteHora(gasto: Gasto): number {
  const horas = getHorasTrabajadas(gasto);
  return horas > 0 ? Math.round((getCosteMoo(gasto) / horas) * 100) / 100 : 0;
}

// Equivalente a direccion_promotor (related de cliente_id.direccion)
function getDireccionPromotor(gasto: Gasto): string {
  const obra = obraService.getById(gasto.obra_id);
  if (!obra) return '';
  return clienteService.getById(obra.cliente_id)?.direccion ?? '';
}

// Equivalente a coste_proveedores: suma de parte_proveedor_ids.importe
function getCosteProveedores(gasto: Gasto): number {
  return parteProveedorService
    .getAll()
    .filter((p) => p.obra_id === gasto.obra_id)
    .reduce((suma, p) => suma + (p.importe || 0), 0);
}

// Equivalente a coste_especialistas: suma de parte_especialista_ids.importe.
// Los Partes de Especialista (informe §3.10) todavía no existen en el front,
// así que de momento siempre es 0; se completará (con el parámetro `gasto` de
// vuelta) cuando se implemente ese modelo.
function getCosteEspecialistas(): number {
  return 0;
}

// Equivalente a "gastos": coste_proveedores + coste_especialistas + coste_moo
function getGastosTotales(gasto: Gasto): number {
  return getCosteProveedores(gasto) + getCosteEspecialistas() + getCosteMoo(gasto);
}

// Equivalente a "ingresos": suma de obra_id.ingresos_ids.importe.
// Ingreso en el front distingue pendiente/cobrado (no existe en Odoo); para que
// esta cifra represente caja real se suman solo los ya cobrados.
function getIngresosCobrados(gasto: Gasto): number {
  return ingresoService
    .getAll()
    .filter((i) => i.obra_id === gasto.obra_id && i.estado_pago === 'cobrado')
    .reduce((suma, i) => suma + (i.total_con_iva || 0), 0);
}

// Equivalente a beneficio_real: ingresos - gastos (caja real, nunca presupuesto - gastos)
function getBeneficioReal(gasto: Gasto): number {
  return getIngresosCobrados(gasto) - getGastosTotales(gasto);
}

// Equivalente a debe (no guardado): obra_id.total - ingresos
function getDebe(gasto: Gasto): number {
  const obra = obraService.getById(gasto.obra_id);
  const total = obra ? getObraTotal(obra) : 0;
  return Math.round((total - getIngresosCobrados(gasto)) * 100) / 100;
}

// Equivalente a estado: "finalizado" cuando no queda nada por cobrar y ya se ha
// cobrado algo; "proceso" en cualquier otro caso.
function getEstado(gasto: Gasto): 'proceso' | 'finalizado' {
  const ingresos = getIngresosCobrados(gasto);
  return getDebe(gasto) <= 0 && ingresos > 0 ? 'finalizado' : 'proceso';
}

// Presupuestos que se pueden vincular a esta ficha: solo los de la misma obra
function getPresupuestosDeLaObra(obraId: string) {
  return presupuestoService.getAll().filter((p) => p.obra_id === obraId);
}

export const gastoService = {
  ...crud,
  obtenerOCrearFicha,
  getHorasTrabajadas,
  getCosteMoo,
  getCosteHora,
  getDireccionPromotor,
  getCosteProveedores,
  getCosteEspecialistas,
  getGastosTotales,
  getIngresosCobrados,
  getBeneficioReal,
  getDebe,
  getEstado,
  getPresupuestosDeLaObra,
};
