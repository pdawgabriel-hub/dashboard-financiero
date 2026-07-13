import { gastoService } from '../../servicios/GastoService/GastoService';
import { ingresoService } from '../../servicios/IngresoService/IngresoService';

export interface TotalesKpi {
  totalIngresos: number;
  totalGastos: number;
  beneficioNeto: number;
  margenBeneficio: number;
}

export interface DatosGraficoObra {
  name: string; // Nombre de la obra
  Ingresos: number;
  Gastos: number;
}

export interface MovimientoReciente {
  id: string;
  tipo: 'ingreso' | 'gasto';
  concepto: string;
  fecha: string;
  total: number;
}

/**
 * Calcula los totales generales para las tarjetas KPI
 */
export function obtenerTotalesFinancieros(): TotalesKpi {
  const ingresos = ingresoService.getAll();
  const gastos = gastoService.getAll();

  // Sumamos los 'total_con_iva' asegurando que sean números
  const totalIngresos = ingresos.reduce((acc, ing) => acc + (Number(ing.total_con_iva) || 0), 0);
  const totalGastos = gastos.reduce((acc, gas) => acc + (Number(gas.total_con_iva) || 0), 0);
  
  const beneficioNeto = totalIngresos - totalGastos;
  
  // Margen de beneficio porcentual (Evitamos división por cero)
  const margenBeneficio = totalIngresos > 0 
    ? Math.round((beneficioNeto / totalIngresos) * 100) 
    : 0;

  return {
    totalIngresos: Math.round(totalIngresos * 100) / 100,
    totalGastos: Math.round(totalGastos * 100) / 100,
    beneficioNeto: Math.round(beneficioNeto * 100) / 100,
    margenBeneficio
  };
}

/**
 * Agrupa los datos por 'obra_id' para el gráfico comparativo
 */
export function obtenerDatosPorObra(): DatosGraficoObra[] {
  const ingresos = ingresoService.getAll();
  const gastos = gastoService.getAll();
  
  // Usamos un mapa temporal para consolidar los datos de cada obra
  const mapaObras: Record<string, { Ingresos: number; Gastos: number }> = {};

  // Acumular ingresos
  ingresos.forEach((ing) => {
    const obra = ing.obra_id || 'Sin Obra';
    if (!mapaObras[obra]) mapaObras[obra] = { Ingresos: 0, Gastos: 0 };
    mapaObras[obra].Ingresos += Number(ing.total_con_iva) || 0;
  });

  // Acumular gastos
  gastos.forEach((gas) => {
    const obra = gas.obra_id || 'Sin Obra';
    if (!mapaObras[obra]) mapaObras[obra] = { Ingresos: 0, Gastos: 0 };
    mapaObras[obra].Gastos += Number(gas.total_con_iva) || 0;
  });

  // Transformar el mapa al formato que requiere Recharts
  return Object.keys(mapaObras).map((idObra) => ({
    name: idObra, 
    Ingresos: Math.round(mapaObras[idObra].Ingresos * 100) / 100,
    Gastos: Math.round(mapaObras[idObra].Gastos * 100) / 100,
  }));
}

/**
 * Obtiene las 5 transacciones más recientes unificando gastos e ingresos
 */
export function obtenerMovimientosRecientes(): MovimientoReciente[] {
  const ingresos = ingresoService.getAll();
  const gastos = gastoService.getAll();

  const listaIngresos: MovimientoReciente[] = ingresos.map(ing => ({
    id: ing.id || Math.random().toString(),
    tipo: 'ingreso',
    concepto: ing.numero_factura ? `Factura ${ing.numero_factura}` : 'Ingreso General',
    fecha: ing.fecha_emision || '',
    total: Number(ing.total_con_iva) || 0
  }));

  // Corregidas las propiedades para usar las reales del objeto Gasto (concepto y fecha)
  const listaGastos: MovimientoReciente[] = gastos.map(gas => ({
    id: gas.id || Math.random().toString(),
    tipo: 'gasto',
    concepto: gas.concepto ? `Gasto: ${gas.concepto}` : 'Gasto General',
    fecha: gas.fecha || '',
    total: Number(gas.total_con_iva) || 0
  }));

  // Combinamos ambas listas y ordenamos por fecha de más reciente a más antigua
  return [...listaIngresos, ...listaGastos]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5); 
}