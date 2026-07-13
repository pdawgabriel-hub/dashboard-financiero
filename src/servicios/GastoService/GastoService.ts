import { crearCrudService } from "../CrudService/CrudService";
import { GASTOS_MOCK } from "../../mocks/gastosMock/gastosMock";
import type { Gasto } from "../../types/Gasto/Gasto";

export interface ValoresCalculo {
  importe_neto: string | number;
  iva_porcentaje: string | number;
}

/**
 * Recibe el neto y el % de IVA, y devuelve el total calculado.
 */
export function calcularTotalConIva(valores: ValoresCalculo): number {
    
  const neto = Number(valores.importe_neto) || 0;
  const porcentaje = Number(valores.iva_porcentaje) || 0;

  const importeIva = neto * (porcentaje / 100);
  const total = neto + importeIva;

  // Redondeamos a 2 decimales
  return Math.round(total * 100) / 100;
}

export const gastoService = crearCrudService<Gasto>('gastos', GASTOS_MOCK, 'GAST');