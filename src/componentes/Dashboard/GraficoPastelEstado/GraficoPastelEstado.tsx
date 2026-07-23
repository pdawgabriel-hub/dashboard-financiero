import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export interface DatosPastelEstado {
  name: string;
  value: number;
}

interface GraficoPastelEstadosProps {
  data: DatosPastelEstado[];
}

const COLORES_ESTADOS: { [key: string]: string } = {
  'planificada': '#38bdf8',
  'en_progreso': '#10b981',
  'pausada': '#f59e0b',
  'finalizada': '#64748b',
};

// Función auxiliar para quitar guiones bajos y poner la primera letra en mayúscula
const formatearTextoEstado = (texto: string) => {
  if (!texto) return '';
  const formateado = texto.replace(/_/g, ' '); // Cambia "_" por " "
  return formateado.charAt(0).toUpperCase() + formateado.slice(1); // Capitaliza
};

export default function GraficoPastelEstados({ data }: GraficoPastelEstadosProps) {
  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORES_ESTADOS[entry.name] || '#64748b'} 
              />
            ))}
          </Pie>

          {/* Formateador del cuadro que sale al pasar el ratón */}
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
            itemStyle={{ color: '#f1f5f9' }}
            formatter={(value: any) => [`${Number(value || 0).toLocaleString()} €`, '']}
          />

          {/* Formateador de las etiquetas de la leyenda abajo */}
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            formatter={(value: string) => (
              <span className="text-xs text-slate-300">
                {formatearTextoEstado(value)}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}