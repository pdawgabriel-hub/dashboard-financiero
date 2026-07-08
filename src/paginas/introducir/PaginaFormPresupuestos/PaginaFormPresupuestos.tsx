import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { presupuestoSchema, type PresupuestoFormValues } from '../../../schemas/PresupuestoSchema/PresupuestoSchema';
import { presupuestoService } from '../../../servicios/PresupuestoService/PresupuestoService';

const CAMPOS: CampoFormulario[] = [
    { nombre: 'titulo', etiqueta: 'Titulo', requerido: true },
    { nombre: 'fecha_emision', etiqueta: 'Fecha Emision', requerido: true },
    { nombre: 'importe_total', etiqueta: 'Importe Total', requerido: true },
    { nombre: 'estado', etiqueta: 'Estado', requerido: true },
    { nombre: 'cliente_id', etiqueta: 'Cliente', requerido: true },
];

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

        <FormularioCRUD
          schema={presupuestoSchema}
          campos={CAMPOS}
          onSubmit={handleSubmit}
          textoBoton="Crear presupuesto"
        />
      </div>
    );

}