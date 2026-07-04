export interface Especialista {
  id: string; // ESP-001
  nombre: string;
  empresa_autonomo: string; // Nombre comercial o personal
  cif_dni: string;
  telefono: string;
  especialidad: string; // Ej: Electricista, Fontanero, Estructurista
  precio_hora_subcontrata: number;
}