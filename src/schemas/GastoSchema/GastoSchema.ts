import { z} from "zod";

export const gastoSchema = z.object({

    concepto: z
        .string()
        .min(1, 'El campo es obligatorio'),
    fecha: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    importe_neto: z
        .number()
        .min(1, 'Campo obligatorio'),
        iva_procentaje: z
        .number()
        .min(1, 'Campo obligatorio'),
        total_con_iva: z
        .number()
        .min(1, 'Campo obligatorio'),
    proveedor_id: z
        .string()
        .min(1, "Debe seleccionar un proveedor"),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),
});

export type GastoFormValues = z.infer<typeof gastoSchema>;