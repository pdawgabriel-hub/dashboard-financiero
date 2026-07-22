import { ArrowUpRight, ArrowDownRight, DollarSign, Percent } from 'lucide-react';

interface TarjetasKpiProps {
  totalIngresos: number;
  totalGastos: number;
  beneficioNeto: number;
  margenBeneficio: number;
}

export default function TarjetasKpi({ 
  totalIngresos, 
  totalGastos, 
  beneficioNeto, 
  margenBeneficio 
}: TarjetasKpiProps) {
  const esPositivo = beneficioNeto >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Ingresos */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Ingresos</p>
          <h3 className="text-2xl font-bold text-slate-100 mt-1">{totalIngresos.toLocaleString('es-ES')} €</h3>
        </div>
        <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded-lg text-emerald-400">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>

      {/* Total Gastos */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Gastos</p>
          <h3 className="text-2xl font-bold text-slate-100 mt-1">{totalGastos.toLocaleString('es-ES')} €</h3>
        </div>
        <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-400">
          <ArrowDownRight className="w-6 h-6" />
        </div>
      </div>

      {/* Resultado Neto */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Resultado Neto</p>
          <h3 className={`text-2xl font-bold mt-1 ${esPositivo ? 'text-emerald-400' : 'text-rose-400'}`}>
            {beneficioNeto.toLocaleString('es-ES')} €
          </h3>
        </div>
        <div className={`p-3 border rounded-lg ${esPositivo ? 'bg-emerald-950/30 border-emerald-900 text-emerald-400' : 'bg-rose-950/30 border-rose-900 text-rose-400'}`}>
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      {/* Margen de Utilidad */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Margen de Utilidad</p>
          <h3 className="text-2xl font-bold text-slate-100 mt-1">{margenBeneficio}%</h3>
        </div>
        <div className="p-3 bg-blue-950/50 border border-blue-800 rounded-lg text-blue-400">
          <Percent className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}