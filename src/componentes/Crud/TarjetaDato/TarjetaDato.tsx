import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CampoTarjeta {
  etiqueta: string;
  valor: string;
}

interface TarjetaDatoProps {
  id: string;
  titulo: string;
  campos: CampoTarjeta[];
  rutaEdicion: string;
}

export default function TarjetaDato({ id, titulo, campos, rutaEdicion }: TarjetaDatoProps) {
  return (
    <Link
      to={rutaEdicion}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-emerald-600/60 hover:bg-slate-900/70 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-slate-500 font-mono">{id}</p>
          <h3 className="text-lg font-semibold text-slate-100 truncate">{titulo}</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        {campos.map((campo) => (
          <div key={campo.etiqueta} className="flex justify-between gap-4">
            <span className="text-slate-500">{campo.etiqueta}</span>
            <span className="text-slate-300 text-right">{campo.valor || '—'}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
