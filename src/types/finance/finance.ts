
export interface Cliente {
  id: string;
  nombre: string;
  cifNif: string;
  contacto: string;
}

export interface Trabajador {
  id: string;
  nombre: string;
  costeHora: number;
}

export interface Proveedor {
  id: string;
  nombre: string;
  categoria: 'Materiales' | 'Maquinaria' | 'Estructuras' | 'Otros';
}

export interface Especialista {
  id: string;
  nombre: string;
  gremio: 'Electricidad' | 'Fontanería' | 'Pintura' | 'Pladur';
}

export interface Presupuesto {
  id: string;
  codigo: string;
  clienteId: string;
  totalOfertado: number;
  estado: 'borrador' | 'enviado' | 'aceptado' | 'rechazado';
}

export interface Obra {
  id: string;
  nombre: string;
  clienteId: string;
  presupuestoId: string;
  estado: 'pendiente' | 'en_curso' | 'pausada' | 'finalizada';
}

export interface Ingreso {
  id: string;
  fecha: string;
  obraId: string;
  clienteId: string;
  concepto: string;
  importe: number;
  metodoPago: 'transferencia' | 'tarjeta' | 'efectivo';
}

export interface Gasto {
  id: string;
  fecha: string;
  obraId: string | 'general'; // 'general' para costes estructurales de empresa
  tipoGasto: 'materiales' | 'mano_obra' | 'subcontrata' | 'estructura';
  entidadId: string; // ID del Proveedor, Trabajador o Especialista
  concepto: string;
  importe: number;
}

// 📦 El Estado Maestro Global (Tus 9 tablas juntas en el mini-Odoo)
export interface FinancialAppState {
  clientes: Cliente[];
  trabajadores: Trabajador[];
  proveedores: Proveedor[];
  especialistas: Especialista[];
  presupuestos: Presupuesto[];
  obras: Obra[];
  ingresos: Ingreso[];
  gastos: Gasto[];
}