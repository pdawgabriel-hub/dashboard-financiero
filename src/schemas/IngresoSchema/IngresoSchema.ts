import { z } from "zod";

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
        .min(1, "La fecha es obligatoria"),
        
    importe_neto: zNumeroFormulario,
    iva_porcentaje: zNumeroFormulario,
    // (en el futuro lo calcularemos automáticamente)
    total_con_iva: zNumeroFormulario.optional(),
    //estado más flexible para que acepte textos vacíos o genéricos
    estado_pago: z
        .string()
        .optional()
        .or(z.literal("")),
    cliente_id: z
        .string()
        .min(1, "Debe seleccionar un cliente"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),
});

export type IngresoFormValues = z.infer<typeof ingresoSchema>;