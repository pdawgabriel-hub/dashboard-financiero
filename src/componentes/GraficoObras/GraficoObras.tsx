import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { obtenerDatosPorObra } from '../../servicios/DashboardAnalisis/DashboardAnalisis';

export default function GraficoObras() {
  const datos = obtenerDatosPorObra();

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col gap-4 h-[400px]">
      <div>
        <h3 className="text-base font-semibold text-slate-100">Balance Financiero por Obra</h3>
        <p className="text-xs text-slate-400 mt-0.5">Comparativa en tiempo real de ingresos acumulados contra costes.</p>
      </div>

      <div className="flex-1 w-full text-xs">
        {datos.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500">
            No hay datos suficientes para generar el gráfico.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="Ingresos" fill="#10b981" radius={[4, 4, 0, 0]} name="Ingresos (€)" />
              <Bar dataKey="Gastos" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Gastos (€)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}