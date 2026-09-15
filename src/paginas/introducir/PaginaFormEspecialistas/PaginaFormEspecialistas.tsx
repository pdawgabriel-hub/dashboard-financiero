import { useNavigate } from "react-router-dom";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import { especialistaSchema, type EspecialistaFormValues } from "../../../schemas/EspecialistaSchema/EspecialistaSchema";
import { especialistaService } from "../../../servicios/EspecialistaService/EspecialistaService";

const CAMPOS: CampoFormulario[] = [
    { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
    { nombre: 'tipo', etiqueta: 'Tipo', requerido: false },
    { nombre: 'ref', etiqueta: 'Referencia', requerido: false },
    { nombre: 'telf', etiqueta: 'Teléfono', tipo: 'tel', requerido: false },
    { nombre: 'correo', etiqueta: 'Correo', tipo: 'email', requerido: false },
    { nombre: 'comunicacionParte', etiqueta: 'Comunicación del parte', requerido: false },
    { nombre: 'importe', etiqueta: 'Importe', tipo: 'number', requerido: false },
    { nombre: 'observaciones', etiqueta: 'Observaciones', tipo: 'textarea', requerido: false },
];

export default function PaginaFormEspecialistas() {

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: EspecialistaFormValues) {
        especialistaService.create(datos);
        mostrarToast('Especialista creado correctamente');
        navigate('/consultar/especialistas');
    }

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Nuevo especialista</h1>
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