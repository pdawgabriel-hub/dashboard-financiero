import { useEffect, useState } from 'react';
import GridConsulta from '../../../componentes/Crud/GridConsulta/GridConsulta';
import { clienteService } from '../../../servicios/ClienteService/ClienteService';
import type { Cliente } from '../../../types/Cliente/Cliente';

export default function PaginaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    setClientes(clienteService.getAll());
  }, []);

  const items = clientes.map((c) => ({
    id: c.id,
    titulo: `${c.nombre} ${c.apellidos ?? ''}`.trim(),
    textoBusqueda: `${c.id} ${c.nombre} ${c.apellidos ?? ''} ${c.nif}`,
    campos: [
      { etiqueta: 'NIF', valor: c.nif },
      { etiqueta: 'Teléfono', valor: c.telefono },
      { etiqueta: 'Dirección', valor: c.direccion },
    ],
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Clientes</h1>
        <p className="text-slate-400 mt-1">Consulta y gestiona tus clientes.</p>
      </div>

      <GridConsulta
        items={items}
        rutaBaseEdicion="/consultar/clientes/editar"
        nombreVacio="No hay clientes que coincidan con la búsqueda."
      />
    </div>
  );
}
