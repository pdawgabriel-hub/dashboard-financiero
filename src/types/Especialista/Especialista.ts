export interface Especialista {
  id: string; // especialista_id
  tipo?: string; // Ej: Arquitecto, Fontanero, Electricista...
  ref?: string;
  comunicacionParte?: string;
  nombre: string; // obligatorio
  observaciones?: string;
  telf?: string;
  correo?: string;
  importe?: number;
}

// Tipo para crear: sin id, lo genera el servicio
export type EspecialistaInput = Omit<Especialista, 'id'>;