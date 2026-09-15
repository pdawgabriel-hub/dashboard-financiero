import { obraService } from '../ObraService/ObraService';
import { gastoService } from '../GastoService/GastoService';
import { presupuestoService } from '../PresupuestoService/PresupuestoService';

import type { Obra } from '../../types/Obra/Obra';
import type { Gasto } from '../../types/Gasto/Gasto';
import type { Presupuesto } from '../../types/Presupuesto/Presupuesto';

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

export function obtenerTotalesFinancieros() {
  const obras: Obra[] = obraService.getAll() || [];
  const gastos: Gasto[] = gastoService.getAll() || [];
  const presupuestos: Presupuesto[] = presupuestoService.getAll() || [];

  let totalIngresos = 0;
  let totalGastos = 0;

  // 1. Obtener Ingresos sumando los presupuestos aceptados vinculados a cada obra
  //    (la relación ahora va Presupuesto.obra_id -> Obra, no al revés)
  obras.forEach((obra) => {
    const valorIngreso = presupuestos
      .filter((p) => p.obra_id === obra.id && p.estado === 'aceptado')
      .reduce((suma, p) => suma + limpiarNumero(p.importe_total), 0);

    totalIngresos += valorIngreso;
  });

  // 2. Obtener total de gastos
  gastos.forEach((gasto) => {
    const valorGasto =
      limpiarNumero((gasto as any).total_con_iva) ||
      limpiarNumero((gasto as any).importe_neto) ||
      limpiarNumero((gasto as any).total) ||
      limpiarNumero((gasto as any).importe) ||
      0;

    totalGastos += valorGasto;
  });

  // 3. Cálculos de margen y utilidad
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
  const gastos: Gasto[] = gastoService.getAll() || [];

  return obras.map((obra) => {
    const gastosDeObra = gastos
      .filter((g) => g.obra_id === obra.id)
      .reduce((sum, g) => {
        const val =
          limpiarNumero((g as any).total_con_iva) ||
          limpiarNumero((g as any).importe_neto) ||
          limpiarNumero((g as any).total) ||
          limpiarNumero((g as any).importe) ||
          0;
        return sum + val;
      }, 0);

    return {
      name: obra.id || 'Sin ID',
      nombreCompleto: obra.descripcion || 'Sin nombre',
      Gastos: Math.round(gastosDeObra * 100) / 100,
    };
  });
}

export interface MovimientoReciente {
  id: string;
  concepto: string;
  fecha: string;
  total: number;
  tipo: 'gasto' | 'ingreso';
}

export function obtenerMovimientosRecientes(): MovimientoReciente[] {
  const gastos: Gasto[] = gastoService.getAll() || [];

  return gastos.map((g) => ({
    id: g.id,
    concepto: (g as any).concepto || 'Sin concepto',
    fecha: (g as any).fecha || new Date().toISOString(),
    total:
      limpiarNumero((g as any).total_con_iva) ||
      limpiarNumero((g as any).importe_neto) ||
      limpiarNumero((g as any).total) ||
      0,
    tipo: 'gasto' as const,
  }));
}