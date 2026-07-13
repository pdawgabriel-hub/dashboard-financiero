import { z } from 'zod';

export const parteTrabajoSchema = z.object({
    
    fecha: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    horas: z.union([
        z.number(),
        z.string().transform((val) => Number(val))
    ]),
    descripcion: z
        .string()
        .optional(),
    trabajador_id: z
        .string()
        .min(1, "Debe seleccionar un parte de trabajo"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar un parte de trabajo"),

});

export type ParteTrabajoFormValues = z.infer<typeof parteTrabajoSchema>;