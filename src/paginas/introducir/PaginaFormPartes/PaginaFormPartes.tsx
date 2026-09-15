import { useNavigate } from 'react-router-dom';
import FormularioParteTrabajo from '../../../componentes/Crud/FormularioParteTrabajo/FormularioParteTrabajo';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import type { ParteTrabajoFormValues } from '../../../schemas/ParteTrabajoSchema/ParteTrabajoSchema';
import { parteTrabajoService } from '../../../servicios/ParteTrabajoService/ParteTrabajoService';

export default function PaginaFormPartes() {

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: ParteTrabajoFormValues) {
      parteTrabajoService.create(datos);
      mostrarToast('Parte de Trabajo creado correctamente');
      navigate('/consultar/partes');
    }

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Nuevo parte de trabajo</h1>
          <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un parte de trabajo.</p>
        </div>

        <FormularioParteTrabajo
          onSubmit={handleSubmit}
          textoBoton="Crear parte de trabajo"
        />
      </div>
    );
}
