import { z } from 'zod';

export const faltaSchema = z
  .object({
    fecha_inicio: z
      .string()
      .min(1, "La fecha de inicio es obligatoria")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    fecha_fin: z
      .string()
      .min(1, "La fecha de fin es obligatoria")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD"),
    tipo: z.enum(["vacaciones", "baja_medica", "personal", "injustificada", "otro"]),
    motivo: z.string().optional(),
    trabajador_id: z.string().min(1, "Debe seleccionar un trabajador"),
  })
  // Equivalente a _check_fechas de gestion.trabajadores.falta
  .refine((datos) => datos.fecha_fin >= datos.fecha_inicio, {
    message: "La fecha de fin no puede ser anterior a la de inicio",
    path: ["fecha_fin"],
  });

export type FaltaFormValues = z.infer<typeof faltaSchema>;
