// src/paginas/Dashboard/componentes/UltimosMovimientos.tsx
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { obtenerMovimientosRecientes } from '../../servicios/DashboardAnalisis/DashboardAnalisis';

export default function UltimosMovimientos() {
  const movimientos = obtenerMovimientosRecientes();

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">Actividad Reciente</h3>
        <p className="text-xs text-slate-400 mt-0.5">Últimos movimientos financieros registrados en el sistema.</p>
      </div>

      <div className="flex flex-col divide-y divide-slate-800/60">
        {movimientos.length === 0 ? (
          <p className="text-sm text-slate-500 py-4 text-center">No hay transacciones registradas.</p>
        ) : (
          movimientos.map((mov) => (
            <div key={mov.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${
                  mov.tipo === 'ingreso' 
                    ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400' 
                    : 'bg-rose-950/40 border-rose-900/60 text-rose-400'
                }`}>
                  {mov.tipo === 'ingreso' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{mov.concepto}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{mov.fecha}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${mov.tipo === 'ingreso' ? 'text-emerald-400' : 'text-slate-300'}`}>
                {mov.tipo === 'ingreso' ? '+' : '-'}{mov.total.toLocaleString('es-ES')} €
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}