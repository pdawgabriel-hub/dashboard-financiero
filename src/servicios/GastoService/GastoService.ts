import { crearCrudService } from "../CrudService/CrudService";
import { GASTOS_MOCK } from "../../mocks/gastosMock/gastosMock";
import type { Gasto } from "../../types/Gasto/Gasto";
import type { Obra } from "../../types/Obra/Obra";
import { obraService, getObraHorasTotales, getObraCosteMoo, getObraPendienteCobro, getObraEstadoPago } from "../ObraService/ObraService";
import { parteProveedorService } from "../ParteProveedorService/ParteProveedorService";
import { parteEspecialistaService } from "../ParteEspecialistaService/ParteEspecialistaService";
import { getTotalIngresosDeObra } from "../IngresoService/IngresoService";
import { presupuestoService } from "../PresupuestoService/PresupuestoService";
import { clienteService } from "../ClienteService/ClienteService";

const crud = crearCrudService<Gasto>('gastos', GASTOS_MOCK, 'GAS');

/**
 * Equivalente al create() de gestion.gastos + la relación 1:1 con Obra:
 * si la obra ya tiene ficha, la devuelve; si no, la crea con los valores
 * por defecto (mandante/gestion_licencia/pago_icio = "no"), vinculada al
 * presupuesto aprobado de la obra (o al primero disponible si aún no hay
 * ninguno aprobado).
 */
function obtenerOCrearFicha(obraId: string): Gasto {
  const existente = crud.getAll().find((g) => g.obra_id === obraId);
  if (existente) return existente;

  const presupuestosDeLaObra = presupuestoService.getAll().filter((p) => p.obra_id === obraId);
  const presupuesto = presupuestosDeLaObra.find((p) => p.estado === 'aprobado') ?? presupuestosDeLaObra[0];

  return crud.create({
    obra_id: obraId,
    presupuesto_id: presupuesto?.id ?? '',
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

// Equivalente a coste_especialistas: suma de parte_especialista_ids.importe
function getCosteEspecialistas(gasto: Gasto): number {
  return parteEspecialistaService
    .getAll()
    .filter((p) => p.obra_id === gasto.obra_id)
    .reduce((suma, p) => suma + (p.importe || 0), 0);
}

// Equivalente a "gastos": coste_proveedores + coste_especialistas + coste_moo
function getGastosTotales(gasto: Gasto): number {
  return getCosteProveedores(gasto) + getCosteEspecialistas(gasto) + getCosteMoo(gasto);
}

// Equivalente a "ingresos": suma de obra_id.ingresos_ids.importe. Cada Ingreso
// del front (igual que en Odoo) representa ya un cobro recibido, no una
// factura pendiente, así que se suman todos.
function getIngresos(gasto: Gasto): number {
  return getTotalIngresosDeObra(gasto.obra_id);
}

// Equivalente a beneficio_real: ingresos - gastos (caja real, nunca presupuesto - gastos)
function getBeneficioReal(gasto: Gasto): number {
  return getIngresos(gasto) - getGastosTotales(gasto);
}

// Equivalente a debe (no guardado): obra_id.total - ingresos
function getDebe(gasto: Gasto): number {
  const obra = obraService.getById(gasto.obra_id);
  return obra ? getObraPendienteCobro(obra) : 0;
}

// Equivalente a estado: "finalizado" cuando no queda nada por cobrar y ya se ha
// cobrado algo; "proceso" en cualquier otro caso.
function getEstado(gasto: Gasto): 'proceso' | 'finalizado' {
  const ingresos = getIngresos(gasto);
  return getDebe(gasto) <= 0 && ingresos > 0 ? 'finalizado' : 'proceso';
}

// Presupuestos que se pueden vincular a esta ficha: solo los de la misma obra
function getPresupuestosDeLaObra(obraId: string) {
  return presupuestoService.getAll().filter((p) => p.obra_id === obraId);
}

/**
 * Equivalente a _compute_salud_obra de gestion.obras: vive aquí (y no en
 * ObraService) porque depende de beneficio_real, que sale de la ficha de
 * Gastos; ObraService no puede importar GastoService sin crear un ciclo
 * (GastoService ya depende de ObraService).
 */
function getSaludObra(obra: Obra): 'verde' | 'ambar' | 'rojo' {
  const beneficio = getBeneficioReal(obtenerOCrearFicha(obra.id));
  if (beneficio < 0) return 'rojo';
  return getObraEstadoPago(obra) === 'pagado' ? 'verde' : 'ambar';
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
  getIngresos,
  getBeneficioReal,
  getDebe,
  getEstado,
  getPresupuestosDeLaObra,
  getSaludObra,
};
