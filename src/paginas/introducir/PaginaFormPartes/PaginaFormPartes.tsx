import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { parteTrabajoSchema, type ParteTrabajoFormValues } from '../../../schemas/ParteTrabajoSchema/ParteTrabajoSchema';
import { parteTrabajoService } from '../../../servicios/ParteTrabajoService/ParteTrabajoService';

const CAMPOS: CampoFormulario[] = [
    { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
    { nombre: 'horas', etiqueta: 'Horas', requerido: true },
    { nombre: 'descripcion', etiqueta: 'Descripcion', requerido: false },
    { nombre: 'trabajador_id', etiqueta: 'Trabajador', requerido: true },
    { nombre: 'obra_id', etiqueta: 'Obra', requerido: true },
];

export default function PaginaFormPartes() {
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: ParteTrabajoFormValues) {
      parteTrabajoService.create(datos);
      mostrarToast('Parte de Trabajo creado correctamente');
      navigate('/consultar/partes-trabajo');
    }

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Nuevo parte de trabajo</h1>
          <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un parte de trabajo.</p>
        </div>

        <FormularioCRUD
          schema={parteTrabajoSchema}
          campos={CAMPOS}
          onSubmit={handleSubmit}
          textoBoton="Crear parte de trabajo"
        />
      </div>
    );
}