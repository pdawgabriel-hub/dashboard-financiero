import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../../contextos/ToastContext/ToastContext";
import FormularioCRUD, { type CampoFormulario} from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";

import { ingresoSchema, type IngresoFormValues } from "../../../schemas/IngresoSchema/IngresoSchema";
import { ingresoService } from "../../../servicios/IngresoService/IngresoService";
import type { Ingreso } from "../../../types/Ingreso/Ingreso";
import { obraService } from "../../../servicios/ObraService/ObraService"; 
import { clienteService } from "../../../servicios/ClienteService/ClienteService";

export default function PaginaEditarIngreso() {
    const obrasRegistradas = obraService.getAll();
    const clientesRegistrados = clienteService.getAll();

    const opcionesObras = obrasRegistradas.map(o => ({ 
        valor: o.id, 
        etiqueta: String(o.id)
    }));

    const opcionesClientes = clientesRegistrados.map(c => ({ 
        valor: c.id, 
        etiqueta: String(c.id)
    }));

    const CAMPOS: CampoFormulario[] = [
        { nombre: 'numero_factura', etiqueta: 'Número Factura', requerido: true },
        { nombre: 'fecha_emision', etiqueta: 'Fecha Emisión', requerido: true },
        { nombre: 'importe_neto', etiqueta: 'Importe Neto', requerido: true },
        { nombre: 'iva_porcentaje', etiqueta: 'Porcentaje IVA', requerido: true },
        { nombre: 'total_con_iva', etiqueta: 'Total con IVA (Auto)' },
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
        { 
            nombre: 'obra_id', 
            etiqueta: 'Obra Asignada', 
            tipo: 'select', 
            opciones: opcionesObras,
            requerido: true 
        },
        { 
            nombre: 'cliente_id', 
            etiqueta: 'Cliente', 
            tipo: 'select', 
            opciones: opcionesClientes,
            requerido: true 
        },
    ];

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [ingreso, setIngreso] = useState<Ingreso | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = ingresoService.getById(id);
        setIngreso(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: IngresoFormValues) {
        if (!id) return;
        // Casteo explícito seguro del estado_pago para acoplarlo al tipo estricto de Ingreso
        const datosActualizados = {
            ...datos,
            estado_pago: datos.estado_pago as "pendiente" | "cobrado"
        };
        ingresoService.update(id, datosActualizados);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/ingresos');
    }

    function handleEliminar() {
        if (!id) return;
        ingresoService.remove(id);
        mostrarToast('Ingreso eliminado');
        navigate('/consultar/ingresos');
    }

    if (ingreso === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (ingreso === null) {
        return <p className="text-slate-500">No se encontró el ingreso solicitado.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Editar ingreso</h1>
                <p className="text-slate-400 mt-1">{ingreso.id}</p>
            </div>

            <FormularioCRUD
                schema={ingresoSchema}
                campos={CAMPOS}
                valoresIniciales={ingreso}
                onSubmit={handleSubmit}
                textoBoton="Guardar cambios"
                onEliminar={() => setMostrarConfirmar(true)}
            />

            <ConfirmarEliminar
                abierto={mostrarConfirmar}
                nombre={`${ingreso.numero_factura}`.trim()}
                onCancelar={() => setMostrarConfirmar(false)}
                onConfirmar={handleEliminar}
            />
        </div>
    );
}