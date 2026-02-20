// frontend/pages/services/performance.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

const capabilities = [
    { name: 'Application Performance Optimization', detail: 'Code-level profiling, database query tuning, caching strategies, connection pooling, and architecture refactoring for sub-second response times. We find and eliminate every bottleneck in your stack.' },
    { name: 'APM & Full-Stack Observability', detail: 'Distributed tracing, custom metrics, structured logging, and SLI/SLO dashboards using Datadog, Grafana, New Relic, or open-source stacks. End-to-end visibility from browser to database.' },
    { name: 'Load & Stress Testing', detail: 'Realistic load simulation, capacity planning, and bottleneck identification using k6, Locust, and custom test harnesses. We simulate production traffic patterns to find breaking points before your users do.' },
    { name: 'Cloud Cost Optimization (FinOps)', detail: 'Right-sizing, reserved instance planning, spot fleet management, idle resource cleanup, and FinOps practices. We typically cut cloud infrastructure costs by 30-50% without impacting performance.' },
    { name: 'CI/CD Pipeline Optimization', detail: 'Build time reduction, parallel test execution, caching strategies, and deployment pipeline tuning. Get from commit to production faster with more confidence and fewer flaky tests.' },
    { name: 'Database Performance Engineering', detail: 'Query plan analysis, index optimization, schema refactoring, read replica strategies, and migration from monolithic databases to distributed architectures when needed.' },
    { name: 'CDN & Edge Optimization', detail: 'Content delivery strategy, edge caching, image optimization, lazy loading, and geographic distribution to minimize latency for global user bases.' },
    { name: 'Capacity Planning & Autoscaling', detail: 'Traffic pattern analysis, predictive autoscaling, horizontal and vertical scaling strategies, and infrastructure automation to handle 10x traffic spikes without manual intervention.' },
];

const useCases = [
    'E-commerce platforms handling Black Friday / flash sales',
    'Fintech systems requiring sub-10ms trade execution latency',
    'Scaling SaaS platforms from 1K to 100K+ concurrent users',
    'Reducing cloud infrastructure costs by 40%+ without performance impact',
    'Optimizing CI/CD pipelines from 30-minute to 5-minute builds',
    'Media platforms serving 4K video to millions of concurrent viewers',
];

const techStack = ['Grafana', 'Datadog', 'New Relic', 'k6', 'Locust', 'Redis', 'CloudFront', 'Fastly', 'Docker', 'Kubernetes', 'Prometheus', 'OpenTelemetry'];

const methodology = [
    { step: '01', title: 'Performance Audit', desc: 'Baseline measurement of current performance across all layers — frontend, backend, database, infrastructure. Identify critical paths and bottlenecks.' },
    { step: '02', title: 'Load Testing & Analysis', desc: 'Simulate realistic production workloads, identify breaking points, and generate detailed performance reports with root cause analysis for every issue.' },
    { step: '03', title: 'Optimization Sprint', desc: 'Targeted fixes prioritized by impact — query tuning, caching, code refactoring, infrastructure changes. Each optimization is benchmarked and validated.' },
    { step: '04', title: 'Monitoring & Alerting', desc: 'Set up SLIs, SLOs, and SLAs with automated alerting. Build dashboards that give your team real-time visibility into system health and performance trends.' },
];

export default function PerformancePage() {
    return (
        <PageShell
            eyebrow="Services / Performance"
            title="Performance Engineering"
            description="We tune applications, infrastructure, and cloud workloads so they perform under real-world pressure — without burning through budget or sacrificing user experience."
        >

            {/* Capabilities */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-5">Core Capabilities</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.35 }}
                            className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5 hover:border-amber-500/30 transition-colors"
                        >
                            <h3 className="text-sm font-semibold text-slate-100">{cap.name}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{cap.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-5">Our Methodology</h2>
                <div className="grid gap-4 md:grid-cols-4">
                    {methodology.map((m, i) => (
                        <motion.div
                            key={m.step}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.45 }}
                            className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 hover:border-amber-500/30 transition-colors"
                        >
                            <div className="text-2xl font-mono font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">{m.step}</div>
                            <h3 className="mt-2 text-sm font-semibold text-slate-50">{m.title}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                            {i < methodology.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-amber-700/40 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Use cases + Tech stack */}
            <section className="mb-12 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-4">Use Cases</h3>
                    <ul className="space-y-2.5">
                        {useCases.map((uc, i) => (
                            <motion.li
                                key={uc}
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.04 }}
                                className="flex items-start gap-2 text-sm text-slate-300"
                            >
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-amber-400 to-orange-500" />
                                {uc}
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:border-amber-500/50 transition-colors">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTAs */}
            <section className="flex flex-wrap gap-3 mb-12">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-medium text-black shadow-lg hover:brightness-110 transition">
                    Get a performance audit →
                </Link>
                <Link href="/services" className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/60 px-6 py-3 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                    ← All Services
                </Link>
            </section>
        </PageShell>
    );
}
