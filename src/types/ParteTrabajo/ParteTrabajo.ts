export interface ParteTrabajoLinea {
    trabajador_id: string; // FK, obligatorio
    horas: number; // 0-24
    coste_hora: number; // congelado del trabajador en el momento de crear la línea
    coste_subtotal: number; // computado: horas * coste_hora
}

export interface ParteTrabajo {
    id: string; // Código secuencial
    fecha: string; // Fecha del parte (Formato YYYY-MM-DD)
    descripcion: string; // obligatoria: tarea realizada
    obra_id: string; // FK
    horas_totales: number; // computado: suma de lineas.horas
    coste_total_parte: number; // computado: suma de lineas.coste_subtotal
    lineas: ParteTrabajoLinea[]; // una línea por trabajador que participó
}

export type ParteTrabajoLineaInput = Omit<ParteTrabajoLinea, 'coste_subtotal'>;

// Tipo para crear/editar: sin id ni los campos calculados, los genera el servicio
export type ParteTrabajoInput = Omit<ParteTrabajo, 'id' | 'horas_totales' | 'coste_total_parte' | 'lineas'> & {
    lineas: ParteTrabajoLineaInput[];
};
