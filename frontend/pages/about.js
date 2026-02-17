// frontend/pages/about.js
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageShell from '../components/pageshell';

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ── helper components ── */
const StatCounter = ({ value, suffix = '', decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value);
      if (isNaN(end)) {
        setDisplayValue(value);
        return;
      }

      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = start + (end - start) * easeProgress;
        setDisplayValue(currentVal.toFixed(decimals));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, decimals]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

/* ── data ── */
const whatWeDo = [
  { icon: '📦', title: 'Product Development' },
  { icon: '☁️', title: 'SaaS Platforms' },
  { icon: '🧠', title: 'AI Solutions' },
  { icon: '🛡️', title: 'Cybersecurity' },
];

const metrics = [
  { value: '100', suffix: '+', label: 'Apps & Products Delivered' },
  { value: '18', suffix: '+', label: 'Years of Leadership Experience' },
  { value: '3', label: 'Global Offices' },
  { value: '6', suffix: '+', label: 'Industries Served' },
];

const values = [
  {
    icon: '💡',
    title: 'Innovation',
    tagline: 'Forward Thinking',
    desc: 'Engineering flexibility. We bring creative excellence from high-level design to deployment.',
    color: 'cyan',
  },
  {
    icon: '🔍',
    title: 'Insight',
    tagline: 'Strategic Foresight',
    desc: 'Unmatched transparency. We use proactive insights to exceed industry standards.',
    color: 'sky',
  },
  {
    icon: '🛡️',
    title: 'Integrity',
    tagline: 'Trusted Partnership',
    desc: 'IP Protection fundamental. Strict confidentiality is core to our global engagements.',
    color: 'violet',
  },
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

const leadership = [
  {
    name: 'President Name',
    role: 'President & CEO',
    vision: 'Our mission is to bridge the gap between complex engineering and human-centric design. We don’t just build software; we architect the future of digital interaction.',
    image: 'president-placeholder',
    color: 'cyan',
  },
  {
    name: 'VP Name',
    role: 'Vice President of Engineering',
    vision: 'Excellence is not an act, but a habit. We instill technical rigor and creative freedom in every squad to ensure our clients lead their respective markets.',
    image: 'vp-placeholder',
    color: 'blue',
  },
];

/* ── page ── */
export default function About() {
  return (
    <PageShell
      simpleHero={true}
    >
      {/* ─── 1. FUTURISTIC HERO ─── */}
      <section className="relative -mt-20 flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Background Globe/Network Graphic */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.15)_0%,_transparent_70%)] blur-3xl opacity-60" />
          <img
            src="/globe.svg"
            className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 invert grayscale animate-slow-spin"
            alt=""
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-400">
              About Us
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black tracking-tighter text-slate-50">
              Engineering Tomorrow. <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">Today.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed font-medium">
              <span className="font-bold text-white">Giggs Software Labs</span> is a global product engineering
              & innovation company building intelligent, secure, and scalable digital solutions.
            </motion.p>

            {/* WHAT WE DO ICONS */}
            <motion.div variants={fadeUp} className="pt-12">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">What We Do</div>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {whatWeDo.map((item) => (
                  <div key={item.title} className="group flex flex-col items-center gap-3">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md transition-all group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">{item.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. BY THE NUMBERS ─── */}
      <section className="container mx-auto px-4 py-20 border-t border-slate-800/40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500 mb-2">Metrics of Merit</div>
            <h2 className="text-2xl font-black text-slate-50 uppercase tracking-tight">By the numbers</h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4 lg:gap-8">
            {metrics.map((m, idx) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="relative flex flex-col border-l border-slate-800 pl-6 last:border-r"
              >
                <div className="text-4xl font-black text-slate-50 tracking-tighter sm:text-5xl">
                  <StatCounter value={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-snug">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── 3. OUR VALUES ─── */}
      <section className="container mx-auto px-4 py-24 relative">
        {/* Section Line Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Our Values</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-slate-800/60 bg-slate-900/10 p-8 transition-all hover:border-slate-700 hover:bg-slate-900/30"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-${v.color}-500/10 text-3xl transition-transform duration-500 group-hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                  <div className={`absolute inset-0 rounded-full bg-${v.color}-500/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100`} />
                  <span className="relative z-10">{v.icon}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-50 tracking-tight">{v.title}</h3>
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] text-${v.color}-400 mt-1 mb-4`}>{v.tagline}</div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 4. LEADERSHIP VISION (President & VP) ─── */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Leadership Vision</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {leadership.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[3rem] border border-slate-800/60 bg-slate-900/10 p-1 lg:p-1.5 transition-all hover:border-slate-700 hover:bg-slate-900/20"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Leader Image Section */}
                <div className="relative w-full md:w-2/5 aspect-[4/5] md:aspect-auto overflow-hidden rounded-[2.5rem]">
                  <div className={`absolute inset-0 z-0 bg-gradient-to-br from-${leader.color}-500/10 to-transparent`} />
                  <img
                    src={`/${leader.image}.png`}
                    alt={leader.name}
                    className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Gradient overlay for text transition if needed */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-slate-900/50 hidden md:block" />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-4xl text-cyan-500/30 font-serif leading-none italic">"</span>
                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-medium -mt-2">
                      {leader.vision}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-50 tracking-tight">{leader.name}</h3>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.2em] text-${leader.color}-400 mt-1`}>
                      {leader.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 5. GLOBAL PRESENCE ─── */}
      <section className="container mx-auto px-4 py-24 overflow-hidden">
        <div className="flex items-center gap-4 mb-20">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Global Presence</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {offices.map((o) => (
            <motion.div
              key={o.location}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group relative h-80 w-full overflow-hidden"
            >
              {/* Cityscape Background (Fallback to gradient if image missing) */}
              <div className="absolute inset-0 z-0 bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <img
                  src={o.image}
                  alt={o.location}
                  className="h-full w-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-10 left-8 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{o.flag}</span>
                  <h3 className="text-xl font-black text-slate-50 tracking-tight">{o.location}</h3>
                </div>
                <div className="h-0.5 w-8 bg-cyan-500 mb-4 transition-all group-hover:w-24 duration-500" />
                <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {o.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center italic text-slate-400 font-medium tracking-wide">
          Three Continents. <span className="text-cyan-500 not-italic font-black">One Engineering Standard.</span>
        </div>
      </section>

      {/* ─── 5. FINAL CTA ─── */}
      <section className="container mx-auto px-4 py-20 pb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-950/40 p-12 text-center backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-50 tracking-tighter mb-6">
              Ready to engineer your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">future?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-10 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}