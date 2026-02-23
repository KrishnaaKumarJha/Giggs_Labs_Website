// frontend/pages/services.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import {
  ShieldCheck, BrainCircuit, Zap, Bot,
  Rocket, Wrench, BarChart3, Cloud,
  Users, ClipboardList, Plug,
} from 'lucide-react';

/* ── 4 service areas — overview cards ── */
const serviceAreas = [
  {
    href: '/services/cybersecurity',
    Icon: ShieldCheck,
    title: 'AI-driven Cybersecurity',
    tagline: 'Proactive defense in a world of evolving threats.',
    description: 'We embed AI into every layer of defense — from endpoint to cloud — enabling continuous monitoring, automated incident response, and zero-trust enforcement at scale.',
    color: 'from-sky-400 to-blue-600',
    borderHover: 'hover:border-sky-500/50',
    glowHover: 'hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]',
    accent: 'text-sky-400',
    highlights: ['Threat Detection', 'Zero Trust', 'SOC Automation', 'CSPM'],
  },
  {
    href: '/services/ai-data',
    Icon: BrainCircuit,
    title: 'AI & Data Science / Engineering',
    tagline: 'Transforming Data into Intelligence. Intelligence into Action.',
    description: 'Scalable AI and data platforms that turn raw data into real-time intelligence, powering predictive decision-making and automation across the enterprise.',
    color: 'from-cyan-400 to-blue-500',
    borderHover: 'hover:border-cyan-500/50',
    glowHover: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]',
    accent: 'text-cyan-400',
    highlights: ['Generative AI', 'Data Pipelines', 'MLOps', 'Analytics'],
  },
  {
    href: '/services/performance',
    Icon: Zap,
    title: 'Performance Engineering',
    tagline: 'Delivering reliability, speed, and scale.',
    description: 'We tune applications, infrastructure, and cloud workloads so they perform under real-world pressure — without burning through budget or sacrificing user experience.',
    color: 'from-sky-300 to-blue-400',
    borderHover: 'hover:border-sky-400/50',
    glowHover: 'hover:shadow-[0_0_40px_rgba(125,211,252,0.25)]',
    accent: 'text-sky-300',
    highlights: ['APM & Observability', 'Load Testing', 'Cost Optimization', 'CI/CD'],
  },
  {
    href: '/services/automation',
    Icon: Bot,
    title: 'Automation Engineering',
    tagline: 'Automating the enterprise for speed and resilience.',
    description: 'From business workflows to DevOps pipelines, we remove manual friction and build an adaptive, self-healing execution layer that scales with your organization.',
    color: 'from-blue-400 to-indigo-500',
    borderHover: 'hover:border-blue-500/50',
    glowHover: 'hover:shadow-[0_0_40px_rgba(96,165,250,0.25)]',
    accent: 'text-blue-400',
    highlights: ['RPA', 'Infrastructure as Code', 'Test Automation', 'Hyperautomation'],
  },
];

/* ── Core services ── */
const coreServices = [
  { title: 'Product Engineering', body: 'End-to-end development of web platforms, dashboards, and internal tools that are designed to ship and evolve fast.', tags: ['Next.js', 'Design Systems', 'UX-first'], badge: 'Ship fast', Icon: Rocket },
  { title: 'Backend & APIs', body: 'Secure, scalable APIs and services. From monoliths to event-driven architectures with proper monitoring and alerting.', tags: ['Django', 'FastAPI', 'PostgreSQL'], badge: 'Scale-ready', Icon: Wrench },
  { title: 'Data & ML Pipelines', body: 'Data ingestion, feature pipelines, and ML model serving for real-world use cases — with tracking and observability built in.', tags: ['Python', 'Pandas', 'MLOps'], badge: 'ML in production', Icon: BarChart3 },
  { title: 'Cloud & DevOps', body: 'Infrastructure-as-code, CI/CD pipelines, and performance tuning so your system survives real traffic, not just demos.', tags: ['Docker', 'CI/CD', 'Cloud'], badge: 'Ops handled', Icon: Cloud },
];

/* ── Engagement models ── */
const engagementModels = [
  { title: 'Dedicated Team', description: 'A full engineering squad embedded in your workflow — designers, developers, QA, and a tech lead working as your own team.', best: 'Long-term product builds', Icon: Users },
  { title: 'Project-Based', description: 'Fixed-scope delivery with defined milestones, timelines, and deliverables. Ideal for well-scoped features or MVPs.', best: 'MVPs & feature releases', Icon: ClipboardList },
  { title: 'Staff Augmentation', description: 'Plug senior engineers directly into your existing team to accelerate delivery or fill specialized skill gaps.', best: 'Scaling existing teams', Icon: Plug },
];

