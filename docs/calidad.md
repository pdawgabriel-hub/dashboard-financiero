# Calidad

## Qué protege hoy el código

- **TypeScript estricto en todo el proyecto.** Cada entidad tiene su tipo en `src/types/`, con un tipo `…Input` aparte para crear, que no permite pasar el `id` ni los campos que calcula el servicio.
- **Validación con Zod antes de guardar.** Ningún formulario llega al servicio sin pasar por su esquema de `src/schemas/`. Las reglas están en [Reglas de negocio](reglas-negocio.md#validaciones).
- **Una sola fuente para cada cálculo.** Las cifras financieras salen siempre de las mismas funciones de `src/servicios/`, que usan el listado, la ficha, el dashboard y el PDF. Ninguna página recalcula un importe por su cuenta.
- **Guarda de versión de los datos.** Si cambia la forma de los datos, el navegador de cada visitante se resiembra solo en lugar de romperse (ver [Recorrido por el código](codigo.md#crud)).

## Integración continua {#ci}

`.github/workflows/ci.yml` se ejecuta en cada push y en cada pull request a `main`. Instala las dependencias exactas de `pnpm-lock.yaml` y ejecuta `pnpm build`, que hace dos cosas:

1. `tsc -b`: comprueba los tipos de todo el proyecto.
2. `vite build`: genera la versión de producción, igual que hace Vercel al desplegar.

Si algo no compila, falla en GitHub antes de llegar a la demo. La insignia **CI** del README muestra el resultado del último commit.

Para reproducirlo en local:

```bash
pnpm install --frozen-lockfile
pnpm build
```

## Lint

`pnpm lint` ejecuta ESLint con las reglas recomendadas de TypeScript y de React Hooks. Los ficheros del dashboard (`PaginaDashboard.tsx` y `DashboardAnalisis.tsx`) pasan sin errores. En el resto quedan avisos pendientes, y por eso el lint todavía no forma parte del CI:

| Regla | Avisos | Qué pide |
|---|---|---|
| `react-hooks/set-state-in-effect` | 28 | No llenar el estado dentro de un `useEffect` al montar. Las páginas de listado y edición leen los datos así; como `localStorage` es síncrono, se pueden leer directamente al inicializar el estado, como ya hace el dashboard |
| `@typescript-eslint/no-explicit-any` | 9 | Sustituir `any` por tipos concretos, sobre todo en `FormularioCRUD` |
| `react-refresh/only-export-components` | 1 | Separar el hook `useToast` del componente `ToastProvider` |
| `react-hooks/incompatible-library` | 3 (advertencias) | Aviso del React Compiler sobre `watch()` de React Hook Form; no es un error |

Cuando se corrijan, el siguiente paso es añadir `pnpm lint` al CI.

## Tests

No hay tests automáticos todavía. Las reglas de [Reglas de negocio](reglas-negocio.md) son funciones puras sobre los servicios, así que son el primer candidato: con [Vitest](https://vitest.dev/) y un `localStorage` simulado se pueden probar sin navegador. Un buen primer escenario es el del ERP original:

| Paso | Acción | Resultado esperado |
|---|---|---|
| 1 | Obra nueva | `total = 0`, estado de pago `pendiente` |
| 2 | Presupuesto de la obra: 10 uds × 100 €, IVA 21 %, no aprobado | Presupuesto: base 1000, IVA 210, total 1210. La obra sigue en 0 |
| 3 | Aprobar el presupuesto | `total = 1210` |
| 4 | Parte de trabajo: 2 trabajadores a 20 €/h, 8 h cada uno | Mano de obra 320 €, 16 h |
| 5 | Parte de proveedor de 200 € y de especialista de 150 € | Gastos 670 € |
| 6 | Cobro de 500 € | Beneficio −170 €, debe 710 €, estado de pago `parcial`, salud `rojo` |
| 7 | Cobro de 710 € | Beneficio 540 €, debe 0, `pagado`, salud `verde`, ficha `finalizado` |
