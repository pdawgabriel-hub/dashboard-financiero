import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { parteProveedorService } from '../../../servicios/ParteProveedorService/ParteProveedorService';
import { proveedorService, getProveedorDisplayName } from '../../../servicios/ProveedorService/ProveedorService';
import { obraService, getObraDisplayName } from '../../../servicios/ObraService/ObraService';
import { parteProveedorSchema, type ParteProveedorFormValues } from '../../../schemas/ParteProveedorSchema/ParteProveedorSchema';

export default function PaginaFormPartesProveedor() {
    const proveedoresRegistrados = proveedorService.getAll();
    const obrasRegistradas = obraService.getAll();

    const CAMPOS: CampoFormulario[] = [
        { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
        { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: false },
        { nombre: 'documento', etiqueta: 'Documento (factura/albarán)', requerido: false },
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
            nombre: 'proveedor_id',
            etiqueta: 'Proveedor Asignado',
            tipo: 'select' as const,
            opciones: proveedoresRegistrados.map(p => ({ valor: p.id, etiqueta: getProveedorDisplayName(p) })),
            requerido: true
        },
        {
            nombre: 'obra_id',
            etiqueta: 'Obra Vinculada',
            tipo: 'select' as const,
            opciones: obrasRegistradas.map(o => ({ valor: o.id, etiqueta: getObraDisplayName(o) })),
            requerido: true
        }
    ];

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: ParteProveedorFormValues) {
        parteProveedorService.create(datos);
        mostrarToast('Parte de proveedor creado correctamente');
        navigate('/consultar/partes-proveedor');
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Nuevo parte de proveedor</h1>
                <p className="text-slate-400 mt-1">Rellena los datos para registrar un gasto de proveedor imputado a una obra.</p>
            </div>

            <FormularioCRUD
                schema={parteProveedorSchema}
                campos={CAMPOS}
                onSubmit={handleSubmit}
                textoBoton="Crear parte de proveedor"
            />
        </div>
    );
}
