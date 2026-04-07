// frontend/pages/testimonials.js
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket, BrainCircuit, ShieldCheck, Handshake, CheckCircle2,
  TrendingUp, Zap, Target, ArrowRight, ChevronDown, ChevronUp,
  Globe2, Users, BarChart3, Award
} from 'lucide-react';
import PageShell from '../components/pageshell';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

/* ── Animated counter hook ── */
function AnimatedStat({ value, suffix = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      {value}{suffix}
    </motion.span>
  );
}

/* ── Expandable value card ── */
function ValueCard({ icon: Icon, title, desc, detail, accent, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950/50 backdrop-blur-md transition-all duration-300 hover:border-${accent}-500/40 cursor-pointer`}
      onClick={() => setOpen(!open)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 h-10 w-10 rounded-xl bg-${accent}-500/10 border border-${accent}-500/20 flex items-center justify-center`}>
              <Icon className={`w-5 h-5 text-${accent}-400`} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          </div>
          <div className="flex-shrink-0 mt-1">
            {open
              ? <ChevronUp className="w-4 h-4 text-slate-500" />
              : <ChevronDown className="w-4 h-4 text-slate-500" />
            }
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className={`mt-4 pt-4 border-t border-slate-800/50 text-xs text-slate-300 leading-relaxed pl-14`}>
                {detail}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <PageShell
      eyebrow="Client Success"
      title="Trusted by Enterprises. Proven by Outcomes."
      description="Real-world impact delivered across AI, engineering, cybersecurity, and automation—validated by the leaders we partner with."
      align="center"
    >
      {/* ─── Custom Animated Hero Background (no video) ─── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(56,189,248,.12) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(122,92,255,.10) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(30,123,255,.08) 0%, transparent 60%)',
        }} />
        {/* Floating orbs */}
        <div className="absolute top-[10%] left-[15%] h-72 w-72 rounded-full bg-sky-500/8 blur-[100px] animate-[float_8s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[20%] right-[10%] h-60 w-60 rounded-full bg-indigo-500/8 blur-[80px] animate-[float_10s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute top-[50%] left-[60%] h-40 w-40 rounded-full bg-blue-500/6 blur-[60px] animate-[float_12s_ease-in-out_infinite_alternate]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <style jsx>{`
          @keyframes float {
            from { transform: translate(0, 0) scale(1); }
            to { transform: translate(30px, -40px) scale(1.15); }
          }
        `}</style>
      </div>

      {/* ─── SOCIAL PROOF TICKER ─── */}
      <section className="relative w-full border-b border-slate-800/40 bg-slate-900/20 py-5 backdrop-blur-sm overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { Icon: Globe2, label: 'Media & OTT' },
            { Icon: BarChart3, label: 'Enterprise IT & Infrastructure' },
            { Icon: TrendingUp, label: 'FinTech & Digital Platforms' },
            { Icon: Rocket, label: 'High-Growth Startups' },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-slate-400">
              <item.Icon className="w-3.5 h-3.5 text-sky-500/60" />
              <span className="font-medium">{item.label}</span>
              {i < 3 && <span className="text-slate-700 ml-4">|</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ─── IMPACT METRICS — Floating Cards ─── */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-12 text-center">
          <SectionTitle
            eyebrow="Impact"
            title="Measured. Delivered. Proven."
            align="center"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { Icon: Zap, stat: '30–40%', label: 'Faster Delivery', desc: 'Reduced time-to-market across enterprise projects', color: 'sky' },
            { Icon: TrendingUp, stat: 'Improved', label: 'Efficiency', desc: 'Operational efficiency across critical workflows', color: 'indigo' },
            { Icon: ShieldCheck, stat: 'Enhanced', label: 'Resilience', desc: 'System performance and security posture', color: 'blue' },
            { Icon: Handshake, stat: 'Long-term', label: 'Partnerships', desc: 'Sustained enterprise relationships', color: 'sky' },
          ].map((h, idx) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950/50 p-6 backdrop-blur-md text-center group`}
            >
              {/* Hover glow */}
              <div className={`pointer-events-none absolute inset-0 bg-${h.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`mx-auto mb-4 h-12 w-12 rounded-xl bg-${h.color}-500/10 border border-${h.color}-500/20 flex items-center justify-center`}>
                  <h.Icon className={`w-6 h-6 text-${h.color}-400 group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  <AnimatedStat value={h.stat} />
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] text-${h.color}-300 mb-2`}>{h.label}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── WHAT CLIENTS VALUE — Interactive Accordion ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="mb-12">
          <SectionTitle
            eyebrow="What Our Clients Value"
            title="Speed. Precision. Reliability."
            subtitle="Our clients consistently highlight these core strengths. Click to explore."
            align="center"
          />
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
          <ValueCard
            icon={Rocket}
            title="Faster Time-to-Market"
            desc="Accelerating delivery timelines without compromising quality."
            detail="Our agile squads integrate directly with your product teams, compressing development cycles by up to 40%. We bring battle-tested CI/CD pipelines, automated QA, and parallel workstreams to ensure every sprint delivers production-ready output."
            accent="sky"
            index={0}
          />
          <ValueCard
            icon={BrainCircuit}
            title="Deep Technical Expertise"
            desc="AI, Data Engineering, Cybersecurity, and Scalable Systems."
            detail="Our engineers hold deep specializations across generative AI, MLOps, zero-trust security, and cloud-native performance engineering. We don't just staff—we embed domain experts who understand your architecture."
            accent="indigo"
            index={1}
          />
          <ValueCard
            icon={Target}
            title="Seamless Execution"
            desc="Aligned with enterprise processes, governance, and expectations."
            detail="We adapt to your delivery frameworks—whether SAFe, Scrum, or hybrid. Our teams comply with enterprise security policies, reporting cadences, and compliance requirements from day one, eliminating onboarding friction."
            accent="blue"
            index={2}
          />
          <ValueCard
            icon={TrendingUp}
            title="Outcome-Driven Approach"
            desc="Focused on measurable business impact—not just delivery."
            detail="Every engagement is structured around KPIs and business outcomes. We define success metrics upfront and track velocity, quality, and ROI continuously—ensuring you see tangible value, not just deliverables."
            accent="sky"
            index={3}
          />
        </div>
      </section>

      {/* ─── WHY ENTERPRISES CHOOSE GIGGS — Bento Grid ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="mb-12">
          <SectionTitle
            eyebrow="Why Giggs"
            title="Why Enterprises Choose Giggs"
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Award, text: 'Enterprise-grade delivery standards', sub: 'SOC-compliant processes, structured governance, and transparent reporting.' },
            { icon: Zap, text: 'Agile yet structured execution', sub: 'Flexible sprint models with enterprise-level accountability and predictability.' },
            { icon: BrainCircuit, text: 'Strong talent in emerging technologies', sub: 'Engineers skilled in Gen AI, LLMs, MLOps, threat intelligence, and modern cloud stacks.' },
            { icon: Globe2, text: 'Proven track record across industries', sub: 'Delivered for media, fintech, healthcare, retail, and enterprise IT leaders globally.' },
          ].map((item, idx) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-slate-800/40 bg-slate-950/30 hover:bg-slate-900/30 hover:border-slate-700/60 transition-all group"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">{item.text}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-sky-500/30 bg-slate-900 p-12 md:p-16 text-center shadow-[0_0_60px_rgba(56,189,248,.12)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,.08),_transparent_55%)]" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-slate-50 tracking-tighter mb-4">
              Let&apos;s Build Your{' '}
              <span className="bg-gradient-to-r from-[#2ED6FF] via-[#1E7BFF] to-[#7A5CFF] bg-clip-text text-transparent">
                Success Story
              </span>{' '}
              Next
            </h2>
            <p className="text-sm md:text-base text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Partner with Giggs Software Labs to accelerate your technology outcomes with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary">
                Schedule a Consultation
              </Button>
              <Button href="/contact" variant="secondary">
                Request Client References
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER NOTE ─── */}
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <p className="text-center text-[10px] text-slate-600 leading-relaxed tracking-wide">
          Client testimonials are based on real engagements and reflect individual experiences. Detailed case studies and references are available upon request.
        </p>
      </section>
    </PageShell>
  );
}
