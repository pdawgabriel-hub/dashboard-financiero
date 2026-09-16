import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Printer } from "lucide-react";

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
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Editar parte de trabajo</h1>
          <p className="text-slate-400 mt-1">{parteTrabajo.id} · {parteTrabajo.horas_totales}h · {parteTrabajo.coste_total_parte.toFixed(2)}€</p>
        </div>
        <Link
          to={`/consultar/partes-trabajo/imprimir/${parteTrabajo.id}`}
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors shrink-0"
        >
          <Printer className="w-4 h-4" />
          Imprimir
        </Link>
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
