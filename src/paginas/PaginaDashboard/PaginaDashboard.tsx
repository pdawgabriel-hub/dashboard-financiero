import { useMemo } from 'react';

import { obraService, getObraTotal } from '../../servicios/ObraService/ObraService';
import { gastoService } from '../../servicios/GastoService/GastoService';
import {
  obtenerTotalesFinancieros,
  obtenerDatosPorObra,
  obtenerTendenciaMensualGastos,
  obtenerMovimientosRecientes,
} from '../../servicios/DashboardAnalisis/DashboardAnalisis';

import type { Obra } from '../../types/Obra/Obra';

import TarjetasKPI from '../../componentes/Dashboard/TarjetasKpi/TarjetasKpi';
import GraficoBarras from '../../componentes/Dashboard/GraficoBarras/GraficoBarras';
import GraficoPastelEstados, { type DatosPastelEstado } from '../../componentes/Dashboard/GraficoPastelEstado/GraficoPastelEstado';
import GraficoLineaGastos from '../../componentes/Dashboard/GraficoLineaGastos/GraficoLineaGastos';

const SALUDES_POSIBLES: Array<'verde' | 'ambar' | 'rojo'> = ['verde', 'ambar', 'rojo'];

export default function PaginaDashboard() {
  // Los datos se leen de localStorage de forma síncrona y no cambian mientras
  // el dashboard está abierto, así que se calculan una sola vez al montar
  // (sin useState + useEffect, que provocaba un segundo render innecesario).
  const {
    obras,
    totalesFinancieros,
    datosBarras,
    datosPastel,
    datosTendencia,
    ultimosGastos,
  } = useMemo(() => {
    const todasLasObras: Obra[] = obraService.getAll() || [];

    // Distribución por Salud de la Obra (Gráfico de Pastel): equivalente a
    // salud_obra (verde/ámbar/rojo), no a un estado manual (no existe en Odoo).
    const conteoSalud: DatosPastelEstado[] = SALUDES_POSIBLES.map(salud => ({
      name: salud,
      value: todasLasObras.filter(o => gastoService.getSaludObra(o) === salud).length
    })).filter(item => item.value > 0);

    return {
      obras: todasLasObras,
      // KPIs: suma de las fichas de Gastos de todas las obras
      totalesFinancieros: obtenerTotalesFinancieros(),
      // Gastos acumulados por obra: proveedores + especialistas + mano de obra
      datosBarras: obtenerDatosPorObra(),
      datosPastel: conteoSalud,
      // Tendencia mensual de gastos
      datosTendencia: obtenerTendenciaMensualGastos(),
      // Últimos movimientos (Partes de Proveedor + Partes de Especialista)
      ultimosGastos: obtenerMovimientosRecientes().slice(0, 4),
    };
  }, []);

  const getBadgeColor = (salud: 'verde' | 'ambar' | 'rojo') => {
    switch (salud) {
      case 'verde': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'ambar': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'rojo': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-6 px-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">Dashboard de Control</h1>
        <p className="text-slate-400 text-sm mt-1">Visión consolidada y analíticas avanzadas de tu cartera de proyectos.</p>
      </div>

      {/* KPIs Principales */}
      <TarjetasKPI 
        totalIngresos={totalesFinancieros.totalIngresos}
        totalGastos={totalesFinancieros.totalGastos}
        beneficioNeto={totalesFinancieros.beneficioNeto}
        margenBeneficio={totalesFinancieros.margenBeneficio}
      />

      {/* Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-slate-800 bg-slate-900/40 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Costes Acumulados por Obra</h2>
          <GraficoBarras data={datosBarras} />
        </div>

        <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Salud de la Cartera</h2>
          <GraficoPastelEstados data={datosPastel} />
        </div>
      </div>

      {/* Flujo Temporal */}
      <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Flujo Temporal de Gastos</h2>
        <GraficoLineaGastos data={datosTendencia} />
      </div>

      {/* Listados de Detalle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimas Transacciones */}
        <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Últimas Transacciones</h2>
          <div className="flex flex-col gap-3">
            {ultimosGastos.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No hay transacciones registradas.</p>
            ) : (
              ultimosGastos.map((movimiento) => {
                return (
                  <div key={movimiento.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200">{movimiento.concepto}</span>
                      <span className="text-xs text-slate-500">{new Date(movimiento.fecha).toLocaleDateString('es-ES')}</span>
                    </div>
                    <span className="text-sm font-semibold text-rose-400">
                      -{movimiento.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Desglose de Obras */}
        <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Desglose de Obras</h2>
          <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
            {obras.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No hay obras dadas de alta.</p>
            ) : (
              obras.map((obra: Obra) => {
                // Total de la obra: suma de sus presupuestos aprobados
                const importeObra = getObraTotal(obra);
                const salud = gastoService.getSaludObra(obra);

                return (
                  <div key={obra.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200">{obra.descripcion}</span>
                      <span className="text-xs text-slate-500">{obra.direccion}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border uppercase tracking-wider ${getBadgeColor(salud)}`}>
                        {salud}
                      </span>
                      <span className="text-sm font-bold text-slate-300">
                        {importeObra.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}