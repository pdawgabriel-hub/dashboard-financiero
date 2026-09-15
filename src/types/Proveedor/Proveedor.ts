export interface Proveedor {
  id: string; // proveedor_id
  nombre: string;
  direccion?: string;
  telf?: string;
  correo?: string;
  tipo?: string; // Ej: Materiales, Maquinaria, Subcontrata
  ref?: string;
  documento?: string;
  numDocumento?: string;
  base: number; // obligatorio, no puede ser negativo
  iva: number; // obligatorio, porcentaje
  total: number; // calculado: base * (1 + iva / 100)
}

// Tipo para crear: sin id ni total, los genera el servicio
export type ProveedorInput = Omit<Proveedor, 'id' | 'total'>;