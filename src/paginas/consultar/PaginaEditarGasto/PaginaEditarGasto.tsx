import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../../contextos/ToastContext/ToastContext";
import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";

import { gastoSchema, type GastoFormValues } from "../../../schemas/GastoSchema/GastoSchema";
import { gastoService } from "../../../servicios/GastoService/GastoService";
import type { Gasto } from "../../../types/Gasto/Gasto";

// Array de configuracion
const CAMPOS: CampoFormulario[] = [
  { nombre: 'concepto', etiqueta: 'Concepto', requerido: true },
  { nombre: 'fecha', etiqueta: 'Fecha', requerido: true },
  { nombre: 'importe_neto', etiqueta: 'Importe Neto', requerido: true },
  { nombre: 'iva_porcentaje', etiqueta: 'Porcentaje IVA', requerido: true },
  { nombre: 'total_con_iva', etiqueta: 'Total con IVA' },
  { nombre: 'obra_id', etiqueta: 'Obra', requerido: true },
  { nombre: 'proveedor_id', etiqueta: 'Proveedor' },
];

export default function PaginaEditarGasto() {

  // Captura el id de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mostrarToast } = useToast();

  const [gasto, setGasto] = useState<Gasto | null | undefined>(undefined);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  useEffect(() => {
    if (!id) return;
    const encontrado = gastoService.getById(id);
    setGasto(encontrado ?? null);
  }, [id]);

  function handleSubmit(datos: GastoFormValues) {
    if (!id) return;
    gastoService.update(id, datos);
    mostrarToast('Cambios guardados correctamente');
    navigate('/consultar/gastos');
  }

  function handleEliminar() {
    if (!id) return;
    gastoService.remove(id);
    mostrarToast('Gasto eliminado');
    navigate('/consultar/gastos');
  }

  if (gasto === undefined) {
    return <p className="text-slate-500">Cargando...</p>;
  }

  if (gasto === null) {
    return <p className="text-slate-500">No se encontró el gasto solicitado.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Editar gasto</h1>
        <p className="text-slate-400 mt-1">{gasto.id}</p>
      </div>

      <FormularioCRUD
        schema={gastoSchema}
        campos={CAMPOS}
        valoresIniciales={gasto}
        onSubmit={handleSubmit}
        textoBoton="Guardar cambios"
        onEliminar={() => setMostrarConfirmar(true)}
      />

      <ConfirmarEliminar
        abierto={mostrarConfirmar}
        nombre={`${gasto.concepto}`.trim()}
        onCancelar={() => setMostrarConfirmar(false)}
        onConfirmar={handleEliminar}
      />
    </div>
  );
  
}
