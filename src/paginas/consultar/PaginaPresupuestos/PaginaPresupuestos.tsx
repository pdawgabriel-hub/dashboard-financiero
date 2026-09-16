import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { presupuestoService, getPresupuestoAnio } from "../../../servicios/PresupuestoService/PresupuestoService";
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";
import type { Presupuesto } from "../../../types/Presupuesto/Presupuesto";

export default function PaginaPresupuestos() {

    const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

    useEffect(() => {
        setPresupuestos(presupuestoService.getAll());
    }, []);

    const obras = obraService.getAll();

    const items = presupuestos.map((p) => {
        const obra = obras.find((o) => o.id === p.obra_id);

        return {
            id: p.id,
            titulo: p.nombre_cliente,
            estado: p.estado,
            textoBusqueda: `${p.estado} ${p.id} ${p.cliente_id} ${p.nombre_cliente} ${p.fecha}`,
            campos: [
                {etiqueta: 'Cliente', valor: p.nombre_cliente},
                {etiqueta: 'Fecha', valor: p.fecha},
                {etiqueta: 'Año', valor: `${getPresupuestoAnio(p) ?? '-'}`},
                {etiqueta: 'Base Imponible', valor: `${p.base_imponible.toFixed(2)}€`},
                {etiqueta: 'IVA', valor: `${p.iva}%`},
                {etiqueta: 'Total', valor: `${p.total.toFixed(2)}€`},
                {etiqueta: 'Estado', valor: p.estado},
                {etiqueta: 'Obra', valor: obra ? getObraDisplayName(obra) : p.obra_id},
            ],
        };
    });

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Presupuestos</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona tus presupuestos.</p>
          </div>
    
          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/presupuestos/editar"
            nombreVacio="No hay presupuestos que coincidan con la búsqueda."
            tipoEstado="presupuesto"
          />
        </div>
    )
}