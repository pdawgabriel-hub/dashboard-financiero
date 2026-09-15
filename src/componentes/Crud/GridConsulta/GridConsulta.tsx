import { useState, useMemo } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import BuscadorId from '../BuscadorId/BuscadorId';
import TarjetaDato from '../TarjetaDato/TarjetaDato';
import TablaDatos from '../TablaDatos/TablaDatos';

interface CampoTarjeta {
  etiqueta: string;
  valor: string;
}

interface ItemGrid {
  id: string;
  titulo: string;
  campos: CampoTarjeta[];
  textoBusqueda: string;
  estado?: string; // Guardará el valor plano del schema (ej: 'verde', 'pendiente')
  rutaEdicion?: string; // Ruta completa opcional: sustituye a `${rutaBaseEdicion}/${id}`
  // (necesario en listados con orígenes mixtos, como el Calendario de Eventos)
}

// Centralizamos todos los estados del ERP en un único diccionario dentro del componente
const DICCIONARIO_ESTADOS: Record<string, { valor: string; etiqueta: string }[]> = {
  obra: [
    { valor: "verde", etiqueta: "Verde (pagada)" },
    { valor: "ambar", etiqueta: "Ámbar (en curso)" },
    { valor: "rojo", etiqueta: "Rojo (pérdidas)" },
  ],
  presupuesto: [
    { valor: 'no_aprobado', etiqueta: 'No aprobado' },
    { valor: 'aprobado', etiqueta: 'Aprobado' },
  ],
  pago: [
    { valor: 'pendiente', etiqueta: 'Pendiente' },
    { valor: 'cobrado', etiqueta: 'Cobrado' },
    { valor: 'pagado', etiqueta: 'Pagado' }
  ],
  gasto: [
    { valor: 'proceso', etiqueta: 'En proceso' },
    { valor: 'finalizado', etiqueta: 'Finalizado' },
  ],
  evento: [
    { valor: 'presupuesto', etiqueta: 'Presupuesto' },
    { valor: 'ingreso', etiqueta: 'Ingreso' },
    { valor: 'parte_trabajo', etiqueta: 'Parte de trabajo' },
    { valor: 'parte_proveedor', etiqueta: 'Parte de proveedor' },
    { valor: 'parte_especialista', etiqueta: 'Parte de especialista' },
  ]
};

interface GridConsultaProps {
  items: ItemGrid[];
  rutaBaseEdicion?: string;
  nombreVacio?: string;
  tipoEstado?: 'obra' | 'presupuesto' | 'pago' | 'gasto' | 'evento';
}

export default function GridConsulta({ items, rutaBaseEdicion, nombreVacio, tipoEstado }: GridConsultaProps) {
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltrado, setEstadoFiltrado] = useState('');
  const [modoVista, setModoVista] = useState<'tarjetas' | 'lista'>('tarjetas');

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

  // Resolvemos la ruta de edición una sola vez, la usan tanto la vista en
  // tarjetas (Kanban) como la vista en lista.
  const itemsConRuta = useMemo(
    () => itemsFiltrados.map((item) => ({
      ...item,
      rutaEdicion: item.rutaEdicion ?? `${rutaBaseEdicion}/${item.id}`,
    })),
    [itemsFiltrados, rutaBaseEdicion]
  );

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

        {/* Selector de vista: tarjetas (Kanban) / lista, como en Odoo */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 sm:ml-auto">
          <button
            type="button"
            onClick={() => setModoVista('tarjetas')}
            aria-label="Vista en tarjetas"
            title="Vista en tarjetas"
            className={`p-1.5 rounded-md transition-colors ${modoVista === 'tarjetas' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setModoVista('lista')}
            aria-label="Vista en lista"
            title="Vista en lista"
            className={`p-1.5 rounded-md transition-colors ${modoVista === 'lista' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {itemsConRuta.length === 0 ? (
        <p className="text-slate-500 text-sm">
          {nombreVacio ?? 'No se encontraron resultados.'}
        </p>
      ) : modoVista === 'lista' ? (
        <TablaDatos items={itemsConRuta} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itemsConRuta.map((item) => (
            <TarjetaDato
              key={item.id}
              id={item.id}
              titulo={item.titulo}
              campos={item.campos}
              rutaEdicion={item.rutaEdicion}
            />
          ))}
        </div>
      )}
    </div>
  );
}