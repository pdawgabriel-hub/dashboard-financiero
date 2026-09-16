import { Link } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';

interface BarraAccionesImprimirProps {
  rutaVolver: string;
}

// Barra de "Volver / Imprimir": se oculta al imprimir (print:hidden) para que
// el PDF/papel solo contenga el documento.
export default function BarraAccionesImprimir({ rutaVolver }: BarraAccionesImprimirProps) {
  return (
    <div className="print:hidden flex items-center justify-between max-w-3xl mx-auto px-4 sm:px-0 py-4">
      <Link to={rutaVolver} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <Printer className="w-4 h-4" />
        Imprimir / Guardar PDF
      </button>
    </div>
  );
}
