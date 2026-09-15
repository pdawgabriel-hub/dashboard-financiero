import { Link } from 'react-router-dom';

interface CampoTarjeta {
  etiqueta: string;
  valor: string;
}

interface ItemTabla {
  id: string;
  titulo: string;
  campos: CampoTarjeta[];
  rutaEdicion: string;
}

interface TablaDatosProps {
  items: ItemTabla[];
}

// Vista "Lista", equivalente a la vista de lista de Odoo (columnas), como
// alternativa a la vista en tarjetas (equivalente a la vista Kanban).
export default function TablaDatos({ items }: TablaDatosProps) {
  const columnas = items[0]?.campos.map((c) => c.etiqueta) ?? [];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
            <th className="text-left px-4 py-3 font-medium whitespace-nowrap">Título</th>
            {columnas.map((etiqueta) => (
              <th key={etiqueta} className="text-left px-4 py-3 font-medium whitespace-nowrap">{etiqueta}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-slate-800 hover:bg-slate-900/70 transition-colors">
              <td className="px-4 py-3">
                <Link to={item.rutaEdicion} className="block">
                  <p className="text-xs text-slate-500 font-mono">{item.id}</p>
                  <p className="font-medium text-slate-100 whitespace-nowrap">{item.titulo}</p>
                </Link>
              </td>
              {item.campos.map((campo) => (
                <td key={campo.etiqueta} className="px-4 py-3 text-slate-300 whitespace-nowrap">
                  <Link to={item.rutaEdicion} className="block">
                    {campo.valor || '—'}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
