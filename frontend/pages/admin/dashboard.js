// frontend/pages/admin/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Briefcase, Settings, MessageSquare, 
  FileText, Users, PenTool, LogOut, ChevronRight, 
  TrendingUp, Activity, BarChart3, Loader2 
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

const NAV_ITEMS = [
    { href: '/admin/jobs', label: 'Job Openings', icon: <Briefcase className="w-5 h-5" />, color: 'from-blue-500/20 to-cyan-400/20', border: 'border-blue-500/30', text: 'text-blue-400', desc: 'Add or manage job listings' },
    { href: '/admin/posts', label: 'Insights Hub', icon: <PenTool className="w-5 h-5" />, color: 'from-purple-500/20 to-pink-400/20', border: 'border-purple-500/30', text: 'text-purple-400', desc: 'Publish blog posts & articles' },
    { href: '/admin/applications', label: 'Applications', icon: <FileText className="w-5 h-5" />, color: 'from-orange-500/20 to-yellow-400/20', border: 'border-orange-500/30', text: 'text-orange-400', desc: 'Review candidate resumes' },
    { href: '/admin/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, color: 'from-indigo-500/20 to-blue-400/20', border: 'border-indigo-500/30', text: 'text-indigo-400', desc: 'Client inquiries & leads' },
    { href: '/admin/users', label: 'Team Admin', icon: <Users className="w-5 h-5" />, color: 'from-rose-500/20 to-red-400/20', border: 'border-rose-500/30', text: 'text-rose-400', desc: 'Access control & staff' },
];

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ username: 'Admin' });

    useEffect(() => {
        const token = localStorage.getItem('adminAccessToken');
        if (!token) {
            router.replace('/admin/login');
            return;
        }
        loadStats();
    }, [router]);

    async function loadStats() {
        try {
            const res = await apiFetch('/admin/stats');
            if (res.ok) {
                setStats(await res.json());
            }
        } catch (err) {
            console.error("Stats fail", err);
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        router.replace('/admin/login');
    }

    if (loading) return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00E0FF]" />
      </div>
    );

    return (
        <section className="min-h-screen bg-[#030712] text-white p-4 md:p-8 lg:p-12 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E0FF]/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7A5BFF]/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-6xl mx-auto space-y-10">
                
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <motion.h1 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-4xl font-black tracking-tight flex items-center gap-3"
                        >
                          <LayoutDashboard className="w-8 h-8 text-[#00E0FF]" />
                          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">Overview</span>
                        </motion.h1>
                        <p className="text-slate-400 mt-2 font-medium">Welcome back, {user.username}. Monitoring system health and leads.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-rose-500/10 hover:border-rose-500/50 hover:text-rose-400 transition-all font-bold text-sm"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {[
                      { label: 'Active Jobs', val: stats?.jobs || 0, icon: <Activity className="w-4 h-4" />, color: 'text-blue-400' },
                      { label: 'Published Posts', val: stats?.posts || 0, icon: <TrendingUp className="w-4 h-4" />, color: 'text-purple-400' },
                      { label: 'Unread Messages', val: stats?.messages || 0, icon: <MessageSquare className="w-4 h-4" />, color: 'text-indigo-400' },
                    ].map((s, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-md"
                      >
                        <div className={`mb-3 p-2 rounded-lg bg-white/5 w-fit ${s.color}`}>
                          {s.icon}
                        </div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                        <h2 className="text-3xl font-black mt-1 leading-none">{s.val}</h2>
                      </motion.div>
                    ))}
                </div>

                {/* Navigation Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {NAV_ITEMS.map((item, i) => (
                        <Link key={item.href} href={item.href}>
                            <motion.div 
                              whileHover={{ y: -5, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`group p-8 rounded-[2.5rem] bg-slate-900/30 border ${item.border} hover:bg-slate-900/60 transition-all cursor-pointer relative overflow-hidden`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity`} />
                                
                                <div className="relative z-10">
                                    <div className={`mb-6 p-4 rounded-2xl bg-slate-950 w-fit ${item.text} border border-white/5`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-black text-white group-hover:text-white transition-colors">
                                            {item.label}
                                        </h3>
                                        <ChevronRight className={`w-5 h-5 ${item.text} transform group-hover:translate-x-1 transition-transform`} />
                                    </div>
                                    <p className="text-sm text-slate-500 mt-2 font-medium">{item.desc}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Footer Info */}
                <footer className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-transparent">
                    <p className="text-slate-600 text-xs font-bold uppercase tracking-widest italic">
                        Powered by <span className="text-[#00E0FF]">Giggs Labs</span> Engine
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-slate-500 font-medium">Database Connected: giggs_main</span>
                    </div>
                </footer>
            </div>
        </section>
    );
}
