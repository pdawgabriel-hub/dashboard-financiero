import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-6 px-4">
      
      {/* PRESENTACIÓN */}
      <div className="grid md:grid-cols-3 gap-6 items-center border border-indigo-500/20 bg-indigo-950/10 rounded-2xl p-6 backdrop-blur-sm">
        <div className="md:col-span-2">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider px-2.5 py-1 bg-indigo-500/10 rounded-full">
            Developer Portfolio Project
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-3 mb-2">
            Panel de Control
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            He diseñado y desarrollado esta SPA como una demostración técnica enfocada en resolver flujos de trabajo complejos, gestión de CRUDs relacionales y sincronización ágil en el lado del cliente.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <a 
            href="https://github.com/pdawgabriel-hub/dashboard-financiero.git"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold rounded-lg transition-colors border border-slate-700"
          >
            Código en GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/gabriel-iborra-vicente-52803241b/"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/15"
          >
            Conectar en LinkedIn
          </a>
        </div>
      </div>

      {/* NOTA DE PERSISTENCIA Y MOCKS */}
      <div className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div>
          <h4 className="text-amber-400 font-bold text-sm">Persistencia Local y Datos de Prueba</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Para facilitar una evaluación inmediata sin necesidad de desplegar bases de datos externas, la aplicación arranca cargando datos ficticios a partir de mocks predefinidos. Toda la gestión, creación, edición y borrado de registros se realiza directamente sobre el LocalStorage de tu navegador.
          </p>
        </div>
      </div>

      {/* ACCESOS RÁPIDOS VISUALES */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Secciones Destacadas</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link 
            to="/dashboard" 
            className="group border border-slate-800/80 bg-slate-900/30 hover:bg-slate-900/60 hover:border-indigo-500/30 rounded-xl p-5 transition-all flex flex-col justify-between min-h-[130px]"
          >
            <div>
              <h4 className="text-slate-200 font-bold text-sm mt-3 group-hover:text-indigo-400 transition-colors">Dashboard Analítico</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Métricas de rentabilidad de obras, balance de ingresos y gastos acumulados.</p>
            </div>
            <span className="text-xs text-indigo-400 font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Ir al panel →
            </span>
          </Link>

          <Link 
            to="/consultar/clientes" 
            className="group border border-slate-800/80 bg-slate-900/30 hover:bg-slate-900/60 hover:border-emerald-500/30 rounded-xl p-5 transition-all flex flex-col justify-between min-h-[130px]"
          >
            <div>
              <h4 className="text-slate-200 font-bold text-sm mt-3 group-hover:text-emerald-400 transition-colors">Vistas</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Consulta las tablas interconectadas de clientes, presupuestos y trabajadores.</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Consultar tablas →
            </span>
          </Link>

          <Link 
            to="/introducir/nuevo-cliente" 
            className="group border border-slate-800/80 bg-slate-900/30 hover:bg-slate-900/60 hover:border-amber-500/30 rounded-xl p-5 transition-all flex flex-col justify-between min-h-[130px]"
          >
            <div>
              <h4 className="text-slate-200 font-bold text-sm mt-3 group-hover:text-amber-400 transition-colors">Formularios Dinámicos</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Añade nuevos registros con formularios validados en tiempo real mediante schemas.</p>
            </div>
            <span className="text-xs text-amber-400 font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Crear registro →
            </span>
          </Link>
        </div>
      </div>

      {/* GUÍA DE TESTEO RÁPIDO */}
      <div className="border border-slate-800 bg-slate-900/40 rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-200 mb-2">Testeo</h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
          Para ver todo el potencial técnico de esta aplicación en menos de 2 minutos, te recomiendo seguir este flujo:
        </p>
        
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="relative pl-8">
            <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center justify-center">1</span>
            <h4 className="text-slate-200 font-semibold text-xs mb-1">Crea un Nuevo Registro</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Ve a <strong>Introducir → Cliente</strong>, rellena el formulario y envíalo. Comprobarás el control de errores del schema.</p>
          </div>
          <div className="relative pl-8">
            <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center justify-center">2</span>
            <h4 className="text-slate-200 font-semibold text-xs mb-1">Verifica la Tabla y Edita</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">El sistema te redirigirá a la tabla. Busca tu cliente, dale a <strong>Editar</strong> y verás cómo el formulario se precarga con su estado actual.</p>
          </div>
          <div className="relative pl-8">
            <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center justify-center">3</span>
            <h4 className="text-slate-200 font-semibold text-xs mb-1">Comprueba la Reactividad</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Elimina cualquier gasto o ingreso en sus respectivas tablas y regresa al <strong>Dashboard</strong> para observar cómo se recalculan los totales al instante.</p>
          </div>
        </div>
      </div>

      {/* DETALLES DEL PROYECTO / STACK */}
      <div className="border border-slate-800 bg-slate-900/40 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-200 mb-2">Decisiones de Arquitectura</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Esta herramienta simula la operativa de una empresa constructora. Al no apoyarse en un backend tradicional, se ha diseñado una arquitectura basada en:
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-xs text-slate-400">
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">✔</span>
            <span>Persistencia y lectura dinámica basada en la API de <strong>LocalStorage</strong>.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">✔</span>
            <span>Semillero de datos iniciales mediante mocks estructurados relacionales.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">✔</span>
            <span>Tipado estricto con <strong>TypeScript</strong> para el control de modelos e IDs.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">✔</span>
            <span>Maquetación responsiva y limpia diseñada mediante <strong>Tailwind CSS</strong>.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">✔</span>
            <span>Validaciones de formularios y control de esquemas.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">✔</span>
            <span>Manejo de rutas dinámicas mediante <strong>React Router Dom</strong>.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}