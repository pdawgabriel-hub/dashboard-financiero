import { useNavigate } from 'react-router-dom';
import FormularioCRUD, { type CampoFormulario } from '../../../componentes/Crud/FormularioCRUD/FormularioCRUD';
import { useToast } from '../../../contextos/ToastContext/ToastContext';

import { gastoSchema, type GastoFormValues } from '../../../schemas/GastoSchema/GastoSchema';
import { gastoService } from '../../../servicios/GastoService/GastoService';
import { proveedorService } from '../../../servicios/ProveedorService/ProveedorService';
import { obraService } from '../../../servicios/ObraService/ObraService';

export default function PaginaFormGastos() {
    
    const proveedoresRegistrados = proveedorService.getAll();
    const obrasRegistradas = obraService.getAll();

    const CAMPOS: CampoFormulario[] = [
    { nombre: 'concepto', etiqueta: 'Concepto', requerido: true },
    { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
    { nombre: 'importe_neto', etiqueta: 'Importe Neto', requerido: true },
    { nombre: 'iva_porcentaje', etiqueta: 'Porcentaje IVA', requerido: true },
    { 
        nombre: 'total_con_iva', 
        etiqueta: 'Total con IVA (€)', 
        tipo: 'number' as const, 
        requerido: true
    },
    {
        nombre: 'proveedor_id',
        etiqueta: 'Proveedor Asignado (ID)',
        tipo: 'select' as const,
        opciones: proveedoresRegistrados.map(p => ({ valor: p.id, etiqueta: String(p.id) })),
        requerido: true
    },
    {
        nombre: 'obra_id',
        etiqueta: 'Obra Vinculada (ID)',
        tipo: 'select' as const,
        opciones: obrasRegistradas.map(o => ({ valor: o.id, etiqueta: String(o.id) })),
        requerido: true
    }
    ];

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: any) {
        const datosLimpios = {
            ...datos,
            importe_neto: Number(datos.importe_neto),
            iva_porcentaje: Number(datos.iva_porcentaje),
            total_con_iva: Number(datos.total_con_iva),
        };

        gastoService.create(datosLimpios);
        mostrarToast('Guardado correctamente');
        navigate('/consultar/gastos');
    }

    return (
        <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-2xl font-bold text-slate-100">Nuevo gasto</h1>
            <p className="text-slate-400 mt-1">Rellena los datos para dar de alta un gasto.</p>
        </div>

        <FormularioCRUD
            schema={gastoSchema}
            campos={CAMPOS}
            onSubmit={handleSubmit}
            textoBoton="Crear gasto"
        />
        </div>
    );

}