import { useFieldArray, useFormContext } from 'react-hook-form';
import type { ParteTrabajoFormValues } from '../../../schemas/ParteTrabajoSchema/ParteTrabajoSchema';
import { trabajadorService } from '../../../servicios/TrabajadorService/TrabajadorService';

const CLASE_INPUT = 'px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600';
const CLASE_SELECT = `${CLASE_INPUT} cursor-pointer appearance-none`;

export default function LineasParteTrabajo() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<ParteTrabajoFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'lineas' });

  const trabajadoresRegistrados = trabajadorService.getAll();
  const lineasActuales = watch('lineas') ?? [];

  const horasTotales = lineasActuales.reduce((suma, l) => suma + (Number(l.horas) || 0), 0);
  const costeTotal = lineasActuales.reduce(
    (suma, l) => suma + (Number(l.horas) || 0) * (Number(l.coste_hora) || 0),
    0
  );

  // Equivalente a _onchange_trabajador_id: congela el coste/hora ACTUAL del
  // trabajador en la línea, solo al elegirlo (no se recalcula después).
  function autofillCosteHora(index: number, trabajadorId: string) {
    const trabajador = trabajadoresRegistrados.find((t) => t.id === trabajadorId);
    if (!trabajador) return;
    setValue(`lineas.${index}.coste_hora`, trabajador.coste_hora_estandar);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">Líneas por trabajador</span>
        <button
          type="button"
          onClick={() => append({ trabajador_id: '', horas: 0, coste_hora: 0 })}
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
          <select
            {...register(`lineas.${index}.trabajador_id`, {
              onChange: (e) => autofillCosteHora(index, e.target.value),
            })}
            className={`${CLASE_SELECT} flex-1 min-w-[140px]`}
          >
            <option value="">Selecciona un trabajador...</option>
            {trabajadoresRegistrados.map((t) => (
              <option key={t.id} value={t.id}>{t.nombre} {t.apellido}</option>
            ))}
          </select>
          <input
            type="number"
            step="0.5"
            {...register(`lineas.${index}.horas`)}
            placeholder="Horas"
            className={`${CLASE_INPUT} w-20`}
          />
          <input
            type="number"
            step="0.01"
            {...register(`lineas.${index}.coste_hora`)}
            placeholder="€/h"
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
          <span>Horas totales</span>
          <span>{horasTotales}h</span>
        </div>
        <div className="flex justify-between font-semibold text-emerald-400">
          <span>Coste total del parte</span>
          <span>{costeTotal.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
}
