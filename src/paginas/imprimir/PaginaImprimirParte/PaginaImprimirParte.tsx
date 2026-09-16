import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentoImprimible from '../../../componentes/Imprimir/DocumentoImprimible/DocumentoImprimible';
import BarraAccionesImprimir from '../../../componentes/Imprimir/BarraAccionesImprimir/BarraAccionesImprimir';
import { parteTrabajoService } from '../../../servicios/ParteTrabajoService/ParteTrabajoService';
import { obraService, getObraDisplayName } from '../../../servicios/ObraService/ObraService';
import { trabajadorService } from '../../../servicios/TrabajadorService/TrabajadorService';
import type { ParteTrabajo } from '../../../types/ParteTrabajo/ParteTrabajo';

// Equivalente a action_print_parte / report_parte_trabajo_operario de Odoo.
export default function PaginaImprimirParte() {
  const { id } = useParams<{ id: string }>();
  const [parte, setParte] = useState<ParteTrabajo | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    setParte(parteTrabajoService.getById(id) ?? null);
  }, [id]);

  if (parte === undefined) {
    return <p className="text-slate-500 p-8">Cargando...</p>;
  }

  if (parte === null) {
    return <p className="text-slate-500 p-8">No se encontró el parte de trabajo solicitado.</p>;
  }

  const obra = obraService.getById(parte.obra_id);
  const trabajadores = trabajadorService.getAll();
  const fechaFormateada = new Date(`${parte.fecha}T00:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <BarraAccionesImprimir rutaVolver={`/consultar/partes-trabajo/editar/${parte.id}`} />
      <DocumentoImprimible>
        <div className="flex items-start justify-between border-b border-slate-300 pb-6 mb-6">
          <div>
            <p className="text-xl font-black text-emerald-700 tracking-wide">Construcción</p>
            <p className="text-sm text-slate-500 mt-1">Parte de trabajo</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold text-slate-900">{parte.id}</p>
            <p className="text-slate-500">{fechaFormateada}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Obra</p>
          <p className="font-semibold text-slate-900">{obra ? getObraDisplayName(obra) : parte.obra_id}</p>
          {obra?.direccion && <p className="text-sm text-slate-600">{obra.direccion}</p>}
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4 mb-1">Descripción de la tarea</p>
          <p className="text-sm text-slate-700 whitespace-pre-line">{parte.descripcion}</p>
        </div>

        <table className="w-full text-sm mb-8 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 text-left text-slate-500 uppercase text-xs tracking-wider">
              <th className="py-2 pr-2">Trabajador</th>
              <th className="py-2 px-2 text-right">Horas</th>
              <th className="py-2 px-2 text-right">Coste/hora</th>
              <th className="py-2 pl-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {parte.lineas.map((linea, i) => {
              const trabajador = trabajadores.find((t) => t.id === linea.trabajador_id);
              return (
                <tr key={i} className="border-b border-slate-200">
                  <td className="py-2 pr-2">{trabajador ? `${trabajador.nombre} ${trabajador.apellido}` : linea.trabajador_id}</td>
                  <td className="py-2 px-2 text-right">{linea.horas}h</td>
                  <td className="py-2 px-2 text-right">{linea.coste_hora.toFixed(2)}€</td>
                  <td className="py-2 pl-2 text-right font-medium">{linea.coste_subtotal.toFixed(2)}€</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-56 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Horas totales</span>
              <span>{parte.horas_totales}h</span>
            </div>
            <div className="flex justify-between py-2 border-t border-slate-300 mt-1 font-bold text-base text-slate-900">
              <span>Coste total</span>
              <span>{parte.coste_total_parte.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </DocumentoImprimible>
    </>
  );
}
