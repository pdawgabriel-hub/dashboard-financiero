export interface PresupuestoLinea {
    descripcion?: string;
    uds: number;
    precio: number;
    total_linea: number; // computado: uds * precio
}

export interface Presupuesto {
    id: string; // presupuesto_id
    fecha: string; // YYYY-MM-DD, antes "fecha_emision"
    // Copia congelada de los datos del cliente en el momento de crear el presupuesto
    nombre_cliente: string;
    nif?: string;
    direccion?: string;
    telf?: string;
    estado: 'aprobado' | 'no_aprobado'; // antes borrador/enviado/aceptado/rechazado
    iva: number; // obligatorio, por defecto 21, entre 0 y 100
    base_imponible: number; // computado: suma de lineas.total_linea
    cuota_iva: number; // computado: base_imponible * iva / 100
    total: number; // computado: base_imponible + cuota_iva (antes "importe_total")
    cliente_id: string; // FK
    obra_id?: string; // FK opcional
    lineas: PresupuestoLinea[];
}

export type PresupuestoLineaInput = Omit<PresupuestoLinea, 'total_linea'>;

// Tipo para crear/editar: sin id ni los campos calculados, los genera el servicio
export type PresupuestoInput = Omit<Presupuesto, 'id' | 'base_imponible' | 'cuota_iva' | 'total' | 'lineas'> & {
    lineas: PresupuestoLineaInput[];
};
