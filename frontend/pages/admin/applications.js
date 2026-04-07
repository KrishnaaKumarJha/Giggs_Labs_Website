import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiFetch } from '../../utils/api';

export default function AdminApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
  const BACKEND_URL = API_URL.replace('/api', '');

  useEffect(() => {
    async function loadApplications() {
      try {
        const res = await apiFetch('/admin/applications');

        if (!res.ok) {
          setError('Failed to load applications');
          return;
        }

        const data = await res.json();

        const formatted = data.map((app) => ({
          ...app,
          created_display: new Date(app.created_at).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }),
        }));

        setApplications(formatted);
      } catch (err) {
        console.error(err);
        setError('Failed to load applications');
      }
    }

    loadApplications();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    router.replace('/admin/login');
  }

  if (!applications && !error) {
    return <div className="p-8 text-slate-300">Loading applications…</div>;
  }

  if (error) {
    return <div className="p-8 text-rose-400">{error}</div>;
  }

  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
            Admin · Job Applications
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              ← Dashboard
            </button>
            <button
              onClick={() => router.push('/admin/messages')}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              Messages
            </button>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-lg border border-rose-800/40 text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="text-slate-400">No applications yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-700/40">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/60 text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px]">Candidate</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px]">Job & Qual</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px]">Exp & CTC</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px]">Contact</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px]">Resume</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px]">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {applications.map((app) => {
                  const cvUrl = app.cv_path
                    ? (app.cv_path.startsWith('http')
                      ? app.cv_path
                      : `${BACKEND_URL}${app.cv_path}`)
                    : null;

                  return (
                    <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-4 py-4">
                        <div className="font-bold text-white">{app.name}</div>
                        <div className="text-[10px] text-slate-500">Age: {app.age || 'N/A'}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[#00E0FF] font-medium">{app.job_title}</div>
                        <div className="text-xs text-slate-400">{app.qualification || 'No Qualification'}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-white">{app.experience_summary || app.experience || 'N/A'} Exp</div>
                        <div className="text-[10px] text-emerald-400 font-bold">
                          {app.current_ctc || 'N/A'} → {app.expected_ctc || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-slate-300">{app.email}</div>
                        <div className="text-[10px] text-slate-500">{app.phone}</div>
                      </td>
                      <td className="px-4 py-4">
                        {cvUrl ? (
                          <a
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/20 hover:bg-[#00C2FF] hover:text-black transition-all text-[11px] font-bold"
                          >
                            VIEW CV
                          </a>
                        ) : (
                          <span className="text-slate-500 text-xs italic">No CV</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-slate-500 text-[11px]">
                        {app.created_display}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
