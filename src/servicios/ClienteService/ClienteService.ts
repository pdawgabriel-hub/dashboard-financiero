// Servicio para gestionar las operacions del Crud de Crud Service
import { crearCrudService } from '../CrudService/CrudService';
import { CLIENTES_MOCK } from '../../mocks/clientesMock/clientesMock';
import type { Cliente, ClienteInput } from '../../types/Cliente/Cliente';

const crud = crearCrudService<Cliente>('clientes', CLIENTES_MOCK, 'CLI');

/**
 * Equivalente a _compute_display_name de gestion.clientes:
 * "código - nombre completo (NIF)".
 */
export function getClienteDisplayName(cliente: Cliente): string {
  const nombreCompleto = `${cliente.nombre} ${cliente.apellidos ?? ''}`.trim();
  let etiqueta = cliente.id;
  if (nombreCompleto) etiqueta += ` - ${nombreCompleto}`;
  if (cliente.nif) etiqueta += ` (${cliente.nif})`;
  return etiqueta;
}

// Equivalente a la restricción SQL "nif" único de gestion.clientes.
function existeNifDuplicado(nif: string, idExcluido?: string): boolean {
  const nifNormalizado = nif.trim().toLowerCase();
  return crud
    .getAll()
    .some((c) => c.id !== idExcluido && c.nif.trim().toLowerCase() === nifNormalizado);
}

export const clienteService = {
  ...crud,
  create(datos: ClienteInput): Cliente {
    if (existeNifDuplicado(datos.nif)) {
      throw new Error(`Ya existe un cliente con el NIF ${datos.nif}`);
    }
    return crud.create(datos);
  },
  update(id: string, datos: Partial<ClienteInput>): Cliente | undefined {
    if (datos.nif && existeNifDuplicado(datos.nif, id)) {
      throw new Error(`Ya existe un cliente con el NIF ${datos.nif}`);
    }
    return crud.update(id, datos);
  },
};
