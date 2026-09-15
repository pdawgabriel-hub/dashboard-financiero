import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../../contextos/ToastContext/ToastContext";
import FormularioCRUD, { type CampoFormulario} from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";

import { ingresoSchema, type IngresoFormValues } from "../../../schemas/IngresoSchema/IngresoSchema";
import { ingresoService } from "../../../servicios/IngresoService/IngresoService";
import type { Ingreso } from "../../../types/Ingreso/Ingreso";
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";
import { clienteService, getClienteDisplayName } from "../../../servicios/ClienteService/ClienteService";

export default function PaginaEditarIngreso() {
    const obrasRegistradas = obraService.getAll();
    const clientesRegistrados = clienteService.getAll();

    const opcionesObras = obrasRegistradas.map(o => ({
        valor: o.id,
        etiqueta: getObraDisplayName(o)
    }));

    const opcionesClientes = clientesRegistrados.map(c => ({
        valor: c.id,
        etiqueta: getClienteDisplayName(c)
    }));

    const CAMPOS: CampoFormulario[] = [
        { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
        { nombre: 'tipo', etiqueta: 'Tipo (Transferencia, Cheque...)', requerido: false },
        { nombre: 'documento', etiqueta: 'Documento', requerido: false },
        { nombre: 'num_documento', etiqueta: 'Nº Documento', requerido: false },
        { nombre: 'importe', etiqueta: 'Importe (€)', tipo: 'number', requerido: true },
        {
            nombre: 'obra_id',
            etiqueta: 'Obra Asignada (opcional)',
            tipo: 'select',
            opciones: opcionesObras,
            requerido: false
        },
        {
            nombre: 'cliente_id',
            etiqueta: 'Cliente (opcional)',
            tipo: 'select',
            opciones: opcionesClientes,
            requerido: false
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
        ingresoService.update(id, datos);
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
                nombre={ingreso.num_documento ?? ingreso.id}
                onCancelar={() => setMostrarConfirmar(false)}
                onConfirmar={handleEliminar}
            />
        </div>
    );
}
