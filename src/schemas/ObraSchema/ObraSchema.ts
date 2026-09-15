import { z } from 'zod';

export const obraSchema = z.object({

    descripcion: z
        .string()
        .min(1, 'El campo es obligatorios'),
    direccion: z
        .string()
        .min(1, 'El campo es obligatorio'),
    fecha_inicio: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    fecha_fin_prevista: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    cliente_id: z
        .string()
        .min(1, "Debe seleccionar un cliente"),

});

export type ObraFormValues = z.infer<typeof obraSchema>;