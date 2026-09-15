import { z } from "zod";

export const especialistaSchema = z.object({
  tipo: z.string().optional(),
  ref: z.string().optional(),
  comunicacionParte: z.string().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  observaciones: z.string().optional(),
  telf: z.string().optional(),
  correo: z.string().optional(),
  importe: z.coerce.number().min(0, "El importe no puede ser negativo").optional(),
});

export type EspecialistaFormValues = z.infer<typeof especialistaSchema>;
