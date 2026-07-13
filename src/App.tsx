import { useLocation } from 'react-router-dom';
import Menu from './componentes/Menu/Menu';
import Aside from './componentes/Aside/Aside';
import Main from './componentes/Main/Main';

export default function App() {
  const location = useLocation();
  const mostrarAside = location.pathname.startsWith('/consultar') || location.pathname.startsWith('/introducir');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Menu />
      
      {/* En móvil: flex-col (Menú arriba, contenido abajo) y permitimos scroll global */}
      {/* En PC (md:): flex-row (Menú a la izquierda, contenido a la derecha) y bloqueamos el desborde (overflow-hidden) */}
      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
        {mostrarAside && <Aside />}
        <Main />
      </div>
    </div>
  );
}