import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import VistaDinamica from '../VistaDinamica/VistaDinamica';
import { MODULOS_ERP } from '../../mocks/routesMock/routesMock';
import PaginaEditarCliente from '../../paginas/consultar/PaginaEditarCliente/PaginaEditarCliente';
import PaginaEditarTrabajador from '../../paginas/consultar/PaginaEditarTrabajador/PaginaEditarTrabajador';
import PaginaEditarParte from '../../paginas/consultar/PaginaEditarParte/PaginaEditarParte';
import PaginaEditarProveedor from '../../paginas/consultar/PaginaEditarProveedor/PaginaEditarProveedor';
import PaginaEditarEspecialista from '../../paginas/consultar/PaginaEditarEspecialista/PaginaEditarEspecialista';
import PaginaEditarPresupuesto from '../../paginas/consultar/PaginaEditarPresupuesto/PaginaEditarPresupuesto';
import PaginaEditarObra from '../../paginas/consultar/PaginaEditarObra/PaginaEditarObra';
import PaginaEditarIngreso from '../../paginas/consultar/PaginaEditarIngreso/PaginaEditarIngreso';
import PaginaEditarGasto from '../../paginas/consultar/PaginaEditarGasto/PaginaEditarGasto';

export default function Main() {
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-slate-950">
      <Routes>
        {/* Home */}
        <Route path="/" element={<VistaDinamica nombreComponente="Home" />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<VistaDinamica nombreComponente="PaginaDashboard" />} />
        <Route path="/consultar" element={<Navigate to="/consultar/clientes" replace />} />
        <Route path="/introducir" element={<Navigate to="/introducir/nuevo-cliente" replace />} />
        <Route path="/consultar/clientes/editar/:id" element={<PaginaEditarCliente />} />
        <Route path="/consultar/trabajadores/editar/:id" element={<PaginaEditarTrabajador />} />
        <Route path="/consultar/partes-trabajo/editar/:id" element={<PaginaEditarParte />} />
        <Route path="/consultar/proveedores/editar/:id" element={<PaginaEditarProveedor />} />
        <Route path="/consultar/especialistas/editar/:id" element={<PaginaEditarEspecialista />} />
        <Route path="/consultar/presupuestos/editar/:id" element={<PaginaEditarPresupuesto />} />
        <Route path="/consultar/obras/editar/:id" element={<PaginaEditarObra />} />
        <Route path="/consultar/ingresos/editar/:id" element={<PaginaEditarIngreso />} />
        <Route path="/consultar/gastos/editar/:id" element={<PaginaEditarGasto />} />
        <Route path="/consultar/:seccion" element={<ContenedorDinamico moduloId="consultar" />} />
        <Route path="/introducir/:seccion" element={<ContenedorDinamico moduloId="introducir" />} />
        <Route path="*" element={<VistaDinamica nombreComponente="Home" />} />
      </Routes>
    </main>
  );
}

function ContenedorDinamico({ moduloId }: { moduloId: 'consultar' | 'introducir' }) {
  const { seccion } = useParams<{ seccion: string }>();
  const modulo = MODULOS_ERP.find((m) => m.id === moduloId);
  const subSeccion = modulo?.subSecciones.find((s) => s.ruta === seccion);
  const componentePorDefecto = moduloId === 'consultar' ? 'TablaClientes' : 'FormCliente';

  return <VistaDinamica nombreComponente={subSeccion?.componente || componentePorDefecto} />;
}