import { useNavigate } from "react-router-dom";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import { useToast } from "../../../contextos/ToastContext/ToastContext";
import { ingresoSchema } from "../../../schemas/IngresoSchema/IngresoSchema";
import { ingresoService } from "../../../servicios/IngresoService/IngresoService";
// Importamos los servicios de donde queremos sacar las opciones relacionales
import { obraService } from "../../../servicios/ObraService/ObraService"; 
import { clienteService } from "../../../servicios/ClienteService/ClienteService";

export default function PaginaFormIngresos() {

    // Extraemos los datos reales del localStorage
    const obrasRegistradas = obraService.getAll();
    const clientesRegistrados = clienteService.getAll();

    // Transformamos los datos al formato { valor, etiqueta } que pide el select
    const opcionesObras = obrasRegistradas.map(o => ({ 
        valor: o.id, 
        etiqueta: String(o.id)
    }));

    const opcionesClientes = clientesRegistrados.map(c => ({ 
        valor: c.id, 
        etiqueta: String(c.id)
    }));

    // Definimos los CAMPOS dentro del componente para que puedan usar las variables de arriba
    const CAMPOS: CampoFormulario[] = [
        { nombre: 'numero_factura', etiqueta: 'Número Factura', requerido: true },
        { nombre: 'fecha_emision', etiqueta: 'Fecha Emisión', requerido: true },
        { nombre: 'importe_neto', etiqueta: 'Importe Neto', requerido: true },
        { nombre: 'iva_porcentaje', etiqueta: 'Porcentaje IVA', requerido: true },
        { nombre: 'total_con_iva', etiqueta: 'Total con IVA (Auto)' },
        
        // Desplegable fijo para Estados (como pedías)
        { 
            nombre: 'estado_pago', 
            etiqueta: 'Estado de Pago', 
            tipo: 'select', 
            opciones: [
                { valor: 'pendiente', etiqueta: 'Pendiente' },
                { valor: 'cobrado', etiqueta: 'Cobrado' }
            ],
            requerido: true
        },
        
        // Desplegable dinámico relacional (Obras)
        { 
            nombre: 'obra_id', 
            etiqueta: 'Obra Asignada', 
            tipo: 'select', 
            opciones: opcionesObras,
            requerido: true 
        },
        
        // Desplegable dinámico relacional (Clientes)
        { 
            nombre: 'cliente_id', 
            etiqueta: 'Cliente', 
            tipo: 'select', 
            opciones: opcionesClientes,
            requerido: true 
        },
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
        ingresoService.create(datosLimpios);
        mostrarToast('Ingreso registrado correctamente');
        navigate('/consultar/ingresos');
    }

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Nuevo Ingreso</h1>
            <p className="text-slate-400 mt-1">Registra una factura emitida vinculada a una obra.</p>
          </div>

          <FormularioCRUD
            schema={ingresoSchema}
            campos={CAMPOS}
            onSubmit={handleSubmit}
            textoBoton="Guardar Ingreso"
          />
        </div>
    );
}