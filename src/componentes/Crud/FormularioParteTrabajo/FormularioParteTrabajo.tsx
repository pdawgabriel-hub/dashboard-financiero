import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parteTrabajoSchema, type ParteTrabajoFormValues } from '../../../schemas/ParteTrabajoSchema/ParteTrabajoSchema';
import { obraService, getObraDisplayName } from '../../../servicios/ObraService/ObraService';
import LineasParteTrabajo from '../LineasParteTrabajo/LineasParteTrabajo';
import ComboboxBuscable from '../ComboboxBuscable/ComboboxBuscable';

interface FormularioParteTrabajoProps {
  valoresIniciales?: Partial<ParteTrabajoFormValues>;
  onSubmit: (datos: ParteTrabajoFormValues) => void;
  textoBoton: string;
  onEliminar?: () => void;
}

const VALORES_POR_DEFECTO: ParteTrabajoFormValues = {
  fecha: new Date().toISOString().slice(0, 10),
  descripcion: '',
  obra_id: '',
  lineas: [{ trabajador_id: '', horas: 0, coste_hora: 0 }],
};

const CLASE_INPUT = 'px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600 w-full';
const CLASE_LABEL = 'text-sm font-medium text-slate-300';

export default function FormularioParteTrabajo({ valoresIniciales, onSubmit, textoBoton, onEliminar }: FormularioParteTrabajoProps) {
  const obrasRegistradas = obraService.getAll();

  // Tipado como `any`: igual que en FormularioCRUD/FormularioPresupuesto,
  // z.coerce.number() hace que el tipo de entrada y el de salida del resolver no coincidan.
  const metodos = useForm<any>({
    resolver: zodResolver(parteTrabajoSchema),
    defaultValues: { ...VALORES_POR_DEFECTO, ...valoresIniciales },
  });
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = metodos;

  return (
    <FormProvider {...metodos}>
      <form
        onSubmit={handleSubmit((datos) => onSubmit(datos as ParteTrabajoFormValues))}
        className="flex flex-col gap-5 max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full"
      >
        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>Fecha<span className="text-red-400 ml-0.5">*</span></label>
          <input type="date" {...register('fecha')} className={CLASE_INPUT} />
          {errors.fecha && <p className="text-xs text-red-400">{String(errors.fecha.message)}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>Descripción<span className="text-red-400 ml-0.5">*</span></label>
          <textarea {...register('descripcion')} rows={3} className={`${CLASE_INPUT} resize-none`} />
          {errors.descripcion && <p className="text-xs text-red-400">{String(errors.descripcion.message)}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>Obra<span className="text-red-400 ml-0.5">*</span></label>
          <ComboboxBuscable
            nombre="obra_id"
            opciones={obrasRegistradas.map((o) => ({ valor: o.id, etiqueta: getObraDisplayName(o) }))}
            valor={watch('obra_id') ?? ''}
            onChange={(valor) => setValue('obra_id', valor, { shouldValidate: true })}
            placeholder="Buscar obra..."
          />
          {errors.obra_id && <p className="text-xs text-red-400">{String(errors.obra_id.message)}</p>}
        </div>

        <LineasParteTrabajo />

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
    </FormProvider>
  );
}
