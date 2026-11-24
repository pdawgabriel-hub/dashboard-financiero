# Recorrido por el código

Cinco patrones se repiten en toda la app. Conociéndolos, cualquier pantalla se lee en pocos minutos.

## 1. Un CRUD genérico sobre `localStorage` {#crud}

`src/servicios/CrudService/CrudService.ts` exporta `crearCrudService<T>(clave, datosIniciales, prefijo)`, que devuelve `getAll`, `getById`, `create`, `update` y `remove` para cualquier entidad con `id`. La primera lectura de una clave vacía siembra los datos de ejemplo:

```ts
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
```

Al cargar el módulo se comprueba además una **versión de los datos** (`VERSION_DATOS_ACTUAL`). Si no coincide con la guardada, se vacía todo `localStorage` y se vuelve a sembrar. Así, quien visitó la demo con una versión anterior, con datos de otra forma, no se encuentra la app rota.

## 2. Servicios que extienden el CRUD con reglas de negocio {#servicios}

Cada entidad tiene su servicio, que reutiliza el CRUD y sobrescribe lo que necesita. Por ejemplo, `presupuestoService` recalcula las líneas y los totales antes de guardar:

```ts
export const presupuestoService = {
  ...crud,
  create(datos: PresupuestoInput): Presupuesto {
    const lineas = calcularLineas(datos.lineas);
    return crud.create({ ...datos, lineas, ...calcularTotales(lineas, datos.iva) });
  },
  // update() hace lo mismo sobre el registro actual
};
```

Las reglas que cruzan entidades son funciones exportadas que calculan al leer, como `getObraTotal`:

```ts
export function getObraTotal(obra: Obra): number {
  return presupuestoService
    .getAll()
    .filter((p) => p.obra_id === obra.id && p.estado === 'aprobado')
    .reduce((suma, p) => suma + (p.total || 0), 0);
}
```

Las páginas nunca calculan importes por su cuenta: llaman a estas funciones. Así la ficha de una obra, el listado, el dashboard y el PDF dan siempre la misma cifra.

## 3. Formularios genéricos con React Hook Form y Zod {#formularios}

La mayoría de altas y ediciones usan `FormularioCRUD`, que recibe un esquema de Zod y una lista de campos y pinta el formulario completo, con validación y mensajes de error:

```tsx
const CAMPOS: CampoFormulario[] = [
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: true },
  { nombre: 'direccion', etiqueta: 'Direccion', requerido: true },
  {
    nombre: 'cliente_id',
    etiqueta: 'Cliente Asignado (ID)',
    tipo: 'select',
    buscable: true,
    opciones: clientesRegistrados.map(c => ({ valor: c.id, etiqueta: getClienteDisplayName(c) })),
    requerido: true
  }
];

<FormularioCRUD schema={obraSchema} campos={CAMPOS} onSubmit={handleSubmit} textoBoton="Crear obra" />
```

Con `buscable: true`, el desplegable se sustituye por `ComboboxBuscable`, que filtra mientras se escribe. Las etiquetas de las opciones salen de las funciones `get…DisplayName` de cada servicio (por ejemplo, `código - nombre apellidos (NIF)` para un cliente), para que se pueda buscar por lo que la gente recuerda y no solo por el código.

Presupuestos y Partes de Trabajo tienen líneas, así que usan formularios propios (`FormularioPresupuesto`, `FormularioParteTrabajo`) con `useFieldArray`. Al elegir un trabajador en una línea, `LineasParteTrabajo` copia su tarifa en el campo `coste_hora` con `setValue`: es la tarifa congelada de [Modelo de datos](modelo-datos.md#valores-congelados).

## 4. Listados con una rejilla común {#listados}

Cada página de consulta transforma sus registros en `items` (título, pares etiqueta/valor, texto de búsqueda, estado) y se los pasa a `GridConsulta`, que añade el buscador, el filtro por estado y el cambio entre vista de **tarjetas** y de **lista**. Toda la tarjeta o fila es un enlace a la ficha. Por ejemplo, el listado de Obras:

```tsx
const items = obras.map((o) => {
  const salud = gastoService.getSaludObra(o);

  return {
    id: o.id,
    titulo: o.descripcion,
    estado: salud,
    textoBusqueda: `${o.id} ${o.descripcion} ${o.direccion} ${o.cliente_id}`,
    campos: [
      {etiqueta: 'Descripción', valor: o.descripcion},
      // …
      {etiqueta: 'Total', valor: `${getObraTotal(o).toFixed(2)}€`},
      {etiqueta: 'Estado de pago', valor: getObraEstadoPago(o)},
      {etiqueta: 'Salud', valor: salud},
    ],
  };
});
```

`GridConsulta` filtra con `useMemo`, de modo que solo recalcula cuando cambian los registros, el texto buscado o el estado elegido.

## 5. Fichas con registros relacionados {#relacionados}

Las fichas de Cliente, Trabajador, Proveedor, Especialista y Obra muestran, bajo el formulario, los registros que apuntan a ellas (los presupuestos y obras de un cliente, los partes de un trabajador…) con `ListaRelacionados`. Cada elemento enlaza a su ficha. Es el equivalente a las pestañas de registros relacionados de un formulario de Odoo.

## Notificaciones

`ToastContext` expone el hook `useToast`, con una función `mostrarToast(mensaje)` que muestra un aviso flotante temporal. Las páginas la llaman tras crear, editar o borrar:

```tsx
const { mostrarToast } = useToast();
// …
obraService.create(datos);
mostrarToast('Obra creado correctamente');
navigate('/consultar/obras');
```
