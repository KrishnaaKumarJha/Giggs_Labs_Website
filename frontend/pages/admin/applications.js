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

    if (!token) {
      router.replace('/admin/login');
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
          router.replace('/admin/login');
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

  if (!applications && !error) {
    return <div className="p-8 text-slate-300">Loading applications…</div>;
  }

  if (error) {
    return <div className="p-8 text-rose-400">{error}</div>;
  }

  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
          Admin · Job Applications
        </h1>

        {applications.length === 0 ? (
          <div className="text-slate-400">No applications yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-700/40">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/60">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Message</th>
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
                      <td
                        className="px-3 py-2 max-w-sm truncate"
                        title={app.message}
                      >
                        {app.message}
                      </td>
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

export async function getServerSideProps() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADMIN !== 'true') {
    return { notFound: true };
  }

  return { props: {} };
}
