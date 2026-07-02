import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import VistaDinamica from '../VistaDinamica/VistaDinamica';
import { MODULOS_ERP } from '../../mocks/routesMock/routesMock';

export default function Main() {
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-slate-950">
      <Routes>
        <Route path="/" element={<VistaDinamica nombreComponente="Home" />} />
        <Route path="/dashboard" element={<VistaDinamica nombreComponente="PaginaDashboard" />} />
        <Route path="/consultar" element={<Navigate to="/consultar/clientes" replace />} />
        <Route path="/introducir" element={<Navigate to="/introducir/nuevo-cliente" replace />} />
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