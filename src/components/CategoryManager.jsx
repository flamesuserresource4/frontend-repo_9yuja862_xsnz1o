import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export default function CategoryManager({ onChange }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/api/categories`);
      const data = await res.json();
      setCategories(data);
      onChange?.(data);
    } catch (e) {
      console.error(e);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    if (!name) return;
    const res = await fetch(`${API}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, emoji }),
    });
    if (res.ok) {
      setName('');
      setEmoji('');
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 sticky top-6">
      <h3 className="text-white font-semibold mb-3">Categories</h3>
      <form onSubmit={addCategory} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
        <input value={emoji} onChange={(e)=>setEmoji(e.target.value)} placeholder="Emoji (optional)" className="sm:w-40 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" />
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
      </form>
      <ul className="space-y-2">
        {categories.map(c => (
          <li key={c.id} className="flex items-center justify-between bg-slate-900/40 border border-slate-700 rounded-lg px-3 py-2 text-white">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0">{c.emoji || '🗂️'}</span>
              <span className="truncate">{c.name}</span>
            </div>
            <span className="text-xs text-blue-200/70 truncate max-w-[40%]">{c.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
