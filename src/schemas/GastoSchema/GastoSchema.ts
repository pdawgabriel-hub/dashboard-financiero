import { z } from 'zod';

const fechaOpcional = z
  .string()
  .optional()
  .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), 'El formato de fecha debe ser AAAA-MM-DD');

export const gastoSchema = z
  .object({
    obra_id: z.string().min(1, 'Debe seleccionar una obra'),
    presupuesto_id: z.string().optional(),
    direccion_obra: z.string().optional(),
    inicio_obra: fechaOpcional,
    fin_obra: fechaOpcional,
    solicitud_obra: fechaOpcional,
    mandante: z.enum(['si', 'no']),
    gestion_licencia: z.enum(['si', 'no']),
    pago_icio: z.enum(['si', 'no']),
  })
  // Equivalente a _check_fechas_obra de gestion.gastos
  .refine(
    (datos) => !datos.inicio_obra || !datos.fin_obra || datos.fin_obra >= datos.inicio_obra,
    { message: 'La fecha de fin no puede ser anterior a la de inicio', path: ['fin_obra'] }
  );

export type GastoFormValues = z.infer<typeof gastoSchema>;