/* ── Process steps ── */
const processSteps = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your product vision, technical constraints, timelines, and success metrics.' },
  { step: '02', title: 'Architecture & Scoping', desc: 'We propose the system design, stack choices, and a phased delivery roadmap with clear milestones.' },
  { step: '03', title: 'Build & Iterate', desc: 'We ship in weekly sprints with regular demos, code reviews, and transparent communication.' },
  { step: '04', title: 'Launch & Scale', desc: 'We deploy to production, set up monitoring, and support you through stabilization and scale.' },
];

export default function ServicesPage() {
  return (
    <PageShell>
      {/* ─── 1. FUTURISTIC HERO ─── */}
      <section className="relative -mt-20 flex min-h-[70vh] items-center justify-center overflow-visible">
        {/* Background Globe/Network Graphic - Reusing style from about for consistency */}
        <div className="absolute inset-0 z-0 text-sky-500 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.15)_0%,_transparent_70%)] blur-3xl opacity-60" />
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10 animate-slow-spin">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
              <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 190c-49.6 0-90-40.4-90-90s40.4-90 90-90 90 40.4 90 90-40.4 90-90 90z" />
              <path d="M100 20c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 150c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70-31.4 70-70 70z" />
              <circle cx="100" cy="100" r="10" />
            </svg>
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-400">
              Our Expertise
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-50">
              Services for teams that <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic pb-3 inline-block">care about quality.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed font-medium">
              We plug into your team as a focused engineering partner — helping you move from idea to stable production systems without months of risk and rework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SERVICE AREAS — 4 CARDS ═══════ */}
      <section className="mb-24 pt-12">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 px-4 whitespace-nowrap">Specialized Practices</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {serviceAreas.map((area, i) => (
            <motion.div
              key={area.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link href={area.href} className="block h-full group">
                <article
                  className={`relative h-full overflow-hidden rounded-[2.5rem] border border-slate-800/80 bg-slate-900/40 p-8 transition-all duration-500 group-hover:border-slate-700/80 group-hover:bg-slate-900/60 ${area.glowHover}`}
                >
                  {/* Subtle highlight */}
                  <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${area.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.05]`} />

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/50 group-hover:scale-110 transition-transform duration-500">
                        <area.Icon size={28} strokeWidth={1.5} className={area.accent} />
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${area.accent}`}>
                        {area.tagline}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-50 tracking-tight group-hover:text-white transition-colors">
                      {area.title}
                    </h3>

                    <p className="mt-4 text-sm text-slate-300 leading-relaxed font-medium">
                      {area.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {area.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className={`mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest ${area.accent} opacity-60 group-hover:opacity-100 transition-all`}>
                      <span>Explore Practice</span>
                      <svg className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ CORE SERVICES ═══════ */}
      <section className="mb-24 py-12 border-t border-slate-800/40">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Core Services</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {coreServices.map((svc, i) => (
            <motion.article
              key={svc.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/40 p-8 transition-all hover:border-cyan-500/50 hover:bg-slate-900/30"
            >
              <div className="relative z-10 flex gap-6">
                <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition-transform duration-500 group-hover:scale-110">
                  <svc.Icon size={28} strokeWidth={1.5} className="text-cyan-400" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    {svc.badge}
                  </div>
                  <h3 className="text-xl font-black text-slate-50 tracking-tight">{svc.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{svc.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-[10px] font-bold text-slate-500">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ═══════ HOW WE WORK — PROCESS ═══════ */}
      <section className="mb-24 py-12">
        <div className="text-center mb-16">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500 mb-4">Our Methodology</div>
          <h2 className="text-3xl font-black text-slate-50 uppercase tracking-tight">From first call to production</h2>
          <div className="mt-4 h-1 w-12 bg-cyan-500 mx-auto" />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {processSteps.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative rounded-3xl border border-slate-800 bg-slate-950/60 p-6 hover:border-cyan-500/30 transition-all group"
            >
              <div className="text-4xl font-black text-slate-800 group-hover:text-cyan-500/20 transition-colors duration-500 leading-none">{p.step}</div>
              <h3 className="mt-4 text-base font-black text-slate-50 tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ ENGAGEMENT MODELS ═══════ */}
      <section className="mb-32 py-12">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4 whitespace-nowrap">Engagement Models</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {engagementModels.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-[2.5rem] border border-slate-800/80 bg-slate-900/20 p-8 hover:border-cyan-500/40 transition-all hover:bg-slate-900/40"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                <model.Icon size={28} strokeWidth={1.5} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-black text-slate-50 tracking-tight">{model.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed font-medium">{model.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                Best for: {model.best}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ BOTTOM CTA ═══════ */}
      <section className="pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-950/40 p-8 md:p-16 text-center backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_70%)]" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-50 tracking-tighter leading-tight">
              Ready to explore a <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic inline-block pb-2 pr-4">partnership?</span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400 font-medium">
              Tell us about your challenge. We&apos;ll respond with a lean, production-first approach — usually within 24–48 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-10 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                Start a conversation
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/60 px-10 py-4 text-sm font-black uppercase tracking-widest text-slate-50 hover:bg-slate-900 transition-all">
                View case studies
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
