import { useEffect, useMemo, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export default function ExpenseTracker({ categories }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await fetch(`${API}/api/expenses/${month}`);
    const data = await res.json();
    setItems(data);
  };

  const add = async (e) => {
    e.preventDefault();
    if (!categoryId || !amount) return;
    const res = await fetch(`${API}/api/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ month, category_id: categoryId, amount: Number(amount), note }),
    });
    if (res.ok) {
      setAmount('');
      setNote('');
      fetchItems();
    }
  };

  useEffect(() => { fetchItems(); }, [month]);

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Track Spending</h3>
      <form onSubmit={add} className="grid grid-cols-12 gap-2 mb-4">
        <select value={month} onChange={e=>setMonth(e.target.value)} className="col-span-3 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none">
          <option value={new Date().toISOString().slice(0,7)}>{new Date().toISOString().slice(0,7)}</option>
        </select>
        <select value={categoryId} onChange={e=>setCategoryId(e.target.value)} className="col-span-3 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none">
          <option value="">Select category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.emoji || '🗂️'} {c.name}</option>)}
        </select>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" className="col-span-3 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note (optional)" className="col-span-2 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
        <button className="col-span-1 bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg">Add</button>
      </form>
      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {items.map(i => (
          <li key={i.id} className="flex items-center justify-between bg-slate-900/40 border border-slate-700 rounded-lg px-3 py-2 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">{categories.find(c => c.id === i.category_id)?.emoji || '🗂️'}</span>
              <span>{categories.find(c => c.id === i.category_id)?.name || 'Unknown'}</span>
              <span className="text-blue-200/70 text-sm">{i.note}</span>
            </div>
            <div className="font-semibold">${typeof i.amount === 'number' ? i.amount.toFixed(2) : i.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
