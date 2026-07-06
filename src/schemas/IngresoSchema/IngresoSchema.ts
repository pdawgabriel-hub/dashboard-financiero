import { z } from "zod";

// Tipado dinámico para que acepte tanto el número del mock como el string del input
const zNumeroFormulario = z.union([
    z.number(),
    z.string().transform((val) => Number(val))
]);

export const ingresoSchema = z.object({

    numero_factura: z
        .string()
        .min(1, 'El campo es obligatorio'),
    fecha_emision: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    importe_neto: zNumeroFormulario,
    iva_porcentaje: zNumeroFormulario,
    total_con_iva: zNumeroFormulario,
    estado_pago: z
        .enum(["pendiente", "cobrado"]),
    cliente_id: z
        .string()
        .min(1, "Debe seleccionar un cliente"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),
});

export type IngresoFormValues = z.infer<typeof ingresoSchema>;