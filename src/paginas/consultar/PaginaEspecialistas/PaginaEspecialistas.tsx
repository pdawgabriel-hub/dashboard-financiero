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
        titulo: e.nombre,
        textoBusqueda: `${e.id} ${e.tipo ?? ''} ${e.nombre} ${e.telf ?? ''} ${e.correo ?? ''}`,
        campos: [
            {etiqueta: 'Tipo', valor: e.tipo || 'Sin tipo'},
            {etiqueta: 'Teléfono', valor: e.telf || 'Sin teléfono'},
            {etiqueta: 'Correo', valor: e.correo || 'Sin correo'},
            {etiqueta: 'Referencia', valor: e.ref || 'Sin referencia'},
            {etiqueta: 'Importe', valor: e.importe != null ? `${e.importe}€` : 'Sin importe'},
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