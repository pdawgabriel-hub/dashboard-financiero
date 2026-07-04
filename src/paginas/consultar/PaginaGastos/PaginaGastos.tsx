import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { gastoService } from "../../../servicios/GastoService/GastoService";
import type { Gasto } from "../../../types/Gasto/Gasto";

export default function PaginaGastos() {

    const [gastos, setGastos] = useState<Gasto[]>([]);

    useEffect(() => {
        setGastos(gastoService.getAll());
    }, []);

    const items = gastos.map((g) => ({
        id: g.id,
        titulo: `${g.fecha}`,
        textoBusqueda: `${g.fecha} ${g.id} ${g.proveedor_id} ${g.obra_id}`,
        campos: [
            {etiqueta: 'Concepto', valor: g.concepto},
            {etiqueta: 'Fecha', valor: g.fecha},
            {etiqueta: 'Importe Neto', valor: `${g.importe_neto}`},
            {etiqueta: 'Porcentaje Iva', valor: `${g.iva_porcentaje}`},
            {etiqueta: 'Total con Iva', valor: `${g.total_con_iva}`},
            {etiqueta: 'Obra', valor: g.obra_id},
            {etiqueta: 'Proveedor', valor: g.proveedor_id || 'Sin Proveedor'},
        ],
    }));

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Gastos</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona tus gastos.</p>
            </div>
        
          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/gastos/editar"
            nombreVacio="No hay gastos que coincidan con la búsqueda."
            />
        </div>
    )
}