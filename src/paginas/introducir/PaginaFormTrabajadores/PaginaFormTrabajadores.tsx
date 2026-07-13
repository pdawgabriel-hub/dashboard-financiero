import { useNavigate } from "react-router-dom"
import FormularioCRUD, {type CampoFormulario} from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import {trabajadorSchema, type trabajadorFormValues } from "../../../schemas/TrabajadorSchema/TrabajadorSchema";
import { trabajadorService } from "../../../servicios/TrabajadorService/TrabajadorService";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

const CAMPOS: CampoFormulario[] = [
    {nombre: 'tipo', etiqueta: 'Tipo', requerido: false},
    {nombre: 'nombre', etiqueta: 'Nombre', requerido: true},
    {nombre: 'apellido', etiqueta: 'Apellido', requerido: true},
    {nombre: 'coste_hora_estandar', etiqueta: 'Coste hora estandar', tipo: 'number', requerido: true},
];

export default function PaginaFormTrabajadores() {
    const navigate = useNavigate();
    const { mostrarToast } = useToast();
    
    function handleSubmit(datos: trabajadorFormValues) {
        // Garantizamos que los valores opcionales nunca sean undefined
        const datosSaneados = {
            ...datos,
            tipo: datos.tipo || '',
            apellido: datos.apellido || ''
        };
        trabajadorService.create(datosSaneados);
        mostrarToast('Trabajador creado correctamente');
        navigate('/consultar/trabajadores');
    }
    
    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Nuevo trabajador</h1>
            <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un trabajador.</p>
          </div>
    
          <FormularioCRUD
            schema={trabajadorSchema}
            campos={CAMPOS}
            onSubmit={handleSubmit}
            textoBoton="Crear trabajador"
          />
        </div>
    );
}