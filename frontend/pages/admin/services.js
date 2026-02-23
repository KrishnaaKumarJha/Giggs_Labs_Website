// frontend/pages/admin/services.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const API = 'http://127.0.0.1:8000/api/admin/services/';
const EMPTY = {
    icon: '🔧', title: '', tagline: '', description: '',
    color: 'from-cyan-400 to-blue-500', border_hover: 'hover:border-cyan-500/50',
    glow_hover: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]', accent: 'text-cyan-400',
    highlights: [], href: '', order: 0, is_active: true,
};

const COLOR_PRESETS = [
    { label: 'Cyan / Blue', color: 'from-cyan-400 to-blue-500', border: 'hover:border-cyan-500/50', glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]', accent: 'text-cyan-400' },
    { label: 'Violet / Purple', color: 'from-violet-400 to-purple-500', border: 'hover:border-violet-500/50', glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]', accent: 'text-violet-400' },
    { label: 'Amber / Orange', color: 'from-amber-400 to-orange-500', border: 'hover:border-amber-500/50', glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]', accent: 'text-amber-400' },
    { label: 'Emerald / Teal', color: 'from-emerald-400 to-teal-500', border: 'hover:border-emerald-500/50', glow: 'hover:shadow-[0_0_40px_rgba(52,211,153,0.25)]', accent: 'text-emerald-400' },
];

export default function AdminServices() {
    const router = useRouter();
    const [services, setServices] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [highlightsInput, setHighlightsInput] = useState('');
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function token() { return localStorage.getItem('adminAccessToken'); }
    function headers() { return { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }; }

    useEffect(() => {
        if (!token() || !localStorage.getItem('adminSecretKey')) { router.replace('/'); return; }
        loadServices();
    }, [router]);

    async function loadServices() {
        try {
            const res = await fetch(API, { headers: headers() });
            if (res.status === 401 || res.status === 403) { router.replace('/'); return; }
            setServices(await res.json());
        } catch { setError('Failed to load services'); }
    }

    async function handleSave(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const payload = { ...form, highlights: highlightsInput.split(',').map(s => s.trim()).filter(Boolean) };
        try {
            const url = editing ? `${API}${editing}/` : API;
            const method = editing ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
            if (!res.ok) { setError(`Error: ${res.status}`); setLoading(false); return; }
            setShowForm(false);
            setEditing(null);
            setForm(EMPTY);
            setHighlightsInput('');
            await loadServices();
        } catch (err) { setError(err.message); }
        setLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm('Delete this service?')) return;
        try {
            await fetch(`${API}${id}/`, { method: 'DELETE', headers: headers() });
            await loadServices();
        } catch { setError('Failed to delete'); }
    }

    function startEdit(svc) {
        setForm({
            icon: svc.icon, title: svc.title, tagline: svc.tagline, description: svc.description,
            color: svc.color, border_hover: svc.border_hover, glow_hover: svc.glow_hover, accent: svc.accent,
            href: svc.href, order: svc.order, is_active: svc.is_active,
            highlights: svc.highlights || [],
        });
        setHighlightsInput((svc.highlights || []).join(', '));
        setEditing(svc.id);
        setShowForm(true);
    }

    function startNew() {
        setForm(EMPTY);
        setHighlightsInput('');
        setEditing(null);
        setShowForm(true);
    }

    function applyPreset(preset) {
        setForm(f => ({ ...f, color: preset.color, border_hover: preset.border, glow_hover: preset.glow, accent: preset.accent }));
    }

    const inputCls = "w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:border-[#00E0FF] outline-none";

    if (!services) return <div className="p-8 text-slate-300">Loading services…</div>;

    return (
        <section className="p-8 min-h-screen bg-[#0a0f1a]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
                        Services
                    </h1>
                    <div className="flex gap-2">
                        <button onClick={() => router.push('/admin/dashboard')} className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">← Dashboard</button>
                        <button onClick={startNew} className="text-xs px-3 py-1.5 rounded-lg bg-[#00E0FF]/10 border border-[#00E0FF]/30 text-[#00E0FF] hover:bg-[#00E0FF]/20 transition-colors">+ Add Service</button>
                    </div>
                </div>

                {error && <div className="text-sm text-rose-400 bg-rose-400/10 p-3 rounded-lg mb-4">{error}</div>}

                {/* Form */}
                {showForm && (
                    <div className="mb-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
                        <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit Service' : 'New Service'}</h2>
                        <form onSubmit={handleSave} className="space-y-3">
                            <div className="grid md:grid-cols-[80px_1fr] gap-3">
                                <input placeholder="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputCls} />
                                <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
                            </div>
                            <input placeholder="Tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={inputCls} />
                            <textarea required placeholder="Description" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} resize-none`} />
                            <input placeholder="Link (e.g. /services/ai-data)" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} className={inputCls} />
                            <input placeholder="Highlights (comma-separated, e.g. AI, MLOps, Data)" value={highlightsInput} onChange={(e) => setHighlightsInput(e.target.value)} className={inputCls} />

                            {/* Color preset */}
                            <div>
                                <p className="text-xs text-slate-400 mb-2">Color Theme:</p>
                                <div className="flex flex-wrap gap-2">
                                    {COLOR_PRESETS.map((p) => (
                                        <button key={p.label} type="button" onClick={() => applyPreset(p)}
                                            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${form.color === p.color ? 'border-[#00E0FF] bg-[#00E0FF]/10 text-white' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-slate-400">Display Order</label>
                                    <input type="number" min="0" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className={inputCls} />
                                </div>
                                <label className="flex items-center gap-2 text-sm text-slate-300 mt-5">
                                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-[#00E0FF]" />
                                    Active (visible on website)
                                </label>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF] text-black font-bold text-sm disabled:opacity-50">
                                    {loading ? 'Saving…' : editing ? 'Update' : 'Create'}
                                </button>
                                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 text-sm hover:text-white transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Services list */}
                {services.length === 0 ? (
                    <div className="text-slate-400 text-center py-10">No services yet. Click "+ Add Service" to create one.</div>
                ) : (
                    <div className="space-y-3">
                        {services.map((svc) => (
                            <div key={svc.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{svc.icon}</span>
                                        <h3 className="text-white font-semibold">{svc.title}</h3>
                                        {!svc.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Inactive</span>}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">{svc.tagline}</p>
                                    {svc.highlights?.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {svc.highlights.map((h, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 text-slate-400">{h}</span>)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(svc)} className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">Edit</button>
                                    <button onClick={() => handleDelete(svc.id)} className="text-xs px-3 py-1.5 rounded-lg border border-rose-800/40 text-rose-400 hover:bg-rose-500/10 transition-colors">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
