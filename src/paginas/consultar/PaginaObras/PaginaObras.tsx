import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { obraService, getObraTotal, getObraHorasTotales, getObraEstadoPago } from "../../../servicios/ObraService/ObraService";
import type { Obra } from "../../../types/Obra/Obra";

export default function PaginaObras() {

    const [obras, setObras] = useState<Obra[]>([]);

    useEffect(() => {
        setObras(obraService.getAll());
    }, []);

    const items  = obras.map((o) => ({

        id: o.id,
        titulo: o.descripcion,
        estado: o.estado,
        textoBusqueda: `${o.id} ${o.descripcion} ${o.direccion} ${o.cliente_id}`,
        campos: [
            {etiqueta: 'Descripción', valor: o.descripcion},
            {etiqueta: 'Direccion', valor: o.direccion},
            {etiqueta: 'Fecha Inicio', valor: o.fecha_inicio},
            {etiqueta: 'Fecha Fin Prevista', valor: o.fecha_fin_prevista},
            {etiqueta: 'Estado', valor: o.estado},
            {etiqueta: 'Cliente', valor: o.cliente_id},
            {etiqueta: 'Total', valor: `${getObraTotal(o).toFixed(2)}€`},
            {etiqueta: 'Horas totales', valor: `${getObraHorasTotales(o)}h`},
            {etiqueta: 'Estado de pago', valor: getObraEstadoPago(o)},
        ],
    }));

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Obras</h1>
                <p className="text-slate-400 mt-1">Consulta y gestiona tus obras.</p>
            </div>
        
            <GridConsulta
                items={items}
                rutaBaseEdicion="/consultar/obras/editar"
                nombreVacio="No hay obras que coincidan con la búsqueda."
                tipoEstado="obra"
            />
        </div>
    );
}