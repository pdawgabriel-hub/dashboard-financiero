import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();

  const obtenerClaseActiva = (ruta: string) => {
    const esActivo = ruta === '/'
      ? location.pathname === '/' 
      : location.pathname.startsWith(ruta);

    return esActivo
      ? "px-3 py-1.5 bg-slate-800 text-emerald-400 rounded-lg text-sm font-semibold border border-slate-700/50 whitespace-nowrap"
      : "px-3 py-1.5 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 rounded-lg text-sm font-medium transition-colors whitespace-nowrap";
  };

  return (
    // En móvil: h-auto (por si acaso), padding horizontal más ajustado (px-4).
    // En PC: Altura fija h-16 y más aireado.
    <header className="h-auto md:h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-3 md:py-0 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-0">
      
      {/* Contenedor Izquierdo: Logo + Navegación */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-8 flex-1">
        
        {/* Fila del Logo (en móvil comparte espacio con el avatar para ahorrar espacio vertical) */}
        <div className="flex items-center justify-between sm:justify-start">
          <div className="text-lg md:text-xl font-black text-emerald-400 tracking-wider">
            Construcción
          </div>
          
          {/* Este avatar solo se muestra aquí en pantallas pequeñas (móviles) */}
          <div className="flex md:hidden items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
              G
            </div>
          </div>
        </div>

        {/* En móvil: Navegación horizontal fluida con scroll si no cabe, ocultando la barra física de scroll. */}
        {/* En PC: Alineado normal sin scroll. */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-1">
          <Link to="/" className={obtenerClaseActiva('/')}>
            Inicio
          </Link>
          <Link to="/dashboard" className={obtenerClaseActiva('/dashboard')}>
            Análisis Financiero
          </Link>
          <Link to="/consultar/clientes" className={obtenerClaseActiva('/consultar')}>
            Consultar Datos
          </Link>
          <Link to="/introducir/nuevo-cliente" className={obtenerClaseActiva('/introducir')}>
            Introducir Datos
          </Link>
        </nav>
      </div>

      {/* Bloque de Usuario Derecho: Solo se muestra en ordenadores (md:) */}
      <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
        <span>Gabriel I.V</span>
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
          G
        </div>
      </div>
    </header>
  );
}