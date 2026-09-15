import { presupuestoService } from "../PresupuestoService/PresupuestoService";
import { ingresoService } from "../IngresoService/IngresoService";
import { parteTrabajoService } from "../ParteTrabajoService/ParteTrabajoService";
import { parteProveedorService } from "../ParteProveedorService/ParteProveedorService";
import { parteEspecialistaService } from "../ParteEspecialistaService/ParteEspecialistaService";
import type { CalendarioEvento } from "../../types/CalendarioEvento/CalendarioEvento";

/**
 * Equivalente al init() de gestion.calendario.evento: en Odoo esta unión la
 * construye una VIEW SQL sobre 5 modelos; aquí se recalcula en el momento a
 * partir de los mismos 5 servicios. Solo se incluyen registros con fecha.
 */
export function getEventosCalendario(): CalendarioEvento[] {
  const eventos: CalendarioEvento[] = [];

  presupuestoService.getAll().forEach((p) => {
    if (!p.fecha) return;
    eventos.push({
      id: `presupuesto-${p.id}`,
      fecha: p.fecha,
      tipo: 'presupuesto',
      nombre: `Presupuesto ${p.nombre_cliente} · ${p.total.toFixed(2)}€`,
      rutaOrigen: `/consultar/presupuestos/editar/${p.id}`,
    });
  });

  ingresoService.getAll().forEach((i) => {
    if (!i.fecha) return;
    eventos.push({
      id: `ingreso-${i.id}`,
      fecha: i.fecha,
      tipo: 'ingreso',
      nombre: `Ingreso${i.tipo ? ` (${i.tipo})` : ''} · ${i.importe}€`,
      rutaOrigen: `/consultar/ingresos/editar/${i.id}`,
    });
  });

  parteTrabajoService.getAll().forEach((pt) => {
    if (!pt.fecha) return;
    eventos.push({
      id: `parte_trabajo-${pt.id}`,
      fecha: pt.fecha,
      tipo: 'parte_trabajo',
      nombre: `Parte de trabajo · ${pt.descripcion}`,
      rutaOrigen: `/consultar/partes-trabajo/editar/${pt.id}`,
    });
  });

  parteProveedorService.getAll().forEach((pp) => {
    if (!pp.fecha) return;
    eventos.push({
      id: `parte_proveedor-${pp.id}`,
      fecha: pp.fecha,
      tipo: 'parte_proveedor',
      nombre: `Parte de proveedor · ${pp.descripcion || pp.proveedor_id} (${pp.importe}€)`,
      rutaOrigen: `/consultar/partes-proveedor/editar/${pp.id}`,
    });
  });

  parteEspecialistaService.getAll().forEach((pe) => {
    if (!pe.fecha) return;
    eventos.push({
      id: `parte_especialista-${pe.id}`,
      fecha: pe.fecha,
      tipo: 'parte_especialista',
      nombre: `Parte de especialista · ${pe.descripcion || pe.especialista_id} (${pe.importe}€)`,
      rutaOrigen: `/consultar/partes-especialista/editar/${pe.id}`,
    });
  });

  return eventos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}
