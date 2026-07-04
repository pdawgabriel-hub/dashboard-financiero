export interface Obra {
  id: string; // OBRA-001
  nombre: string;
  direccion: string;
  fecha_inicio: string; // YYYY-MM-DD
  fecha_fin_prevista: string; // YYYY-MM-DD
  estado: 'planificada' | 'en_progreso' | 'pausada' | 'finalizada';
  cliente_id: string; // FK
  presupuesto_id: string; // FK
}