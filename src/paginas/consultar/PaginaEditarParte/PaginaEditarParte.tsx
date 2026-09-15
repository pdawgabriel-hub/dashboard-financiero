import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioParteTrabajo from "../../../componentes/Crud/FormularioParteTrabajo/FormularioParteTrabajo";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import type { ParteTrabajoFormValues } from "../../../schemas/ParteTrabajoSchema/ParteTrabajoSchema";
import { parteTrabajoService } from "../../../servicios/ParteTrabajoService/ParteTrabajoService";
import type { ParteTrabajo } from "../../../types/ParteTrabajo/ParteTrabajo";

export default function PaginaEditarParte() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [parteTrabajo, setParteTrabajo] = useState<ParteTrabajo | null | undefined>(undefined);
    const [ mostrarConfirmar, setMostrarConfirmar ] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = parteTrabajoService.getById(id);
        setParteTrabajo(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: ParteTrabajoFormValues) {
        if (!id) return;
        parteTrabajoService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/partes');
    }

    function handleEliminar() {
        if (!id) return;
        parteTrabajoService.remove(id);
        mostrarToast('Parte de Trabajo eliminado');
        navigate('/consultar/partes');
    }

    if (parteTrabajo === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (parteTrabajo === null) {
        return <p className="text-slate-500">No se encontró el parte de trabajo solicitado.</p>;
    }

    return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Editar parte de trabajo</h1>
        <p className="text-slate-400 mt-1">{parteTrabajo.id} · {parteTrabajo.horas_totales}h · {parteTrabajo.coste_total_parte.toFixed(2)}€</p>
      </div>

      <FormularioParteTrabajo
        valoresIniciales={{
            ...parteTrabajo,
            lineas: parteTrabajo.lineas.map(({ trabajador_id, horas, coste_hora }) => ({ trabajador_id, horas, coste_hora })),
        }}
        onSubmit={handleSubmit}
        textoBoton="Guardar cambios"
        onEliminar={() => setMostrarConfirmar(true)}
      />

      <ConfirmarEliminar
        abierto={mostrarConfirmar}
        nombre={`${parteTrabajo.fecha} · ${parteTrabajo.descripcion}`.trim()}
        onCancelar={() => setMostrarConfirmar(false)}
        onConfirmar={handleEliminar}
      />
    </div>
  );

}
