import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { presupuestoSchema, type PresupuestoFormValues } from '../../../schemas/PresupuestoSchema/PresupuestoSchema';
import { clienteService, getClienteDisplayName } from '../../../servicios/ClienteService/ClienteService';
import { obraService, getObraDisplayName } from '../../../servicios/ObraService/ObraService';
import LineasPresupuesto from '../LineasPresupuesto/LineasPresupuesto';

interface FormularioPresupuestoProps {
  valoresIniciales?: Partial<PresupuestoFormValues>;
  onSubmit: (datos: PresupuestoFormValues) => void;
  textoBoton: string;
  onEliminar?: () => void;
}

const VALORES_POR_DEFECTO: PresupuestoFormValues = {
  fecha: new Date().toISOString().slice(0, 10),
  cliente_id: '',
  obra_id: '',
  nombre_cliente: '',
  nif: '',
  direccion: '',
  telf: '',
  iva: 21,
  estado: 'no_aprobado',
  lineas: [{ descripcion: '', uds: 1, precio: 0 }],
};

const CLASE_INPUT = 'px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600 w-full';
const CLASE_SELECT = `${CLASE_INPUT} cursor-pointer appearance-none`;
const CLASE_LABEL = 'text-sm font-medium text-slate-300';

export default function FormularioPresupuesto({ valoresIniciales, onSubmit, textoBoton, onEliminar }: FormularioPresupuestoProps) {
  const clientesRegistrados = clienteService.getAll();
  const obrasRegistradas = obraService.getAll();

  // Tipado como `any`: igual que en FormularioCRUD, z.coerce.number() hace que el
  // tipo de entrada (antes de coaccionar) y el de salida del resolver no coincidan.
  const metodos = useForm<any>({
    resolver: zodResolver(presupuestoSchema),
    defaultValues: { ...VALORES_POR_DEFECTO, ...valoresIniciales },
  });
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = metodos;

  // Equivalente a _onchange_cliente_id de gestion.presupuestos: congela los datos
  // del cliente en el momento de seleccionarlo. Se dispara solo ante un cambio
  // real del usuario (no al cargar valoresIniciales en edición).
  function autofillDesdeCliente(clienteId: string) {
    const cliente = clientesRegistrados.find((c) => c.id === clienteId);
    if (!cliente) return;
    setValue('nombre_cliente', `${cliente.nombre} ${cliente.apellidos ?? ''}`.trim());
    setValue('nif', cliente.nif);
    setValue('direccion', cliente.direccion);
    setValue('telf', cliente.telefono);
  }

  const nombreClienteActual = watch('nombre_cliente');

  return (
    <FormProvider {...metodos}>
      <form
        onSubmit={handleSubmit((datos) => onSubmit(datos as PresupuestoFormValues))}
        className="flex flex-col gap-5 max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full"
      >
        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>Fecha<span className="text-red-400 ml-0.5">*</span></label>
          <input type="date" {...register('fecha')} className={CLASE_INPUT} />
          {errors.fecha && <p className="text-xs text-red-400">{String(errors.fecha.message)}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>Cliente<span className="text-red-400 ml-0.5">*</span></label>
          <select
            {...register('cliente_id', { onChange: (e) => autofillDesdeCliente(e.target.value) })}
            className={CLASE_SELECT}
          >
            <option value="">Selecciona una opción...</option>
            {clientesRegistrados.map((c) => (
              <option key={c.id} value={c.id}>{getClienteDisplayName(c)}</option>
            ))}
          </select>
          {errors.cliente_id && <p className="text-xs text-red-400">{String(errors.cliente_id.message)}</p>}
          {nombreClienteActual && (
            <p className="text-xs text-slate-500">
              {nombreClienteActual} · NIF: {watch('nif') || '-'} · {watch('direccion') || '-'} · {watch('telf') || '-'}
            </p>
          )}
          {errors.nombre_cliente && <p className="text-xs text-red-400">{String(errors.nombre_cliente.message)}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>Obra vinculada (opcional)</label>
          <select {...register('obra_id')} className={CLASE_SELECT}>
            <option value="">Sin obra vinculada</option>
            {obrasRegistradas.map((o) => (
              <option key={o.id} value={o.id}>{getObraDisplayName(o)}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>IVA (%)<span className="text-red-400 ml-0.5">*</span></label>
          <input type="number" step="0.01" {...register('iva')} className={CLASE_INPUT} />
          {errors.iva && <p className="text-xs text-red-400">{String(errors.iva.message)}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={CLASE_LABEL}>Estado<span className="text-red-400 ml-0.5">*</span></label>
          <select {...register('estado')} className={CLASE_SELECT}>
            <option value="no_aprobado">No aprobado</option>
            <option value="aprobado">Aprobado</option>
          </select>
        </div>

        <LineasPresupuesto />

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
