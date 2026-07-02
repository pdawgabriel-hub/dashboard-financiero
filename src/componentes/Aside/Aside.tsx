export default function Aside() {

    return (
        <>
        <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase px-2 mb-4">Menú principal</p>
            {/* <Link> de React Router */}
            <div className="p-2.5 bg-slate-800 text-emerald-400 rounded-lg text-sm font-medium">Dashboard</div>
            <div className="p-2.5 hover:bg-slate-800/60 rounded-lg text-sm font-medium transition-colors">Gastos</div>
            </aside>
        </>
    );

}