import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { obraSchema, type ObraFormValues } from '../../../schemas/ObraSchema/ObraSchema';
import { obraService } from '../../../servicios/ObraService/ObraService';

const CAMPOS: CampoFormulario[] = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
  { nombre: 'direccion', etiqueta: 'Direccion', requerido: true },
  { nombre: 'fecha_inicio', etiqueta: 'Fecha Inicio', requerido: true },
  { nombre: 'fecha_fin_prevista', etiqueta: 'Fecha Fin Prevista', requerido: true },
  { nombre: 'estado', etiqueta: 'Estado' },
  { nombre: 'cliente_id', etiqueta: 'Cliente', requerido: true },
  { nombre: 'presupuesto_id', etiqueta: 'Teléfono', requerido: true },
];

export default function PaginaFormObras() {
    
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: ObraFormValues) {
      obraService.create(datos);
      mostrarToast('Obra creado correctamente');
      navigate('/consultar/obras');
    }

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Nuevo obra</h1>
          <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un obra.</p>
        </div>

        <FormularioCRUD
          schema={obraSchema}
          campos={CAMPOS}
          onSubmit={handleSubmit}
          textoBoton="Crear obra"
        />
      </div>
    );

}