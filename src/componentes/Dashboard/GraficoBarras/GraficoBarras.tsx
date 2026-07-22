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
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          
          {/* interval={0} fuerza a Recharts a mostrar los IDs de TODAS las obras */}
          <XAxis 
            dataKey="name" 
            interval={0} 
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            angle={-30} 
            textAnchor="end"
          />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
          
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
            labelStyle={{ color: '#f1f5f9', fontWeight: 'bold' }}
            labelFormatter={(label, items) => {
              // Muestra el ID y entre paréntesis el nombre real de la obra
              const item = items[0]?.payload as DatosGraficoObra;
              return item?.nombreCompleto ? `${label} - ${item.nombreCompleto}` : label;
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar name="Gastos Totales (€)" dataKey="Gastos" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}