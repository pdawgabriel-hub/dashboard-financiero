export interface ParteTrabajo {
    id: string;              // Código secuencial:
    fecha: string;           // Fecha del parte (Formato YYYY-MM-DD)
    horas: number;           // Horas trabajadas
    descripcion?: string;    // Nota opcional de las tareas realizadas
    trabajador_id: string;   // FK
    obra_id: string;         // FK
}