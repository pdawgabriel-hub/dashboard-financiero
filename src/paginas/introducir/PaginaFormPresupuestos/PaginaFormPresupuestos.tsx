import { useNavigate } from 'react-router-dom';
import FormularioPresupuesto from '../../../componentes/Crud/FormularioPresupuesto/FormularioPresupuesto';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import type { PresupuestoFormValues } from '../../../schemas/PresupuestoSchema/PresupuestoSchema';
import { presupuestoService } from '../../../servicios/PresupuestoService/PresupuestoService';

export default function PaginaFormPresupuestos() {

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: PresupuestoFormValues) {
      presupuestoService.create(datos);
      mostrarToast('Presupuesto creado correctamente');
      navigate('/consultar/presupuestos');
    }

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Nuevo presupuesto</h1>
          <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un presupuesto.</p>
        </div>

        <FormularioPresupuesto
          onSubmit={handleSubmit}
          textoBoton="Crear presupuesto"
        />
      </div>
    );

}
