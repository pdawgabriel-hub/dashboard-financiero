import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import { faltaSchema, type FaltaFormValues } from "../../../schemas/FaltaSchema/FaltaSchema";
import { faltaService, getFaltaDias, getFaltaTrabajadorNombreCompleto } from "../../../servicios/FaltaService/FaltaService";
import type { Falta } from "../../../types/Falta/Falta";
import { trabajadorService, getTrabajadorDisplayName } from "../../../servicios/TrabajadorService/TrabajadorService";

const OPCIONES_TIPO = [
    { valor: 'vacaciones', etiqueta: 'Vacaciones' },
    { valor: 'baja_medica', etiqueta: 'Baja médica' },
    { valor: 'personal', etiqueta: 'Personal' },
    { valor: 'injustificada', etiqueta: 'Injustificada' },
    { valor: 'otro', etiqueta: 'Otro' },
];

export default function PaginaEditarFalta() {

    const trabajadoresRegistrados = trabajadorService.getAll();

    const CAMPOS: CampoFormulario[] = [
        { nombre: 'fecha_inicio', etiqueta: 'Fecha Inicio', requerido: true },
        { nombre: 'fecha_fin', etiqueta: 'Fecha Fin', requerido: true },
        { nombre: 'tipo', etiqueta: 'Tipo', tipo: 'select' as const, opciones: OPCIONES_TIPO, requerido: true },
        { nombre: 'motivo', etiqueta: 'Motivo', tipo: 'textarea', requerido: false },
        {
            nombre: 'trabajador_id',
            etiqueta: 'Trabajador',
            tipo: 'select' as const,
            buscable: true,
            opciones: trabajadoresRegistrados.map(t => ({ valor: t.id, etiqueta: getTrabajadorDisplayName(t) })),
            requerido: true
        },
    ];

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [falta, setFalta] = useState<Falta | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrada = faltaService.getById(id);
        setFalta(encontrada ?? null);
    }, [id]);

    function handleSubmit(datos: FaltaFormValues) {
        if (!id) return;
        faltaService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/faltas');
    }

    function handleEliminar() {
        if (!id) return;
        faltaService.remove(id);
        mostrarToast('Falta eliminada');
        navigate('/consultar/faltas');
    }

    if (falta === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (falta === null) {
        return <p className="text-slate-500">No se encontró la falta solicitada.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Editar falta</h1>
            <p className="text-slate-400 mt-1">{falta.id} · {getFaltaDias(falta)} día(s)</p>
          </div>

          <FormularioCRUD
            schema={faltaSchema}
            campos={CAMPOS}
            valoresIniciales={falta}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
          />

          <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={`${getFaltaTrabajadorNombreCompleto(falta)} · ${falta.fecha_inicio}`.trim()}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
          />
        </div>
      );

}
