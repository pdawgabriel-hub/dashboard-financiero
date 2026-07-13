import { useState, useMemo } from 'react';
import BuscadorId from '../BuscadorId/BuscadorId';
import TarjetaDato from '../TarjetaDato/TarjetaDato';

interface CampoTarjeta {
  etiqueta: string;
  valor: string;
}

interface ItemGrid {
  id: string;
  titulo: string;
  campos: CampoTarjeta[];
  textoBusqueda: string;
  estado?: string; // Guardará el valor plano del schema (ej: 'en_progreso', 'pendiente')
}

// Centralizamos todos los estados del ERP en un único diccionario dentro del componente
const DICCIONARIO_ESTADOS: Record<string, { valor: string; etiqueta: string }[]> = {
  obra: [
    { valor: "planificada", etiqueta: "Planificada" },
    { valor: "en_progreso", etiqueta: "En Progreso" },
    { valor: "pausada", etiqueta: "Pausada" },
    { valor: "finalizada", etiqueta: "Finalizada" },
  ],
  presupuesto: [
    { valor: 'borrador', etiqueta: 'Borrador' },
    { valor: 'enviado', etiqueta: 'Enviado' },
    { valor: 'aceptado', etiqueta: 'Aceptado' },
    { valor: 'rechazado', etiqueta: 'Rechazado' }
  ],
  pago: [
    { valor: 'pendiente', etiqueta: 'Pendiente' },
    { valor: 'cobrado', etiqueta: 'Cobrado' },
    { valor: 'pagado', etiqueta: 'Pagado' }
  ]
};

interface GridConsultaProps {
  items: ItemGrid[];
  rutaBaseEdicion: string;
  nombreVacio?: string;
  tipoEstado?: 'obra' | 'presupuesto' | 'pago';
}

export default function GridConsulta({ items, rutaBaseEdicion, nombreVacio, tipoEstado }: GridConsultaProps) {
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltrado, setEstadoFiltrado] = useState('');

  // Recuperamos las opciones correctas del diccionario usando las props
  const opcionesEstado = tipoEstado ? DICCIONARIO_ESTADOS[tipoEstado] : undefined;

  const itemsFiltrados = useMemo(() => {
    return items.filter((item) => {
      // 1. Filtro por el Buscador de Texto (ya pasa a minúsculas)
      const cumpleBusqueda = !busqueda.trim() || 
      item.textoBusqueda.toLowerCase().includes(busqueda.toLowerCase());
      
      //console.log("ITEM ID:", item.id, "ESTADO DEL REGISTRO:", item.estado, "FILTRO SELECCIONADO:", estadoFiltrado);

      // 2. Filtro por el Selector de Estado (¡Normalizamos ambos a minúsculas!)
      const estadoItem = item.estado?.toLowerCase() || '';
      const estadoFiltro = estadoFiltrado.toLowerCase();
      
      const cumpleEstado = !estadoFiltrado || estadoItem === estadoFiltro;

      return cumpleBusqueda && cumpleEstado;
    });
  }, [items, busqueda, estadoFiltrado]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
        <div className="w-full sm:max-w-sm">
          <BuscadorId valor={busqueda} onChange={setBusqueda} />
        </div>
        
        {opcionesEstado && (
          <select
            value={estadoFiltrado}
            onChange={(e) => setEstadoFiltrado(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer appearance-none"
          >
            <option value="">Todos los estados</option>
            {opcionesEstado.map((opt) => (
              <option key={opt.valor} value={opt.valor}>
                {opt.etiqueta}
              </option>
            ))}
          </select>
        )}
      </div>

      {itemsFiltrados.length === 0 ? (
        <p className="text-slate-500 text-sm">
          {nombreVacio ?? 'No se encontraron resultados.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itemsFiltrados.map((item) => (
            <TarjetaDato
              key={item.id}
              id={item.id}
              titulo={item.titulo}
              campos={item.campos}
              rutaEdicion={`${rutaBaseEdicion}/${item.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}