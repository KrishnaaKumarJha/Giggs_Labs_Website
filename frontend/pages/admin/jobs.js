// frontend/pages/admin/jobs.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const API = 'http://127.0.0.1:8000/api/admin/jobs/';
const EMPTY = { title: '', location: '', type: 'Full-time', description: '', is_active: true };

export default function AdminJobs() {
    const router = useRouter();
    const [jobs, setJobs] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null); // id or null
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function token() { return localStorage.getItem('adminAccessToken'); }
    function headers() { return { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }; }

    useEffect(() => {
        if (!token() || !localStorage.getItem('adminSecretKey')) { router.replace('/'); return; }
        loadJobs();
    }, [router]);

    async function loadJobs() {
        try {
            const res = await fetch(API, { headers: headers() });
            if (res.status === 401 || res.status === 403) { router.replace('/'); return; }
            setJobs(await res.json());
        } catch { setError('Failed to load jobs'); }
    }

    async function handleSave(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const url = editing ? `${API}${editing}/` : API;
            const method = editing ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(form) });
            if (!res.ok) { setError(`Error: ${res.status}`); setLoading(false); return; }
            setShowForm(false);
            setEditing(null);
            setForm(EMPTY);
            await loadJobs();
        } catch (err) { setError(err.message); }
        setLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm('Delete this job opening?')) return;
        try {
            await fetch(`${API}${id}/`, { method: 'DELETE', headers: headers() });
            await loadJobs();
        } catch { setError('Failed to delete'); }
    }

    function startEdit(job) {
        setForm({ title: job.title, location: job.location, type: job.type, description: job.description, is_active: job.is_active });
        setEditing(job.id);
        setShowForm(true);
    }

    function startNew() {
        setForm(EMPTY);
        setEditing(null);
        setShowForm(true);
    }

    if (!jobs) return <div className="p-8 text-slate-300">Loading jobs…</div>;

    return (
        <section className="p-8 min-h-screen bg-[#0a0f1a]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
                        Job Openings
                    </h1>
                    <div className="flex gap-2">
                        <button onClick={() => router.push('/admin/dashboard')} className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">← Dashboard</button>
                        <button onClick={startNew} className="text-xs px-3 py-1.5 rounded-lg bg-[#00E0FF]/10 border border-[#00E0FF]/30 text-[#00E0FF] hover:bg-[#00E0FF]/20 transition-colors">+ Add Job</button>
                    </div>
                </div>

                {error && <div className="text-sm text-rose-400 bg-rose-400/10 p-3 rounded-lg mb-4">{error}</div>}

                {/* Form */}
                {showForm && (
                    <div className="mb-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
                        <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit Job' : 'New Job Opening'}</h2>
                        <form onSubmit={handleSave} className="space-y-3">
                            <input required placeholder="Job Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:border-[#00E0FF] outline-none" />
                            <div className="grid md:grid-cols-2 gap-3">
                                <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:border-[#00E0FF] outline-none" />
                                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#00E0FF] outline-none">
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                            <textarea required placeholder="Job Description" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:border-[#00E0FF] outline-none resize-none" />
                            <label className="flex items-center gap-2 text-sm text-slate-300">
                                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-[#00E0FF]" />
                                Active (visible on website)
                            </label>
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

                {/* Jobs list */}
                {jobs.length === 0 ? (
                    <div className="text-slate-400 text-center py-10">No job openings yet. Click "+ Add Job" to create one.</div>
                ) : (
                    <div className="space-y-3">
                        {jobs.map((job) => (
                            <div key={job.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-semibold">{job.title}</h3>
                                        {!job.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Inactive</span>}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">📍 {job.location} · 🕐 {job.type}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(job)} className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">Edit</button>
                                    <button onClick={() => handleDelete(job.id)} className="text-xs px-3 py-1.5 rounded-lg border border-rose-800/40 text-rose-400 hover:bg-rose-500/10 transition-colors">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
