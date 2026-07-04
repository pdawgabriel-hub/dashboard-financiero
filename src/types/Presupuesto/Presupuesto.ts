export interface Presupuesto {
    id: string; // PRES-001
    titulo: string;
    fecha_emision: string; // YYYY-MM-DD
    importe_total: number;
    estado: 'borrador' | 'enviado' | 'aceptado' | 'rechazado';
    cliente_id: string; // FK
}