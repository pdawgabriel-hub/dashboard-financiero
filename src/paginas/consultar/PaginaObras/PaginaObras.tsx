import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { obraService } from "../../../servicios/ObraService/ObraService";
import type { Obra } from "../../../types/Obra/Obra";

export default function PaginaObras() {

    const [obras, setObras] = useState<Obra[]>([]);

    useEffect(() => {
        setObras(obraService.getAll());
    }, []);

    const items  = obras.map((o) => ({
        
        id: o.id,
        titulo: o.nombre,
        estado: o.estado,
        textoBusqueda: `${o.id} ${o.nombre} ${o.direccion} ${o.cliente_id} ${o.presupuesto_id}`,
        campos: [
            {etiqueta: 'Nombre', valor: o.nombre},
            {etiqueta: 'Direccion', valor: o.direccion},
            {etiqueta: 'Fecha Inicio', valor: o.fecha_inicio},
            {etiqueta: 'Fecha Fin Prevista', valor: o.fecha_fin_prevista},
            {etiqueta: 'Estado', valor: o.estado},
            {etiqueta: 'Cliente', valor: o.cliente_id},
            {etiqueta: 'Presupuesto', valor: o.presupuesto_id},
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