import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import { obraSchema, type ObraFormValues } from "../../../schemas/ObraSchema/ObraSchema";
import { obraService } from "../../../servicios/ObraService/ObraService";
import type { Obra } from "../../../types/Obra/Obra";
import { clienteService } from "../../../servicios/ClienteService/ClienteService";
import { presupuestoService } from "../../../servicios/PresupuestoService/PresupuestoService";

export default function PaginaEditarObra() {

    const clientesRegistrados = clienteService.getAll();
    const presupuestosRegistrados = presupuestoService.getAll();

    // Array de configuracion
    const CAMPOS: CampoFormulario[] = [
        { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
        { nombre: 'direccion', etiqueta: 'Direccion', requerido: true },
        { nombre: 'fecha_inicio', etiqueta: 'Fecha Inicio', requerido: true },
        { nombre: 'fecha_fin_prevista', etiqueta: 'Fecha Fin Prevista', requerido: true },
        { 
            nombre: 'estado', 
            etiqueta: 'Estado', 
            tipo: 'select' as const,
            opciones: [
            { valor: 'planificada', etiqueta: 'Planificada' },
            { valor: 'en_progreso', etiqueta: 'En Progreso' },
            { valor: 'pausada', etiqueta: 'Pausada' },
            { valor: 'finalizada', etiqueta: 'Finalizada' }
            ],
            requerido: true
        },
        {
            nombre: 'cliente_id',
            etiqueta: 'Cliente Asignado (ID)',
            tipo: 'select' as const,
            opciones: clientesRegistrados.map(c => ({ valor: c.id, etiqueta: String(c.id) })),
            requerido: true
        },
        {
            nombre: 'presupuesto_id',
            etiqueta: 'Presupuesto Vinculado (ID)',
            tipo: 'select' as const,
            opciones: presupuestosRegistrados.map(p => ({ valor: p.id, etiqueta: String(p.id) })),
            requerido: true
        }
    ];

    // Captura el id de la URL
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [obra, setObra] = useState<Obra | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = obraService.getById(id);
        setObra(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: ObraFormValues) {
        if (!id) return;
        obraService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/obras');
    }

    function handleEliminar() {
        if (!id) return;
        obraService.remove(id);
        mostrarToast('Obra eliminado');
        navigate('/consultar/obras');
    }

    if (obra === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (obra === null) {
        return <p className="text-slate-500">No se encontró la obra solicitado.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-2xl font-bold text-slate-100">Editar obra</h1>
            <p className="text-slate-400 mt-1">{obra.id}</p>
        </div>

        <FormularioCRUD
            schema={obraSchema}
            campos={CAMPOS}
            valoresIniciales={obra}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
        />

        <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={`${obra.nombre}`.trim()}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
        />
        </div>
    );
  
}