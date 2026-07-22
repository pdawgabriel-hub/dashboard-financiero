import { useState, useEffect } from 'react';

import { obraService } from '../../servicios/ObraService/ObraService';
import { gastoService } from '../../servicios/GastoService/GastoService';
import { presupuestoService } from '../../servicios/PresupuestoService/PresupuestoService';
import { obtenerTotalesFinancieros } from '../../servicios/DashboardAnalisis/DashboardAnalisis';

import type { Obra } from '../../types/Obra/Obra';
import type { Gasto } from '../../types/Gasto/Gasto';

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
  const [ultimosGastos, setUltimosGastos] = useState<Gasto[]>([]);

  useEffect(() => {
    // 1. Cargar colecciones de datos
    const todasLasObras: Obra[] = obraService.getAll() || [];
    const todosLosGastos: Gasto[] = gastoService.getAll() || [];
    const todosLosPresupuestos = presupuestoService.getAll() || [];
    
    setObras(todasLasObras);
    setPresupuestos(todosLosPresupuestos);

    // 2. Totales financieros e indicadores KPI
    const totales = obtenerTotalesFinancieros();
    setTotalesFinancieros(totales);

    // 3. Gastos acumulados por Obra (Gráfico de Barras con ID corto)
    const balanceObras: DatosGraficoObra[] = todasLasObras.map((obra: any) => {
      const gastosObra = todosLosGastos
        .filter((g: any) => g.obra_id === obra.id)
        .reduce((sum, g: any) => sum + (limpiarNumero(g.total_con_iva) || limpiarNumero(g.importe_neto) || 0), 0);

      return {
        name: obra.id || 'Sin ID',
        nombreCompleto: obra.nombre || 'Sin Nombre',
        Gastos: Math.round(gastosObra * 100) / 100
      };
    });
    setDatosBarras(balanceObras);

    // 4. Distribución por Estado (Gráfico de Pastel)
    const estadosPosibles: Obra['estado'][] = ['planificada', 'en_progreso', 'pausada', 'finalizada'];
    const conteoEstados: DatosPastelEstado[] = estadosPosibles.map(estado => ({
      name: estado,
      value: todasLasObras.filter(o => o.estado === estado).length
    })).filter(item => item.value > 0);
    setDatosPastel(conteoEstados);

    // 5. Tendencia Temporal Mensual de Gastos
    const mesesNombre = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const agrupadoPorMes: { [key: number]: number } = {};
    for (let i = 0; i < 12; i++) agrupadoPorMes[i] = 0;

    todosLosGastos.forEach((g: any) => {
      const fechaGasto = new Date(g.fecha);
      if (!isNaN(fechaGasto.getTime())) {
        agrupadoPorMes[fechaGasto.getMonth()] += limpiarNumero(g.total_con_iva) || limpiarNumero(g.importe_neto) || 0;
      }
    });

    const datosLinea: DatosTendencia[] = mesesNombre.map((mes, index) => ({
      mes,
      Gastos: Math.round(agrupadoPorMes[index] * 100) / 100
    }));
    setDatosTendencia(datosLinea);

    // 6. Últimos movimientos
    const ultimos = [...todosLosGastos]
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 4);
    setUltimosGastos(ultimos);

  }, []);

  const getBadgeColor = (estado: Obra['estado']) => {
    switch (estado) {
      case 'en_progreso': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'planificada': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'pausada': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'finalizada': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const formatearTextoEstado = (texto: string) => {
    if (!texto) return '';
    const formateado = texto.replace(/_/g, ' ');
    return formateado.charAt(0).toUpperCase() + formateado.slice(1);
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
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Estado de la Cartera</h2>
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
              ultimosGastos.map((gasto: any) => {
                const totalMonto = limpiarNumero(gasto.total_con_iva) || limpiarNumero(gasto.importe_neto) || 0;
                return (
                  <div key={gasto.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200">{gasto.concepto}</span>
                      <span className="text-xs text-slate-500">{new Date(gasto.fecha).toLocaleDateString('es-ES')}</span>
                    </div>
                    <span className="text-sm font-semibold text-rose-400">
                      -{totalMonto.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
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
              obras.map((obra: any) => {
                // Buscamos el presupuesto de la obra por presupuesto_id
                const presupuestoAsociado = presupuestos.find((p: any) => p.id === obra.presupuesto_id);

                // Cálculo del importe real de la obra
                const importeObra = 
                  limpiarNumero(presupuestoAsociado?.total_con_iva) || 
                  limpiarNumero(presupuestoAsociado?.total) || 
                  limpiarNumero(presupuestoAsociado?.importe_total) || 
                  limpiarNumero(obra.presupuesto) || 
                  limpiarNumero(obra.importe) || 
                  0;

                return (
                  <div key={obra.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200">{obra.nombre}</span>
                      <span className="text-xs text-slate-500">{obra.direccion}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border uppercase tracking-wider ${getBadgeColor(obra.estado)}`}>
                        {formatearTextoEstado(obra.estado || '')}
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