import { crearCrudService } from "../CrudService/CrudService";
import { INGRESOS_MOCK } from "../../mocks/ingresoMock/ingresoMock";
import type { Ingreso } from "../../types/Ingreso/Ingreso";

export const ingresoService = crearCrudService<Ingreso>('ingresos', INGRESOS_MOCK, 'INGR');

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
