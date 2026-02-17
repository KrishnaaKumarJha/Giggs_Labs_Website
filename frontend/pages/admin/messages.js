// frontend/pages/admin/messages.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // run only in browser
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('adminAccessToken')
      : null;

    if (!token) {
      router.replace('/admin/login');
      return;
    }

    async function loadMessages() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/contacts/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          // token invalid or expired
          localStorage.removeItem('adminAccessToken');
          localStorage.removeItem('adminRefreshToken');
          router.replace('/admin/login');
          return;
        }

        const data = await res.json();

        const formatted = data.map((m) => ({
          ...m,
          created_display: new Date(m.created_at).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }),
        }));

        setMessages(formatted);
      } catch (err) {
        console.error(err);
        setError('Failed to load messages');
      }
    }

    loadMessages();
  }, [router]);

  if (!messages && !error) {
    return <div className="p-8 text-slate-300">Loading messages…</div>;
  }

  if (error) {
    return <div className="p-8 text-rose-400">{error}</div>;
  }

  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#7A5BFF]">
          Admin · Contact Messages
        </h1>

        {messages.length === 0 ? (
          <div className="text-slate-400">No messages yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-700/40">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/60">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Message</th>
                  <th className="px-3 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} className="border-t border-slate-800">
                    <td className="px-3 py-2">{m.name}</td>
                    <td className="px-3 py-2 text-[#00C2FF]">{m.email}</td>
                    <td className="px-3 py-2 max-w-sm truncate" title={m.message}>
                      {m.message}
                    </td>
                    <td className="px-3 py-2 text-slate-400">
                      {m.created_display}
                    </td>
                  </tr>
                ))}
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
    // Return 404 in production when admin is disabled
    return { notFound: true };
  }

  return { props: {} };
}
