import Home from '../../paginas/Home/Home'; 
import PaginaDashboard from '../../paginas/PaginaDashboard/PaginaDashboard';

import PaginaClientes from '../../paginas/consultar/PaginaClientes/PaginaClientes';
import PaginaTrabajadores from '../../paginas/consultar/PaginaTrabajadores/PaginaTrabajadores';
import PaginaFaltas from '../../paginas/consultar/PaginaFaltas/PaginaFaltas';
import PaginaProveedores from '../../paginas/consultar/PaginaProveedores/PaginaProveedores';
import PaginaEspecialistas from '../../paginas/consultar/PaginaEspecialistas/PaginaEspecialistas';
import PaginaPresupuestos from '../../paginas/consultar/PaginaPresupuestos/PaginaPresupuestos';
import PaginaObras from '../../paginas/consultar/PaginaObras/PaginaObras';
import PaginaGastos from '../../paginas/consultar/PaginaGastos/PaginaGastos';
import PaginaPartesProveedor from '../../paginas/consultar/PaginaPartesProveedor/PaginaPartesProveedor';
import PaginaPartesEspecialista from '../../paginas/consultar/PaginaPartesEspecialista/PaginaPartesEspecialista';
import PaginaIngresos from '../../paginas/consultar/PaginaIngresos/PaginaIngresos';
import PaginaPartes from '../../paginas/consultar/PaginaPartes/PaginaPartes';
import PaginaCalendario from '../../paginas/consultar/PaginaCalendario/PaginaCalendario';

import PaginaFormClientes from '../../paginas/introducir/PaginaFormClientes/PaginaFormClientes';
import PaginaFormTrabajadores from '../../paginas/introducir/PaginaFormTrabajadores/PaginaFormTrabajadores';
import PaginaFormFaltas from '../../paginas/introducir/PaginaFormFaltas/PaginaFormFaltas';
import PaginaFormProveedores from '../../paginas/introducir/PaginaFormProveedores/PaginaFormProveedores';
import PaginaFormEspecialistas from '../../paginas/introducir/PaginaFormEspecialistas/PaginaFormEspecialistas';
import PaginaFormPresupuestos from '../../paginas/introducir/PaginaFormPresupuestos/PaginaFormPresupuestos';
import PaginaFormObras from '../../paginas/introducir/PaginaFormObras/PaginaFormObras';
import PaginaFormPartesProveedor from '../../paginas/introducir/PaginaFormPartesProveedor/PaginaFormPartesProveedor';
import PaginaFormPartesEspecialista from '../../paginas/introducir/PaginaFormPartesEspecialista/PaginaFormPartesEspecialista';
import PaginaFormIngresos from '../../paginas/introducir/PaginaFormIngresos/PaginaFormIngresos';
import PaginaFormPartes from '../../paginas/introducir/PaginaFormPartes/PaginaFormPartes';

interface VistaDinamicaProps {
  nombreComponente: string;
}

export default function VistaDinamica({ nombreComponente }: VistaDinamicaProps) {
  const componentes: Record<string, React.ComponentType> = {
    Home: Home,
    PaginaDashboard: PaginaDashboard,

    // Consultas
    TablaClientes: PaginaClientes,
    TablaTrabajadores: PaginaTrabajadores,
    TablaFaltas: PaginaFaltas,
    TablaProveedores: PaginaProveedores,
    TablaEspecialistas: PaginaEspecialistas,
    TablaPresupuestos: PaginaPresupuestos,
    TablaObras: PaginaObras,
    TablaGastos: PaginaGastos,
    TablaPartesProveedor: PaginaPartesProveedor,
    TablaPartesEspecialista: PaginaPartesEspecialista,
    TablaIngresos: PaginaIngresos,
    TablaPartes: PaginaPartes,
    TablaCalendario: PaginaCalendario,

    // Formularios
    FormCliente: PaginaFormClientes,
    FormTrabajador: PaginaFormTrabajadores,
    FormFalta: PaginaFormFaltas,
    FormProveedor: PaginaFormProveedores,
    FormEspecialista: PaginaFormEspecialistas,
    FormPresupuesto: PaginaFormPresupuestos,
    FormObra: PaginaFormObras,
    FormParteProveedor: PaginaFormPartesProveedor,
    FormParteEspecialista: PaginaFormPartesEspecialista,
    FormIngreso: PaginaFormIngresos,
    FormParte: PaginaFormPartes,
  };

  const ComponenteSeleccionado = componentes[nombreComponente];

  return (
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