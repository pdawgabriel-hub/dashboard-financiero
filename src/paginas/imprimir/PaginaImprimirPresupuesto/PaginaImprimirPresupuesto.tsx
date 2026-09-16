import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentoImprimible from '../../../componentes/Imprimir/DocumentoImprimible/DocumentoImprimible';
import BarraAccionesImprimir from '../../../componentes/Imprimir/BarraAccionesImprimir/BarraAccionesImprimir';
import { presupuestoService } from '../../../servicios/PresupuestoService/PresupuestoService';
import type { Presupuesto } from '../../../types/Presupuesto/Presupuesto';

// Equivalente a action_print_presupuesto / report_presupuesto de Odoo.
export default function PaginaImprimirPresupuesto() {
  const { id } = useParams<{ id: string }>();
  const [presupuesto, setPresupuesto] = useState<Presupuesto | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    setPresupuesto(presupuestoService.getById(id) ?? null);
  }, [id]);

  if (presupuesto === undefined) {
    return <p className="text-slate-500 p-8">Cargando...</p>;
  }

  if (presupuesto === null) {
    return <p className="text-slate-500 p-8">No se encontró el presupuesto solicitado.</p>;
  }

  const fechaFormateada = presupuesto.fecha
    ? new Date(`${presupuesto.fecha}T00:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : '-';

  return (
    <>
      <BarraAccionesImprimir rutaVolver={`/consultar/presupuestos/editar/${presupuesto.id}`} />
      <DocumentoImprimible>
        <div className="flex items-start justify-between border-b border-slate-300 pb-6 mb-6">
          <div>
            <p className="text-xl font-black text-emerald-700 tracking-wide">Construcción</p>
            <p className="text-sm text-slate-500 mt-1">Presupuesto de reforma</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold text-slate-900">{presupuesto.id}</p>
            <p className="text-slate-500">{fechaFormateada}</p>
            <p className="mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-600">
              {presupuesto.estado === 'aprobado' ? 'Aprobado' : 'No aprobado'}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Cliente</p>
          <p className="font-semibold text-slate-900">{presupuesto.nombre_cliente}</p>
          {presupuesto.nif && <p className="text-sm text-slate-600">NIF: {presupuesto.nif}</p>}
          {presupuesto.direccion && <p className="text-sm text-slate-600">{presupuesto.direccion}</p>}
          {presupuesto.telf && <p className="text-sm text-slate-600">Tel: {presupuesto.telf}</p>}
        </div>

        <table className="w-full text-sm mb-8 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 text-left text-slate-500 uppercase text-xs tracking-wider">
              <th className="py-2 pr-2">Descripción</th>
              <th className="py-2 px-2 text-right">Uds.</th>
              <th className="py-2 px-2 text-right">Precio</th>
              <th className="py-2 pl-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {presupuesto.lineas.map((linea, i) => (
              <tr key={i} className="border-b border-slate-200">
                <td className="py-2 pr-2">{linea.descripcion || '—'}</td>
                <td className="py-2 px-2 text-right">{linea.uds}</td>
                <td className="py-2 px-2 text-right">{linea.precio.toFixed(2)}€</td>
                <td className="py-2 pl-2 text-right font-medium">{linea.total_linea.toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-56 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Base imponible</span>
              <span>{presupuesto.base_imponible.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">IVA ({presupuesto.iva}%)</span>
              <span>{presupuesto.cuota_iva.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between py-2 border-t border-slate-300 mt-1 font-bold text-base text-slate-900">
              <span>Total</span>
              <span>{presupuesto.total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </DocumentoImprimible>
    </>
  );
}
