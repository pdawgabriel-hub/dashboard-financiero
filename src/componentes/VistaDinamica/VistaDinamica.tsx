// 📥 IMPORTA TUS DOS PÁGINAS NUEVAS (Ajusta la ruta a tus carpetas reales)
import Home from '../../paginas/Home/Home'; 
import PaginaDashboard from '../../paginas/PaginaDashboard/PaginaDashboard';

// Las 18 importaciones que ya tenías de Consultar e Introducir...
import PaginaClientes from '../../paginas/consultar/PaginaClientes/PaginaClientes';
import PaginaTrabajadores from '../../paginas/consultar/PaginaTrabajadores/PaginaTrabajadores';
import PaginaProveedores from '../../paginas/consultar/PaginaProveedores/PaginaProveedores';
import PaginaEspecialistas from '../../paginas/consultar/PaginaEspecialistas/PaginaEspecialistas';
import PaginaPresupuestos from '../../paginas/consultar/PaginaPresupuestos/PaginaPresupuestos';
import PaginaObras from '../../paginas/consultar/PaginaObras/PaginaObras';
import PaginaGastos from '../../paginas/consultar/PaginaGastos/PaginaGastos';
import PaginaIngresos from '../../paginas/consultar/PaginaIngresos/PaginaIngresos';
import PaginaPartes from '../../paginas/consultar/PaginaPartes/PaginaPartes';

import PaginaFormClientes from '../../paginas/introducir/PaginaFormClientes/PaginaFormClientes';
import PaginaFormTrabajadores from '../../paginas/introducir/PaginaFormTrabajadores/PaginaFormTrabajadores';
import PaginaFormProveedores from '../../paginas/introducir/PaginaFormProveedores/PaginaFormProveedores';
import PaginaFormEspecialistas from '../../paginas/introducir/PaginaFormEspecialistas/PaginaFormEspecialistas';
import PaginaFormPresupuestos from '../../paginas/introducir/PaginaFormPresupuestos/PaginaFormPresupuestos';
import PaginaFormObras from '../../paginas/introducir/PaginaFormObras/PaginaFormObras';
import PaginaFormGastos from '../../paginas/introducir/PaginaFormGastos/PaginaFormGastos';
import PaginaFormIngresos from '../../paginas/introducir/PaginaFormIngresos/PaginaFormIngresos';
import PaginaFormPartes from '../../paginas/introducir/PaginaFormPartes/PaginaFormPartes';

interface VistaDinamicaProps {
  nombreComponente: string;
}

export default function VistaDinamica({ nombreComponente }: VistaDinamicaProps) {
  const componentes: Record<string, React.ComponentType> = {
    // LAS DOS NUEVAS ADICIONES DIRECTAS
    Home: Home,
    PaginaDashboard: PaginaDashboard,

    // Consultas
    TablaClientes: PaginaClientes,
    TablaTrabajadores: PaginaTrabajadores,
    TablaProveedores: PaginaProveedores,
    TablaEspecialistas: PaginaEspecialistas,
    TablaPresupuestos: PaginaPresupuestos,
    TablaObras: PaginaObras,
    TablaGastos: PaginaGastos,
    TablaIngresos: PaginaIngresos,
    TablaPartes: PaginaPartes,
    
    // Formularios
    FormCliente: PaginaFormClientes,
    FormTrabajador: PaginaFormTrabajadores,
    FormProveedor: PaginaFormProveedores,
    FormEspecialista: PaginaFormEspecialistas,
    FormPresupuesto: PaginaFormPresupuestos,
    FormObra: PaginaFormObras,
    FormGasto: PaginaFormGastos,
    FormIngreso: PaginaFormIngresos,
    FormParte: PaginaFormPartes,
  };

  const ComponenteSeleccionado = componentes[nombreComponente];

  return (
    // Quitamos las clases de tarjeta de fondo gris (bg-slate-900 border...) 
    // para que tus páginas se rendericen limpias usando todo el espacio disponible.
    <>
      {ComponenteSeleccionado ? (
        <ComponenteSeleccionado />
      ) : (
        <div className="text-slate-500 font-medium p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          La vista para "{nombreComponente}" se encuentra en desarrollo.
        </div>
      )}
    </>
  );
}