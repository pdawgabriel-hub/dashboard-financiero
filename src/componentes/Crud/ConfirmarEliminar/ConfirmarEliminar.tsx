interface ConfirmarEliminarProps {
  abierto: boolean;
  nombre: string;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export default function ConfirmarEliminar({
  abierto,
  nombre,
  onCancelar,
  onConfirmar,
}: ConfirmarEliminarProps) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-slate-100">¿Eliminar registro?</h3>
        <p className="text-sm text-slate-400">
          Vas a eliminar <span className="text-slate-200 font-medium">{nombre}</span>.
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
