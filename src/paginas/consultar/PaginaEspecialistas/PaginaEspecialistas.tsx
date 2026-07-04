import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { especialistaService } from "../../../servicios/EspecialistaService/EspecialistaService";
import type { Especialista } from "../../../types/Especialista/Especialista";

export default function PaginaEspecialistas() {

    const [especialistas, setEspecialistas] = useState<Especialista[]>([]);

    useEffect(() => {
        setEspecialistas(especialistaService.getAll());
    }, []);

    const items = especialistas.map((e) => ({
        id: e.id,
        titulo: e.empresa_autonomo,
        textoBusqueda: `${e.id} ${e.especialidad} ${e.empresa_autonomo} ${e.nombre} ${e.telefono} `,
        campos: [
            {etiqueta: 'Nombre', valor: e.nombre},
            {etiqueta: 'Empresa / Autonomo', valor: e.empresa_autonomo},
            {etiqueta: 'CIF / DNI', valor: e.cif_dni},
            {etiqueta: 'Telefono', valor: e.telefono},
            {etiqueta: 'Especialidad', valor: e.especialidad},
            {etiqueta: 'Precio hora', valor: `${e.precio_hora_subcontrata}€`},
        ],     
    }));

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Especialistas</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona tus especialistas.</p>
          </div>
    
            <GridConsulta
                items={items}                
                rutaBaseEdicion="/consultar/especialistas/editar"
                nombreVacio="No hay especialistas que coincidan con la búsqueda."
            />
        </div>
    )
}