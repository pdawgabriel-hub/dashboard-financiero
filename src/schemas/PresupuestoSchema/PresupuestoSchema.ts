import { z } from 'zod';

export const presupuestoSchema = z.object({

    titulo: z
        .string()
        .min(1, 'El campo es obligatorio'),
    fecha_emision: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    importe_total: z.union([
        z.number(),
        z.string().transform((val) => Number(val))
    ]),
    estado: z
        .enum(["borrador", "enviado", "aceptado", "rechazado"]),
    cliente_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),

});

export type PresupuestoFormValues = z.infer<typeof presupuestoSchema>;