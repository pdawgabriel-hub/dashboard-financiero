import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { parteTrabajoService } from "../../../servicios/ParteTrabajoService/ParteTrabajoService";
import { getObraDisplayName, obraService } from "../../../servicios/ObraService/ObraService";
import { trabajadorService } from "../../../servicios/TrabajadorService/TrabajadorService";
import type { ParteTrabajo } from "../../../types/ParteTrabajo/ParteTrabajo";

export default function PaginaPartes() {
    const [partesTrabajo, setPartesTrabajo] = useState<ParteTrabajo[]>([]);

    useEffect(() => {
        setPartesTrabajo(parteTrabajoService.getAll());
    }, []);

    const obras = obraService.getAll();
    const trabajadores = trabajadorService.getAll();

    const items = partesTrabajo.map((pt) => {
        const obra = obras.find((o) => o.id === pt.obra_id);
        const nombresTrabajadores = pt.lineas
            .map((l) => trabajadores.find((t) => t.id === l.trabajador_id))
            .filter((t): t is NonNullable<typeof t> => !!t)
            .map((t) => `${t.nombre} ${t.apellido}`)
            .join(', ');

        return {
            id: pt.id,
            titulo: pt.fecha,
            textoBusqueda: `${pt.fecha} ${pt.id} ${pt.obra_id} ${pt.descripcion} ${nombresTrabajadores}`,
            campos: [
              { etiqueta: 'Fecha', valor: pt.fecha},
              { etiqueta: 'Descripción', valor: pt.descripcion || 'Sin descripción' },
              { etiqueta: 'Horas totales', valor: `${pt.horas_totales}h` },
              { etiqueta: 'Coste total', valor: `${pt.coste_total_parte.toFixed(2)}€` },
              { etiqueta: 'Trabajadores', valor: nombresTrabajadores || 'Sin trabajadores'},
              { etiqueta: 'Obra', valor: obra ? getObraDisplayName(obra) : pt.obra_id},
            ],
        };
    });

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
