export interface ParteProveedor {
    id: string; // parte_proveedor_id
    fecha: string; // YYYY-MM-DD, por defecto hoy
    descripcion?: string;
    documento?: string; // nº de factura/albarán, no obligatorio
    importe: number; // obligatorio, > 0
    estado_pago: 'pendiente' | 'pagado';
    obra_id: string; // FK, obligatorio
    proveedor_id: string; // FK, obligatorio
}

// Tipo para crear: sin id, lo genera el servicio
export type ParteProveedorInput = Omit<ParteProveedor, 'id'>;
