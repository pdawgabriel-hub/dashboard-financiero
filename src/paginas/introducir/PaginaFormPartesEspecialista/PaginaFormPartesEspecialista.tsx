import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { parteEspecialistaService } from '../../../servicios/ParteEspecialistaService/ParteEspecialistaService';
import { especialistaService, getEspecialistaDisplayName } from '../../../servicios/EspecialistaService/EspecialistaService';
import { obraService, getObraDisplayName } from '../../../servicios/ObraService/ObraService';
import { parteEspecialistaSchema, type ParteEspecialistaFormValues } from '../../../schemas/ParteEspecialistaSchema/ParteEspecialistaSchema';

export default function PaginaFormPartesEspecialista() {
    const especialistasRegistrados = especialistaService.getAll();
    const obrasRegistradas = obraService.getAll();

    const CAMPOS: CampoFormulario[] = [
        { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
        { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: false },
        { nombre: 'documento', etiqueta: 'Documento (factura)', requerido: false },
        { nombre: 'importe', etiqueta: 'Importe (€)', tipo: 'number', requerido: true },
        {
            nombre: 'estado_pago',
            etiqueta: 'Estado de Pago',
            tipo: 'select' as const,
            opciones: [
                { valor: 'pendiente', etiqueta: 'Pendiente' },
                { valor: 'pagado', etiqueta: 'Pagado' },
            ],
            requerido: true
        },
        {
            nombre: 'especialista_id',
            etiqueta: 'Especialista Asignado',
            tipo: 'select' as const,
            buscable: true,
            opciones: especialistasRegistrados.map(e => ({ valor: e.id, etiqueta: getEspecialistaDisplayName(e) })),
            requerido: true
        },
        {
            nombre: 'obra_id',
            etiqueta: 'Obra Vinculada',
            tipo: 'select' as const,
            buscable: true,
            opciones: obrasRegistradas.map(o => ({ valor: o.id, etiqueta: getObraDisplayName(o) })),
            requerido: true
        }
    ];

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: ParteEspecialistaFormValues) {
        parteEspecialistaService.create(datos);
        mostrarToast('Parte de especialista creado correctamente');
        navigate('/consultar/partes-especialista');
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Nuevo parte de especialista</h1>
                <p className="text-slate-400 mt-1">Rellena los datos para registrar un gasto de especialista imputado a una obra.</p>
            </div>

            <FormularioCRUD
                schema={parteEspecialistaSchema}
                campos={CAMPOS}
                onSubmit={handleSubmit}
                textoBoton="Crear parte de especialista"
            />
        </div>
    );
}
