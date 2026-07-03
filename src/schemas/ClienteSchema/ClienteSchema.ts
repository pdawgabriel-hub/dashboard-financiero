// Fichero para validar el formulario
import { z } from 'zod';

// required=True en Odoo -> obligatorio aquí. El resto, opcional.
export const clienteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellidos: z.string().optional(),
  nif: z.string().min(1, 'El NIF es obligatorio'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),
  codPostal: z.string().optional(),
  telefono: z.string().min(1, 'El teléfono es obligatorio'),
});

// Evita duplicar interfaces en los formularios
export type ClienteFormValues = z.infer<typeof clienteSchema>;
