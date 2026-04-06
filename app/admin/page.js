'use client';

import { useState, useEffect, useCallback } from 'react';

const API = 'https://api.zoeapp.se';

function useApi(apiKey) {
  const headers = { 'Content-Type': 'application/json', 'x-admin-key': apiKey };

  const get = useCallback(async (path) => {
    const res = await fetch(`${API}${path}`, { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  }, [apiKey]);

  const patch = useCallback(async (path, body) => {
    const res = await fetch(`${API}${path}`, { method: 'PATCH', headers, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  }, [apiKey]);

  return { get, patch };
}

// ---------- Login ----------
function Login({ onLogin }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/admin/stats`, {
        headers: { 'x-admin-key': pw },
      });
      if (!res.ok) throw new Error();
      localStorage.setItem('zoe_admin_key', pw);
      onLogin(pw);
    } catch {
      setError('Fel lösenord');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
          Zoe Admin
        </h1>
        <input
          type="password"
          placeholder="Lösenord"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoFocus
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading || !pw}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>
    </div>
  );
}

// ---------- Stats ----------
function Stats({ stats }) {
  const cards = [
    { label: 'Skanningar', value: stats.totalScans },
    { label: 'Idag', value: stats.scansToday },
    { label: 'Enheter', value: stats.uniqueDevices },
    { label: 'Unika streckkoder', value: stats.uniqueBarcodes },
    { label: 'Snitt/enhet', value: stats.averageScansPerUser },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-xl shadow p-4">
          <div className="text-2xl font-bold text-green-700">{c.value ?? '–'}</div>
          <div className="text-sm text-gray-500 mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- Pending Products ----------
function PendingProducts({ apiKey }) {
  const { get, patch } = useApi(apiKey);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await get(`/admin/pending-products?status=${filter}`);
      setProducts(data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filter, get]);

  useEffect(() => { load(); }, [load]);

  const openDetail = async (product) => {
    setSelected(product);
    try {
      const data = await get(`/admin/pending-products/${product.id}`);
      setDetail(data);
    } catch {
      setDetail(null);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await patch(`/admin/pending-products/${id}`, { status });
      setSelected(null);
      setDetail(null);
      load();
    } catch (err) {
      alert('Kunde inte uppdatera: ' + err.message);
    }
  };

  const filters = ['pending', 'approved', 'rejected'];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            {f === 'pending' ? 'Väntande' : f === 'approved' ? 'Godkända' : 'Nekade'}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400">Laddar...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">Inga produkter med status "{filter}"</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-4 py-3">Streckkod</th>
                <th className="px-4 py-3">Namn</th>
                <th className="px-4 py-3">Inskickad</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-mono text-sm">{p.barcode}</td>
                  <td className="px-4 py-3">{p.product_name || '–'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(p.created_at).toLocaleDateString('sv-SE')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openDetail(p)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Visa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                {selected.product_name || selected.barcode}
              </h3>
              <button
                onClick={() => { setSelected(null); setDetail(null); }}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">Streckkod:</span> <span className="font-mono">{selected.barcode}</span></div>
              <div><span className="text-gray-500">Namn:</span> {selected.product_name || '–'}</div>
              <div><span className="text-gray-500">Enhet:</span> {selected.device_id || '–'}</div>
              <div><span className="text-gray-500">Status:</span> {selected.status}</div>
              <div><span className="text-gray-500">Inskickad:</span> {new Date(selected.created_at).toLocaleString('sv-SE')}</div>
            </div>

            {detail && (detail.front_image || detail.back_image) && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {detail.front_image && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Framsida</p>
                    <img src={detail.front_image.startsWith('data:') ? detail.front_image : `data:image/jpeg;base64,${detail.front_image}`} alt="Framsida" className="rounded-lg w-full object-cover" />
                  </div>
                )}
                {detail.back_image && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ingredienser</p>
                    <img src={detail.back_image.startsWith('data:') ? detail.back_image : `data:image/jpeg;base64,${detail.back_image}`} alt="Ingredienser" className="rounded-lg w-full object-cover" />
                  </div>
                )}
              </div>
            )}

            {selected.status === 'pending' && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => updateStatus(selected.id, 'approved')}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Godkänn
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'rejected')}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Neka
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Recent Scans ----------
function RecentScans({ apiKey }) {
  const { get } = useApi(apiKey);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/admin/scans?limit=20')
      .then((data) => setScans(data.scans || []))
      .catch(() => setScans([]))
      .finally(() => setLoading(false));
  }, [get]);

  if (loading) return <p className="text-gray-400">Laddar...</p>;
  if (scans.length === 0) return <p className="text-gray-400">Inga skanningar ännu</p>;

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-sm text-gray-500">
          <tr>
            <th className="px-4 py-3">Streckkod</th>
            <th className="px-4 py-3">Produkt</th>
            <th className="px-4 py-3">Enhet</th>
            <th className="px-4 py-3">Tid</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((s, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-mono text-sm">{s.barcode}</td>
              <td className="px-4 py-3">{s.product_name || '–'}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{s.device_id?.slice(0, 8) || '–'}</td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(s.created_at).toLocaleString('sv-SE')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Main Admin ----------
const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'pending', label: 'Produkter' },
  { id: 'scans', label: 'Skanningar' },
];

export default function AdminPage() {
  const [apiKey, setApiKey] = useState(null);
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const { get } = useApi(apiKey);

  useEffect(() => {
    const saved = localStorage.getItem('zoe_admin_key');
    if (saved) setApiKey(saved);
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    get('/admin/stats')
      .then(setStats)
      .catch(() => {
        localStorage.removeItem('zoe_admin_key');
        setApiKey(null);
      });
  }, [apiKey, get]);

  const logout = () => {
    localStorage.removeItem('zoe_admin_key');
    setApiKey(null);
  };

  if (!apiKey) return <Login onLogin={setApiKey} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-700" style={{ fontFamily: 'Inter, sans-serif' }}>
            Zoe Admin
          </h1>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">
            Logga ut
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                tab === t.id
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'dashboard' && (
          <>
            {stats ? <Stats stats={stats} /> : <p className="text-gray-400">Laddar statistik...</p>}
            {stats?.topProducts?.length > 0 && (
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Mest skannade
                </h2>
                <div className="space-y-2">
                  {stats.topProducts.map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <span className="font-medium">{p.productName}</span>
                        <span className="text-gray-400 text-sm ml-2">{p.barcode}</span>
                      </div>
                      <span className="text-green-700 font-bold">{p.scanCount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'pending' && <PendingProducts apiKey={apiKey} />}
        {tab === 'scans' && <RecentScans apiKey={apiKey} />}
      </main>
    </div>
  );
}
