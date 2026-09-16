import type { ReactNode } from 'react';

interface DocumentoImprimibleProps {
  children: ReactNode;
}

// "Papel" en el que se dibuja el informe: fondo claro fijo (independiente del
// tema oscuro de la app, como cualquier documento pensado para imprimirse) y
// sin sombra/bordes/márgenes de pantalla cuando se imprime de verdad.
export default function DocumentoImprimible({ children }: DocumentoImprimibleProps) {
  return (
    <div className="min-h-screen bg-slate-950 print:bg-white print:min-h-0 pt-6 sm:pt-8 pb-10 print:pt-0 print:pb-0">
      <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-10 print:shadow-none print:rounded-none print:p-10 print:max-w-none">
        {children}
      </div>
    </div>
  );
}
