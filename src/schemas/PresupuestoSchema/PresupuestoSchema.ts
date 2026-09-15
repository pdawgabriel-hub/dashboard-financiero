import { z } from 'zod';

export const presupuestoLineaSchema = z.object({
    descripcion: z.string().optional(),
    uds: z.coerce.number().min(0, 'Las unidades no pueden ser negativas'),
    precio: z.coerce.number().min(0, 'El precio no puede ser negativo'),
});

export const presupuestoSchema = z.object({

    fecha: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    cliente_id: z
        .string()
        .min(1, "Debe seleccionar un cliente"),
    obra_id: z
        .string()
        .optional(),
    nombre_cliente: z
        .string()
        .min(1, "Selecciona un cliente para completar sus datos"),
    nif: z
        .string()
        .optional(),
    direccion: z
        .string()
        .optional(),
    telf: z
        .string()
        .optional(),
    iva: z
        .coerce.number()
        .min(0, "El IVA no puede ser negativo")
        .max(100, "El IVA no puede superar el 100%"),
    estado: z
        .enum(["aprobado", "no_aprobado"]),
    lineas: z
        .array(presupuestoLineaSchema)
        .min(1, "Añade al menos una línea"),

});

export type PresupuestoFormValues = z.infer<typeof presupuestoSchema>;
