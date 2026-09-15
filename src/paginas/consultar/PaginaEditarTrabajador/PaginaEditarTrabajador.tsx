import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCRUD from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import ListaRelacionados from "../../../componentes/Crud/ListaRelacionados/ListaRelacionados";
import { trabajadorSchema, type trabajadorFormValues } from "../../../schemas/TrabajadorSchema/TrabajadorSchema";
import { trabajadorService } from "../../../servicios/TrabajadorService/TrabajadorService";
import { parteTrabajoService } from "../../../servicios/ParteTrabajoService/ParteTrabajoService";
import { faltaService } from "../../../servicios/FaltaService/FaltaService";
import { useToast } from "../../../contextos/ToastContext/ToastContext";
import type { Trabajador } from "../../../types/Trabajador/Trabajador";
import type { CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";

const ETIQUETAS_TIPO_FALTA: Record<string, string> = {
    vacaciones: 'Vacaciones',
    baja_medica: 'Baja médica',
    personal: 'Personal',
    injustificada: 'Injustificada',
    otro: 'Otro',
};

// Array de configuarion
const CAMPOS: CampoFormulario[] = [
    {nombre: 'tipo', etiqueta: 'Tipo', requerido: false},
    {nombre: 'nombre', etiqueta: 'Nombre', requerido: true},
    {nombre: 'apellido', etiqueta: 'Apellido', requerido: true},
    {nombre: 'telf', etiqueta: 'Teléfono', tipo: 'tel', requerido: false},
    {nombre: 'coste_hora_estandar', etiqueta: 'Coste hora estandar', tipo: 'number', requerido: true},
];

export default function PaginaEditarTrabajador() {
    
    // Captura el id de la URL
    const { id } = useParams<{ id: string}>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [trabajador, setTrabajador] = useState<Trabajador | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = trabajadorService.getById(id);
        setTrabajador(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: trabajadorFormValues) {
        if (!id) return;
        trabajadorService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/trabajadores');
    }

    function handleEliminar() {
        if (!id) return;
        trabajadorService.remove(id);
        mostrarToast('Trabajador Eliminado');
        navigate('/consultar/trabajadores');
    }

    if (trabajador === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (trabajador === null) {
        return <p className="text-slate-500">No se encontró el trabajador solicitado.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Editar Trabajador</h1>
            <p className="text-slate-400 mt-1">{trabajador.id}</p>
          </div>
    
          <FormularioCRUD
            schema={trabajadorSchema}
            campos={CAMPOS}
            valoresIniciales={trabajador}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
          />
    
          <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={`${trabajador.nombre} ${trabajador.apellido ?? ''}`.trim()}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
          />

          <ListaRelacionados
            secciones={[
              {
                titulo: 'Partes de Trabajo',
                items: parteTrabajoService.getAll()
                  .filter((p) => p.lineas.some((l) => l.trabajador_id === trabajador.id))
                  .map((p) => ({ id: p.id, etiqueta: `${p.fecha} · ${p.descripcion}`, ruta: `/consultar/partes-trabajo/editar/${p.id}` })),
              },
              {
                titulo: 'Faltas',
                items: faltaService.getAll()
                  .filter((f) => f.trabajador_id === trabajador.id)
                  .map((f) => ({ id: f.id, etiqueta: `${ETIQUETAS_TIPO_FALTA[f.tipo]} · ${f.fecha_inicio} → ${f.fecha_fin}`, ruta: `/consultar/faltas/editar/${f.id}` })),
              },
            ]}
          />
        </div>
      );

}