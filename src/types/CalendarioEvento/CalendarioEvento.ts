// Vista de solo lectura, equivalente a gestion.calendario.evento: no tiene
// almacenamiento propio, se construye en el momento uniendo Presupuestos,
// Ingresos, Partes de Trabajo, Partes de Proveedor y Partes de Especialista
// (en Odoo esa unión la hace una VIEW SQL; aquí la hace CalendarioService).
export interface CalendarioEvento {
  id: string; // sintético: `${tipo}-${resId}`, solo para key/búsqueda en el front
  fecha: string; // YYYY-MM-DD
  tipo: 'presupuesto' | 'ingreso' | 'parte_trabajo' | 'parte_proveedor' | 'parte_especialista';
  nombre: string; // texto descriptivo del evento
  rutaOrigen: string; // ruta de edición del registro real (equivalente a action_abrir_origen)
}
