import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-mono">{id}</p>
          <h3 className="text-lg font-semibold text-slate-100">{titulo}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        {campos.map((campo) => (
          <div key={campo.etiqueta} className="flex justify-between gap-4">
            <span className="text-slate-500">{campo.etiqueta}</span>
            <span className="text-slate-300 text-right">{campo.valor || '—'}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(rutaEdicion)}
        className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 rounded-lg text-sm font-medium transition-colors self-start"
      >
        Editar
      </button>
    </div>
  );
}
