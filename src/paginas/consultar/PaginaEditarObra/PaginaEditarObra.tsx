import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import FormularioCRUD, { type CampoFormulario } from "../../../componentes/Crud/FormularioCRUD/FormularioCRUD";
import ConfirmarEliminar from "../../../componentes/Crud/ConfirmarEliminar/ConfirmarEliminar";
import ListaRelacionados from "../../../componentes/Crud/ListaRelacionados/ListaRelacionados";
import { useToast } from "../../../contextos/ToastContext/ToastContext";

import { obraSchema, type ObraFormValues } from "../../../schemas/ObraSchema/ObraSchema";
import { obraService, getObraTotal, getObraHorasTotales, getObraEstadoPago } from "../../../servicios/ObraService/ObraService";
import { gastoService } from "../../../servicios/GastoService/GastoService";
import { presupuestoService, getPresupuestoDisplayName } from "../../../servicios/PresupuestoService/PresupuestoService";
import { parteTrabajoService } from "../../../servicios/ParteTrabajoService/ParteTrabajoService";
import { parteProveedorService } from "../../../servicios/ParteProveedorService/ParteProveedorService";
import { parteEspecialistaService } from "../../../servicios/ParteEspecialistaService/ParteEspecialistaService";
import { ingresoService } from "../../../servicios/IngresoService/IngresoService";
import type { Obra } from "../../../types/Obra/Obra";
import { clienteService, getClienteDisplayName } from "../../../servicios/ClienteService/ClienteService";

const COLOR_SALUD: Record<'verde' | 'ambar' | 'rojo', string> = {
    verde: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    ambar: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rojo: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function PaginaEditarObra() {

    const clientesRegistrados = clienteService.getAll();

    // Array de configuracion
    const CAMPOS: CampoFormulario[] = [
        { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: true },
        { nombre: 'direccion', etiqueta: 'Direccion', requerido: true },
        { nombre: 'fecha_inicio', etiqueta: 'Fecha Inicio', requerido: true },
        { nombre: 'fecha_fin_prevista', etiqueta: 'Fecha Fin Prevista', requerido: true },
        {
            nombre: 'cliente_id',
            etiqueta: 'Cliente Asignado (ID)',
            tipo: 'select' as const,
            opciones: clientesRegistrados.map(c => ({ valor: c.id, etiqueta: getClienteDisplayName(c) })),
            requerido: true
        }
    ];

    // Captura el id de la URL
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mostrarToast } = useToast();

    const [obra, setObra] = useState<Obra | null | undefined>(undefined);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    useEffect(() => {
        if (!id) return;
        const encontrado = obraService.getById(id);
        setObra(encontrado ?? null);
    }, [id]);

    function handleSubmit(datos: ObraFormValues) {
        if (!id) return;
        obraService.update(id, datos);
        mostrarToast('Cambios guardados correctamente');
        navigate('/consultar/obras');
    }

    function handleEliminar() {
        if (!id) return;
        obraService.remove(id);
        mostrarToast('Obra eliminado');
        navigate('/consultar/obras');
    }

    if (obra === undefined) {
        return <p className="text-slate-500">Cargando...</p>;
    }

    if (obra === null) {
        return <p className="text-slate-500">No se encontró la obra solicitado.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-2xl font-bold text-slate-100">Editar obra</h1>
            <p className="text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                <span>{obra.id} · Total: {getObraTotal(obra).toFixed(2)}€ · Horas: {getObraHorasTotales(obra)}h · Pago: {getObraEstadoPago(obra)}</span>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border uppercase tracking-wider ${COLOR_SALUD[gastoService.getSaludObra(obra)]}`}>
                    {gastoService.getSaludObra(obra)}
                </span>
            </p>
            <Link to={`/consultar/gastos/editar/${obra.id}`} className="text-sm text-emerald-400 hover:text-emerald-300 mt-1 inline-block">
                Ver seguimiento financiero →
            </Link>
        </div>

        <FormularioCRUD
            schema={obraSchema}
            campos={CAMPOS}
            valoresIniciales={obra}
            onSubmit={handleSubmit}
            textoBoton="Guardar cambios"
            onEliminar={() => setMostrarConfirmar(true)}
        />

        <ConfirmarEliminar
            abierto={mostrarConfirmar}
            nombre={`${obra.descripcion}`.trim()}
            onCancelar={() => setMostrarConfirmar(false)}
            onConfirmar={handleEliminar}
        />

        <ListaRelacionados
            secciones={[
                {
                    titulo: 'Presupuestos',
                    items: presupuestoService.getAll()
                        .filter((p) => p.obra_id === obra.id)
                        .map((p) => ({ id: p.id, etiqueta: getPresupuestoDisplayName(p), ruta: `/consultar/presupuestos/editar/${p.id}` })),
                },
                {
                    titulo: 'Partes de Trabajo',
                    items: parteTrabajoService.getAll()
                        .filter((p) => p.obra_id === obra.id)
                        .map((p) => ({ id: p.id, etiqueta: `${p.fecha} · ${p.descripcion}`, ruta: `/consultar/partes-trabajo/editar/${p.id}` })),
                },
                {
                    titulo: 'Partes de Proveedor',
                    items: parteProveedorService.getAll()
                        .filter((p) => p.obra_id === obra.id)
                        .map((p) => ({ id: p.id, etiqueta: `${p.fecha} · ${p.descripcion || 'Sin descripción'} (${p.importe}€)`, ruta: `/consultar/partes-proveedor/editar/${p.id}` })),
                },
                {
                    titulo: 'Partes de Especialista',
                    items: parteEspecialistaService.getAll()
                        .filter((p) => p.obra_id === obra.id)
                        .map((p) => ({ id: p.id, etiqueta: `${p.fecha} · ${p.descripcion || 'Sin descripción'} (${p.importe}€)`, ruta: `/consultar/partes-especialista/editar/${p.id}` })),
                },
                {
                    titulo: 'Ingresos',
                    items: ingresoService.getAll()
                        .filter((i) => i.obra_id === obra.id)
                        .map((i) => ({ id: i.id, etiqueta: `${i.fecha} · ${i.importe}€${i.tipo ? ` (${i.tipo})` : ''}`, ruta: `/consultar/ingresos/editar/${i.id}` })),
                },
            ]}
        />
        </div>
    );

}