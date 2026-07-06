import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import { parteTrabajoSchema, type ParteTrabajoFormValues } from "../../../schemas/ParteTrabajoSchema/ParteTrabajoSchema";
import { parteTrabajoService } from "../../../servicios/ParteTrabajoService/ParteTrabajoService";
import { useToast } from "../../../contextos/ToastContext/ToastContext";
import type { ParteTrabajo } from "../../../types/ParteTrabajo/ParteTrabajo";

const CAMPOS: CampoFormulario[] = [
    { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
    { nombre: 'horas', etiqueta: 'Horas', requerido: true },
    { nombre: 'descripcion', etiqueta: 'Descripcion', requerido: false },
    { nombre: 'trabajador_id', etiqueta: 'Trabajador', requerido: true },
    { nombre: 'obra_id', etiqueta: 'Obra', requerido: true },
];


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
        <p className="text-slate-400 mt-1">{parteTrabajo.id}</p>
      </div>

      <FormularioCRUD
        schema={parteTrabajoSchema}
        campos={CAMPOS}
        valoresIniciales={parteTrabajo}
        onSubmit={handleSubmit}
        textoBoton="Guardar cambios"
        onEliminar={() => setMostrarConfirmar(true)}
      />

      <ConfirmarEliminar
        abierto={mostrarConfirmar}
        nombre={`${parteTrabajo.fecha} ${parteTrabajo.horas ?? ''}`.trim()}
        onCancelar={() => setMostrarConfirmar(false)}
        onConfirmar={handleEliminar}
      />
    </div>
  );

}