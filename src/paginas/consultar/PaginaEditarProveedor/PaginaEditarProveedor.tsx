import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioCRUD, {type CampoFormulario} from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";

import { proveedorSchema , type ProveedorFormValues} from "../../../schemas/ProveedorSchema/ProveedorSchema";
import { proveedorService } from "../../../servicios/ProveedorService/ProveedorService";
import { useToast } from "../../../contextos/ToastContext/ToastContext";
import type { Proveedor } from "../../../types/Proveedor/Proveedor";

const CAMPOS: CampoFormulario[] = [
    { nombre: 'nombre', etiqueta: 'Nombre', requerido: true},
    { nombre: 'cif', etiqueta: 'CIF', requerido: true },
    { nombre: 'telefono', etiqueta: 'Telefono', requerido: true },
    { nombre: 'email', etiqueta: 'Email', requerido: true },
    { nombre: 'sector', etiqueta: 'Sector', requerido: true },
];

export default function PaginaEditarProveedor() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [proveedor, setProveedor] = useState<Proveedor | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = proveedorService.getById(id);
        setProveedor(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: ProveedorFormValues) {
        if (!id) return;
        proveedorService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/proveedores');
    }

    function handleEliminar() {
        if (!id) return;
        proveedorService.remove(id);
        mostrarToast('Proveedor eliminado');
        navigate('/consultar/proveedores');
    }

    if (proveedor === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (proveedor === null) {
        return <p className="text-slate-500">No se encontró el proveedor solicitado.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-2xl font-bold text-slate-100">Editar proveedor</h1>
            <p className="text-slate-400 mt-1">{proveedor.id}</p>
        </div>

        <FormularioCRUD
            schema={proveedorSchema}
            campos={CAMPOS}
            valoresIniciales={proveedor}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
        />

        <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={`${proveedor.nombre}`.trim()}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
        />
        </div>
    );

}