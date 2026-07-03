interface BuscadorIdProps {
  valor: string;
  onChange: (valor: string) => void;
  placeholder?: string;
}

export default function BuscadorId({ valor, onChange, placeholder }: BuscadorIdProps) {
  return (
    <input
      type="text"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? 'Buscar por ID o nombre...'}
      className="w-full max-w-sm px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-600"
    />
  );
}
