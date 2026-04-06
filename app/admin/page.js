'use client';

import { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.zoeapp.se';

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('pending');
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('zoe_admin_key');
    if (saved) {
      setApiKey(saved);
      setAuthenticated(true);
    }
  }, []);

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-key': apiKey,
  }), [apiKey]);

  const fetchProducts = useCallback(async (status) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/admin/pending-products?status=${status}`, { headers: headers() });
      if (!res.ok) throw new Error('Kunde inte hämta produkter');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [headers]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/admin/stats`, { headers: headers() });
      if (!res.ok) return;
      const data = await res.json();
      setStats(data);
    } catch {
      // Stats are non-critical
    }
  }, [headers]);

  useEffect(() => {
    if (authenticated) {
      fetchProducts(filter);
      fetchStats();
    }
  }, [authenticated, filter, fetchProducts, fetchStats]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('zoe_admin_key', apiKey);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('zoe_admin_key');
    setApiKey('');
    setAuthenticated(false);
    setProducts([]);
    setStats(null);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/admin/pending-products/${id}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Kunde inte uppdatera');
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedProduct(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const viewProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/pending-products/${id}`, { headers: headers() });
      if (!res.ok) throw new Error('Kunde inte hämta detaljer');
      const data = await res.json();
      setSelectedProduct(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Zoe Admin</h1>
          <label className="block text-sm font-medium text-gray-700 mb-2">API-nyckel</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ange admin API-nyckel"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Logga in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Zoe Admin</h1>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700">
            Logga ut
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Skanningar" value={stats.totalScans} />
            <StatCard label="Unika enheter" value={stats.uniqueDevices} />
            <StatCard label="Idag" value={stats.scansToday} />
            <StatCard label="Unika streckkoder" value={stats.uniqueBarcodes} />
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {['pending', 'approved', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === s
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {s === 'pending' ? 'Väntar' : s === 'approved' ? 'Godkända' : 'Avvisade'}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
            <button onClick={() => setError(null)} className="ml-2 font-bold">×</button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Laddar...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            Inga {filter === 'pending' ? 'väntande' : filter === 'approved' ? 'godkända' : 'avvisade'} produkter
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{p.product_name || 'Okänd produkt'}</div>
                  <div className="text-sm text-gray-500 font-mono">{p.barcode}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(p.created_at).toLocaleString('sv-SE')}
                    {p.device_id && ` · ${p.device_id.slice(0, 8)}...`}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => viewProduct(p.id)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Visa
                  </button>
                  {filter === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(p.id, 'approved')}
                        className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                      >
                        Godkänn
                      </button>
                      <button
                        onClick={() => updateStatus(p.id, 'rejected')}
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      >
                        Avvisa
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product detail modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedProduct.product_name || 'Okänd produkt'}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <DetailRow label="Streckkod" value={selectedProduct.barcode} />
                <DetailRow label="Status" value={selectedProduct.status} />
                <DetailRow label="Enhet" value={selectedProduct.device_id} />
                <DetailRow label="Inskickad" value={new Date(selectedProduct.created_at).toLocaleString('sv-SE')} />
              </div>

              {selectedProduct.front_image && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Framsida</div>
                  <img
                    src={selectedProduct.front_image}
                    alt="Framsida"
                    className="w-full rounded-lg border max-h-64 object-contain bg-gray-50"
                  />
                </div>
              )}

              {selectedProduct.back_image && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Ingredienser</div>
                  <img
                    src={selectedProduct.back_image}
                    alt="Ingredienser"
                    className="w-full rounded-lg border max-h-64 object-contain bg-gray-50"
                  />
                </div>
              )}

              {selectedProduct.status === 'pending' && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => updateStatus(selectedProduct.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Godkänn
                  </button>
                  <button
                    onClick={() => updateStatus(selectedProduct.id, 'rejected')}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Avvisa
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="text-2xl font-bold text-gray-900">{value ?? '–'}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium">{value || '–'}</span>
    </div>
  );
}
