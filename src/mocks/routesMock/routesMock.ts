export const MODULOS_ERP = [
  {
    id: 'inicio',
    nombre: 'Inicio',
    rutaPrincipal: '/',
    subSecciones: [
      { nombre: 'Inicio', ruta: '', componente: 'Home' }
    ]
  },
  {
    id: 'analisis',
    nombre: 'Análisis Financiero',
    rutaPrincipal: '/dashboard',
    subSecciones: [
      { nombre: 'Dashboard Único', ruta: '', componente: 'PaginaDashboard' }
    ]
  },
  {
    id: 'calendario',
    nombre: 'Calendario',
    rutaPrincipal: '/calendario',
    subSecciones: [
      { nombre: 'Calendario de Eventos', ruta: '', componente: 'TablaCalendario' }
    ]
  },
  {
    id: 'consultar',
    nombre: 'Consultar Datos',
    rutaPrincipal: '/consultar',
    subSecciones: [
      // Catálogos (maestros): quién interviene en el negocio
      { nombre: 'Clientes', ruta: 'clientes', componente: 'TablaClientes' },
      { nombre: 'Trabajadores', ruta: 'trabajadores', componente: 'TablaTrabajadores' },
      { nombre: 'Proveedores', ruta: 'proveedores', componente: 'TablaProveedores' },
      { nombre: 'Especialistas', ruta: 'especialistas', componente: 'TablaEspecialistas' },
      // Ciclo de negocio, en orden causal: Presupuesto -> Obra -> Partes -> Ingresos -> Gastos
      { nombre: 'Presupuestos', ruta: 'presupuestos', componente: 'TablaPresupuestos' },
      { nombre: 'Obras', ruta: 'obras', componente: 'TablaObras' },
      { nombre: 'Partes de Trabajo', ruta: 'partes', componente: 'TablaPartes' },
      { nombre: 'Partes de Proveedor', ruta: 'partes-proveedor', componente: 'TablaPartesProveedor' },
      { nombre: 'Partes de Especialista', ruta: 'partes-especialista', componente: 'TablaPartesEspecialista' },
      { nombre: 'Ingresos', ruta: 'ingresos', componente: 'TablaIngresos' },
      { nombre: 'Gastos', ruta: 'gastos', componente: 'TablaGastos' },
      // Auxiliares: fuera del ciclo de obra
      { nombre: 'Faltas de Trabajador', ruta: 'faltas', componente: 'TablaFaltas' }
      // Calendario de Eventos ahora es su propia pestaña en la barra superior
    ]
  },
  {
    id: 'introducir',
    nombre: 'Introducir Datos',
    rutaPrincipal: '/introducir',
    subSecciones: [
      // Mismo orden que "Consultar Datos": catálogos, ciclo de negocio, auxiliares
      // (sin Gasto ni Calendario: ninguno de los dos admite alta manual)
      { nombre: 'Nuevo Cliente', ruta: 'nuevo-cliente', componente: 'FormCliente' },
      { nombre: 'Nuevo Trabajador', ruta: 'nuevo-trabajador', componente: 'FormTrabajador' },
      { nombre: 'Nuevo Proveedor', ruta: 'nuevo-proveedor', componente: 'FormProveedor' },
      { nombre: 'Nuevo Especialista', ruta: 'nuevo-especialista', componente: 'FormEspecialista' },
      { nombre: 'Nuevo Presupuesto', ruta: 'nuevo-presupuesto', componente: 'FormPresupuesto' },
      { nombre: 'Nueva Obra', ruta: 'nueva-obra', componente: 'FormObra' },
      { nombre: 'Nuevo Parte de Trabajo', ruta: 'nuevo-parte', componente: 'FormParte' },
      { nombre: 'Nuevo Parte de Proveedor', ruta: 'nuevo-parte-proveedor', componente: 'FormParteProveedor' },
      { nombre: 'Nuevo Parte de Especialista', ruta: 'nuevo-parte-especialista', componente: 'FormParteEspecialista' },
      { nombre: 'Nuevo Ingreso', ruta: 'nuevo-ingreso', componente: 'FormIngreso' },
      { nombre: 'Nueva Falta', ruta: 'nueva-falta', componente: 'FormFalta' }
    ]
  }
];