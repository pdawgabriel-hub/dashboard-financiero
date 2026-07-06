import { z } from "zod";

export const proveedorSchema = z.object({

    nombre: z
        .string()
        .min(1, "Este campo es obligatoria"),
    cif: z
        .string()
        .min(1, "Este campo es obligatoria"),
    telefono: z
        .string()
        .min(1, "Este campo es obligatoria"),
    email: z
        .string()
        .min(1, "Este campo es obligatoria"),
    sector: z
        .string()
        .min(1, "Este campo es obligatoria"),

});

export type ProveedorFormValues = z.infer<typeof proveedorSchema>;