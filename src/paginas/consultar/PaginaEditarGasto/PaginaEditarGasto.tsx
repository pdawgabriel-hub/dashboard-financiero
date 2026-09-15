import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import { gastoSchema, type GastoFormValues } from "../../../schemas/GastoSchema/GastoSchema";
import { gastoService } from "../../../servicios/GastoService/GastoService";
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";
import { getPresupuestoDisplayName } from "../../../servicios/PresupuestoService/PresupuestoService";
import type { Gasto } from "../../../types/Gasto/Gasto";
import type { Obra } from "../../../types/Obra/Obra";

const OPCIONES_SI_NO = [
  { valor: 'no', etiqueta: 'No' },
  { valor: 'si', etiqueta: 'Sí' },
];

export default function PaginaEditarGasto() {

  // La ruta usa el id de la OBRA: la ficha de Gastos es 1:1 y se obtiene o
  // se crea automáticamente, no se navega por un id propio.
  const { id: obraId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mostrarToast } = useToast();

  const [obra, setObra] = useState<Obra | null | undefined>(undefined);
  const [gasto, setGasto] = useState<Gasto | undefined>(undefined);

  useEffect(() => {
    if (!obraId) return;
    const obraEncontrada = obraService.getById(obraId);
    setObra(obraEncontrada ?? null);
    if (obraEncontrada) {
      setGasto(gastoService.obtenerOCrearFicha(obraId));
    }
  }, [obraId]);

  if (obra === undefined || (obra && !gasto)) {
    return <p className="text-slate-500">Cargando...</p>;
  }

  if (obra === null) {
    return <p className="text-slate-500">No se encontró la obra solicitada.</p>;
  }

  const CAMPOS: CampoFormulario[] = [
    {
      nombre: 'presupuesto_id',
      etiqueta: 'Presupuesto vinculado (opcional)',
      tipo: 'select' as const,
      opciones: gastoService.getPresupuestosDeLaObra(obra.id).map(p => ({ valor: p.id, etiqueta: getPresupuestoDisplayName(p) })),
      requerido: false,
    },
    { nombre: 'direccion_obra', etiqueta: 'Dirección de la obra', requerido: false },
    { nombre: 'solicitud_obra', etiqueta: 'Fecha de solicitud (AAAA-MM-DD)', requerido: false },
    { nombre: 'inicio_obra', etiqueta: 'Fecha de inicio (AAAA-MM-DD)', requerido: false },
    { nombre: 'fin_obra', etiqueta: 'Fecha de fin (AAAA-MM-DD)', requerido: false },
    { nombre: 'mandante', etiqueta: '¿Hay mandante?', tipo: 'select' as const, opciones: OPCIONES_SI_NO, requerido: true },
    { nombre: 'gestion_licencia', etiqueta: '¿Se gestiona licencia?', tipo: 'select' as const, opciones: OPCIONES_SI_NO, requerido: true },
    { nombre: 'pago_icio', etiqueta: '¿Se ha pagado el ICIO?', tipo: 'select' as const, opciones: OPCIONES_SI_NO, requerido: true },
  ];

  function handleSubmit(datos: GastoFormValues) {
    if (!gasto) return;
    gastoService.update(gasto.id, { ...datos, obra_id: obra!.id });
    mostrarToast('Cambios guardados correctamente');
    navigate('/consultar/gastos');
  }

  const horasTrabajadas = gastoService.getHorasTrabajadas(gasto!);
  const costeMoo = gastoService.getCosteMoo(gasto!);
  const costeHora = gastoService.getCosteHora(gasto!);
  const costeProveedores = gastoService.getCosteProveedores(gasto!);
  const costeEspecialistas = gastoService.getCosteEspecialistas(gasto!);
  const gastosTotales = gastoService.getGastosTotales(gasto!);
  const ingresos = gastoService.getIngresos(gasto!);
  const beneficioReal = gastoService.getBeneficioReal(gasto!);
  const debe = gastoService.getDebe(gasto!);
  const estado = gastoService.getEstado(gasto!);
  const direccionPromotor = gastoService.getDireccionPromotor(gasto!);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Seguimiento financiero</h1>
        <p className="text-slate-400 mt-1">
          {getObraDisplayName(obra)} · Estado: <span className={estado === 'finalizado' ? 'text-emerald-400' : 'text-amber-400'}>{estado}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500">Ingresos cobrados</p>
          <p className="text-lg font-semibold text-emerald-400">{ingresos.toFixed(2)}€</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500">Gastos</p>
          <p className="text-lg font-semibold text-rose-400">{gastosTotales.toFixed(2)}€</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500">Beneficio real</p>
          <p className={`text-lg font-semibold ${beneficioReal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{beneficioReal.toFixed(2)}€</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500">Pendiente de cobro</p>
          <p className="text-lg font-semibold text-slate-200">{debe.toFixed(2)}€</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl text-sm text-slate-400">
        <p>Horas trabajadas: <span className="text-slate-200">{horasTrabajadas}h</span></p>
        <p>Coste medio/hora: <span className="text-slate-200">{costeHora.toFixed(2)}€/h</span></p>
        <p>Coste mano de obra: <span className="text-slate-200">{costeMoo.toFixed(2)}€</span></p>
        <p>Coste proveedores: <span className="text-slate-200">{costeProveedores.toFixed(2)}€</span></p>
        <p>Coste especialistas: <span className="text-slate-200">{costeEspecialistas.toFixed(2)}€</span></p>
        <p>Dirección del promotor: <span className="text-slate-200">{direccionPromotor || '-'}</span></p>
      </div>

      <FormularioCRUD
        schema={gastoSchema}
        campos={CAMPOS}
        valoresIniciales={gasto}
        onSubmit={handleSubmit}
        textoBoton="Guardar cambios"
      />
    </div>
  );

}
