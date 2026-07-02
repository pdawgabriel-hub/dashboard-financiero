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
    nombre: '📊 Análisis Financiero',
    rutaPrincipal: '/dashboard',
    subSecciones: [
      { nombre: 'Dashboard Único', ruta: '', componente: 'PaginaDashboard' }
    ]
  },
  {
    id: 'consultar',
    nombre: 'Consultar Datos',
    rutaPrincipal: '/consultar',
    subSecciones: [
      { nombre: 'Clientes', ruta: 'clientes', componente: 'TablaClientes' },
      { nombre: 'Trabajadores', ruta: 'trabajadores', componente: 'TablaTrabajadores' },
      { nombre: 'Proveedores', ruta: 'proveedores', componente: 'TablaProveedores' },
      { nombre: 'Especialistas', ruta: 'especialistas', componente: 'TablaEspecialistas' },
      { nombre: 'Presupuestos', ruta: 'presupuestos', componente: 'TablaPresupuestos' },
      { nombre: 'Obras', ruta: 'obras', componente: 'TablaObras' },
      { nombre: 'Gastos', ruta: 'gastos', componente: 'TablaGastos' },
      { nombre: 'Ingresos', ruta: 'ingresos', componente: 'TablaIngresos' },
      { nombre: 'Partes de Trabajo', ruta: 'partes', componente: 'TablaPartes' }
    ]
  },
  {
    id: 'introducir',
    nombre: 'Introducir Datos',
    rutaPrincipal: '/introducir',
    subSecciones: [
      { nombre: 'Nuevo Cliente', ruta: 'nuevo-cliente', componente: 'FormCliente' },
      { nombre: 'Nuevo Trabajador', ruta: 'nuevo-trabajador', componente: 'FormTrabajador' },
      { nombre: 'Nuevo Proveedor', ruta: 'nuevo-proveedor', componente: 'FormProveedor' },
      { nombre: 'Nuevo Especialista', ruta: 'nuevo-especialista', componente: 'FormEspecialista' },
      { nombre: 'Nuevo Presupuesto', ruta: 'nuevo-presupuesto', componente: 'FormPresupuesto' },
      { nombre: 'Nueva Obra', ruta: 'nueva-obra', componente: 'FormObra' },
      { nombre: 'Registrar Gasto', ruta: 'nuevo-gasto', componente: 'FormGasto' },
      { nombre: 'Registrar Ingreso', ruta: 'nuevo-ingreso', componente: 'FormIngreso' },
      { nombre: 'Nuevo Parte de Trabajo', ruta: 'nuevo-parte', componente: 'FormParte' }
    ]
  }
];