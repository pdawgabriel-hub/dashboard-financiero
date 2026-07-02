import { Link, useLocation } from 'react-router-dom';

export default function Menu() {

    // Resaltamos el boton de la seccion en la que estamos
    const location = useLocation();

  const obtenerClaseActiva = (ruta: string) => {
    const esActivo = ruta === '/'
      ? location.pathname === '/' 
      : location.pathname.startsWith(ruta);

    return esActivo
      ? "px-3 py-1.5 bg-slate-800 text-emerald-400 rounded-lg text-sm font-medium border border-slate-700/50"
      : "px-3 py-1.5 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 rounded-lg text-sm font-medium transition-colors";
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="text-xl font-black text-emerald-400 tracking-wider">
          Construccion
        </div>

        <nav className="flex items-center gap-1">
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

      <div className="flex items-center gap-4 text-sm text-slate-400">
        <span>Julio 2026</span>
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
          G
        </div>
      </div>
    </header>
  );
}