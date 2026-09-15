import { useNavigate } from "react-router-dom";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import { useToast } from "../../../contextos/ToastContext/ToastContext";
import { ingresoSchema, type IngresoFormValues } from "../../../schemas/IngresoSchema/IngresoSchema";
import { ingresoService } from "../../../servicios/IngresoService/IngresoService";
// Importamos los servicios de donde queremos sacar las opciones relacionales
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";
import { clienteService, getClienteDisplayName } from "../../../servicios/ClienteService/ClienteService";

export default function PaginaFormIngresos() {

    // Extraemos los datos reales del localStorage
    const obrasRegistradas = obraService.getAll();
    const clientesRegistrados = clienteService.getAll();

    // Transformamos los datos al formato { valor, etiqueta } que pide el select
    const opcionesObras = obrasRegistradas.map(o => ({
        valor: o.id,
        etiqueta: getObraDisplayName(o)
    }));

    const opcionesClientes = clientesRegistrados.map(c => ({
        valor: c.id,
        etiqueta: getClienteDisplayName(c)
    }));

    // Definimos los CAMPOS dentro del componente para que puedan usar las variables de arriba
    const CAMPOS: CampoFormulario[] = [
        { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
        { nombre: 'tipo', etiqueta: 'Tipo (Transferencia, Cheque...)', requerido: false },
        { nombre: 'documento', etiqueta: 'Documento', requerido: false },
        { nombre: 'num_documento', etiqueta: 'Nº Documento', requerido: false },
        { nombre: 'importe', etiqueta: 'Importe (€)', tipo: 'number', requerido: true },

        // Desplegable dinámico relacional (Obras)
        {
            nombre: 'obra_id',
            etiqueta: 'Obra Asignada (opcional)',
            tipo: 'select',
            opciones: opcionesObras,
            requerido: false
        },

        // Desplegable dinámico relacional (Clientes)
        {
            nombre: 'cliente_id',
            etiqueta: 'Cliente (opcional)',
            tipo: 'select',
            opciones: opcionesClientes,
            requerido: false
        },
    ];

    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    function handleSubmit(datos: IngresoFormValues) {
        ingresoService.create(datos);
        mostrarToast('Ingreso registrado correctamente');
        navigate('/consultar/ingresos');
    }

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Nuevo Ingreso</h1>
            <p className="text-slate-400 mt-1">Registra un cobro recibido, opcionalmente vinculado a una obra.</p>
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
