/**
 * Servicio CRUD genérico respaldado por localStorage.
 * Uso: crearCrudService<Cliente>('clientes', CLIENTES_MOCK)
 * Reutilizable para cualquier entidad.
 */

type ConId = { id: string };

function generarId(prefijo: string): string {
  const num = Math.floor(Math.random() * 900000 + 100000);
  return `${prefijo}-${num}`;
}

export function crearCrudService<T extends ConId>(
  claveStorage: string,
  datosIniciales: T[],
  prefijoId: string
) {
  function leerTodo(): T[] {
    const raw = localStorage.getItem(claveStorage);
    if (!raw) {
      // Primera vez: sembramos con el mock inicial
      localStorage.setItem(claveStorage, JSON.stringify(datosIniciales));
      return datosIniciales;
    }
    try {
      return JSON.parse(raw) as T[];
    } catch {
      return datosIniciales;
    }
  }

  function guardarTodo(items: T[]) {
    localStorage.setItem(claveStorage, JSON.stringify(items));
  }

  return {
    getAll(): T[] {
      return leerTodo();
    },

    getById(id: string): T | undefined {
      return leerTodo().find((item) => item.id === id);
    },

    create(datos: Omit<T, 'id'>): T {
      const items = leerTodo();
      const nuevo = { ...datos, id: generarId(prefijoId) } as T;
      guardarTodo([...items, nuevo]);
      return nuevo;
    },

    update(id: string, datos: Partial<Omit<T, 'id'>>): T | undefined {
      const items = leerTodo();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) return undefined;

      const actualizado = { ...items[index], ...datos } as T;
      items[index] = actualizado;
      guardarTodo(items);
      return actualizado;
    },

    remove(id: string): boolean {
      const items = leerTodo();
      const nuevos = items.filter((item) => item.id !== id);
      guardarTodo(nuevos);
      return nuevos.length < items.length;
    },
  };
}
