import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { parteEspecialistaService } from "../../../servicios/ParteEspecialistaService/ParteEspecialistaService";
import { getEspecialistaDisplayName, especialistaService } from "../../../servicios/EspecialistaService/EspecialistaService";
import { getObraDisplayName, obraService } from "../../../servicios/ObraService/ObraService";
import type { ParteEspecialista } from "../../../types/ParteEspecialista/ParteEspecialista";

export default function PaginaPartesEspecialista() {

    const [partes, setPartes] = useState<ParteEspecialista[]>([]);

    useEffect(() => {
        setPartes(parteEspecialistaService.getAll());
    }, []);

    const especialistas = especialistaService.getAll();
    const obras = obraService.getAll();

    const items = partes.map((p) => {
        const especialista = especialistas.find((e) => e.id === p.especialista_id);
        const obra = obras.find((o) => o.id === p.obra_id);

        return {
            id: p.id,
            titulo: especialista ? getEspecialistaDisplayName(especialista) : p.especialista_id,
            estado: p.estado_pago,
            textoBusqueda: `${p.fecha} ${p.id} ${p.especialista_id} ${p.obra_id} ${p.descripcion ?? ''}`,
            campos: [
                {etiqueta: 'Descripción', valor: p.descripcion || 'Sin descripción'},
                {etiqueta: 'Fecha', valor: p.fecha},
                {etiqueta: 'Importe', valor: `${p.importe}€`},
                {etiqueta: 'Estado de pago', valor: p.estado_pago},
                {etiqueta: 'Especialista', valor: especialista ? getEspecialistaDisplayName(especialista) : p.especialista_id},
                {etiqueta: 'Obra', valor: obra ? getObraDisplayName(obra) : p.obra_id},
            ],
        };
    });

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Partes de Especialista</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona los gastos imputados a especialistas.</p>
            </div>

          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/partes-especialista/editar"
            nombreVacio="No hay partes de especialista que coincidan con la búsqueda."
            tipoEstado="pago"
            />
        </div>
    )
}
