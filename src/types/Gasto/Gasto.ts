export interface Gasto {
    id: string; // GAST-001
    concepto: string;
    fecha: string; // YYYY-MM-DD
    importe_neto: number;
    iva_porcentaje: number; // Ej: 21
    total_con_iva: number;
    obra_id: string; // FK
    proveedor_id?: string; // FK
}