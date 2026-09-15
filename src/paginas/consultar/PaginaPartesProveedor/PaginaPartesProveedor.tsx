import { useEffect, useState } from "react";
import GridConsulta from "../../../componentes/Crud/GridConsulta/GridConsulta";
import { parteProveedorService } from "../../../servicios/ParteProveedorService/ParteProveedorService";
import { getProveedorDisplayName, proveedorService } from "../../../servicios/ProveedorService/ProveedorService";
import { getObraDisplayName, obraService } from "../../../servicios/ObraService/ObraService";
import type { ParteProveedor } from "../../../types/ParteProveedor/ParteProveedor";

export default function PaginaPartesProveedor() {

    const [partes, setPartes] = useState<ParteProveedor[]>([]);

    useEffect(() => {
        setPartes(parteProveedorService.getAll());
    }, []);

    const proveedores = proveedorService.getAll();
    const obras = obraService.getAll();

    const items = partes.map((p) => {
        const proveedor = proveedores.find((pr) => pr.id === p.proveedor_id);
        const obra = obras.find((o) => o.id === p.obra_id);

        return {
            id: p.id,
            titulo: proveedor ? getProveedorDisplayName(proveedor) : p.proveedor_id,
            estado: p.estado_pago,
            textoBusqueda: `${p.fecha} ${p.id} ${p.proveedor_id} ${p.obra_id} ${p.descripcion ?? ''}`,
            campos: [
                {etiqueta: 'Descripción', valor: p.descripcion || 'Sin descripción'},
                {etiqueta: 'Fecha', valor: p.fecha},
                {etiqueta: 'Importe', valor: `${p.importe}€`},
                {etiqueta: 'Estado de pago', valor: p.estado_pago},
                {etiqueta: 'Proveedor', valor: proveedor ? getProveedorDisplayName(proveedor) : p.proveedor_id},
                {etiqueta: 'Obra', valor: obra ? getObraDisplayName(obra) : p.obra_id},
            ],
        };
    });

    return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Partes de Proveedor</h1>
            <p className="text-slate-400 mt-1">Consulta y gestiona los gastos imputados a proveedores.</p>
            </div>

          <GridConsulta
            items={items}
            rutaBaseEdicion="/consultar/partes-proveedor/editar"
            nombreVacio="No hay partes de proveedor que coincidan con la búsqueda."
            tipoEstado="pago"
            />
        </div>
    )
}
