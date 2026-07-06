import { z} from "zod";

// Tipado dinámico para que acepte tanto el número del mock como el string del input
const zNumeroFormulario = z.union([
    z.number(),
    z.string().transform((val) => Number(val))
]);

export const gastoSchema = z.object({

    concepto: z
        .string()
        .min(1, 'El campo es obligatorio'),
    fecha: z
        .string()
        .min(1, "La fecha es obligatoria"),
    importe_neto: zNumeroFormulario,
    iva_porcentaje: zNumeroFormulario,
    total_con_iva: zNumeroFormulario,
    proveedor_id: z
        .string()
        .min(1, "Debe seleccionar un proveedor"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),
});

export type GastoFormValues = z.infer<typeof gastoSchema>;