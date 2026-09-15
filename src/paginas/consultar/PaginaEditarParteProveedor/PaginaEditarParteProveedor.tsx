import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../../contextos/ToastContext/ToastContext";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";

import { parteProveedorSchema, type ParteProveedorFormValues } from "../../../schemas/ParteProveedorSchema/ParteProveedorSchema";
import { parteProveedorService } from "../../../servicios/ParteProveedorService/ParteProveedorService";
import type { ParteProveedor } from "../../../types/ParteProveedor/ParteProveedor";
import { proveedorService, getProveedorDisplayName } from "../../../servicios/ProveedorService/ProveedorService";
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";

export default function PaginaEditarParteProveedor() {

  const proveedoresRegistrados = proveedorService.getAll();
  const obrasRegistradas = obraService.getAll();

  // Array de configuracion
  const CAMPOS: CampoFormulario[] = [
    { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
    { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: false },
    { nombre: 'documento', etiqueta: 'Documento (factura/albarán)', requerido: false },
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
      nombre: 'proveedor_id',
      etiqueta: 'Proveedor Asignado',
      tipo: 'select' as const,
      opciones: proveedoresRegistrados.map(p => ({ valor: p.id, etiqueta: getProveedorDisplayName(p) })),
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

  const [parte, setParte] = useState<ParteProveedor | null | undefined>(undefined);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  useEffect(() => {
    if (!id) return;
    const encontrado = parteProveedorService.getById(id);
    setParte(encontrado ?? null);
  }, [id]);

  function handleSubmit(datos: ParteProveedorFormValues) {
    if (!id) return;
    parteProveedorService.update(id, datos);
    mostrarToast('Cambios guardados correctamente');
    navigate('/consultar/partes-proveedor');
  }

  function handleEliminar() {
    if (!id) return;
    parteProveedorService.remove(id);
    mostrarToast('Parte de proveedor eliminado');
    navigate('/consultar/partes-proveedor');
  }

  if (parte === undefined) {
    return <p className="text-slate-500">Cargando...</p>;
  }

  if (parte === null) {
    return <p className="text-slate-500">No se encontró el parte de proveedor solicitado.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Editar parte de proveedor</h1>
        <p className="text-slate-400 mt-1">{parte.id}</p>
      </div>

      <FormularioCRUD
        schema={parteProveedorSchema}
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
