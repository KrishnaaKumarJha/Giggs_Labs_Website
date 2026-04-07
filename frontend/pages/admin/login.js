// frontend/pages/admin/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Eye, EyeOff, Lock, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(`Login failed: ${errorData.error || 'Invalid credentials'}`);
        return;
      }

      const data = await res.json();
      localStorage.setItem('adminAccessToken', data.access);
      localStorage.setItem('adminRefreshToken', data.refresh);

      router.push('/admin/dashboard');
    } catch (err) {
      setError(`Connection error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00E0FF]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7A5BFF]/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/20 to-[#7A5BFF]/20 rounded-[2rem] blur-xl opacity-50" />
        
        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">Back</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Giggs Labs Management Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00E0FF] transition-colors" />
                <input
                  type="text"
                  placeholder="admin"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-600 focus:border-[#00E0FF]/50 focus:ring-4 focus:ring-[#00E0FF]/5 outline-none transition-all"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00E0FF] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-600 focus:border-[#00E0FF]/50 focus:ring-4 focus:ring-[#00E0FF]/5 outline-none transition-all"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-[13px] text-rose-400 bg-rose-400/10 p-4 rounded-xl border border-rose-400/20 font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF] text-black font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,224,255,0.3)] hover:shadow-[0_0_30px_rgba(0,224,255,0.5)] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
