import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioPresupuesto from "../../../componentes/Crud/FormularioPresupuesto/FormularioPresupuesto";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import type { PresupuestoFormValues } from "../../../schemas/PresupuestoSchema/PresupuestoSchema";
import { presupuestoService, getPresupuestoDisplayName } from "../../../servicios/PresupuestoService/PresupuestoService";
import type { Presupuesto } from "../../../types/Presupuesto/Presupuesto";

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
            <p className="text-slate-400 mt-1">{getPresupuestoDisplayName(presupuesto)}</p>
        </div>

        <FormularioPresupuesto
            valoresIniciales={{
                ...presupuesto,
                lineas: presupuesto.lineas.map(({ descripcion, uds, precio }) => ({ descripcion, uds, precio })),
            }}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
        />

        <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={presupuesto.nombre_cliente}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
        />
        </div>
    );

}
