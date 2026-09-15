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
        textoBusqueda: `${p.nombre} ${p.id} ${p.tipo ?? ''} ${p.telf ?? ''} ${p.correo ?? ''}`,
        campos: [
            {etiqueta: 'Tipo', valor: p.tipo || 'Sin tipo'},
            {etiqueta: 'Teléfono', valor: p.telf || 'Sin teléfono'},
            {etiqueta: 'Correo', valor: p.correo || 'Sin correo'},
            {etiqueta: 'Dirección', valor: p.direccion || 'Sin dirección'},
            {etiqueta: 'Base', valor: `${p.base}€`},
            {etiqueta: 'IVA', valor: `${p.iva}%`},
            {etiqueta: 'Total', valor: `${p.total.toFixed(2)}€`},
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