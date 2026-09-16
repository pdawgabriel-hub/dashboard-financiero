import { Routes, Route } from 'react-router-dom';
import PaginaImprimirPresupuesto from '../../paginas/imprimir/PaginaImprimirPresupuesto/PaginaImprimirPresupuesto';
import PaginaImprimirParte from '../../paginas/imprimir/PaginaImprimirParte/PaginaImprimirParte';
import PaginaImprimirGasto from '../../paginas/imprimir/PaginaImprimirGasto/PaginaImprimirGasto';

// Rutas de impresión: equivalentes a action_print_presupuesto,
// action_print_parte y action_print_seguimiento en Odoo. Se montan aparte de
// <Main/> porque no llevan menú ni barra lateral.
export default function RutasImprimir() {
  return (
    <Routes>
      <Route path="/consultar/presupuestos/imprimir/:id" element={<PaginaImprimirPresupuesto />} />
      <Route path="/consultar/partes-trabajo/imprimir/:id" element={<PaginaImprimirParte />} />
      <Route path="/consultar/gastos/imprimir/:id" element={<PaginaImprimirGasto />} />
    </Routes>
  );
}
