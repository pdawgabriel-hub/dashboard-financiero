import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { proveedorService } from "../../../servicios/ProveedorService/ProveedorService";
import type { Proveedor } from "../../../types/Proveedor/Proveedor";

export default function PaginaProveedores() {
    
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);

    useEffect(() => {
        setProveedores(proveedorService.getAll());
    }, []);

    const items = proveedores.map((p) => ({
        id: p.id,
        titulo: p.nombre,
        textoBusqueda: `${p.nombre} ${p.id} ${p.cif} ${p.telefono} ${p.email} ${p.sector}`,
        campos: [
            {etiqueta: 'Nombre', valor: p.nombre},
            {etiqueta: 'CIF', valor: p.cif},
            {etiqueta: 'Telefono', valor: p.telefono},
            {etiqueta: 'Email', valor: p.email},
            {etiqueta: 'Sector', valor: p.sector},
        ],
    }));
    
    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Proveedores</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona tus proveedores.</p>
          </div>
    
          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/proveedores/editar"
            nombreVacio="No hay proveedores que coincidan con la búsqueda."
          />
        </div>
    );
}