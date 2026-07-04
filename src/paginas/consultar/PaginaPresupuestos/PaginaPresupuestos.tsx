import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { presupuestoService } from "../../../servicios/PresupuestoService/PresupuestoService";
import type { Presupuesto } from "../../../types/Presupuesto/Presupuesto";

export default function PaginaPresupuestos() {

    const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

    useEffect(() => {
        setPresupuestos(presupuestoService.getAll());
    }, []);

    const items = presupuestos.map((p) => ({
        id: p.id,
        titulo: p.titulo,
        textoBusqueda: `${p.estado} ${p.id} ${p.cliente_id} ${p.fecha_emision}`,
        campos: [
            {etiqueta: 'Titulo', valor: p.titulo},
            {etiqueta: 'Fecha de Emision', valor: p.fecha_emision},
            {etiqueta: 'Importe Total', valor: `${p.importe_total}`},
            {etiqueta: 'Estado', valor: p.estado},
            {etiqueta: 'Cliente', valor: p.cliente_id},
        ],
    }));

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
          />
        </div>
    )
}