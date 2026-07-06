import { z } from "zod";

export const especialistaSchema = z.object({
  nombre: z.string().min(1, "Requerido"),
  empresa_autonomo: z.string().min(1, "Requerido"),
  cif_dni: z.string().min(1, "Requerido"),
  telefono: z.string().min(1, "Requerido"),
  especialidad: z.string().optional().or(z.literal("")), 
  precio_hora_subcontrata: z.union([
    z.number(),
    z.string().transform((val) => Number(val))
  ]),
});

export type EspecialistaFormValues = z.infer<typeof especialistaSchema>;