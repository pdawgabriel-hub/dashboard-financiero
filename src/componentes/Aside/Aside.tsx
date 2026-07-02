import { Link, useLocation } from 'react-router-dom';
import { MODULOS_ERP } from '../../mocks/routesMock/routesMock';

export default function Aside() {
  const location = useLocation();

  // Buscamos si estamos en 'consultar' o 'introducir'
  const moduloActivo = MODULOS_ERP.find(m => {
    if (m.id === 'consultar') return location.pathname.startsWith('/consultar');
    if (m.id === 'introducir') return location.pathname.startsWith('/introducir');
    return false;
  });

  // Por seguridad: si no encuentra nada, no pintamos nada
  if (!moduloActivo) return null;

  return (
    <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-4 space-y-2 flex flex-col">
      <p className="text-xs font-semibold text-slate-500 uppercase px-2 mb-4">
        {moduloActivo.nombre}
      </p>

      <nav className="flex flex-col gap-1 overflow-y-auto pr-1 flex-1 max-h-[calc(100vh-7rem)]">
        {moduloActivo.subSecciones.map((sub) => {
          const rutaCompleta = `${moduloActivo.rutaPrincipal}/${sub.ruta}`;
          const esSubActiva = location.pathname === rutaCompleta;

          return (
            <Link
              key={sub.nombre}
              to={rutaCompleta}
              className={`p-2.5 rounded-lg text-sm font-medium transition-colors ${
                esSubActiva
                  ? "bg-slate-800 text-emerald-400 font-semibold"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              {sub.nombre}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}