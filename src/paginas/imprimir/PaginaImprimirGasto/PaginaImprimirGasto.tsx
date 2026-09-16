import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentoImprimible from '../../../componentes/Imprimir/DocumentoImprimible/DocumentoImprimible';
import BarraAccionesImprimir from '../../../componentes/Imprimir/BarraAccionesImprimir/BarraAccionesImprimir';
import { gastoService } from '../../../servicios/GastoService/GastoService';
import { obraService, getObraDisplayName, getObraTotal } from '../../../servicios/ObraService/ObraService';
import { clienteService } from '../../../servicios/ClienteService/ClienteService';
import type { Obra } from '../../../types/Obra/Obra';
import type { Gasto } from '../../../types/Gasto/Gasto';

const ETIQUETA_SI_NO: Record<'si' | 'no', string> = { si: 'Sí', no: 'No' };

// Equivalente a action_print_seguimiento / action_report_gasto_seguimiento de Odoo.
// La ruta usa el id de la OBRA, igual que la ficha de edición: la ficha de
// Gastos es 1:1 y se obtiene (o se crea) automáticamente.
export default function PaginaImprimirGasto() {
  const { id: obraId } = useParams<{ id: string }>();
  const [obra, setObra] = useState<Obra | null | undefined>(undefined);
  const [gasto, setGasto] = useState<Gasto | undefined>(undefined);

  useEffect(() => {
    if (!obraId) return;
    const obraEncontrada = obraService.getById(obraId);
    setObra(obraEncontrada ?? null);
    if (obraEncontrada) setGasto(gastoService.obtenerOCrearFicha(obraId));
  }, [obraId]);

  if (obra === undefined || (obra && !gasto)) {
    return <p className="text-slate-500 p-8">Cargando...</p>;
  }

  if (obra === null || !gasto) {
    return <p className="text-slate-500 p-8">No se encontró la obra solicitada.</p>;
  }

  const cliente = clienteService.getById(obra.cliente_id);
  const ingresos = gastoService.getIngresos(gasto);
  const gastosTotales = gastoService.getGastosTotales(gasto);
  const beneficio = gastoService.getBeneficioReal(gasto);
  const pendiente = gastoService.getDebe(gasto);

  const formatearFecha = (fecha?: string) =>
    fecha ? new Date(`${fecha}T00:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  return (
    <>
      <BarraAccionesImprimir rutaVolver={`/consultar/gastos/editar/${obra.id}`} />
      <DocumentoImprimible>
        <div className="flex items-start justify-between border-b border-slate-300 pb-6 mb-6">
          <div>
            <p className="text-xl font-black text-emerald-700 tracking-wide">Construcción</p>
            <p className="text-sm text-slate-500 mt-1">Seguimiento financiero de obra</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold text-slate-900">{obra.id}</p>
            <p className="text-slate-500 capitalize">{gastoService.getEstado(gasto)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Obra</p>
            <p className="font-semibold text-slate-900">{getObraDisplayName(obra)}</p>
            <p className="text-sm text-slate-600">{gasto.direccion_obra || obra.direccion}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Promotor</p>
            <p className="font-semibold text-slate-900">{cliente ? `${cliente.nombre} ${cliente.apellidos ?? ''}`.trim() : obra.cliente_id}</p>
            <p className="text-sm text-slate-600">{gastoService.getDireccionPromotor(gasto)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fechas</p>
            <p className="text-sm text-slate-700">Solicitud: {formatearFecha(gasto.solicitud_obra)}</p>
            <p className="text-sm text-slate-700">Inicio: {formatearFecha(gasto.inicio_obra)}</p>
            <p className="text-sm text-slate-700">Fin: {formatearFecha(gasto.fin_obra)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Trámites</p>
            <p className="text-sm text-slate-700">Mandante: {ETIQUETA_SI_NO[gasto.mandante]}</p>
            <p className="text-sm text-slate-700">Gestión de licencia: {ETIQUETA_SI_NO[gasto.gestion_licencia]}</p>
            <p className="text-sm text-slate-700">Pago ICIO: {ETIQUETA_SI_NO[gasto.pago_icio]}</p>
          </div>
        </div>

        <table className="w-full text-sm mb-8 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 text-left text-slate-500 uppercase text-xs tracking-wider">
              <th className="py-2 pr-2">Concepto</th>
              <th className="py-2 pl-2 text-right">Importe</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="py-2 pr-2">Precio pactado (presupuestos aprobados)</td>
              <td className="py-2 pl-2 text-right">{getObraTotal(obra).toFixed(2)}€</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-2 pr-2">Coste mano de obra</td>
              <td className="py-2 pl-2 text-right">{gastoService.getCosteMoo(gasto).toFixed(2)}€</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-2 pr-2">Coste proveedores</td>
              <td className="py-2 pl-2 text-right">{gastoService.getCosteProveedores(gasto).toFixed(2)}€</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-2 pr-2">Coste especialistas</td>
              <td className="py-2 pl-2 text-right">{gastoService.getCosteEspecialistas(gasto).toFixed(2)}€</td>
            </tr>
            <tr className="border-b border-slate-200 font-medium">
              <td className="py-2 pr-2">Gastos totales</td>
              <td className="py-2 pl-2 text-right">{gastosTotales.toFixed(2)}€</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-2 pr-2">Ingresos cobrados</td>
              <td className="py-2 pl-2 text-right">{ingresos.toFixed(2)}€</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Pendiente de cobro</span>
              <span>{pendiente.toFixed(2)}€</span>
            </div>
            <div className={`flex justify-between py-2 border-t border-slate-300 mt-1 font-bold text-base ${beneficio >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              <span>Beneficio real</span>
              <span>{beneficio.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </DocumentoImprimible>
    </>
  );
}
