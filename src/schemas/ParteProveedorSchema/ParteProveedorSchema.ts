import { z } from "zod";

export const parteProveedorSchema = z.object({

    fecha: z
        .string()
        .min(1, "La fecha es obligatoria")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    descripcion: z
        .string()
        .optional(),
    documento: z
        .string()
        .optional(),
    importe: z
        .coerce.number()
        .positive("El importe debe ser mayor que 0"),
    estado_pago: z
        .enum(["pendiente", "pagado"]),
    obra_id: z
        .string()
        .min(1, "Debe seleccionar una obra"),
    proveedor_id: z
        .string()
        .min(1, "Debe seleccionar un proveedor"),

});

export type ParteProveedorFormValues = z.infer<typeof parteProveedorSchema>;
