import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';

export interface CampoFormulario {
  nombre: string;       // debe coincidir con la key del schema
  etiqueta: string;
  tipo?: 'text' | 'email' | 'tel' | 'number' | 'textarea';
  requerido?: boolean;
}

interface FormularioCRUDProps<T extends Record<string, any>> {
  schema: ZodType<T>;
  campos: CampoFormulario[];
  valoresIniciales?: Partial<T>;
  onSubmit: (datos: T) => void;
  textoBoton: string;
  onEliminar?: () => void;
}

export default function FormularioCRUD<T extends Record<string, any>>({
  schema,
  campos,
  valoresIniciales,
  onSubmit,
  textoBoton,
  onEliminar,
}: FormularioCRUDProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: valoresIniciales as any,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >
      {campos.map((campo) => (
        <div key={campo.nombre} className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">
            {campo.etiqueta}
            {campo.requerido && <span className="text-red-400 ml-0.5">*</span>}
          </label>

          {campo.tipo === 'textarea' ? (
            <textarea
              {...register(campo.nombre as any)}
              rows={3}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600"
            />
          ) : (
            <input
              type={campo.tipo ?? 'text'}
              {...register(campo.nombre as any)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600"
            />
          )}

          {errors[campo.nombre] && (
            <p className="text-xs text-red-400">
              {String(errors[campo.nombre]?.message)}
            </p>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between gap-3 mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {textoBoton}
        </button>

        {onEliminar && (
          <button
            type="button"
            onClick={onEliminar}
            className="px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}
