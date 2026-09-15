import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { getEventosCalendario } from "../../../servicios/CalendarioService/CalendarioService";
import type { CalendarioEvento } from "../../../types/CalendarioEvento/CalendarioEvento";

const ETIQUETAS_TIPO: Record<CalendarioEvento['tipo'], string> = {
    presupuesto: 'Presupuesto',
    ingreso: 'Ingreso',
    parte_trabajo: 'Parte de trabajo',
    parte_proveedor: 'Parte de proveedor',
    parte_especialista: 'Parte de especialista',
};

export default function PaginaCalendario() {

    const [eventos, setEventos] = useState<CalendarioEvento[]>([]);

    useEffect(() => {
        setEventos(getEventosCalendario());
    }, []);

    // Vista de solo lectura: cada tarjeta enlaza directamente al registro de
    // origen (equivalente a action_abrir_origen), no hay alta/edición propias.
    const items = eventos.map((e) => ({
        id: e.id,
        titulo: e.nombre,
        estado: e.tipo,
        textoBusqueda: `${e.fecha} ${e.nombre} ${ETIQUETAS_TIPO[e.tipo]}`,
        rutaEdicion: e.rutaOrigen,
        campos: [
            {etiqueta: 'Fecha', valor: e.fecha},
            {etiqueta: 'Tipo', valor: ETIQUETAS_TIPO[e.tipo]},
        ],
    }));

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Calendario de Eventos</h1>
            <p className="text-slate-400 mt-1">Presupuestos, ingresos y partes, todos por fecha. Solo lectura: cada tarjeta abre su registro de origen.</p>
          </div>

          <GridConsulta
            items={items}
            nombreVacio="No hay eventos que coincidan con la búsqueda."
            tipoEstado="evento"
          />
        </div>
    );
}
