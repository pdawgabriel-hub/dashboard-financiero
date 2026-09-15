import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../../contextos/ToastContext/ToastContext";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";

import { parteEspecialistaSchema, type ParteEspecialistaFormValues } from "../../../schemas/ParteEspecialistaSchema/ParteEspecialistaSchema";
import { parteEspecialistaService } from "../../../servicios/ParteEspecialistaService/ParteEspecialistaService";
import type { ParteEspecialista } from "../../../types/ParteEspecialista/ParteEspecialista";
import { especialistaService, getEspecialistaDisplayName } from "../../../servicios/EspecialistaService/EspecialistaService";
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";

export default function PaginaEditarParteEspecialista() {

  const especialistasRegistrados = especialistaService.getAll();
  const obrasRegistradas = obraService.getAll();

  // Array de configuracion
  const CAMPOS: CampoFormulario[] = [
    { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
    { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: false },
    { nombre: 'documento', etiqueta: 'Documento (factura)', requerido: false },
    { nombre: 'importe', etiqueta: 'Importe (€)', tipo: 'number', requerido: true },
    {
      nombre: 'estado_pago',
      etiqueta: 'Estado de Pago',
      tipo: 'select' as const,
      opciones: [
        { valor: 'pendiente', etiqueta: 'Pendiente' },
        { valor: 'pagado', etiqueta: 'Pagado' },
      ],
      requerido: true
    },
    {
      nombre: 'especialista_id',
      etiqueta: 'Especialista Asignado',
      tipo: 'select' as const,
      opciones: especialistasRegistrados.map(e => ({ valor: e.id, etiqueta: getEspecialistaDisplayName(e) })),
      requerido: true
    },
    {
      nombre: 'obra_id',
      etiqueta: 'Obra Vinculada',
      tipo: 'select' as const,
      opciones: obrasRegistradas.map(o => ({ valor: o.id, etiqueta: getObraDisplayName(o) })),
      requerido: true
    }
  ];

  // Captura el id de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mostrarToast } = useToast();

  const [parte, setParte] = useState<ParteEspecialista | null | undefined>(undefined);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  useEffect(() => {
    if (!id) return;
    const encontrado = parteEspecialistaService.getById(id);
    setParte(encontrado ?? null);
  }, [id]);

  function handleSubmit(datos: ParteEspecialistaFormValues) {
    if (!id) return;
    parteEspecialistaService.update(id, datos);
    mostrarToast('Cambios guardados correctamente');
    navigate('/consultar/partes-especialista');
  }

  function handleEliminar() {
    if (!id) return;
    parteEspecialistaService.remove(id);
    mostrarToast('Parte de especialista eliminado');
    navigate('/consultar/partes-especialista');
  }

  if (parte === undefined) {
    return <p className="text-slate-500">Cargando...</p>;
  }

  if (parte === null) {
    return <p className="text-slate-500">No se encontró el parte de especialista solicitado.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Editar parte de especialista</h1>
        <p className="text-slate-400 mt-1">{parte.id}</p>
      </div>

      <FormularioCRUD
        schema={parteEspecialistaSchema}
        campos={CAMPOS}
        valoresIniciales={parte}
        onSubmit={handleSubmit}
        textoBoton="Guardar cambios"
        onEliminar={() => setMostrarConfirmar(true)}
      />

      <ConfirmarEliminar
        abierto={mostrarConfirmar}
        nombre={`${parte.descripcion ?? parte.id}`.trim()}
        onCancelar={() => setMostrarConfirmar(false)}
        onConfirmar={handleEliminar}
      />
    </div>
  );

}
