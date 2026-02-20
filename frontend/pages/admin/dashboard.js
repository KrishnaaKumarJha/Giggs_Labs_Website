// frontend/pages/admin/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV_ITEMS = [
    { href: '/admin/jobs', label: 'Job Openings', icon: '💼', desc: 'Add, edit, or remove job listings' },
    { href: '/admin/services', label: 'Services', icon: '🛠️', desc: 'Manage service offerings' },
    { href: '/admin/posts', label: 'Insights / Blog', icon: '📝', desc: 'Manage blog posts and articles' },
    { href: '/admin/applications', label: 'Applications', icon: '📄', desc: 'View job applications (read-only)' },
    { href: '/admin/messages', label: 'Messages', icon: '💬', desc: 'View contact messages (read-only)' },
];

export default function AdminDashboard() {
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminAccessToken');
        const key = localStorage.getItem('adminSecretKey');
        if (!token || !key) {
            router.replace('/');
            return;
        }
        setReady(true);
    }, [router]);

    function handleLogout() {
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        localStorage.removeItem('adminSecretKey');
        router.replace('/');
    }

    if (!ready) return <div className="p-8 text-slate-300">Loading…</div>;

    return (
        <section className="p-8 min-h-screen bg-[#0a0f1a]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
                        Admin Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="text-xs px-3 py-1.5 rounded-lg border border-rose-800/40 text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <div className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-[#00E0FF]/50 transition-all cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{item.icon}</span>
                                    <h3 className="text-lg font-bold text-white group-hover:text-[#00E0FF] transition-colors">
                                        {item.label}
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
