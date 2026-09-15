import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import { especialistaSchema, type EspecialistaFormValues } from "../../../schemas/EspecialistaSchema/EspecialistaSchema";
import { especialistaService } from "../../../servicios/EspecialistaService/EspecialistaService";
import { useToast } from "../../../contextos/ToastContext/ToastContext";
import type { Especialista } from "../../../types/Especialista/Especialista";

const CAMPOS: CampoFormulario[] = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
  { nombre: 'tipo', etiqueta: 'Tipo', requerido: false },
  { nombre: 'ref', etiqueta: 'Referencia', requerido: false },
  { nombre: 'telf', etiqueta: 'Teléfono', tipo: 'tel', requerido: false },
  { nombre: 'correo', etiqueta: 'Correo', tipo: 'email', requerido: false },
  { nombre: 'comunicacionParte', etiqueta: 'Comunicación del parte', requerido: false },
  { nombre: 'importe', etiqueta: 'Importe', tipo: 'number', requerido: false },
  { nombre: 'observaciones', etiqueta: 'Observaciones', tipo: 'textarea', requerido: false },
];

export default function PaginaEditarEspecialista() {

    // Captura el id de la URL
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [especialista, setEspecialista] = useState<Especialista | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = especialistaService.getById(id);
        setEspecialista(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: EspecialistaFormValues) {
        if (!id) return;
        especialistaService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/especialistas');
    }

    function handleEliminar() {
        if (!id) return;
        especialistaService.remove(id);
        mostrarToast('Especialista eliminado');
        navigate('/consultar/especialistas');
    }

    if (especialista === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (especialista === null) {
        return <p className="text-slate-500">No se encontró al especialista solicitado.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-2xl font-bold text-slate-100">Editar especialista</h1>
            <p className="text-slate-400 mt-1">{especialista.id}</p>
        </div>

        <FormularioCRUD
            schema={especialistaSchema}
            campos={CAMPOS}
            valoresIniciales={especialista}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
        />

        <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={`${especialista.nombre}`.trim()}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
        />
        </div>
    );
  
}
