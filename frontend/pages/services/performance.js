// frontend/pages/services/performance.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import {
    Gauge, Activity, FlameKindling, Wallet, GitBranch, Database, Globe, TrendingUp,
    ClipboardCheck, BarChart, Wrench, Bell, ArrowRight,
} from 'lucide-react';

const capabilities = [
    { name: 'App Optimization', short: 'Code profiling, query tuning, and sub-second response times.', Icon: Gauge },
    { name: 'Full-Stack Observability', short: 'Distributed tracing, custom metrics, and SLI/SLO dashboards.', Icon: Activity },
    { name: 'Load & Stress Testing', short: 'Production-pattern simulation to find breaking points early.', Icon: FlameKindling },
    { name: 'Cloud FinOps', short: 'Right-sizing and cost reduction of 30-50% on average.', Icon: Wallet },
    { name: 'CI/CD Optimization', short: 'Faster builds, parallel tests, and deployment confidence.', Icon: GitBranch },
    { name: 'Database Engineering', short: 'Query plans, index tuning, and distributed architectures.', Icon: Database },
    { name: 'CDN & Edge', short: 'Content delivery strategy to minimize global latency.', Icon: Globe },
    { name: 'Autoscaling', short: 'Predictive scaling for 10x traffic spikes without manual effort.', Icon: TrendingUp },
];

const useCases = [
    'E-commerce platforms handling Black Friday / flash sales',
    'Fintech systems requiring sub-10ms trade execution latency',
    'Scaling SaaS platforms from 1K to 100K+ concurrent users',
    'Reducing cloud infrastructure costs by 40%+',
    'Optimizing CI/CD pipelines from 30-minute to 5-minute builds',
    'Media platforms serving 4K video to millions of viewers',
];

const techStack = ['Grafana', 'Datadog', 'New Relic', 'k6', 'Locust', 'Redis', 'CloudFront', 'Fastly', 'Docker', 'Kubernetes', 'Prometheus', 'OpenTelemetry'];

const methodology = [
    { step: '01', title: 'Performance Audit', desc: 'Baseline measurement across all layers and bottleneck identification.', Icon: ClipboardCheck },
    { step: '02', title: 'Load Testing', desc: 'Simulate production workloads and generate root-cause reports.', Icon: BarChart },
    { step: '03', title: 'Optimization Sprint', desc: 'Targeted fixes prioritized by impact, benchmarked and validated.', Icon: Wrench },
    { step: '04', title: 'Monitoring Setup', desc: 'SLIs, SLOs, dashboards, and automated alerting for visibility.', Icon: Bell },
];

export default function PerformancePage() {
    return (
        <PageShell
            eyebrow="Services / Performance"
            title="Performance Engineering"
            description="Systems that perform flawlessly under real-world pressure &#8212; without burning budget."
        >

            {/* ─── VIDEO HERO BANNER ─── */}
            <section className="relative -mx-4 md:-mx-6 mb-16 overflow-hidden rounded-[2.5rem] border border-sky-500/20">
                <div className="relative h-[300px] md:h-[420px] w-full">
                    <video
                        src="/hero/performance.mp4"
                        autoPlay muted loop playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-sky-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.08),_transparent_60%)]" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-3">Reliability at Scale</span>
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                            Delivering Speed & Reliability
                        </h3>
                        <p className="max-w-md text-sm text-slate-300/90 font-medium leading-relaxed">
                            From sub-second response times to 50% cloud cost reduction &#8212; we engineer systems that never slow down.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── CAPABILITIES ─── */}
            <section className="mb-20">
                <div className="mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-sky-400/80">Core Capabilities</h2>
                    <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-sky-500 to-transparent" />
                </div>
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.4 }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-slate-900/20 p-5 hover:border-sky-500/30 transition-all duration-300"
                        >
                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-500/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/5 border border-sky-500/20 group-hover:border-sky-500/40 group-hover:from-sky-500/20 transition-all duration-300">
                                    <cap.Icon size={24} strokeWidth={1.5} className="text-sky-400 group-hover:text-sky-300 transition-colors" />
                                </div>
                                <h3 className="text-[13px] font-bold text-slate-100">{cap.name}</h3>
                                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{cap.short}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── METHODOLOGY ─── */}
            <section className="mb-20">
                <div className="mb-10">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-sky-400/80">Our Methodology</h2>
                    <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-sky-500 to-transparent" />
                </div>
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-sky-500/20 via-sky-500/10 to-sky-500/20 -translate-y-1/2" />
                    <div className="grid gap-5 md:grid-cols-4 relative z-10">
                        {methodology.map((m, i) => (
                            <motion.div
                                key={m.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="group rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/80 to-slate-900/30 p-6 hover:border-sky-500/30 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-3xl font-black bg-gradient-to-br from-sky-400/80 to-blue-500/60 bg-clip-text text-transparent leading-none">{m.step}</div>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/8 border border-sky-500/15 group-hover:bg-sky-500/15 transition-colors">
                                        <m.Icon size={18} strokeWidth={1.5} className="text-sky-400" />
                                    </div>
                                </div>
                                <h3 className="text-sm font-bold text-slate-50">{m.title}</h3>
                                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── USE CASES + TECH ─── */}
            <section className="mb-20 grid gap-5 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-sky-950/10 p-6"
                >
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sky-400/80 mb-4">Use Cases</h3>
                    <ul className="space-y-2.5">
                        {useCases.map((uc, i) => (
                            <motion.li
                                key={uc}
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.04 }}
                                className="flex items-start gap-2.5 text-sm text-slate-300"
                            >
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_6px_rgba(56,189,248,0.4)]" />
                                {uc}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-slate-900/20 p-6"
                >
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sky-400/80 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/40 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-300 hover:border-sky-500/40 hover:text-white transition-all cursor-default">{tech}</span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ─── CTA ─── */}
            <section className="flex flex-wrap gap-3 mb-12">
                <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-8 py-3.5 text-sm font-bold text-black shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:scale-105 transition-all">
                    Get a performance audit
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services" className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/60 px-8 py-3.5 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                    ← All Services
                </Link>
            </section>
        </PageShell>
    );
}
