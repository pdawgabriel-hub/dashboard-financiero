import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface DatosGraficoObra {
  name: string;
  nombreCompleto?: string;
  Gastos: number;
}

interface GraficoBarrasProps {
  data: DatosGraficoObra[];
}

export default function GraficoBarras({ data }: GraficoBarrasProps) {
  return (
    <div className="h-[350px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        {/* Aumentamos bottom a 60 para que quepan las etiquetas inclinadas de TODAS las obras */}
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          
          <XAxis 
            dataKey="name" 
            interval={0} 
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            angle={-45} 
            textAnchor="end"
            height={50} // Damos altura explícita al área del eje X
          />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
          
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
            labelStyle={{ color: '#f1f5f9', fontWeight: 'bold' }}
            formatter={(value: any) => [`${Number(value || 0).toLocaleString('es-ES')} €`, 'Gastos Totales']}
            labelFormatter={(label, items) => {
              const item = items && items[0] ? (items[0].payload as DatosGraficoObra) : null;
              return item?.nombreCompleto ? `${label} - ${item.nombreCompleto}` : label;
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar 
            name="Gastos Totales (€)" 
            dataKey="Gastos" 
            fill="#f43f5e" 
            radius={[4, 4, 0, 0]} 
            minPointSize={2} // Muestra una pequeña marca visible aunque el gasto sea 0
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}