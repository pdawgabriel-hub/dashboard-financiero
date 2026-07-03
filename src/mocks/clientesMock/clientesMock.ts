import type { Cliente } from '../../types/cliente/cliente';

export const CLIENTES_MOCK: Cliente[] = [
  {
    id: 'CLI-0001',
    nombre: 'María',
    apellidos: 'González Ruiz',
    nif: '12345678A',
    direccion: 'Calle Mayor 15, Sevilla',
    codPostal: '41001',
    telefono: '600111222',
  },
  {
    id: 'CLI-0002',
    nombre: 'Antonio',
    apellidos: 'López Díaz',
    nif: '87654321B',
    direccion: 'Avda. Constitución 3, El Viso del Alcor',
    codPostal: '41520',
    telefono: '600333444',
  },
  {
    id: 'CLI-0003',
    nombre: 'Laura',
    apellidos: 'Martín Pérez',
    nif: '11223344C',
    direccion: 'Plaza España 7, Carmona',
    codPostal: '41410',
    telefono: '600555666',
  },
];
