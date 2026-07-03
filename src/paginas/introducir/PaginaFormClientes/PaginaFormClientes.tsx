import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { clienteSchema, type ClienteFormValues } from '../../../schemas/ClienteSchema/ClienteSchema';
import { clienteService } from '../../../servicios/ClienteService/ClienteService';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

const CAMPOS: CampoFormulario[] = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
  { nombre: 'apellidos', etiqueta: 'Apellidos' },
  { nombre: 'nif', etiqueta: 'NIF', requerido: true },
  { nombre: 'direccion', etiqueta: 'Dirección', requerido: true },
  { nombre: 'codPostal', etiqueta: 'Código Postal' },
  { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', requerido: true },
];

export default function PaginaFormClientes() {
  const navigate = useNavigate();
  const { mostrarToast } = useToast();

  function handleSubmit(datos: ClienteFormValues) {
    clienteService.create(datos);
    mostrarToast('Cliente creado correctamente');
    navigate('/consultar/clientes');
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Nuevo cliente</h1>
        <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un cliente.</p>
      </div>

      <FormularioCRUD
        schema={clienteSchema}
        campos={CAMPOS}
        onSubmit={handleSubmit}
        textoBoton="Crear cliente"
      />
    </div>
  );
}
