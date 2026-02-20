// frontend/pages/contact.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';



const inquiryOptions = [
  'General inquiry',
  'Partnership opportunity',
  'AI & Data Engineering',
  'Cybersecurity',
  'Performance Engineering',
  'Automation',
  'Careers & hiring',
  'Other',
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    inquiry: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', company: '', subject: '', inquiry: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  /* ── Shared input classes ── */
  const inputCls =
    'w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:border-[#00E0FF]/60 focus:shadow-[0_0_20px_rgba(0,224,255,0.1)] backdrop-blur-sm';
  const labelCls = 'block text-xs font-medium text-slate-400 mb-1.5';
  const selectCls = `${inputCls} appearance-none cursor-pointer bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center]`;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-950/80 text-slate-100">
      {/* Hero header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(0,224,255,0.08),_transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:px-6 lg:pt-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-xs text-slate-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80]" />
              We reply within 24–48 hours
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#7A5BFF]">
                Get in touch
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Have a question, a project idea, or just want to say hello? We&apos;d
              love to hear from you. Fill out the form and we&apos;ll get back to you shortly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">

          {/* ═══════ FORM ═══════ */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-6 md:p-8 shadow-[0_0_40px_rgba(15,23,42,0.7)]"
          >
            <h2 className="text-lg font-semibold text-slate-50 mb-6">
              Send us a message
            </h2>

            {/* Row 1: Name + Email */}
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <div>
                <label className={labelCls}>Full name *</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Work email *</label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Row 2: Company + Inquiry type */}
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <div>
                <label className={labelCls}>Company / Organization</label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  className={inputCls}
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>What can we help with?</label>
                <select
                  className={selectCls}
                  value={form.inquiry}
                  onChange={(e) => update('inquiry', e.target.value)}
                >
                  <option value="">Select a topic</option>
                  {inquiryOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Subject */}
            <div className="mb-4">
              <label className={labelCls}>Subject</label>
              <input
                type="text"
                placeholder="e.g. Question about your AI services"
                className={inputCls}
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className={labelCls}>Your message *</label>
              <textarea
                placeholder="Tell us what's on your mind — a question, a project idea, feedback, or anything else..."
                className={`${inputCls} min-h-[140px] resize-y`}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] px-7 py-3 text-sm font-medium text-black shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send message →'
                )}
              </button>
              <span className="text-[11px] text-slate-500">No spam, ever.</span>
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
              >
                <span className="text-lg">✅</span>
                Thanks! We&apos;ll get back to you within 24–48 hours.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
              >
                <span className="text-lg">⚠️</span>
                Something went wrong. Please try again or email us directly.
              </motion.div>
            )}
          </motion.form>

          {/* ═══════ SIDEBAR INFO ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-5"
          >
            {/* Response time */}
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-lg">⏱</span>
                <div>
                  <div className="text-xs text-slate-400">Typical response</div>
                  <div className="text-lg font-semibold text-slate-50">24–48 hours</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We&apos;ll usually suggest a short discovery call to dig into your
                requirements, constraints, and timeline.
              </p>
            </div>

            {/* Direct contact */}
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">Direct contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:hello@giggssoftwarelab.com"
                  className="flex items-center gap-3 text-sm text-sky-400 hover:text-sky-300 transition-colors group"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 text-base group-hover:border-sky-500/40 transition-colors">📧</span>
                  hello@giggssoftwarelab.com
                </a>
                <a
                  href="https://www.linkedin.com/company/giggslab/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-sky-400 hover:text-sky-300 transition-colors group"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 text-base group-hover:border-sky-500/40 transition-colors">💼</span>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">Where we are</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Noida (U.P), India</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>Remote-first · IST (UTC+5:30)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🕐</span>
                  <span>Calls: 11:00 – 21:00 IST</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                We comfortably work with US, EU, and Middle East teams across
                overlapping hours.
              </p>
            </div>

            {/* What happens next */}
            <div className="rounded-3xl border border-[#00E0FF]/20 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">What happens next?</h3>
              <ol className="space-y-3">
                {[
                  { step: '1', title: 'We review your brief', desc: 'Our team reads through your requirements within 24 hours.' },
                  { step: '2', title: 'Discovery call', desc: 'A short 30-minute call to understand scope, constraints, and goals.' },
                  { step: '3', title: 'Proposal & roadmap', desc: 'We share a clear proposal with timeline, costs, and milestones.' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#00E0FF] to-[#4C8DFF] text-xs font-bold text-black">
                      {item.step}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-slate-100">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/services" className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-slate-300 hover:border-sky-500/40 hover:text-sky-300 transition-colors">
                View services →
              </Link>
              <Link href="/products" className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-slate-300 hover:border-sky-500/40 hover:text-sky-300 transition-colors">
                Case studies →
              </Link>
              <Link href="/careers" className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-slate-300 hover:border-sky-500/40 hover:text-sky-300 transition-colors">
                We&apos;re hiring →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
