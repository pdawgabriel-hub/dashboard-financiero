import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";

import { presupuestoSchema, type PresupuestoFormValues } from "../../../schemas/PresupuestoSchema/PresupuestoSchema";
import { presupuestoService } from "../../../servicios/PresupuestoService/PresupuestoService";

import { useToast } from "../../../contextos/ToastContext/ToastContext";
import type { Presupuesto } from "../../../types/Presupuesto/Presupuesto";

const CAMPOS: CampoFormulario[] = [
    { nombre: 'titulo', etiqueta: 'Titulo', requerido: true },
    { nombre: 'fecha_emision', etiqueta: 'Fecha Emision', requerido: true },
    { nombre: 'importe_total', etiqueta: 'Importe Total', requerido: true },
    { nombre: 'estado', etiqueta: 'Estado', requerido: true },
    { nombre: 'cliente_id', etiqueta: 'Cliente', requerido: true },
];

export default function PaginaEditarPresupuesto() {

    // Captura el id de la URL
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [presupuesto, setPresupuesto] = useState<Presupuesto | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = presupuestoService.getById(id);
        setPresupuesto(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: PresupuestoFormValues) {
        if (!id) return;
        presupuestoService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/presupuestos');
    }

    function handleEliminar() {
        if (!id) return;
        presupuestoService.remove(id);
        mostrarToast('Presupuesto eliminado');
        navigate('/consultar/presupuestos');
    }

    if (presupuesto === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (presupuesto === null) {
        return <p className="text-slate-500">No se encontró el presupuesto solicitado.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-2xl font-bold text-slate-100">Editar presupuesto</h1>
            <p className="text-slate-400 mt-1">{presupuesto.id}</p>
        </div>

        <FormularioCRUD
            schema={presupuestoSchema}
            campos={CAMPOS}
            valoresIniciales={presupuesto}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
        />

        <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={`${presupuesto.importe_total} ${presupuesto.importe_total ?? ''}`.trim()}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
        />
        </div>
    );
  
}
