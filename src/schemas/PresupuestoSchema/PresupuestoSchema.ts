import { z } from 'zod';

export const presupuestoSchema = z.object({

    titulo: z
        .string()
        .min(1, 'El campo es obligatorio'),
    fecha_emision: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    importe_total: z
        .number()
        .min(1, 'El campo es obligatorio'),
    estado: z
        .string()
        .min(1, 'Seleeciona uno'),
    cliente: z
        .string()
        .min(1, "Debe seleccionar una obra"),

});

export type PresupuestoFormValues = z.infer<typeof presupuestoSchema>;