// frontend/pages/admin/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem('adminAccessToken', data.access);
      localStorage.setItem('adminRefreshToken', data.refresh);
      // Store the secret key so admin can navigate between pages
      const key = router.query.key || '';
      localStorage.setItem('adminSecretKey', key);

      router.push('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
          Admin Login
        </h1>

        <p className="text-slate-400 text-sm mb-4">
          Use your Django admin username and password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded bg-slate-950/60 border border-slate-700 placeholder:text-slate-500"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-slate-950/60 border border-slate-700 placeholder:text-slate-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <div className="text-sm text-rose-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 px-4 py-2 rounded bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-[#00101A] font-medium disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const secretKey = process.env.ADMIN_SECRET_KEY;
  const providedKey = context.query.key;

  // If no secret key is configured or the provided key doesn't match -> 404
  if (!secretKey || providedKey !== secretKey) {
    return { notFound: true };
  }

  return { props: {} };
}
