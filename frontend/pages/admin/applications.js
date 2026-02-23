// frontend/pages/admin/applications.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('adminAccessToken')
      : null;
    const secretKey = typeof window !== 'undefined'
      ? localStorage.getItem('adminSecretKey')
      : null;

    if (!token || !secretKey) {
      router.replace('/');
      return;
    }

    async function loadApplications() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/applications/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminAccessToken');
          localStorage.removeItem('adminRefreshToken');
          localStorage.removeItem('adminSecretKey');
          router.replace('/');
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
    localStorage.removeItem('adminSecretKey');
    router.replace('/');
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
              <thead className="bg-slate-900/60">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Job Title</th>
                  <th className="px-3 py-2 text-left">Phone</th>
                  <th className="px-3 py-2 text-left">CV</th>
                  <th className="px-3 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const cvUrl = app.cv
                    ? (app.cv.startsWith('http')
                      ? app.cv
                      : `http://127.0.0.1:8000${app.cv}`)
                    : null;

                  return (
                    <tr key={app.id} className="border-t border-slate-800">
                      <td className="px-3 py-2">{app.name}</td>
                      <td className="px-3 py-2 text-[#00C2FF]">
                        {app.email}
                      </td>
                      <td className="px-3 py-2">{app.job_title}</td>
                      <td className="px-3 py-2 text-slate-400">{app.phone}</td>
                      <td className="px-3 py-2">
                        {cvUrl ? (
                          <a
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00C2FF] hover:underline"
                          >
                            Download CV
                          </a>
                        ) : (
                          <span className="text-slate-500">No file</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-400">
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
