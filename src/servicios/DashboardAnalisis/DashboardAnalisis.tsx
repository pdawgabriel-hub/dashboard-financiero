import { obraService } from '../ObraService/ObraService';
import { parteProveedorService } from '../ParteProveedorService/ParteProveedorService';
import { presupuestoService } from '../PresupuestoService/PresupuestoService';

import type { Obra } from '../../types/Obra/Obra';
import type { ParteProveedor } from '../../types/ParteProveedor/ParteProveedor';
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
  const partesProveedor: ParteProveedor[] = parteProveedorService.getAll() || [];
  const presupuestos: Presupuesto[] = presupuestoService.getAll() || [];

  let totalIngresos = 0;

  // 1. Obtener Ingresos sumando los presupuestos aceptados vinculados a cada obra
  //    (la relación ahora va Presupuesto.obra_id -> Obra, no al revés)
  obras.forEach((obra) => {
    const valorIngreso = presupuestos
      .filter((p) => p.obra_id === obra.id && p.estado === 'aprobado')
      .reduce((suma, p) => suma + limpiarNumero(p.total), 0);

    totalIngresos += valorIngreso;
  });

  // 2. Total de gastos. De momento solo refleja los Partes de Proveedor: cuando
  //    exista Partes de Especialista y el coste de mano de obra se sume aquí,
  //    esta cifra se ampliará (ver ficha de Gastos, informe §3.7).
  const totalGastos = partesProveedor.reduce((suma, parte) => suma + limpiarNumero(parte.importe), 0);

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
  const partesProveedor: ParteProveedor[] = parteProveedorService.getAll() || [];

  return obras.map((obra) => {
    const gastosDeObra = partesProveedor
      .filter((p) => p.obra_id === obra.id)
      .reduce((suma, p) => suma + limpiarNumero(p.importe), 0);

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
  const partesProveedor: ParteProveedor[] = parteProveedorService.getAll() || [];

  return partesProveedor.map((p) => ({
    id: p.id,
    concepto: p.descripcion || 'Sin concepto',
    fecha: p.fecha || new Date().toISOString(),
    total: limpiarNumero(p.importe),
    tipo: 'gasto' as const,
  }));
}