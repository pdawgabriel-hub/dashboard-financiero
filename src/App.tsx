import { useLocation } from 'react-router-dom';
import Menu from './componentes/Menu/Menu';
import Aside from './componentes/Aside/Aside';
import Main from './componentes/Main/Main';

export default function App() {
  // Obtenemos la URL actual
  const location = useLocation();
  // Renderiza el aside dependiendo de nuestra ruta
  // Usamos startsWith porque tenemos 9 subsecciones
  const mostrarAside = location.pathname.startsWith('/consultar') || location.pathname.startsWith('/introducir');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Menu />
      <div className="flex flex-1 overflow-hidden">
        {/* Si mostrarAside es TRUE renderiza el aside*/}
        {mostrarAside && <Aside />}
        <Main />
      </div>
    </div>
  );
}