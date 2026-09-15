import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { gastoService } from "../../../servicios/GastoService/GastoService";
import { obraService, getObraDisplayName } from "../../../servicios/ObraService/ObraService";
import type { Obra } from "../../../types/Obra/Obra";

export default function PaginaGastos() {

    const [obras, setObras] = useState<Obra[]>([]);

    useEffect(() => {
        setObras(obraService.getAll());
    }, []);

    // La ficha de Gastos es 1:1 con la Obra: se recorren las obras y se obtiene
    // (o se crea) su ficha, en vez de listar registros sueltos de gastoService.
    const items = obras.map((obra) => {
        const gasto = gastoService.obtenerOCrearFicha(obra.id);
        const ingresos = gastoService.getIngresos(gasto);
        const gastos = gastoService.getGastosTotales(gasto);
        const beneficio = gastoService.getBeneficioReal(gasto);
        const debe = gastoService.getDebe(gasto);
        const estado = gastoService.getEstado(gasto);

        return {
            id: obra.id,
            titulo: getObraDisplayName(obra),
            estado,
            textoBusqueda: `${obra.id} ${obra.descripcion} ${estado}`,
            campos: [
                {etiqueta: 'Ingresos cobrados', valor: `${ingresos.toFixed(2)}€`},
                {etiqueta: 'Gastos', valor: `${gastos.toFixed(2)}€`},
                {etiqueta: 'Beneficio real', valor: `${beneficio.toFixed(2)}€`},
                {etiqueta: 'Pendiente de cobro', valor: `${debe.toFixed(2)}€`},
                {etiqueta: 'Estado', valor: estado},
            ],
        };
    });

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Gastos</h1>
            <p className="text-slate-400 mt-1">Ficha de seguimiento financiero de cada obra (ingresos, gastos y beneficio real).</p>
            </div>

          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/gastos/editar"
            nombreVacio="No hay obras dadas de alta."
            tipoEstado="gasto"
            />
        </div>
    )
}
