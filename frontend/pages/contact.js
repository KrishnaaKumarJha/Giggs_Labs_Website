import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Clock, CheckCircle2, Send, Linkedin, Sparkles, AlertCircle, ChevronRight, MessageSquare } from 'lucide-react';
import PageShell from '../components/pageshell';

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

const offices = [
  {
    location: 'Noida, India',
    detail: 'A-144, Sector 132, Noida, India',
    flag: '🇮🇳',
    image: '/noida.png'
  },
  {
    location: 'California, USA',
    detail: 'Silicon Valley Engineering Hub',
    flag: '🇺🇸',
    image: '/california.png'
  },
  {
    location: 'Riyadh, Saudi Arabia',
    detail: 'Middle East Strategy Post',
    flag: '🇸🇦',
    image: '/riyadh.png'
  },
];

const countries = [
  { name: 'India' },
  { name: 'United States' },
  { name: 'Saudi Arabia' },
  { name: 'UAE' },
  { name: 'Singapore' },
];

const companyLocations = {
  noida: {
    name: 'HQ Location',
    city: 'Noida (U.P), India',
    badge: 'Open to remote projects · IST (UTC+5:30)',
    description: 'Our studio is located in a well-connected tech hub, close to major corporate campuses and infrastructure. Most of our work happens remotely with structured communication and clear handoffs.',
    addressTitle: 'HQ address',
    address: (
      <>
        Giggs Software Labs
        <br />
        114, Block A, Logix Technova, Sector-132, Noida, Uttar Pradesh, India
      </>
    ),
    bullets: [
      'Remote-first, with optional on-site collaboration.',
      'Comfortable working with US, EU, and APAC teams.',
      'Calls typically scheduled between 11:00–21:00 IST.'
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.037489042097!2d77.37679877408867!3d28.508519789703996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9007ae07f77%3A0xe81ebb50e203f693!2sGiggs%20Software%20Labs!5e0!3m2!1sen!2sin!4v1764838008660!5m2!1sen!2sin"
  },
  bangalore: {
    name: 'Bangalore Office',
    city: 'Bengaluru, Karnataka',
    badge: 'Engineering Hub · IST (UTC+5:30)',
    description: "Our Bengaluru office sits right in the heart of India's Silicon Valley, enabling closely integrated engineering capabilities and strategic growth for our technology operations.",
    addressTitle: 'Office address',
    address: (
      <>
        Giggs Software Labs
        <br />
        4th Floor, Jupiter Block, Prestige Tech Park,
        <br />
        Kadubeesanahalli, Bengaluru, Karnataka 560103
      </>
    ),
    bullets: [
      'High-performance engineering center.',
      'Deeply connected with regional talent pools.',
      'Modern infrastructure tailored for agile teams.'
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.460406514485!2d77.69234587454615!3d12.942364315519656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b3c22f1c0b%3A0x702469bf9a247c88!2sJUPITER%20BLOCK%2C%208th%20Floor%2C%20JUPITER%20BLOCK%2C%20PRESTIGE%20TECH%20PARK%2C%20Kadubeesanahalli%2C%20Bellandur%20Amanikere%2C%20Bengaluru%2C%20Karnataka%20560103!5e0!3m2!1sen!2sin!4v1772088341358!5m2!1sen!2sin"
  }
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${apiUrl}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', company: '', subject: '', inquiry: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const inputCls =
    'w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-300 focus:border-[#00E0FF] focus:ring-1 focus:ring-[#00E0FF]/20 backdrop-blur-sm';
  const labelCls = 'block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1';

  return (
    <PageShell
      title="Let's Build the Future Together"
      description="Whether you're exploring AI transformation, scaling digital platforms, or automating enterprise workflows, our experts are here to help you move faster and smarter."
      videoSrc="/hero/cyber.mp4"
      videoOpacity={0.85}
      overlayOpacity={0.2}
      align="center"
    >
      <div className="container mx-auto px-4 pt-4 pb-12">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* ═══════ FORM SECTION (Left 7) ═══════ */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[2.5rem] border border-slate-800/80 bg-slate-900/10 p-1 backdrop-blur-md"
            >
              <form onSubmit={handleSubmit} className="rounded-[2.3rem] bg-slate-950/40 p-6 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-[#00E0FF]/10 flex items-center justify-center border border-[#00E0FF]/20">
                    <MessageSquare className="w-5 h-5 text-[#00E0FF]" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Send a message</h2>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-6">
                  <div>
                    <label className={labelCls}>Full name</label>
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
                    <label className={labelCls}>Work email</label>
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

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-6">
                  <div>
                    <label className={labelCls}>Company</label>
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      className={inputCls}
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Inquiry Type</label>
                    <div className="relative">
                      <select
                        className={`${inputCls} appearance-none cursor-pointer`}
                        value={form.inquiry}
                        onChange={(e) => update('inquiry', e.target.value)}
                        required
                      >
                        <option value="">Select a topic</option>
                        {inquiryOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelCls}>Subject</label>
                  <input
                    type="text"
                    placeholder="Brief overview of your inquiry"
                    className={inputCls}
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                  />
                </div>

                <div className="mb-8">
                  <label className={labelCls}>Your Message</label>
                  <textarea
                    placeholder="How can we help you?"
                    className={`${inputCls} min-h-[160px] resize-none`}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00C2FF] to-[#0066FF] p-[1px] transition-all hover:shadow-[0_0_30px_rgba(0,194,255,0.3)] disabled:opacity-50"
                >
                  <div className="relative flex items-center justify-center gap-2 rounded-[15px] bg-slate-950 px-8 py-4 text-sm font-black uppercase tracking-widest text-white group-hover:bg-transparent transition-all">
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                          <Loader className="w-4 h-4" />
                        </motion.div>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send inquiry
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Message received! We'll get back to you shortly.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-400"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Something went wrong. Please try again or email us.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* ═══════ SIDEBAR INFO (Right 5) ═══════ */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                <a href="mailto:giggs.admin@giggslab.com" className="group rounded-3xl border border-slate-800 bg-slate-900/10 p-6 transition-all hover:bg-slate-900/20 hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Email us</div>
                      <div className="text-sm font-bold text-slate-100">giggs.admin@giggslab.com</div>
                    </div>
                  </div>
                </a>

                <a href="tel:+910000000000" className="group rounded-3xl border border-slate-800 bg-slate-900/10 p-6 transition-all hover:bg-slate-900/20 hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Call us</div>
                      <div className="text-sm font-bold text-slate-100">+1 (408) 724 7544</div>
                    </div>
                  </div>
                </a>

                <a href="https://linkedin.com/company/giggslab" target="_blank" rel="noreferrer" className="group rounded-3xl border border-slate-800 bg-slate-900/10 p-6 transition-all hover:bg-slate-900/20 hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center border border-[#0A66C2]/20 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-6 h-6 text-[#0A66C2]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">LinkedIn</div>
                      <div className="text-sm font-bold text-slate-100">Giggs Software Labs</div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Global presence helper item */}
              <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/10 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-slate-100 uppercase tracking-widest text-xs">Global Presence</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {countries.map(c => (
                    <div key={c.name}>
                      <div className="text-[11px] font-bold text-slate-200 mb-0.5">{c.name}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{c.role}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-400">Response time</span>
                  </div>
                  <div className="font-bold text-cyan-400">24–48 Hours</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── OUR LOCATIONS — SIDE BY SIDE ─── */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4 whitespace-nowrap">Our Offices</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(companyLocations).map(([key, loc]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 overflow-hidden"
            >
              {/* Map */}
              <div className="h-52 overflow-hidden border-b border-slate-800/60">
                <iframe
                  src={loc.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{loc.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{loc.city}</p>
                  </div>
                  <div className="inline-flex items-center rounded-full border border-[#00E0FF]/30 bg-slate-900/80 px-3 py-1 text-[10px] text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E0FF] mr-2" />
                    {loc.badge}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{loc.description}</p>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">{loc.addressTitle}</div>
                  <p className="text-[12px] text-slate-200 leading-relaxed">{loc.address}</p>
                </div>

                <ul className="space-y-1">
                  {loc.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-[11px] text-slate-500">• {bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

const Loader = ({ className }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);
