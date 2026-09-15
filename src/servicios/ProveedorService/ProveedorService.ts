import { crearCrudService } from "../CrudService/CrudService";
import { PROVEEDORES_MOCK } from "../../mocks/proveedoresMock/proveedoresMock";
import type { Proveedor, ProveedorInput } from "../../types/Proveedor/Proveedor";

const crud = crearCrudService<Proveedor>('proveedores', PROVEEDORES_MOCK, 'PROV');

// Equivalente a _compute_total de gestion.proveedores: base * (1 + iva/100).
function calcularTotal(base: number, iva: number): number {
  return Math.round(base * (1 + iva / 100) * 100) / 100;
}

/**
 * Equivalente a _compute_display_name de gestion.proveedores:
 * "código - nombre · teléfono".
 */
export function getProveedorDisplayName(proveedor: Proveedor): string {
  let etiqueta = `${proveedor.id} - ${proveedor.nombre}`;
  if (proveedor.telf) etiqueta += ` · ${proveedor.telf}`;
  return etiqueta;
}

export const proveedorService = {
  ...crud,
  create(datos: ProveedorInput): Proveedor {
    return crud.create({ ...datos, total: calcularTotal(datos.base, datos.iva) });
  },
  update(id: string, datos: Partial<ProveedorInput>): Proveedor | undefined {
    const actual = crud.getById(id);
    if (!actual) return undefined;

    const base = datos.base ?? actual.base;
    const iva = datos.iva ?? actual.iva;
    return crud.update(id, { ...datos, total: calcularTotal(base, iva) });
  },
};
