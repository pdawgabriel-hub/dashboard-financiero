import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { ingresoService } from "../../../servicios/IngresoService/IngresoService";
import type { Ingreso } from "../../../types/Ingreso/Ingreso";

export default function PaginaIngresos() {

    const [ingresos, setIngresos] = useState<Ingreso[]>([]);

    useEffect(() => {
        setIngresos(ingresoService.getAll());
    }, []);

    const items = ingresos.map((i) => ({
        id: i.id,
        titulo: i.numero_factura,
        textoBusqueda: `${i.id} ${i.numero_factura} ${i.fecha_emision}`,
        campos: [
            {etiqueta: 'Numero Factura', valor: i.numero_factura},
            {etiqueta: 'Fecha Emision', valor: i.fecha_emision},
            {etiqueta: 'Importe Neto', valor: `${i.importe_neto}`},
            {etiqueta: 'Porcentaje IVA', valor: `${i.iva_porcentaje}`},
            {etiqueta: 'Total con Iva', valor: `${i.total_con_iva}`},
            {etiqueta: 'Estado del Pago', valor:i.estado_pago},
            {etiqueta: 'Obra', valor: i.obra_id},
            {etiqueta: 'Cliente', valor: i.cliente_id},
        ],
    }));

    return (
        <div className="flex flex-col gap-6">
            <div>
            <h1 className="text-2xl font-bold text-slate-100">Ingresos</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona tus ingresos.</p>
          </div>
        
        <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/ingresos/editar"
            nombreVacio="No hay ingresos que coincidan con la búsqueda."
              />
        </div> 
    );
}