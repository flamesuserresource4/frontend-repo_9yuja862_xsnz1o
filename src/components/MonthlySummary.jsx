import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export default function MonthlySummary({ categories }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [summary, setSummary] = useState(null);

  const load = async () => {
    try {
      const res = await fetch(`${API}/api/summary/${month}`);
      const data = await res.json();
      setSummary(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, [month, categories.length]);

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Summary</h3>
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
      </div>
      {!summary ? (
        <p className="text-blue-200">No data yet.</p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Income" value={summary.income} />
            <Stat label="Planned" value={summary.total_target} />
            <Stat label="Spent" value={summary.total_spent} />
          </div>
          <ul className="space-y-2">
            {summary.categories.map(c => (
              <li key={c.id} className="bg-slate-900/40 border border-slate-700 rounded-lg px-3 py-2 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.emoji || '🗂️'}</span>
                    <span>{c.name}</span>
                  </div>
                  <div className="text-sm text-blue-200">${'{'}c.spent{'}'} / ${'{'}c.target{'}'}</div>
                </div>
                <div className="mt-2 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  {c.progress !== null ? (
                    <div className={`${c.progress > 100 ? 'bg-red-500' : 'bg-blue-500'} h-2`} style={{ width: `${Math.min(c.progress, 100)}%` }} />
                  ) : (
                    <div className="h-2 bg-slate-600" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-3 text-white">
      <div className="text-blue-200 text-sm">{label}</div>
      <div className="text-2xl font-semibold">${'{'}Number(value||0).toLocaleString(){'}'}</div>
    </div>
  );
}
