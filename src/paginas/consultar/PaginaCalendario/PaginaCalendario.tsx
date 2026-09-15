import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, List } from "lucide-react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import CalendarioMes from "../../../componentes/Calendario/CalendarioMes/CalendarioMes";
import { getEventosCalendario, ETIQUETAS_TIPO_EVENTO } from "../../../servicios/CalendarioService/CalendarioService";
import type { CalendarioEvento } from "../../../types/CalendarioEvento/CalendarioEvento";

export default function PaginaCalendario() {

    const [eventos, setEventos] = useState<CalendarioEvento[]>([]);
    const [vista, setVista] = useState<'mes' | 'lista'>('mes');

    useEffect(() => {
        setEventos(getEventosCalendario());
    }, []);

    // Vista de solo lectura: cada tarjeta/evento enlaza directamente al registro
    // de origen (equivalente a action_abrir_origen), no hay alta/edición propias.
    const items = eventos.map((e) => ({
        id: e.id,
        titulo: e.nombre,
        estado: e.tipo,
        textoBusqueda: `${e.fecha} ${e.nombre} ${ETIQUETAS_TIPO_EVENTO[e.tipo]}`,
        rutaEdicion: e.rutaOrigen,
        campos: [
            {etiqueta: 'Fecha', valor: e.fecha},
            {etiqueta: 'Tipo', valor: ETIQUETAS_TIPO_EVENTO[e.tipo]},
        ],
    }));

    return (
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-100">Calendario de Eventos</h1>
              <p className="text-slate-400 mt-1">Presupuestos, ingresos y partes, todos por fecha. Solo lectura: cada evento abre su registro de origen.</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 shrink-0">
              <button
                type="button"
                onClick={() => setVista('mes')}
                aria-label="Vista de mes"
                title="Vista de mes"
                className={`p-1.5 rounded-md transition-colors ${vista === 'mes' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <CalendarIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setVista('lista')}
                aria-label="Vista en lista"
                title="Vista en lista"
                className={`p-1.5 rounded-md transition-colors ${vista === 'lista' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {vista === 'mes' ? (
            <CalendarioMes eventos={eventos} />
          ) : (
            <GridConsulta
              items={items}
              nombreVacio="No hay eventos que coincidan con la búsqueda."
              tipoEstado="evento"
            />
          )}
        </div>
    );
}
