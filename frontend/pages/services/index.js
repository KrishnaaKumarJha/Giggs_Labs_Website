// frontend/pages/services.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

/* ── 4 service areas — overview cards ── */
const serviceAreas = [
  {
    href: '/services/cybersecurity',
    icon: '🛡️',
    title: 'AI-driven Cybersecurity',
    tagline: 'Proactive defense in a world of evolving threats.',
    description: 'We embed AI into every layer of defense — from endpoint to cloud — enabling continuous monitoring, automated incident response, and zero-trust enforcement at scale.',
    color: 'from-violet-400 to-purple-500',
    borderHover: 'hover:border-violet-500/50',
    glowHover: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]',
    accent: 'text-violet-400',
    highlights: ['Threat Detection', 'Zero Trust', 'SOC Automation', 'CSPM'],
  },
  {
    href: '/services/ai-data',
    icon: '🧠',
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
    icon: '⚡',
    title: 'Performance Engineering',
    tagline: 'Delivering reliability, speed, and scale.',
    description: 'We tune applications, infrastructure, and cloud workloads so they perform under real-world pressure — without burning through budget or sacrificing user experience.',
    color: 'from-amber-400 to-orange-500',
    borderHover: 'hover:border-amber-500/50',
    glowHover: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]',
    accent: 'text-amber-400',
    highlights: ['APM & Observability', 'Load Testing', 'Cost Optimization', 'CI/CD'],
  },
  {
    href: '/services/automation',
    icon: '🤖',
    title: 'Automation Engineering',
    tagline: 'Automating the enterprise for speed and resilience.',
    description: 'From business workflows to DevOps pipelines, we remove manual friction and build an adaptive, self-healing execution layer that scales with your organization.',
    color: 'from-emerald-400 to-teal-500',
    borderHover: 'hover:border-emerald-500/50',
    glowHover: 'hover:shadow-[0_0_40px_rgba(52,211,153,0.25)]',
    accent: 'text-emerald-400',
    highlights: ['RPA', 'Infrastructure as Code', 'Test Automation', 'Hyperautomation'],
  },
];

/* ── Core services ── */
const coreServices = [
  { title: 'Product Engineering', body: 'End-to-end development of web platforms, dashboards, and internal tools that are designed to ship and evolve fast.', tags: ['Next.js', 'Design Systems', 'UX-first'], badge: 'Ship fast', icon: '🚀' },
  { title: 'Backend & APIs', body: 'Secure, scalable APIs and services. From monoliths to event-driven architectures with proper monitoring and alerting.', tags: ['Django', 'FastAPI', 'PostgreSQL'], badge: 'Scale-ready', icon: '🔧' },
  { title: 'Data & ML Pipelines', body: 'Data ingestion, feature pipelines, and ML model serving for real-world use cases — with tracking and observability built in.', tags: ['Python', 'Pandas', 'MLOps'], badge: 'ML in production', icon: '📊' },
  { title: 'Cloud & DevOps', body: 'Infrastructure-as-code, CI/CD pipelines, and performance tuning so your system survives real traffic, not just demos.', tags: ['Docker', 'CI/CD', 'Cloud'], badge: 'Ops handled', icon: '☁️' },
];

