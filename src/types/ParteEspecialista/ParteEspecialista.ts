export interface ParteEspecialista {
    id: string; // parte_especialista_id
    fecha: string; // YYYY-MM-DD, por defecto hoy
    descripcion?: string;
    documento?: string; // nº de factura, no obligatorio: no siempre hay
    importe: number; // obligatorio, > 0
    estado_pago: 'pendiente' | 'pagado';
    obra_id: string; // FK, obligatorio
    especialista_id: string; // FK, obligatorio
}

// Tipo para crear: sin id, lo genera el servicio
export type ParteEspecialistaInput = Omit<ParteEspecialista, 'id'>;
