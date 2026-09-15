import { z } from "zod";

export const proveedorSchema = z.object({

    nombre: z
        .string()
        .min(1, "Este campo es obligatorio"),
    direccion: z
        .string()
        .optional(),
    telf: z
        .string()
        .optional(),
    correo: z
        .string()
        .optional(),
    tipo: z
        .string()
        .optional(),
    ref: z
        .string()
        .optional(),
    documento: z
        .string()
        .optional(),
    numDocumento: z
        .string()
        .optional(),
    base: z
        .coerce.number()
        .min(0, "La base no puede ser negativa"),
    iva: z
        .coerce.number()
        .min(0, "El IVA no puede ser negativo")
        .max(100, "El IVA no puede superar el 100%"),

});

export type ProveedorFormValues = z.infer<typeof proveedorSchema>;
