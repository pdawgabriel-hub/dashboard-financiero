import { z } from "zod";

export const ingresoSchema = z.object({

    numero_factura: z
        .string()
        .min(1, 'El campo es obligatorio'),
    fecha_emision: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    importe_neto: z
        .number()
        .min(1, 'El campo es obligatorio'),
    iva_porcentaje: z
        .number()
        .min(1, 'El campo es obligatorio'),
    total_con_iva: z
        .number()
        .min(1, 'El campo es obligatorio'),
    estado_pago: z
        .string()
        .min(1, 'Seleccione una opcion'),
    cliente_id: z
        .string()
        .min(1, "Debe seleccionar un cliente"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),
});

export type IngresoFormValues = z.infer<typeof ingresoSchema>;