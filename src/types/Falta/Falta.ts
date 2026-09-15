export interface Falta {
    id: string; // falta_id
    fecha_inicio: string; // YYYY-MM-DD, por defecto hoy
    fecha_fin: string; // YYYY-MM-DD, por defecto hoy
    tipo: 'vacaciones' | 'baja_medica' | 'personal' | 'injustificada' | 'otro';
    motivo?: string;
    trabajador_id: string; // FK, obligatorio
}

// Tipo para crear: sin id, lo genera el servicio
export type FaltaInput = Omit<Falta, 'id'>;
