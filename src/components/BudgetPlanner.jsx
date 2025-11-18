import { useEffect, useMemo, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export default function BudgetPlanner({ categories }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [income, setIncome] = useState(0);
  const [targets, setTargets] = useState({});
  const [saving, setSaving] = useState(false);

  const setTarget = (id, value) => setTargets(t => ({ ...t, [id]: Number(value) || 0 }));

  const saveBudget = async () => {
    setSaving(true);
    const allocations = Object.entries(targets).map(([category_id, target]) => ({ category_id, target }));
    const res = await fetch(`${API}/api/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ month, income: Number(income)||0, allocations }),
    });
    setSaving(false);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/budgets/${month}`);
        if (res.ok) {
          const data = await res.json();
          setIncome(data.income || 0);
          const preset = {};
          (data.allocations||[]).forEach(a => preset[a.category_id] = a.target);
          setTargets(preset);
        }
      } catch {}
    };
    load();
  }, [month]);

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Monthly Plan</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
        <input type="number" value={income} onChange={e=>setIncome(e.target.value)} placeholder="Income" className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
        <button onClick={saveBudget} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg disabled:opacity-60">{saving ? 'Saving...' : 'Save Plan'}</button>
      </div>
      <div className="space-y-2">
        {categories.map(c => (
          <div key={c.id} className="grid grid-cols-12 items-center gap-3 bg-slate-900/40 border border-slate-700 rounded-lg px-3 py-2">
            <div className="col-span-5 flex items-center gap-2 text-white">
              <span className="text-xl">{c.emoji || '🗂️'}</span>
              <span>{c.name}</span>
            </div>
            <div className="col-span-7">
              <input type="number" min="0" value={targets[c.id]||''} onChange={e=>setTarget(c.id, e.target.value)} placeholder="Target amount" className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
