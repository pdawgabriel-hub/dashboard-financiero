import { z } from "zod";

export const ingresoSchema = z.object({
    obra_id: z
        .string()
        .optional(),
    cliente_id: z
        .string()
        .optional(),
    tipo: z
        .string()
        .optional(),
    fecha: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    documento: z
        .string()
        .optional(),
    num_documento: z
        .string()
        .optional(),
    importe: z
        .coerce.number()
        .positive("El importe debe ser mayor que 0"),
});

export type IngresoFormValues = z.infer<typeof ingresoSchema>;
