import { obraService } from '../ObraService/ObraService';
import { gastoService } from '../GastoService/GastoService';
import { presupuestoService } from '../PresupuestoService/PresupuestoService';

/**
 * Función auxiliar para convertir valores a número de forma limpia
 */
function limpiarNumero(valor: any): number {
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
  const obras = obraService.getAll() || [];
  const gastos = gastoService.getAll() || [];
  const presupuestos = presupuestoService.getAll() || []; // Obtenemos la lista de presupuestos

  let totalIngresos = 0;
  let totalGastos = 0;

  // 1. Obtener Ingresos relacionando la obra con su presupuesto mediante `presupuesto_id`
  obras.forEach((obra: any) => {
    let valorIngreso = 0;

    // Si la obra tiene id de presupuesto, buscamos ese presupuesto en el servicio
    if (obra.presupuesto_id) {
      const presupuestoEncontrado = presupuestos.find(
        (p: any) => p.id === obra.presupuesto_id
      );

      if (presupuestoEncontrado) {
        valorIngreso =
          limpiarNumero(presupuestoEncontrado.total_con_iva) ||
          limpiarNumero(presupuestoEncontrado.total) ||
          limpiarNumero(presupuestoEncontrado.importe_total) ||
          limpiarNumero(presupuestoEncontrado.base_imponible) ||
          0;
      }
    }

    // Si la obra tuviera el valor directo (por respaldo)
    if (valorIngreso === 0) {
      valorIngreso =
        limpiarNumero(obra.presupuesto) ||
        limpiarNumero(obra.importe) ||
        limpiarNumero(obra.total) ||
        0;
    }

    totalIngresos += valorIngreso;
  });

  // 2. Obtener total de gastos
  gastos.forEach((gasto: any) => {
    const valorGasto =
      limpiarNumero(gasto.total_con_iva) ||
      limpiarNumero(gasto.importe_neto) ||
      limpiarNumero(gasto.total) ||
      limpiarNumero(gasto.importe) ||
      0;

    totalGastos += valorGasto;
  });

  // 3. Cálculos de margen y utilidad
  const beneficioNeto = totalIngresos - totalGastos;
  const margenBeneficio = totalIngresos > 0
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
  const obras = obraService.getAll() || [];
  const gastos = gastoService.getAll() || [];

  return obras.map((obra: any) => {
    const gastosDeObra = gastos
      .filter((g: any) => g.obra_id === obra.id)
      .reduce((sum, g: any) => {
        const val =
          limpiarNumero(g.total_con_iva) ||
          limpiarNumero(g.importe_neto) ||
          limpiarNumero(g.total) ||
          limpiarNumero(g.importe) ||
          0;
        return sum + val;
      }, 0);

    return {
      name: obra.id || 'Sin ID', // Usamos el ID para la etiqueta de la barra
      nombreCompleto: obra.nombre || 'Sin nombre', // Guardamos el nombre completo para el tooltip
      Gastos: Math.round(gastosDeObra * 100) / 100,
    };
  });
}

export function obtenerMovimientosRecientes() {
  const gastos = gastoService.getAll() || [];

  return gastos.map((g: any) => ({
    id: g.id,
    concepto: g.concepto || 'Sin concepto',
    fecha: g.fecha || new Date().toISOString(),
    total:
      limpiarNumero(g.total_con_iva) ||
      limpiarNumero(g.importe_neto) ||
      limpiarNumero(g.total) ||
      0,
    tipo: 'gasto' as const,
  }));
}