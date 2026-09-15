export interface Trabajador{
    id: string; // trabajador_id
    tipo?: string; // opcional
    nombre: string;
    apellido: string;
    telf?: string;
    coste_hora_estandar: number; // obligatorio, no puede ser negativo
}

// Tipo para crear: sin id, lo genera el servicio
export type TrabajadorInput = Omit<Trabajador, 'id'>;