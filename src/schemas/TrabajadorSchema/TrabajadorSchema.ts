// Fichero para validar el formulario
import { z } from 'zod';

export const trabajadorSchema = z.object({
    tipo: z
        .string()
        .optional(),
    nombre: z
        .string()
        .min(1, 'El nombre es obligatorio'),
    apellido: z
        .string()
        .optional(),
    coste_hora_estandar: z
        .coerce.number()
        .positive('El coste debe ser mayor que 0')
});

// Evita duplicar interfaces en los formularios
export type trabajadorFormValues = z.infer<typeof trabajadorSchema>;