import { useEffect, useRef, useState } from 'react';

export interface OpcionCombobox {
  valor: string;
  etiqueta: string;
}

interface ComboboxBuscableProps {
  opciones: OpcionCombobox[];
  valor: string;
  onChange: (valor: string) => void;
  placeholder?: string;
  nombre?: string;
  className?: string; // clases extra para el contenedor (p.ej. encajar en una fila flex)
}

const CLASE_INPUT = 'px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-600 w-full cursor-text';

/**
 * Selector con búsqueda en vivo, equivalente al widget many2one de Odoo
 * (_search_display_name): en vez de un <select> plano con todas las
 * opciones, se escribe para filtrar y se elige de una lista desplegable.
 */
export default function ComboboxBuscable({ opciones, valor, onChange, placeholder, nombre, className }: ComboboxBuscableProps) {
  const [abierto, setAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const contenedorRef = useRef<HTMLDivElement>(null);

  const opcionSeleccionada = opciones.find((o) => o.valor === valor);

  useEffect(() => {
    function manejarClicFuera(e: MouseEvent) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(false);
        setBusqueda('');
      }
    }
    document.addEventListener('mousedown', manejarClicFuera);
    return () => document.removeEventListener('mousedown', manejarClicFuera);
  }, []);

  const opcionesFiltradas = busqueda.trim()
    ? opciones.filter((o) => o.etiqueta.toLowerCase().includes(busqueda.toLowerCase()))
    : opciones;

  function elegir(o: OpcionCombobox) {
    onChange(o.valor);
    setAbierto(false);
    setBusqueda('');
  }

  return (
    <div ref={contenedorRef} className={`relative ${className ?? ''}`}>
      <input
        type="text"
        name={nombre}
        value={abierto ? busqueda : (opcionSeleccionada?.etiqueta ?? '')}
        onChange={(e) => {
          setBusqueda(e.target.value);
          if (!abierto) setAbierto(true);
        }}
        onFocus={() => {
          setAbierto(true);
          setBusqueda('');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setAbierto(false);
            setBusqueda('');
            (e.target as HTMLInputElement).blur();
          }
          if (e.key === 'Enter') {
            e.preventDefault();
            if (opcionesFiltradas[0]) elegir(opcionesFiltradas[0]);
          }
        }}
        placeholder={placeholder ?? 'Buscar...'}
        autoComplete="off"
        role="combobox"
        aria-expanded={abierto}
        className={CLASE_INPUT}
      />

      {abierto && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg shadow-xl">
          {opcionesFiltradas.length === 0 ? (
            <p className="px-3 py-2 text-sm text-slate-500">Sin resultados</p>
          ) : (
            opcionesFiltradas.map((o) => (
              <button
                type="button"
                key={o.valor}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => elegir(o)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  o.valor === valor ? 'bg-emerald-600/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {o.etiqueta}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
