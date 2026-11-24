import { obraService, getObraCosteMoo } from '../ObraService/ObraService';
import { getTotalIngresosDeObra } from '../IngresoService/IngresoService';
import { parteProveedorService } from '../ParteProveedorService/ParteProveedorService';
import { parteEspecialistaService } from '../ParteEspecialistaService/ParteEspecialistaService';
import { parteTrabajoService } from '../ParteTrabajoService/ParteTrabajoService';

import type { Obra } from '../../types/Obra/Obra';
import type { ParteProveedor } from '../../types/ParteProveedor/ParteProveedor';
import type { ParteEspecialista } from '../../types/ParteEspecialista/ParteEspecialista';
import type { ParteTrabajo } from '../../types/ParteTrabajo/ParteTrabajo';

/**
 * Función auxiliar para convertir valores a número de forma limpia
 */
function limpiarNumero(valor: unknown): number {
  if (valor === null || valor === undefined) return 0;
  if (typeof valor === 'number') return isNaN(valor) ? 0 : valor;

  if (typeof valor === 'string') {
    const textoLimpio = valor
      .replace(/[^\d,-.]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');

    const num = parseFloat(textoLimpio);
    return isNaN(num) ? 0 : num;
  }

  return 0;
}

/**
 * KPIs globales del dashboard. Son la suma, obra a obra, de lo que muestra la
 * ficha de Gastos de cada una (informe §3.7 y §11.2), para que el dashboard y
 * las fichas nunca den cifras distintas:
 *   ingresos  = cobros reales registrados (Ingresos), NO presupuestos aprobados
 *   gastos    = partes de proveedor + partes de especialista + mano de obra
 *   beneficio = ingresos - gastos (caja real, nunca presupuesto - gastos)
 */
export function obtenerTotalesFinancieros() {
  const obras: Obra[] = obraService.getAll() || [];
  const partesProveedor: ParteProveedor[] = parteProveedorService.getAll() || [];
  const partesEspecialista: ParteEspecialista[] = parteEspecialistaService.getAll() || [];

  let totalIngresos = 0;
  let totalGastos = 0;

  obras.forEach((obra) => {
    // 1. Ingresos: lo que el cliente ha pagado de verdad (equivale a gastos.ingresos)
    totalIngresos += getTotalIngresosDeObra(obra.id);

    // 2. Gastos: proveedores + especialistas + mano de obra (equivale a gastos.gastos)
    const costeProveedores = partesProveedor
      .filter((p) => p.obra_id === obra.id)
      .reduce((suma, p) => suma + limpiarNumero(p.importe), 0);
    const costeEspecialistas = partesEspecialista
      .filter((p) => p.obra_id === obra.id)
      .reduce((suma, p) => suma + limpiarNumero(p.importe), 0);
    totalGastos += costeProveedores + costeEspecialistas + getObraCosteMoo(obra);
  });

  // 3. Beneficio de caja y margen sobre lo cobrado
  const beneficioNeto = totalIngresos - totalGastos;
  const margenBeneficio =
    totalIngresos > 0
      ? Math.round((beneficioNeto / totalIngresos) * 100)
      : 0;

  return {
    totalIngresos: Math.round(totalIngresos * 100) / 100,
    totalGastos: Math.round(totalGastos * 100) / 100,
    beneficioNeto: Math.round(beneficioNeto * 100) / 100,
    margenBeneficio,
  };
}

export function obtenerDatosPorObra() {
  const obras: Obra[] = obraService.getAll() || [];
  const partesProveedor: ParteProveedor[] = parteProveedorService.getAll() || [];
  const partesEspecialista: ParteEspecialista[] = parteEspecialistaService.getAll() || [];

  return obras.map((obra) => {
    const gastosProveedor = partesProveedor
      .filter((p) => p.obra_id === obra.id)
      .reduce((suma, p) => suma + limpiarNumero(p.importe), 0);
    const gastosEspecialista = partesEspecialista
      .filter((p) => p.obra_id === obra.id)
      .reduce((suma, p) => suma + limpiarNumero(p.importe), 0);

    // Mismos gastos que la ficha de Gastos: proveedores + especialistas + mano de obra
    const costeMoo = getObraCosteMoo(obra);

    return {
      name: obra.id || 'Sin ID',
      nombreCompleto: obra.descripcion || 'Sin nombre',
      Gastos: Math.round((gastosProveedor + gastosEspecialista + costeMoo) * 100) / 100,
    };
  });
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export interface DatosTendenciaMensual {
  mes: string;
  Gastos: number;
}

export function obtenerTendenciaMensualGastos(): DatosTendenciaMensual[] {
  const partesProveedor: ParteProveedor[] = parteProveedorService.getAll() || [];
  const partesEspecialista: ParteEspecialista[] = parteEspecialistaService.getAll() || [];
  const partesTrabajo: ParteTrabajo[] = parteTrabajoService.getAll() || [];

  const agrupadoPorMes: { [key: number]: number } = {};
  for (let i = 0; i < 12; i++) agrupadoPorMes[i] = 0;

  const sumarAlMes = (fecha: string, importe: unknown) => {
    const fechaGasto = new Date(fecha);
    if (!isNaN(fechaGasto.getTime())) {
      agrupadoPorMes[fechaGasto.getMonth()] += limpiarNumero(importe);
    }
  };

  // Proveedores y especialistas, por la fecha de cada parte
  [...partesProveedor, ...partesEspecialista].forEach((p) => sumarAlMes(p.fecha, p.importe));
  // Mano de obra, por la fecha de cada parte de trabajo (coste ya congelado en sus líneas)
  partesTrabajo.forEach((p) => sumarAlMes(p.fecha, p.coste_total_parte));

  return MESES.map((mes, index) => ({
    mes,
    Gastos: Math.round(agrupadoPorMes[index] * 100) / 100,
  }));
}

export interface MovimientoReciente {
  id: string;
  concepto: string;
  fecha: string;
  total: number;
  tipo: 'gasto' | 'ingreso';
}

export function obtenerMovimientosRecientes(): MovimientoReciente[] {
  const partesProveedor: ParteProveedor[] = parteProveedorService.getAll() || [];
  const partesEspecialista: ParteEspecialista[] = parteEspecialistaService.getAll() || [];

  const movimientos: MovimientoReciente[] = [
    ...partesProveedor.map((p) => ({
      id: p.id,
      concepto: p.descripcion || 'Sin concepto',
      fecha: p.fecha || new Date().toISOString(),
      total: limpiarNumero(p.importe),
      tipo: 'gasto' as const,
    })),
    ...partesEspecialista.map((p) => ({
      id: p.id,
      concepto: p.descripcion || 'Sin concepto',
      fecha: p.fecha || new Date().toISOString(),
      total: limpiarNumero(p.importe),
      tipo: 'gasto' as const,
    })),
  ];

  return movimientos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}