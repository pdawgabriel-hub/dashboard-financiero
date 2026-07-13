import TarjetasKpi from "../../componentes/TarjetasKpi/TarjetasKpi";
import GraficoObras from "../../componentes/GraficoObras/GraficoObras";
import UltimosMovimientos from "../../componentes/UltimosMovimientos/UltimosMovimientos";

export default function PaginaDashboard() {

    return (
        <div className="flex flex-col gap-6">
            {/* Encabezado */}
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Dashboard Financiero</h1>
                <p className="text-slate-400 mt-1">Resumen general del estado de las obras y control de márgenes.</p>
            </div>

            {/* Bloque 1: Los Indicadores Clave */}
            <TarjetasKpi />

            {/* Bloque 2: Distribución en dos columnas para Gráficos y Tablas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                <GraficoObras />
                </div>
                <div>
                <UltimosMovimientos />
                </div>
            </div>
        </div>
    );

}