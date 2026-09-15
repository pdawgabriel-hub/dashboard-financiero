import { useState, useEffect } from 'react';

import { obraService } from '../../servicios/ObraService/ObraService';
import { gastoService } from '../../servicios/GastoService/GastoService';
import { presupuestoService } from '../../servicios/PresupuestoService/PresupuestoService';
import {
  obtenerTotalesFinancieros,
  obtenerDatosPorObra,
  obtenerTendenciaMensualGastos,
  obtenerMovimientosRecientes,
  type MovimientoReciente,
} from '../../servicios/DashboardAnalisis/DashboardAnalisis';

import type { Obra } from '../../types/Obra/Obra';

import TarjetasKPI from '../../componentes/Dashboard/TarjetasKpi/TarjetasKpi';
import GraficoBarras, { type DatosGraficoObra } from '../../componentes/Dashboard/GraficoBarras/GraficoBarras';
import GraficoPastelEstados, { type DatosPastelEstado } from '../../componentes/Dashboard/GraficoPastelEstado/GraficoPastelEstado';
import GraficoLineaGastos, { type DatosTendencia } from '../../componentes/Dashboard/GraficoLineaGastos/GraficoLineaGastos';

/**
 * Función auxiliar para limpiar y formatear números en JS
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

export default function PaginaDashboard() {
  const [datosBarras, setDatosBarras] = useState<DatosGraficoObra[]>([]);
  const [datosPastel, setDatosPastel] = useState<DatosPastelEstado[]>([]);
  const [datosTendencia, setDatosTendencia] = useState<DatosTendencia[]>([]);
  
  const [totalesFinancieros, setTotalesFinancieros] = useState({
    totalIngresos: 0,
    totalGastos: 0,
    beneficioNeto: 0,
    margenBeneficio: 0,
  });

  const [obras, setObras] = useState<Obra[]>([]);
  const [presupuestos, setPresupuestos] = useState<any[]>([]);
  const [ultimosGastos, setUltimosGastos] = useState<MovimientoReciente[]>([]);

  useEffect(() => {
    // 1. Cargar colecciones de datos
    const todasLasObras: Obra[] = obraService.getAll() || [];
    const todosLosPresupuestos = presupuestoService.getAll() || [];

    setObras(todasLasObras);
    setPresupuestos(todosLosPresupuestos);

    // 2. Totales financieros e indicadores KPI
    const totales = obtenerTotalesFinancieros();
    setTotalesFinancieros(totales);

    // 3. Gastos acumulados por Obra (Gráfico de Barras con ID corto):
    //    Partes de Proveedor + Partes de Especialista de cada obra.
    setDatosBarras(obtenerDatosPorObra());

    // 4. Distribución por Salud de la Obra (Gráfico de Pastel): equivalente a
    //    salud_obra (verde/ámbar/rojo), no a un estado manual (no existe en Odoo).
    const saludesPosibles: Array<'verde' | 'ambar' | 'rojo'> = ['verde', 'ambar', 'rojo'];
    const conteoSalud: DatosPastelEstado[] = saludesPosibles.map(salud => ({
      name: salud,
      value: todasLasObras.filter(o => gastoService.getSaludObra(o) === salud).length
    })).filter(item => item.value > 0);
    setDatosPastel(conteoSalud);

    // 5. Tendencia Temporal Mensual de Gastos
    setDatosTendencia(obtenerTendenciaMensualGastos());

    // 6. Últimos movimientos (Partes de Proveedor + Partes de Especialista)
    setUltimosGastos(obtenerMovimientosRecientes().slice(0, 4));

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
                // Presupuestos aprobados vinculados a esta obra (Presupuesto.obra_id -> Obra)
                const importeObra = presupuestos
                  .filter((p: any) => p.obra_id === obra.id && p.estado === 'aprobado')
                  .reduce((suma: number, p: any) => suma + limpiarNumero(p.total), 0);
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