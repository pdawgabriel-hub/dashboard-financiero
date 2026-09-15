import { Link } from 'react-router-dom';

export interface ItemRelacionado {
  id: string;
  etiqueta: string;
  ruta: string;
}

export interface SeccionRelacionados {
  titulo: string;
  items: ItemRelacionado[];
}

interface ListaRelacionadosProps {
  secciones: SeccionRelacionados[];
}

/**
 * Equivalente visual a los "smart buttons"/listas one2many de un formulario
 * de Odoo: agrupa por tipo los registros que apuntan a esta ficha (p.ej. los
 * Presupuestos de un Cliente) y enlaza a cada uno. No se muestra nada si
 * ninguna sección tiene elementos.
 */
export default function ListaRelacionados({ secciones }: ListaRelacionadosProps) {
  const conContenido = secciones.filter((s) => s.items.length > 0);
  if (conContenido.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      {conContenido.map((seccion) => (
        <div key={seccion.titulo} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">
            {seccion.titulo} <span className="text-slate-500 font-normal">({seccion.items.length})</span>
          </h3>
          <div className="flex flex-col gap-1.5">
            {seccion.items.map((item) => (
              <Link
                key={item.id}
                to={item.ruta}
                className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg bg-slate-950/40 hover:bg-slate-800 text-sm text-slate-300 transition-colors"
              >
                <span className="truncate">{item.etiqueta}</span>
                <span className="text-slate-600 shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
