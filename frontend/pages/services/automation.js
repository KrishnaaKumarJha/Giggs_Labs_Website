// frontend/pages/services/automation.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import {
    Bot, TestTube, FileCode, Workflow, Layers, GitMerge, HeartPulse, FileText,
    Map, PenTool, Puzzle, BarChart, ArrowRight,
} from 'lucide-react';

const capabilities = [
    { name: 'RPA', short: 'Bots that handle data entry, invoicing, and cross-system tasks.', Icon: Bot },
    { name: 'Test Automation', short: 'E2E frameworks, regression suites, and CI quality gates.', Icon: TestTube },
    { name: 'Infrastructure as Code', short: 'Reproducible, version-controlled multi-cloud environments.', Icon: FileCode },
    { name: 'Workflow Orchestration', short: 'Event-driven workflows and approval chain automation.', Icon: Workflow },
    { name: 'Hyperautomation', short: 'AI + RPA + workflows for end-to-end process automation.', Icon: Layers },
    { name: 'CI/CD & GitOps', short: 'Zero-touch deployments with rollback and canary releases.', Icon: GitMerge },
    { name: 'Self-Healing Infra', short: 'Auto-remediation and circuit breakers before user impact.', Icon: HeartPulse },
    { name: 'Document Processing', short: 'OCR, NLP, and rule engines for document handling at scale.', Icon: FileText },
];

const useCases = [
    'Automated compliance reporting & audit trails',
    'Self-healing infrastructure with predictive auto-scaling',
    'CI/CD pipeline with zero-touch deployments',
    'Automated customer onboarding workflows',
    'Invoice processing & accounts payable automation',
    'Automated QA regression suites with 95%+ coverage',
    'Multi-cloud infrastructure provisioning in minutes',
    'Employee offboarding & access revocation automation',
];

const techStack = ['Terraform', 'Pulumi', 'Ansible', 'GitHub Actions', 'GitLab CI', 'Temporal', 'Airflow', 'Selenium', 'Playwright', 'Cypress', 'Python', 'Kubernetes', 'Argo CD'];

const methodology = [
    { step: '01', title: 'Process Discovery', desc: 'Map workflows, estimate ROI, and prioritize by impact.', Icon: Map },
    { step: '02', title: 'Design & Architect', desc: 'Resilient patterns with error handling and observability.', Icon: PenTool },
    { step: '03', title: 'Build & Integrate', desc: 'Implement, integrate via APIs, and deploy with rollback.', Icon: Puzzle },
    { step: '04', title: 'Monitor & Scale', desc: 'Track KPIs, expand coverage, and optimize continuously.', Icon: BarChart },
];

export default function AutomationPage() {
    return (
        <PageShell
            eyebrow="Services / Automation"
            title="Automation Engineering"
            description="Remove manual friction and build an adaptive, self-healing execution layer that scales."
        >

            {/* ─── VIDEO HERO BANNER ─── */}
            <section className="relative -mx-4 md:-mx-6 mb-16 overflow-hidden rounded-[2.5rem] border border-sky-500/20">
                <div className="relative h-[300px] md:h-[420px] w-full">
                    <video
                        src="/hero/automation.mp4"
                        autoPlay muted loop playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-sky-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.08),_transparent_60%)]" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-3">Enterprise Automation</span>
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                            Automating for Speed & Scale
                        </h3>
                        <p className="max-w-md text-sm text-slate-300/90 font-medium leading-relaxed">
                            From RPA to self-healing infrastructure &#8212; we eliminate repetitive work so your team can focus on what matters.
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
                    Automate your workflows
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services" className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/60 px-8 py-3.5 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                    ← All Services
                </Link>
            </section>
        </PageShell>
    );
}
