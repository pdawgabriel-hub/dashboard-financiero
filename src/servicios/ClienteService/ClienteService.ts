// Servicio para gestionar las operacions del Crud de Crud Service 
import { crearCrudService } from '../CrudService/CrudService';
import { CLIENTES_MOCK } from '../../mocks/clientesMock/clientesMock';
import type { Cliente } from '../../types/cliente/cliente';

export const clienteService = crearCrudService<Cliente>('clientes', CLIENTES_MOCK, 'CLI');
