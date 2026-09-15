export interface Obra {
  id: string; // obra_id
  descripcion: string; // antes "nombre"
  direccion: string;
  fecha_inicio: string; // YYYY-MM-DD
  fecha_fin_prevista: string; // YYYY-MM-DD
  cliente_id: string; // FK
  // presupuesto_id (FK única) desaparece: en Odoo la relación va al revés,
  // un Presupuesto apunta opcionalmente a su Obra (ver Presupuesto.obra_id)
  // y una Obra puede tener varios presupuestos vinculados.
  //
  // "estado" (planificada/en_progreso/pausada/finalizada) desaparece: no
  // existe en Odoo. Se sustituye por los computados reales, en ObraService
  // (getObraEstadoPago) y GastoService (getSaludObra) — ver también la
  // migración del Dashboard.
}