import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { proveedorSchema, type ProveedorFormValues } from '../../../schemas/ProveedorSchema/ProveedorSchema';
import { proveedorService } from '../../../servicios/ProveedorService/ProveedorService';

const CAMPOS: CampoFormulario[] = [
    { nombre: 'nombre', etiqueta: 'Nombre', requerido: true},
    { nombre: 'cif', etiqueta: 'CIF', requerido: true },
    { nombre: 'telefono', etiqueta: 'Telefono', requerido: true },
    { nombre: 'email', etiqueta: 'Email', requerido: true },
    { nombre: 'sector', etiqueta: 'Sector', requerido: true },
];

export default function PaginaFormProveedores() { 

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: ProveedorFormValues) {
      proveedorService.create(datos);
      mostrarToast('Proveedor creado correctamente');
      navigate('/consultar/proveedores');
    }

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Nuevo proveedor</h1>
          <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un proveedor.</p>
        </div>

        <FormularioCRUD
          schema={proveedorSchema}
          campos={CAMPOS}
          onSubmit={handleSubmit}
          textoBoton="Crear proveedor"
        />
      </div>
    );

}