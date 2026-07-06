import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { parteTrabajoService } from "../../../servicios/ParteTrabajoService/ParteTrabajoService";
import type { ParteTrabajo } from "../../../types/ParteTrabajo/ParteTrabajo";

export default function PaginaPartes() {

    const [partesTrabajo, setPartesTrabajo] = useState<ParteTrabajo[]>([]);

    useEffect(() => {
        setPartesTrabajo(parteTrabajoService.getAll());
    }, []);

    const items = partesTrabajo.map((pt) => ({
        id: pt.id,
        titulo: pt.fecha,
        textoBusqueda: `${pt.fecha} ${pt.id} ${pt.trabajador_id} ${pt.obra_id}`,
        campos: [
          { etiqueta: 'Fecha', valor: pt.fecha},
          { etiqueta: 'Horas', valor: String(pt.horas)},
          { etiqueta: 'Descripcion', valor: pt.descripcion},
          { etiqueta: 'Trabajador', valor: pt.trabajador_id},
          { etiqueta: 'Obra', valor: pt.obra_id},
        ],
    }));

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Partes de Trabajo</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona tus partes de trabajo.</p>
          </div>
    
          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/partes-trabajo/editar"
            nombreVacio="No hay partes de trabajo que coincidan con la búsqueda."
          />
        </div>
    );

}