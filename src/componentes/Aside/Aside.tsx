import { Link, useLocation } from 'react-router-dom';
import { MODULOS_ERP } from '../../mocks/routesMock/routesMock';

export default function Aside() {
  const location = useLocation();

  const moduloActivo = MODULOS_ERP.find(m => {
    if (m.id === 'consultar') return location.pathname.startsWith('/consultar');
    if (m.id === 'introducir') return location.pathname.startsWith('/introducir');
    return false;
  });

  if (!moduloActivo) return null;

  return (
    // En móvil: Ancho completo, fila horizontal, scroll lateral si hay muchos módulos, sin bordes laterales.
    // En PC (md:): Vuelve a ser barra lateral fija de 64, vertical (flex-col), borde a la derecha.
    <aside className="w-full md:w-64 bg-slate-900/50 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col md:space-y-2">
      
      {/* Ocultamos el título de la sección en móvil para ahorrar espacio vertical */}
      <p className="hidden md:block text-xs font-semibold text-slate-500 uppercase px-2 mb-4">
        {moduloActivo.nombre}
      </p>

      {/* En móvil: Fila horizontal (flex-row), scroll si los botones se desbordan, oculta la barra de scroll molesta. */}
      {/* En PC (md:): Columna vertical, altura máxima fija calculada. */}
      <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible md:overflow-y-auto pb-2 md:pb-0 pr-1 flex-1 md:max-h-[calc(100vh-7rem)] scrollbar-none">
        {moduloActivo.subSecciones.map((sub) => {
          const rutaCompleta = `${moduloActivo.rutaPrincipal}/${sub.ruta}`;
          const esSubActiva = location.pathname === rutaCompleta;

          return (
            <Link
              key={sub.nombre}
              to={rutaCompleta}
              // whitespace-nowrap evita que el texto del enlace se rompa en dos líneas en el scroll horizontal móvil
              className={`p-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal ${
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