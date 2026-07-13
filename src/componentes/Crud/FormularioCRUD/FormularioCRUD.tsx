import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import { useEffect } from 'react';
import { calcularTotalConIva } from '../../../servicios/GastoService/GastoService';

export interface CampoFormulario {
  nombre: string;       
  etiqueta: string;
  tipo?: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
  requerido?: boolean;
  opciones?: { valor: string; etiqueta: string }[];
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
  // Forzamos a <any> internamente para que useForm no pelee con el genérico T
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: valoresIniciales as any,
  });

  const importeNeto = watch('importe_neto');
  const ivaPorcentaje = watch('iva_porcentaje');

  useEffect(() => {
    const tieneCampoTotal = campos.some(c => c.nombre === 'total_con_iva');
    
    if (tieneCampoTotal) {
      const totalCalculado = calcularTotalConIva({
        importe_neto: Number(importeNeto) || 0,
        iva_porcentaje: Number(ivaPorcentaje) || 0
      });
      setValue('total_con_iva', totalCalculado);
    }
  }, [importeNeto, ivaPorcentaje, campos, setValue]);

  return (
    <form
      onSubmit={handleSubmit((datos) => onSubmit(datos as T))} // Casteo seguro al enviar
      className="flex flex-col gap-5 max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full"
    >
      {campos.map((campo) => {
        const esTotal = campo.nombre === 'total_con_iva';

        return (
          <div key={campo.nombre} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">
              {campo.etiqueta}
              {campo.requerido && <span className="text-red-400 ml-0.5">*</span>}
            </label>

            {campo.tipo === 'textarea' ? (
              <textarea
                {...register(campo.nombre)}
                rows={3}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600 w-full resize-none"
              />
            ) : campo.tipo === 'select' ? (
              <select
                {...register(campo.nombre)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600 w-full cursor-pointer appearance-none"
              >
                <option value="" className="text-slate-500">Selecciona una opción...</option>
                {campo.opciones?.map((opt) => (
                  <option key={opt.valor} value={opt.valor} className="bg-slate-950 text-slate-200">
                    {opt.etiqueta}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={campo.tipo ?? 'text'}
                {...register(campo.nombre)}
                readOnly={esTotal}
                className={`px-3 py-2 border rounded-lg text-sm focus:outline-none w-full
                  ${esTotal 
                    ? 'bg-slate-900 border-slate-700 text-slate-400 cursor-not-allowed font-semibold text-emerald-400' 
                    : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-emerald-600'
                  }`}
              />
            )}

            {errors[campo.nombre] && (
              <p className="text-xs text-red-400">
                {String(errors[campo.nombre]?.message)}
              </p>
            )}
          </div>
        );
      })}

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