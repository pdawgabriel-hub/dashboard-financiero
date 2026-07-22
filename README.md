# ERP Construcción - Sistema de Gestión Modular

Un sistema ERP moderno, fluido y totalmente responsivo diseñado para la gestión de proyectos de construcción, control de presupuestos, gastos y análisis financiero en tiempo real. Desarrollado con **React**, **TypeScript** y **Tailwind CSS**.

Este proyecto está enfocado puramente en el **Desarrollo Frontend**, demostrando buenas prácticas de renderizado rápido, interfaces reactivas y un control de estado riguroso. Para facilitar su portabilidad y testeo ágil, **la aplicación prescinde de una base de datos física o un backend tradicional**; toda la persistencia de datos se gestiona localmente en el navegador a través de **localStorage**, apoyándose en un ecosistema de **datos simulados (mocks)** preestablecidos para una experiencia de usuario fluida desde el primer segundo.

## Índice

*   [Características Clave](#-características-clave)
*   [Módulo de Análisis Financiero (Dashboard)](#-módulo-de-análisis-financiero-dashboard)
*   [Sistema de Notificaciones (useToast)](#sistema-de-notificaciones-usetoast)
*   [Optimización y Buenas Prácticas](#️-optimización-y-buenas-prácticas)
*   [Stack Tecnológico](#️-stack-tecnológico)
*   [Estructura del Proyecto](#-estructura-del-proyecto)
*   [Despliegue en Producción (Vercel)](#-despliegue-en-producción-vercel)
*   [Licencia](#-licencia)

---

## Características Clave

*   **Diseño 100% Responsivo:** Interfaz adaptada dinámicamente para móviles, tablets y ordenadores mediante layouts híbridos y menús deslizantes horizontales (`overflow-x-auto`) en Tailwind.
*   **Filtrado Avanzado:** Componente de consulta global (`GridConsulta`) con buscador predictivo por texto y selectores normalizados por estados del ciclo de vida del negocio.
*   **Formularios Dinámicos:** Arquitectura basada en React Hook Form y validación estricta de esquemas en tiempo real con Zod.
*   **Automatización de Cálculos:** Sistema integrado y reactivo para el cálculo automático de importes netos, porcentajes de IVA y totales consolidados de gastos e ingresos.
*   **Gestión de Datos Relacionales:** Cruce automático de IDs (Clientes, Obras, Presupuestos) en la capa de presentación para mostrar información legible en lugar de códigos técnicos.

---

## Módulo de Análisis Financiero (Dashboard)

El sistema cuenta con un panel analítico centralizado que procesa los flujos de caja y estados de salud del negocio:

* **Tarjetas de Métricas (KPIs):** Visualización rápida de los principales indicadores del negocio (Total de Ingresos, Gastos Acumulados, Margen de Beneficio y Presupuestos Pendientes).
* **Balance de Pérdidas y Ganancias:** Cálculo reactivo del beneficio neto de la empresa aplicando la fórmula:
    $$Beneficio = \sum Ingresos - \sum Gastos$$
* **Alertas de Desviación Presupuestaria:** Monitorización en tiempo real del presupuesto asignado a las obras frente a los gastos reales imputados mediante partes y facturas, detectando sobrecostes de forma temprana.
* **Control de Flujo de Caja (Cash Flow):** Segmentación del dinero real cobrado/pagado frente al dinero comprometido (facturas en estado *pendiente*).
* **Gráficos Interactivos y Visualización Avanzada:**
  * **Gráfico de Barras (`GraficoBarras`):** Comparativa de ingresos y costes imputados por cada obra en ejecución.
  * **Gráfico de Línea (`GraficoLineaGastos`):** Evolución temporal del volumen de gastos e inversiones a lo largo del tiempo.
  * **Gráfico de Pastel (`GraficoPastelEstado`):** Distribución porcentual del estado de las obras y presupuestos del sistema.

---

## Sistema de Notificaciones (useToast)

Para mantener una experiencia de usuario fluida y reactiva, el proyecto integra un **Contexto de Notificaciones Personalizado manejado a través del hook `useToast`**. Este ecosistema permite lanzar alertas visuales temporales y flotantes desde cualquier componente o página de forma muy sencilla.

### Cómo usarlo en tus vistas o componentes:

1. **Importar el hook personalizado** `useToast` en el archivo donde lo necesites.
2. **Extraer la función** `mostrarToast`.
3. **Invocar la función** pasándole el mensaje de texto deseado tras realizar acciones como crear, editar o eliminar registros.

### Ejemplo práctico de implementación:

```tsx
import { useToast } from "../../../contextos/ToastContext/ToastContext";

export default function MiComponente() {
  // 1. Instanciamos el hook que consume el contexto de notificaciones
  const { mostrarToast } = useToast();

  const handleAccion = () => {
    // ... lógica del negocio (ej. guardar datos) ...

    // 2. Lanzamos la notificación visual flotante
    mostrarToast("¡Operación completada con éxito!");
  };

  return (
    <button onClick={handleAccion} className="bg-emerald-600 text-white p-2 rounded">
      Guardar Registro
    </button>
  );
}
```

---

## Optimización y Buenas Prácticas

*   **Evitamos Rerenders Innecesarios:** Uso intensivo de `useMemo` en los componentes de filtrado (`GridConsulta`) para procesar las búsquedas y cruces de datos relacionales únicamente cuando el array de elementos o el término de búsqueda cambian.
*   **Filtros:** Normalización automática de strings (`.toLowerCase().trim()`) en las búsquedas, haciendo que los filtros por estado sean inmunes a discrepancias entre mayúsculas, minúsculas o espacios accidentales de la base de datos.
*   **Tipado Estricto de Extremo a Extremo:** Cero uso de `any`. Toda la información (desde las entidades del negocio hasta las props del generador de formularios genéricos) está respaldada por tipos rigurosos de TypeScript.

---

## Stack Tecnológico

*   **Frontend:** React (Hooks + `useMemo` + `useEffect`)
*   **Lenguaje:** TypeScript (Tipado estricto)
*   **Enrutamiento:** React Router DOM (Manejo dinámico de parámetros de sección)
*   **Formularios & Validación:** React Hook Form + Zod + Resolvers
*   **Estilos:** Tailwind CSS (Diseño Mobile-First adaptativo)

---

## Estructura del Proyecto

El sistema se organiza bajo una arquitectura limpia y altamente modular basada en carpetas funcionales, separando de forma estricta la interfaz, la lógica de negocio y las páginas dinámicas.

```text
src/
├── componentes/          # Componentes atómicos e independientes de la UI
│   ├── Aside/            # Menú de navegación lateral (adaptable a móvil)
│   ├── Main/             # Contenedor principal de vistas y enrutador
│   ├── Menu/             # Barra de navegación superior con scroll móvil
│   ├── VistaDinamica/    # Renderizador dinámico de componentes por string-key
│   │
│   ├── Dashboard/        # Ecosistema analítico centralizado del Dashboard
│   │   ├── GraficoBarras/          # Comparativa de Ingresos vs. Gastos por Obra
│   │   ├── GraficoLineaGastos/     # Evolución temporal y tendencia de costes
│   │   ├── GraficoPastelEstado/    # Distribución porcentual por estados de obras
│   │   ├── TarjetasKpi/            # Indicadores financieros de alto nivel (KPIs)
│   │   └── UltimosMovimientos/     # Registro contable y transacciones recientes
│   │
│   └── Crud/             # Sub-ecosistema para operaciones CRUD globales
│       ├── BuscadorId/      # Barra de búsqueda predictiva de texto
│       ├── GridConsulta/    # Layout de rejilla inteligente con filtro por estado
│       ├── TarjetaDato/     # Tarjetas individuales de datos cruzados
│       ├── FormularioCRUD/  # Generador de formularios reactivos con React Hook Form
│       └── ConfirmarEliminar/# Modal de seguridad para borrado de registros
│
├── paginas/              # Capa de vistas completas de la aplicación
│   ├── Home/             # Pantalla de bienvenida al ERP
│   ├── PaginaDashboard/  # Panel financiero centralizado con analíticas
│   ├── consultar/        # Listados globales y modales de edición (18 módulos)
│   │   ├── PaginaClientes, PaginaObras, PaginaGastos...
│   │   └── PaginaEditarCliente, PaginaEditarObra... (Formularios de edición por ID)
│   └── introducir/       # Formularios dedicados de inserción (9 módulos)
│       └── PaginaFormClientes, PaginaFormObras, PaginaFormGastos...
│
├── contextos/            # Estados globales de React compartidos entre componentes, usado para el ToastContext (useToast)
├── schemas/              # Esquemas y reglas de validación estricta creados con Zod
├── servicios/            # Servicios encargados de la lógica de negocio y persistencia
├── types/                # Interfaces y tipos de TypeScript de extremo a extremo
├── mocks/                # Datos simulados y rutas de testing en desarrollo (Obra, Presupuesto, Gasto)
├── App.tsx               # Orquestador de layouts e hilos de renderizado
└── main.tsx              # Punto de entrada de la aplicación en el DOM
```

---

## Despliegue en Producción (Vercel)

Este proyecto está completamente optimizado y configurado para compilarse de forma automática al hacer un push a la rama principal.

Ver despliegue [despliegue en Vercel](https://dashboard-financiero-kappa-blue.vercel.app/).

---

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
