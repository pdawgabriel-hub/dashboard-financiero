import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CalendarioEvento } from '../../../types/CalendarioEvento/CalendarioEvento';
import { COLOR_TIPO_EVENTO, ETIQUETAS_TIPO_EVENTO } from '../../../servicios/CalendarioService/CalendarioService';

interface CalendarioMesProps {
  eventos: CalendarioEvento[];
}

const NOMBRES_MES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MAX_EVENTOS_VISIBLES = 3;

// Evita el desfase de un día que da toISOString() al pasar por UTC.
function formatearFechaLocal(fecha: Date): string {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function CalendarioMes({ eventos }: CalendarioMesProps) {
  const hoy = useMemo(() => new Date(), []);
  const [mesActual, setMesActual] = useState(() => new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);

  const eventosPorFecha = useMemo(() => {
    const mapa = new Map<string, CalendarioEvento[]>();
    eventos.forEach((e) => {
      const lista = mapa.get(e.fecha) ?? [];
      lista.push(e);
      mapa.set(e.fecha, lista);
    });
    return mapa;
  }, [eventos]);

  // Rejilla de 6 semanas x 7 días, empezando en lunes, incluyendo los días de
  // los meses vecinos que completan la primera/última semana.
  const semanas = useMemo(() => {
    const primerDiaMes = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
    const offsetInicio = (primerDiaMes.getDay() + 6) % 7; // Lunes = 0
    const inicioGrid = new Date(primerDiaMes);
    inicioGrid.setDate(primerDiaMes.getDate() - offsetInicio);

    const dias = Array.from({ length: 42 }, (_, i) => {
      const fecha = new Date(inicioGrid);
      fecha.setDate(inicioGrid.getDate() + i);
      return { fecha, enMes: fecha.getMonth() === mesActual.getMonth() };
    });

    const filas: (typeof dias)[] = [];
    for (let i = 0; i < dias.length; i += 7) filas.push(dias.slice(i, i + 7));
    return filas;
  }, [mesActual]);

  function cambiarMes(delta: number) {
    setMesActual((actual) => new Date(actual.getFullYear(), actual.getMonth() + delta, 1));
    setDiaSeleccionado(null);
  }

  function irAHoy() {
    setMesActual(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
    setDiaSeleccionado(formatearFechaLocal(hoy));
  }

  const fechaHoyStr = formatearFechaLocal(hoy);
  const eventosDelDiaSeleccionado = diaSeleccionado ? eventosPorFecha.get(diaSeleccionado) ?? [] : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-slate-100">
          {NOMBRES_MES[mesActual.getMonth()]} {mesActual.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={irAHoy}
            className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={() => cambiarMes(-1)}
            aria-label="Mes anterior"
            className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => cambiarMes(1)}
            aria-label="Mes siguiente"
            className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="border border-slate-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-900 text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider">
          {DIAS_SEMANA.map((d) => (
            <div key={d} className="text-center py-2">{d}</div>
          ))}
        </div>

        {semanas.map((semana, i) => (
          <div key={i} className="grid grid-cols-7 border-t border-slate-800">
            {semana.map(({ fecha, enMes }) => {
              const fechaStr = formatearFechaLocal(fecha);
              const eventosDia = eventosPorFecha.get(fechaStr) ?? [];
              const esHoy = fechaStr === fechaHoyStr;
              const seleccionado = fechaStr === diaSeleccionado;

              return (
                <button
                  type="button"
                  key={fechaStr}
                  onClick={() => setDiaSeleccionado(seleccionado ? null : fechaStr)}
                  aria-label={`${fechaStr}, ${eventosDia.length} evento(s)`}
                  className={`min-h-[64px] sm:min-h-[100px] p-1 sm:p-1.5 border-r border-slate-800 last:border-r-0 text-left flex flex-col gap-1 transition-colors
                    ${enMes ? 'bg-slate-950' : 'bg-slate-950/40'}
                    ${seleccionado ? 'ring-2 ring-inset ring-emerald-600' : 'hover:bg-slate-900'}`}
                >
                  <span
                    className={`text-[11px] sm:text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center
                      ${esHoy ? 'bg-emerald-600 text-white' : enMes ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    {fecha.getDate()}
                  </span>

                  <div className="flex flex-col gap-0.5">
                    {eventosDia.slice(0, MAX_EVENTOS_VISIBLES).map((ev) => (
                      <span
                        key={ev.id}
                        className={`text-[9px] sm:text-[10px] px-1 py-0.5 rounded truncate text-white ${COLOR_TIPO_EVENTO[ev.tipo]}`}
                      >
                        {ev.nombre}
                      </span>
                    ))}
                    {eventosDia.length > MAX_EVENTOS_VISIBLES && (
                      <span className="text-[9px] sm:text-[10px] text-slate-500">
                        +{eventosDia.length - MAX_EVENTOS_VISIBLES} más
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {diaSeleccionado && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">
            Eventos del {new Date(`${diaSeleccionado}T00:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' '}<span className="text-slate-500 font-normal">({eventosDelDiaSeleccionado.length})</span>
          </h3>
          {eventosDelDiaSeleccionado.length === 0 ? (
            <p className="text-sm text-slate-500">No hay eventos este día.</p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {eventosDelDiaSeleccionado.map((ev) => (
                <Link
                  key={ev.id}
                  to={ev.rutaOrigen}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/40 hover:bg-slate-800 text-sm text-slate-300 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${COLOR_TIPO_EVENTO[ev.tipo]}`} />
                  <span className="truncate flex-1">{ev.nombre}</span>
                  <span className="text-xs text-slate-500 shrink-0">{ETIQUETAS_TIPO_EVENTO[ev.tipo]}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
