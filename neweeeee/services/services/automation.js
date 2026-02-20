// frontend/pages/services/automation.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

const capabilities = [
    { name: 'Robotic Process Automation (RPA)', detail: 'Automated data entry, invoice processing, report generation, and cross-system integrations that save thousands of person-hours. We build bots that handle repetitive work so your team can focus on high-value tasks.' },
    { name: 'Test Automation Engineering', detail: 'End-to-end test frameworks, visual regression testing, API contract testing, and CI-integrated quality gates. We build test suites that catch bugs before they reach production — without slowing down releases.' },
    { name: 'Infrastructure as Code (IaC)', detail: 'Terraform, Pulumi, and CloudFormation modules for reproducible, version-controlled infrastructure across multi-cloud environments. Every environment is consistent, auditable, and deployable in minutes.' },
    { name: 'Workflow Orchestration', detail: 'Event-driven workflows, approval chains, and business process automation using Airflow, Temporal, and custom engines. We model complex multi-step processes as reliable, observable workflow graphs.' },
    { name: 'Hyperautomation', detail: 'Combining AI, RPA, and workflow tools to automate complex, multi-step business processes end-to-end. We identify automation opportunities across your organization and build an integrated automation fabric.' },
    { name: 'CI/CD & GitOps', detail: 'Fully automated build, test, and deployment pipelines with GitOps practices. Zero-touch deployments, rollback strategies, feature flags, and canary releases for safe, fast delivery.' },
    { name: 'Self-Healing Infrastructure', detail: 'Auto-remediation playbooks, automated scaling, health checks, and circuit breakers that detect and fix infrastructure issues before they impact users. Built on Kubernetes and cloud-native patterns.' },
    { name: 'Document & Data Processing Automation', detail: 'Automated extraction, classification, and routing of documents using OCR, NLP, and rule engines. Invoice processing, contract analysis, compliance document handling at scale.' },
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
    { step: '01', title: 'Process Discovery', desc: 'Map existing manual workflows, identify automation candidates, estimate ROI, and prioritize by business impact and implementation complexity.' },
    { step: '02', title: 'Design & Architecture', desc: 'Design resilient automation patterns — idempotent operations, error handling, retry strategies, observability hooks, and human-in-the-loop checkpoints where needed.' },
    { step: '03', title: 'Build & Integration', desc: 'Implement automation modules, integrate with existing systems via APIs and event buses, and deploy with proper testing and rollback mechanisms.' },
    { step: '04', title: 'Monitor & Scale', desc: 'Track automation KPIs, expand coverage to new processes, and continuously optimize for reliability and speed. Build an automation center of excellence.' },
];

export default function AutomationPage() {
    return (
        <PageShell
            eyebrow="Services / Automation"
            title="Automation Engineering"
            description="From business workflows to DevOps pipelines, we remove manual friction and build an adaptive, self-healing execution layer that scales with your organization."
        >

            {/* Capabilities */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-5">Core Capabilities</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.35 }}
                            className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5 hover:border-emerald-500/30 transition-colors"
                        >
                            <h3 className="text-sm font-semibold text-slate-100">{cap.name}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{cap.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-5">Our Methodology</h2>
                <div className="grid gap-4 md:grid-cols-4">
                    {methodology.map((m, i) => (
                        <motion.div
                            key={m.step}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.45 }}
                            className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="text-2xl font-mono font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">{m.step}</div>
                            <h3 className="mt-2 text-sm font-semibold text-slate-50">{m.title}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                            {i < methodology.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-emerald-700/40 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Use cases + Tech stack */}
            <section className="mb-12 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-4">Use Cases</h3>
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
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-emerald-400 to-teal-500" />
                                {uc}
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-500/50 transition-colors">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTAs */}
            <section className="flex flex-wrap gap-3 mb-12">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-3 text-sm font-medium text-black shadow-lg hover:brightness-110 transition">
                    Automate your workflows →
                </Link>
                <Link href="/services" className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/60 px-6 py-3 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                    ← All Services
                </Link>
            </section>
        </PageShell>
    );
}
