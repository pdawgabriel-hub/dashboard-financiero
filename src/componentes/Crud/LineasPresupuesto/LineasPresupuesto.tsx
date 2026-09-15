import { useFieldArray, useFormContext } from 'react-hook-form';
import type { PresupuestoFormValues } from '../../../schemas/PresupuestoSchema/PresupuestoSchema';

const CLASE_INPUT = 'px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600';

export default function LineasPresupuesto() {
  const { register, control, watch, formState: { errors } } = useFormContext<PresupuestoFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'lineas' });

  const lineasActuales = watch('lineas') ?? [];
  const iva = Number(watch('iva')) || 0;

  const baseImponible = lineasActuales.reduce(
    (suma, l) => suma + (Number(l.uds) || 0) * (Number(l.precio) || 0),
    0
  );
  const cuotaIva = baseImponible * (iva / 100);
  const total = baseImponible + cuotaIva;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">Líneas de reforma</span>
        <button
          type="button"
          onClick={() => append({ descripcion: '', uds: 1, precio: 0 })}
          className="text-xs px-2 py-1 rounded-md bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
        >
          + Añadir línea
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-xs text-slate-500">Añade al menos una línea.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-wrap gap-2 items-start">
          <input
            {...register(`lineas.${index}.descripcion`)}
            placeholder="Descripción"
            className={`${CLASE_INPUT} flex-1 min-w-[140px]`}
          />
          <input
            type="number"
            {...register(`lineas.${index}.uds`)}
            placeholder="Uds"
            className={`${CLASE_INPUT} w-16`}
          />
          <input
            type="number"
            step="0.01"
            {...register(`lineas.${index}.precio`)}
            placeholder="Precio"
            className={`${CLASE_INPUT} w-24`}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-xs px-2 py-1.5 text-red-400 hover:bg-red-950/40 rounded-lg transition-colors shrink-0"
          >
            Quitar
          </button>
        </div>
      ))}

      {errors.lineas?.message && (
        <p className="text-xs text-red-400">{String(errors.lineas.message)}</p>
      )}

      <div className="flex flex-col gap-1 text-sm text-slate-300 border-t border-slate-800 pt-3 mt-1">
        <div className="flex justify-between">
          <span>Base imponible</span>
          <span>{baseImponible.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span>Cuota IVA ({iva}%)</span>
          <span>{cuotaIva.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between font-semibold text-emerald-400">
          <span>Total</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
}
