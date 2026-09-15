import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { faltaService, getFaltaDias, getFaltaTrabajadorNombreCompleto } from "../../../servicios/FaltaService/FaltaService";
import type { Falta } from "../../../types/Falta/Falta";

const ETIQUETAS_TIPO: Record<Falta['tipo'], string> = {
    vacaciones: 'Vacaciones',
    baja_medica: 'Baja médica',
    personal: 'Personal',
    injustificada: 'Injustificada',
    otro: 'Otro',
};

export default function PaginaFaltas() {

    const [faltas, setFaltas] = useState<Falta[]>([]);

    useEffect(() => {
        setFaltas(faltaService.getAll());
    }, []);

    const items = faltas.map((f) => {
        const nombreTrabajador = getFaltaTrabajadorNombreCompleto(f);

        return {
            id: f.id,
            titulo: nombreTrabajador || f.trabajador_id,
            textoBusqueda: `${f.id} ${nombreTrabajador} ${f.fecha_inicio} ${f.fecha_fin} ${ETIQUETAS_TIPO[f.tipo]}`,
            campos: [
                {etiqueta: 'Trabajador', valor: nombreTrabajador || 'Sin trabajador'},
                {etiqueta: 'Tipo', valor: ETIQUETAS_TIPO[f.tipo]},
                {etiqueta: 'Fecha inicio', valor: f.fecha_inicio},
                {etiqueta: 'Fecha fin', valor: f.fecha_fin},
                {etiqueta: 'Días', valor: `${getFaltaDias(f)}`},
                {etiqueta: 'Motivo', valor: f.motivo || 'Sin motivo'},
            ],
        };
    });

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Faltas de Trabajador</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona vacaciones, bajas y ausencias.</p>
          </div>

          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/faltas/editar"
            nombreVacio="No hay faltas que coincidan con la búsqueda."
          />
        </div>
    );
}
