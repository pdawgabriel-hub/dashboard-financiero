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
  textoBusqueda: string; // string concatenado sobre el que filtramos
}

interface GridConsultaProps {
  items: ItemGrid[];
  rutaBaseEdicion: string; // ej: /consultar/clientes/editar
  nombreVacio?: string;
}

export default function GridConsulta({ items, rutaBaseEdicion, nombreVacio }: GridConsultaProps) {
  const [busqueda, setBusqueda] = useState('');

  const itemsFiltrados = useMemo(() => {
    if (!busqueda.trim()) return items;
    const q = busqueda.toLowerCase();
    return items.filter((item) => item.textoBusqueda.toLowerCase().includes(q));
  }, [items, busqueda]);

  return (
    <div className="flex flex-col gap-6">
      <BuscadorId valor={busqueda} onChange={setBusqueda} />

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