/* ── Engagement models ── */
const engagementModels = [
  { title: 'Dedicated Team', description: 'A full engineering squad embedded in your workflow — designers, developers, QA, and a tech lead working as your own team.', best: 'Long-term product builds', icon: '👥' },
  { title: 'Project-Based', description: 'Fixed-scope delivery with defined milestones, timelines, and deliverables. Ideal for well-scoped features or MVPs.', best: 'MVPs & feature releases', icon: '📋' },
  { title: 'Staff Augmentation', description: 'Plug senior engineers directly into your existing team to accelerate delivery or fill specialized skill gaps.', best: 'Scaling existing teams', icon: '🔌' },
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
    <PageShell
      eyebrow="What we do"
      title="Services for teams that care about quality"
      description="We plug into your team as a focused engineering partner — helping you move from idea to stable production systems without months of risk and rework."
    >

      {/* ═══════ SERVICE AREAS — 4 CARDS ═══════ */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-400/90">
            Specialized practices
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-50">
            Four pillars that power modern platforms
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Deep expertise across security, AI, performance, and automation.
            Click any area to explore capabilities, tech stacks, and how we deliver.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {serviceAreas.map((area, i) => (
            <motion.div
              key={area.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link href={area.href} className="block h-full">
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/70 to-slate-950/50 p-6 transition-all duration-300 ${area.borderHover} ${area.glowHover}`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300`} />

                  <div className="relative">
                    {/* Icon + title */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{area.icon}</span>
                      <div className={`text-[11px] uppercase tracking-[0.2em] ${area.accent} font-semibold`}>
                        {area.tagline}
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-slate-50 group-hover:text-white transition-colors">
                      {area.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {area.description}
                    </p>

                    {/* Highlights pills */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {area.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-slate-700/60 bg-slate-950/60 px-2.5 py-1 text-[11px] text-slate-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Arrow CTA */}
                    <div className={`mt-4 flex items-center gap-1.5 text-sm font-medium ${area.accent} opacity-70 group-hover:opacity-100 transition-opacity`}>
                      <span>Explore</span>
                      <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <section className="mb-16">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-400/90">Delivery areas</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">Core Services</h2>
          <p className="mt-2 text-sm text-slate-300">Focus areas where we typically partner with product and engineering teams.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {coreServices.map((svc, i) => (
            <motion.article
              key={svc.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-[0_0_28px_rgba(15,23,42,0.9)] transition hover:border-[#00E0FF]/70 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#00E0FF]/5 via-transparent to-[#7A5BFF]/10 opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{svc.icon}</span>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-1 text-[11px] text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00E0FF] shadow-[0_0_8px_#00E0FF]" />
                    {svc.badge}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-50">{svc.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{svc.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-[11px] text-slate-300">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ═══════ HOW WE WORK — PROCESS ═══════ */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-400/90">Our process</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">From first call to production</h2>
          <p className="mt-2 text-sm text-slate-300 mx-auto max-w-xl">A simple, transparent process that prioritizes shipping fast without cutting corners.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {processSteps.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative rounded-3xl border border-slate-800 bg-slate-950/80 p-5 hover:border-sky-500/30 transition-colors group"
            >
              <div className="text-2xl font-mono font-bold bg-gradient-to-r from-[#00E0FF] to-[#4C8DFF] bg-clip-text text-transparent">{p.step}</div>
              <h3 className="mt-2 text-sm font-semibold text-slate-50">{p.title}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-slate-700 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ ENGAGEMENT MODELS ═══════ */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-400/90">Engagement</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">How we work with you</h2>
          <p className="mt-2 text-sm text-slate-300 max-w-xl">Choose the model that fits your stage, team, and timeline.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {engagementModels.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-6 hover:border-sky-500/40 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
            >
              <span className="text-2xl">{model.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{model.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{model.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] text-sky-300">
                Best for: {model.best}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ BOTTOM CTA ═══════ */}
      <section>
        <div className="relative overflow-hidden rounded-3xl border border-[#00E0FF]/40 bg-slate-950/90 p-6 md:p-8 shadow-[0_0_40px_rgba(56,189,248,0.3)]">
          <div className="pointer-events-none absolute inset-y-0 right-[-20%] w-1/2 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.25),_transparent_60%)] blur-3xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">Ready to explore a partnership?</h2>
              <p className="mt-2 text-sm text-slate-300">Tell us about your challenge. We&apos;ll respond with a lean, production-first approach — usually within 24–48 hours.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] px-5 py-2.5 text-sm font-medium text-black shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:brightness-110 transition">
                Start a conversation
              </Link>
              <Link href="/projects" className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/60 px-5 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                View case studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
