import { z } from "zod";

export const especialistaSchema = z.object({

    nombre: z
        .string()
        .min(1, 'El nombre es un campo obligatorio'),
    empresa_autonoma: z
        .string()
        .min(1, 'La entidad es un campo obligatorio'),
    cif_dni: z
        .string()
        .min(1, 'Campo obligatorio'),
    telefono: z
        .string()
        .min(1, 'Campo obligatorio'),
    especialidad: z
        .string()
        .min(1, 'Campo obligatorio'),
    precio_hora_subcontrata: z
        .coerce.number()
        .positive('El coste debe ser mayor que 0')
});