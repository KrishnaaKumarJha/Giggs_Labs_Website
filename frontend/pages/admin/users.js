import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageShell from '../../components/pageshell';

export default function AdminUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        is_staff: true,
        is_superuser: false
    });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const API = `${apiUrl}/admin/users/`;

    useEffect(() => {
        const token = localStorage.getItem('adminAccessToken');
        if (!token) {
            router.replace('/');
            return;
        }
        loadUsers(token);
    }, [router]);

    async function loadUsers(token) {
        try {
            const res = await fetch(API, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('adminAccessToken');
                router.replace('/');
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                setError('Failed to load users');
            }
        } catch (err) {
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    }

    async function createUser(e) {
        e.preventDefault();
        const token = localStorage.getItem('adminAccessToken');
        setStatus('Creating...');
        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (res.status === 401 || res.status === 403) {
                router.replace('/');
                return;
            }
            if (res.ok) {
                setStatus('Created successfully!');
                setForm({ username: '', email: '', password: '', is_staff: true, is_superuser: false });
                loadUsers(token);
            } else {
                const errData = await res.json();
                setStatus(`Error: ${JSON.stringify(errData)}`);
            }
        } catch (err) {
            setStatus('Failed to create user');
        }
    }

    async function deleteUser(id) {
        if (!confirm('Are you sure you want to delete this user?')) return;
        const token = localStorage.getItem('adminAccessToken');
        try {
            const res = await fetch(`${API}${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                loadUsers(token);
            }
        } catch (err) {
            alert('Failed to delete user');
        }
    }

    if (loading) return <div className="p-20 text-center text-white">Loading...</div>;

    return (
        <PageShell title="User Management" eyebrow="Admin Panel">
            <div className="max-w-4xl mx-auto p-4 space-y-12">
                
                {/* ── Create User Form ── */}
                <section className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                    <h2 className="text-xl font-bold text-white mb-6">Create New Admin User</h2>
                    <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white"
                            value={form.username}
                            onChange={e => setForm({...form, username: e.target.value})}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white"
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            required
                        />
                        <div className="flex items-center gap-6 px-2">
                            <label className="flex items-center gap-2 text-slate-300 text-sm">
                                <input 
                                    type="checkbox" 
                                    checked={form.is_staff} 
                                    onChange={e => setForm({...form, is_staff: e.target.checked})}
                                />
                                Staff Status
                            </label>
                            <label className="flex items-center gap-2 text-slate-300 text-sm">
                                <input 
                                    type="checkbox" 
                                    checked={form.is_superuser} 
                                    onChange={e => setForm({...form, is_superuser: e.target.checked})}
                                />
                                Superuser
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                                Create User
                            </button>
                            {status && <p className="mt-4 text-sm text-sky-400">{status}</p>}
                        </div>
                    </form>
                </section>

                {/* ── User List ── */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-6">Existing Users</h2>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    <div className="overflow-hidden rounded-xl border border-slate-800">
                        <table className="w-full text-left text-slate-300">
                            <thead className="bg-slate-800/50 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">Username</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td className="p-4 font-medium text-white">{u.username}</td>
                                        <td className="p-4 text-sm">{u.email || '—'}</td>
                                        <td className="p-4">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${u.is_superuser ? 'border-amber-500/50 text-amber-500' : 'border-sky-500/50 text-sky-500'}`}>
                                                {u.is_superuser ? 'SUPERUSER' : 'STAFF'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => deleteUser(u.id)}
                                                className="text-red-400 hover:text-red-300 text-xs font-bold"
                                            >
                                                DELETE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </PageShell>
    );
}
