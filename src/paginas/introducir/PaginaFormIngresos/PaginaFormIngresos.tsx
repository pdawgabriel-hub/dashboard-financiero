import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { ingresoSchema, type IngresoFormValues } from '../../../schemas/IngresoSchema/IngresoSchema';
import { ingresoService } from '../../../servicios/IngresoService/IngresoService';

const CAMPOS: CampoFormulario[] = [
  { nombre: 'numero_factura', etiqueta: 'Numero Factura', requerido: true },
  { nombre: 'fecha_emision', etiqueta: 'Fecha Emision', requerido: true },
  { nombre: 'importe_neto', etiqueta: 'Importe Neto', requerido: true },
  { nombre: 'iva_porcentaje', etiqueta: 'Porcentaje IVA', requerido: true },
  { nombre: 'estado_pago', etiqueta: 'Estado' },
  { nombre: 'obra_id', etiqueta: 'Obra', requerido: true },
  { nombre: 'cliente_id', etiqueta: 'Cliente', requerido: true },
];

export default function PaginaFormIngresos() {
    
    const navigate = useNavigate();
    const { mostrarToast } = useToast();
    
    function handleSubmit(datos: IngresoFormValues) {
      ingresoService.create(datos);
      mostrarToast('Ingreso creado correctamente');
      navigate('/consultar/ingresos');
    }
    
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Nuevo ingreso</h1>
                <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un ingreso.</p>
            </div>
        
            <FormularioCRUD
            schema={ingresoSchema}
            campos={CAMPOS}
            onSubmit={handleSubmit}
            textoBoton="Crear ingreso"
            />
        </div>
    );

}