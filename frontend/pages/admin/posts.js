// frontend/pages/admin/posts.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const API = 'http://127.0.0.1:8000/api/admin/posts/';
const CATEGORIES = ['Article', 'Whitepaper', 'Case Study', 'Tech Report'];
const EMPTY = { title: '', slug: '', category: 'Article', excerpt: '', content: '', is_published: true };

export default function AdminPosts() {
    const router = useRouter();
    const [posts, setPosts] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function token() { return localStorage.getItem('adminAccessToken'); }
    function headers() { return { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }; }

    useEffect(() => {
        if (!token() || !localStorage.getItem('adminSecretKey')) { router.replace('/'); return; }
        loadPosts();
    }, [router]);

    async function loadPosts() {
        try {
            const res = await fetch(API, { headers: headers() });
            if (res.status === 401 || res.status === 403) { router.replace('/'); return; }
            setPosts(await res.json());
        } catch { setError('Failed to load posts'); }
    }

    // Auto-generate slug from title
    function generateSlug(title) {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    async function handleSave(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const url = editing ? `${API}${editing}/` : API;
            const method = editing ? 'PUT' : 'POST';

            // Use FormData for potential image upload
            const fd = new FormData();
            fd.append('title', form.title);
            fd.append('slug', form.slug);
            fd.append('category', form.category);
            fd.append('excerpt', form.excerpt);
            fd.append('content', form.content);
            fd.append('is_published', form.is_published);
            if (form.imageFile) fd.append('image', form.imageFile);

            const res = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token()}` },
                body: fd,
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                setError(`Error: ${JSON.stringify(errData)}`);
                setLoading(false);
                return;
            }
            setShowForm(false);
            setEditing(null);
            setForm(EMPTY);
            await loadPosts();
        } catch (err) { setError(err.message); }
        setLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm('Delete this post?')) return;
        try {
            await fetch(`${API}${id}/`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
            await loadPosts();
        } catch { setError('Failed to delete'); }
    }

    async function togglePublish(post) {
        try {
            await fetch(`${API}${post.id}/`, {
                method: 'PATCH',
                headers: headers(),
                body: JSON.stringify({ is_published: !post.is_published }),
            });
            await loadPosts();
        } catch { setError('Failed to update'); }
    }

    function startEdit(post) {
        setForm({
            title: post.title, slug: post.slug, category: post.category,
            excerpt: post.excerpt, content: post.content, is_published: post.is_published,
        });
        setEditing(post.id);
        setShowForm(true);
    }

    function startNew() {
        setForm(EMPTY);
        setEditing(null);
        setShowForm(true);
    }

    const inputCls = "w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:border-[#00E0FF] outline-none";

    if (!posts) return <div className="p-8 text-slate-300">Loading posts…</div>;

    return (
        <section className="p-8 min-h-screen bg-[#0a0f1a]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
                        Insights / Blog
                    </h1>
                    <div className="flex gap-2">
                        <button onClick={() => router.push('/admin/dashboard')} className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">← Dashboard</button>
                        <button onClick={startNew} className="text-xs px-3 py-1.5 rounded-lg bg-[#00E0FF]/10 border border-[#00E0FF]/30 text-[#00E0FF] hover:bg-[#00E0FF]/20 transition-colors">+ Add Post</button>
                    </div>
                </div>

                {error && <div className="text-sm text-rose-400 bg-rose-400/10 p-3 rounded-lg mb-4">{error}</div>}

                {/* Form */}
                {showForm && (
                    <div className="mb-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
                        <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit Post' : 'New Post'}</h2>
                        <form onSubmit={handleSave} className="space-y-3">
                            <input required placeholder="Title" value={form.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    setForm(f => ({ ...f, title, ...(!editing ? { slug: generateSlug(title) } : {}) }));
                                }}
                                className={inputCls} />
                            <div className="grid md:grid-cols-2 gap-3">
                                <input required placeholder="Slug (auto-generated)" value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} />
                                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <textarea placeholder="Excerpt (brief summary)" rows="2" value={form.excerpt}
                                onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={`${inputCls} resize-none`} />
                            <textarea required placeholder="Content (Markdown supported)" rows="10" value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })} className={`${inputCls} resize-none font-mono text-sm`} />

                            <div className="grid md:grid-cols-2 gap-3 items-center">
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1">Cover Image (optional)</label>
                                    <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
                                        className="text-sm text-slate-400" />
                                </div>
                                <label className="flex items-center gap-2 text-sm text-slate-300">
                                    <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-[#00E0FF]" />
                                    Published
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

                {/* Posts list */}
                {posts.length === 0 ? (
                    <div className="text-slate-400 text-center py-10">No posts yet. Click "+ Add Post" to create one.</div>
                ) : (
                    <div className="space-y-3">
                        {posts.map((post) => (
                            <div key={post.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-semibold">{post.title}</h3>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 text-slate-400">{post.category}</span>
                                        {!post.is_published && <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Draft</span>}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{post.excerpt || post.content?.substring(0, 100)}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button onClick={() => togglePublish(post)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${post.is_published ? 'border-yellow-600/40 text-yellow-400 hover:bg-yellow-500/10' : 'border-emerald-600/40 text-emerald-400 hover:bg-emerald-500/10'}`}>
                                        {post.is_published ? 'Unpublish' : 'Publish'}
                                    </button>
                                    <button onClick={() => startEdit(post)} className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">Edit</button>
                                    <button onClick={() => handleDelete(post.id)} className="text-xs px-3 py-1.5 rounded-lg border border-rose-800/40 text-rose-400 hover:bg-rose-500/10 transition-colors">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
