import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { ingresoService, getIngresoAnio } from "../../../servicios/IngresoService/IngresoService";
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";
import { clienteService, getClienteDisplayName } from "../../../servicios/ClienteService/ClienteService";
import type { Ingreso } from "../../../types/Ingreso/Ingreso";

export default function PaginaIngresos() {

    const [ingresos, setIngresos] = useState<Ingreso[]>([]);

    useEffect(() => {
        setIngresos(ingresoService.getAll());
    }, []);

    const obras = obraService.getAll();
    const clientes = clienteService.getAll();

    const items = ingresos.map((i) => {
        const obra = obras.find((o) => o.id === i.obra_id);
        const cliente = clientes.find((c) => c.id === i.cliente_id);

        return {
            id: i.id,
            titulo: i.num_documento || i.id,
            textoBusqueda: `${i.id} ${i.num_documento ?? ''} ${i.fecha} ${i.tipo ?? ''}`,
            campos: [
                {etiqueta: 'Fecha', valor: i.fecha},
                {etiqueta: 'Año', valor: `${getIngresoAnio(i) ?? '-'}`},
                {etiqueta: 'Tipo', valor: i.tipo || 'Sin tipo'},
                {etiqueta: 'Documento', valor: i.num_documento || 'Sin documento'},
                {etiqueta: 'Importe', valor: `${i.importe}€`},
                {etiqueta: 'Obra', valor: obra ? getObraDisplayName(obra) : 'Sin obra vinculada'},
                {etiqueta: 'Cliente', valor: cliente ? getClienteDisplayName(cliente) : 'Sin cliente vinculado'},
            ],
        };
    });

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Ingresos</h1>
                <p className="text-slate-400 mt-1">Consulta y gestiona los cobros recibidos.</p>
            </div>

            <GridConsulta
                items={items}
                rutaBaseEdicion="/consultar/ingresos/editar"
                nombreVacio="No hay ingresos que coincidan con la búsqueda."
            />
        </div>
    );
}
