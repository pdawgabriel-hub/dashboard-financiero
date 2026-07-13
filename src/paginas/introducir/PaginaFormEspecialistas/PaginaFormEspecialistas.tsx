import { useNavigate } from "react-router-dom";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import { especialistaSchema, type EspecialistaFormValues } from "../../../schemas/EspecialistaSchema/EspecialistaSchema";
import { especialistaService } from "../../../servicios/EspecialistaService/EspecialistaService";

const CAMPOS: CampoFormulario[] = [
    { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
    { nombre: 'empresa_autonomo', etiqueta: 'Empresa / Autonomo', requerido: true },
    { nombre: 'cif_dni', etiqueta: 'CIF / DNI', requerido: true },
    { nombre: 'telefono', etiqueta: 'Telefono', requerido: true },
    { nombre: 'especialidad', etiqueta: 'Especialidad' },
    { nombre: 'precio_hora_subcontrata', etiqueta: 'Precio x Hora', tipo: 'tel', requerido: true },
];

export default function PaginaFormEspecialistas() {
    
    const navigate = useNavigate();
    const { mostrarToast } = useToast();
    
    function handleSubmit(datos: EspecialistaFormValues) {
        especialistaService.create(datos);
        mostrarToast('Especialistas creado correctamente');
        navigate('/consultar/especialistas');
    }
    
    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Nuevo ingreso</h1>
            <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un especialista.</p>
          </div>
    
          <FormularioCRUD
            schema={especialistaSchema}
            campos={CAMPOS}
            onSubmit={handleSubmit}
            textoBoton="Crear especialista"
          />
        </div>
    );

}