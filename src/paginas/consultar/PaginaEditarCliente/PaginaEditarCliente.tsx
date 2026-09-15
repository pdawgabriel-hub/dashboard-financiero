import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import ConfirmarEliminar from '../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar';
import ListaRelacionados from '../../../componentes/Crud/ListaRelacionados/ListaRelacionados';
import { clienteSchema, type ClienteFormValues } from '../../../schemas/ClienteSchema/ClienteSchema';
import { clienteService } from '../../../servicios/ClienteService/ClienteService';
import { presupuestoService, getPresupuestoDisplayName } from '../../../servicios/PresupuestoService/PresupuestoService';
import { obraService, getObraDisplayName } from '../../../servicios/ObraService/ObraService';
import { ingresoService } from '../../../servicios/IngresoService/IngresoService';
import { useToast } from '../../../contextos/ToastContext/ToastContext';
import type { Cliente } from '../../../types/Cliente/Cliente';

// Array de configuracion
const CAMPOS: CampoFormulario[] = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
  { nombre: 'apellidos', etiqueta: 'Apellidos' },
  { nombre: 'nif', etiqueta: 'NIF', requerido: true },
  { nombre: 'direccion', etiqueta: 'Dirección', requerido: true },
  { nombre: 'codPostal', etiqueta: 'Código Postal' },
  { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', requerido: true },
];

export default function PaginaEditarCliente() {

  // Captura el id de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mostrarToast } = useToast();

  const [cliente, setCliente] = useState<Cliente | null | undefined>(undefined);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  useEffect(() => {
    if (!id) return;
    const encontrado = clienteService.getById(id);
    setCliente(encontrado ?? null);
  }, [id]);

  function handleSubmit(datos: ClienteFormValues) {
    if (!id) return;
    try {
      clienteService.update(id, datos);
      mostrarToast('Cambios guardados correctamente');
      navigate('/consultar/clientes');
    } catch (error) {
      mostrarToast(error instanceof Error ? error.message : 'No se pudieron guardar los cambios');
    }
  }

  function handleEliminar() {
    if (!id) return;
    clienteService.remove(id);
    mostrarToast('Cliente eliminado');
    navigate('/consultar/clientes');
  }

  if (cliente === undefined) {
    return <p className="text-slate-500">Cargando...</p>;
  }

  if (cliente === null) {
    return <p className="text-slate-500">No se encontró el cliente solicitado.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Editar cliente</h1>
        <p className="text-slate-400 mt-1">{cliente.id}</p>
      </div>

      <FormularioCRUD
        schema={clienteSchema}
        campos={CAMPOS}
        valoresIniciales={cliente}
        onSubmit={handleSubmit}
        textoBoton="Guardar cambios"
        onEliminar={() => setMostrarConfirmar(true)}
      />

      <ConfirmarEliminar
        abierto={mostrarConfirmar}
        nombre={`${cliente.nombre} ${cliente.apellidos ?? ''}`.trim()}
        onCancelar={() => setMostrarConfirmar(false)}
        onConfirmar={handleEliminar}
      />

      <ListaRelacionados
        secciones={[
          {
            titulo: 'Presupuestos',
            items: presupuestoService.getAll()
              .filter((p) => p.cliente_id === cliente.id)
              .map((p) => ({ id: p.id, etiqueta: getPresupuestoDisplayName(p), ruta: `/consultar/presupuestos/editar/${p.id}` })),
          },
          {
            titulo: 'Obras',
            items: obraService.getAll()
              .filter((o) => o.cliente_id === cliente.id)
              .map((o) => ({ id: o.id, etiqueta: getObraDisplayName(o), ruta: `/consultar/obras/editar/${o.id}` })),
          },
          {
            titulo: 'Ingresos',
            items: ingresoService.getAll()
              .filter((i) => i.cliente_id === cliente.id)
              .map((i) => ({ id: i.id, etiqueta: `${i.fecha} · ${i.importe}€${i.tipo ? ` (${i.tipo})` : ''}`, ruta: `/consultar/ingresos/editar/${i.id}` })),
          },
        ]}
      />
    </div>
  );

}
