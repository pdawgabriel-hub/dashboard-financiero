import Menu from "./componentes/Menu/Menu";
import Home from "./paginas/Home/Home"

function App() {

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Menu/>
      <Home/>
    </div>
  );
}

export default App;