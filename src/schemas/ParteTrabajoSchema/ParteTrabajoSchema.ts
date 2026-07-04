import { z } from 'zod';

export const parteTrabajoSchema = z.object({
    
    fecha: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    horas: z
        .number({message: 'Las horas deben ser un numero'})
        .min(1, 'Lo minimo a cobrar es 1 hora'),
    descripcion: z
        .string()
        .optional(),
    trabajador_id: z
        .string()
        .min(1, "Debe seleccionar un trabajador"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),

});

export type ParteTrabajoFormValues = z.infer<typeof parteTrabajoSchema>;