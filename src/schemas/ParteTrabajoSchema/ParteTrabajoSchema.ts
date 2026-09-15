import { z } from 'zod';

export const parteTrabajoLineaSchema = z.object({
    trabajador_id: z
        .string()
        .min(1, "Debe seleccionar un trabajador"),
    horas: z
        .coerce.number()
        .min(0, "Las horas no pueden ser negativas")
        .max(24, "Una línea no puede superar las 24 horas"),
    coste_hora: z
        .coerce.number()
        .min(0, "El coste/hora no puede ser negativo"),
});

export const parteTrabajoSchema = z.object({

    fecha: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    descripcion: z
        .string()
        .min(1, "La descripción es obligatoria"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),
    lineas: z
        .array(parteTrabajoLineaSchema)
        .min(1, "Añade al menos una línea"),

});

export type ParteTrabajoFormValues = z.infer<typeof parteTrabajoSchema>;
