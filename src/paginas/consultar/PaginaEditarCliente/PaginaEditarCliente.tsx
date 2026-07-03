import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import ConfirmarEliminar from '../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar';
import { clienteSchema, type ClienteFormValues } from '../../../schemas/ClienteSchema/ClienteSchema';
import { clienteService } from '../../../servicios/ClienteService/ClienteService';
import { useToast } from '../../../contextos/ToastContext/ToastContext';
import type { Cliente } from '../../../types/cliente/cliente';

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
    clienteService.update(id, datos);
    mostrarToast('Cambios guardados correctamente');
    navigate('/consultar/clientes');
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
    </div>
  );
}
