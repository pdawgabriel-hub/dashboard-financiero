import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { faltaSchema, type FaltaFormValues } from '../../../schemas/FaltaSchema/FaltaSchema';
import { faltaService } from '../../../servicios/FaltaService/FaltaService';
import { trabajadorService, getTrabajadorDisplayName } from '../../../servicios/TrabajadorService/TrabajadorService';

const OPCIONES_TIPO = [
    { valor: 'vacaciones', etiqueta: 'Vacaciones' },
    { valor: 'baja_medica', etiqueta: 'Baja médica' },
    { valor: 'personal', etiqueta: 'Personal' },
    { valor: 'injustificada', etiqueta: 'Injustificada' },
    { valor: 'otro', etiqueta: 'Otro' },
];

export default function PaginaFormFaltas() {
    const trabajadoresRegistrados = trabajadorService.getAll();

    const CAMPOS: CampoFormulario[] = [
        { nombre: 'fecha_inicio', etiqueta: 'Fecha Inicio', requerido: true },
        { nombre: 'fecha_fin', etiqueta: 'Fecha Fin', requerido: true },
        { nombre: 'tipo', etiqueta: 'Tipo', tipo: 'select' as const, opciones: OPCIONES_TIPO, requerido: true },
        { nombre: 'motivo', etiqueta: 'Motivo', tipo: 'textarea', requerido: false },
        {
            nombre: 'trabajador_id',
            etiqueta: 'Trabajador',
            tipo: 'select' as const,
            opciones: trabajadoresRegistrados.map(t => ({ valor: t.id, etiqueta: getTrabajadorDisplayName(t) })),
            requerido: true
        },
    ];

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: FaltaFormValues) {
        faltaService.create(datos);
        mostrarToast('Falta registrada correctamente');
        navigate('/consultar/faltas');
    }

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Nueva falta</h1>
            <p className="text-slate-400 mt-1">Registra unas vacaciones, una baja o una ausencia de un trabajador.</p>
          </div>

          <FormularioCRUD
            schema={faltaSchema}
            campos={CAMPOS}
            onSubmit={handleSubmit}
            textoBoton="Registrar falta"
          />
        </div>
    );
}
