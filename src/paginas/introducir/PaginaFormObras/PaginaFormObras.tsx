import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { obraSchema, type ObraFormValues } from '../../../schemas/ObraSchema/ObraSchema';
import { obraService } from '../../../servicios/ObraService/ObraService';
import { clienteService } from '../../../servicios/ClienteService/ClienteService';
import { presupuestoService } from '../../../servicios/PresupuestoService/PresupuestoService';

export default function PaginaFormObras() {
    
    const clientesRegistrados = clienteService.getAll();
    const presupuestosRegistrados = presupuestoService.getAll();

    const CAMPOS: CampoFormulario[] = [
        { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
        { nombre: 'direccion', etiqueta: 'Direccion', requerido: true },
        { nombre: 'fecha_inicio', etiqueta: 'Fecha Inicio', requerido: true },
        { nombre: 'fecha_fin_prevista', etiqueta: 'Fecha Fin Prevista', requerido: true },
        { 
            nombre: 'estado', 
            etiqueta: 'Estado', 
            tipo: 'select' as const,
            opciones: [
            { valor: 'planificada', etiqueta: 'Planificada' },
            { valor: 'en_progreso', etiqueta: 'En Progreso' },
            { valor: 'pausada', etiqueta: 'Pausada' },
            { valor: 'finalizada', etiqueta: 'Finalizada' }
            ],
            requerido: true
        },
        {
            nombre: 'cliente_id',
            etiqueta: 'Cliente Asignado (ID)',
            tipo: 'select' as const,
            opciones: clientesRegistrados.map(c => ({ valor: c.id, etiqueta: String(c.id) })),
            requerido: true
        },
        {
            nombre: 'presupuesto_id',
            etiqueta: 'Presupuesto Vinculado (ID)',
            tipo: 'select' as const,
            opciones: presupuestosRegistrados.map(p => ({ valor: p.id, etiqueta: String(p.id) })),
            requerido: true
        }
    ];

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