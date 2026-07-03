import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import type { Trabajador } from "../../../types/Trabajador/Trabajador";
import { trabajadorService } from "../../../servicios/TrabajadorService/TrabajadorService";

export default function PaginaTrabajadores() {
    const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);

    useEffect(() => {
        setTrabajadores(trabajadorService.getAll());
    }, []);

    const items = trabajadores.map((t) => ({
        id: t.id,
        titulo: `${t.nombre} ${t.apellido}`.trim(),
        textoBusqueda: `${t.id} ${t.nombre} ${t.apellido ?? ''}`,
        campos: [
            { etiqueta: 'Tipo', valor: t.tipo },
            { etiqueta: 'Coste Hora Estandar', valor: t.coste_hora_estandar },
        ],
    }))

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Trabajadores</h1>
                <p className="text-slate-400 mt-1">Consulta y gestiona tus trabajadores.</p>
            </div>
        
            <GridConsulta
                items={items}
                rutaBaseEdicion="/consultar/trabajadores/editar"
                nombreVacio="No hay trabajadores que coincidan con la búsqueda."
            />
          </div>
    );
}