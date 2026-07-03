// Fichero para definir la estrcutira de los Clientes
export interface Cliente {
  id: string;           // equivale a cliente_id (código autogenerado)
  nombre: string;        // required
  apellidos?: string;
  nif: string;            // required, único
  direccion: string;      // required
  codPostal?: string;
  telefono: string;       // required
}

// Tipo para crear: sin id, lo genera el servicio
export type ClienteInput = Omit<Cliente, 'id'>;
