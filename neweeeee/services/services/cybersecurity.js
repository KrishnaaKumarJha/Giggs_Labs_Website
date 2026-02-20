import { motion } from 'framer-motion';
import Image from 'next/image';
import PageShell from '../../components/pageshell';

const capabilities = [
    { name: 'Mihawk-powered Adaptive Defense', detail: 'Advanced machine learning models that identify and neutralize threats before they reach your systems. Behavioral analysis and anomaly detection keep you ahead of adversaries.' },
    { name: 'Managed SOC with Mihawk SOAR', detail: 'Automated incident response workflows that reduce mean-time-to-respond. We orchestrate threat containment and evidence collection using Mihawk’s proprietary playbooks.' },
    { name: 'Continuous Cloud Posture Monitoring', detail: 'Mihawk’s CSPM engine provides real-time assessment and remediation of cloud misconfigurations across multi-cloud environments, ensuring constant compliance.' },

    { name: 'Zero Trust Implementation', detail: 'Identity-centric security with micro-segmentation and continuous verification, fully orchestrated through the Mihawk security stack.' },
    { name: 'Strategic Vulnerability Management', detail: 'Comprehensive security audits and red team exercises designed to stress-test your defenses and provide detailed remediation roadmaps.' },
    { name: '24/7 Managed Incident Response', detail: 'Our specialized IR team remains on standby 24/7, utilizing Mihawk’s automated tools to contain and remediate breaches within minutes.' },
];

const stats = [
    { value: '48h', label: 'Rapid Deployment', sub: 'From audit to ops' },
    { value: '24/7', label: 'SOC Operations', sub: 'Mihawk Managed' },
    { value: 'Zero', label: 'Trust Model', sub: 'Verified & Secure' },
    { value: '85%', label: 'Automation rate', sub: 'Reduced manual toil' },
];

const industries = ['Banking & Finance', 'Healthcare', 'SaaS Platforms', 'Government', 'E-commerce', 'Telecom', 'Manufacturing', 'Insurance'];

const techStack = ['SIEM', 'SOAR', 'Splunk', 'CrowdStrike', 'AWS Security Hub', 'Terraform', 'Vault', 'ElasticSearch', 'Palo Alto', 'Fortinet'];

const methodology = [
    { step: '01', title: 'Mihawk Deployment', desc: 'Rapid integration of the Mihawk security stack into your existing infrastructure for immediate visibility.' },
    { step: '02', title: 'Adversary Modeling', desc: 'Identify attack vectors specific to your industry using Mihawk’s global threat intelligence feeds.' },
    { step: '03', title: 'SOC Orchestration', desc: 'Design and deploy automated detection and incident response playbooks tailored to your operational needs.' },
    { step: '04', title: 'Continuous Evolution', desc: 'Mihawk’s AI engine learns from every interaction, continuously hardening your perimeter against new threats.' },
];


export default function CybersecurityPage() {
    return (
        <PageShell
            eyebrow="Managed Services"
            title="Mihawk Operations"
            description="We go beyond traditional security. Our experts operate at the edge of Mihawk’s AI ecosystem, providing 24/7 managed defense, strategic implementation, and automated threat neutralization tailored for the modern enterprise."
        >

            {/* Sub-Hero / Logo area */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 flex flex-col md:flex-row items-center gap-6 p-8 rounded-3xl border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm"
            >
                <div className="relative h-12 w-48 shrink-0">
                    <Image src="/logo/mihawk.svg" alt="Mihawk Logo" fill style={{ objectFit: 'contain' }} />
                </div>
                <div className="h-px w-full md:h-12 md:w-px bg-slate-800" />
                <p className="text-sm text-slate-400 font-medium">
                    The intelligence of <span className="text-sky-400 font-bold">Mihawk</span> meets the expertise of Giggs Software Labs. A unified defense strategy for your most critical assets.
                </p>
            </motion.div>

            {/* Stats row */}
            <section className="mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                            className="rounded-2xl border border-sky-500/20 bg-slate-950/60 p-6 text-center hover:border-sky-500/40 transition-colors"
                        >
                            <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-200">{stat.label}</div>
                            <div className="text-[10px] text-slate-500 font-medium">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Capabilities */}
            <section className="mb-16">
                <div className="mb-8">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400">Operational Excellence</h2>
                    <div className="mt-2 h-0.5 w-12 bg-sky-500" />
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.35 }}
                            className="group rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6 hover:border-sky-500/30 transition-all"
                        >
                            <h3 className="text-sm font-bold text-slate-100 group-hover:text-sky-400 transition-colors uppercase tracking-tight">{cap.name}</h3>
                            <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">{cap.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section className="mb-16">
                <div className="mb-10">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400">Implementation Lifecycle</h2>
                    <div className="mt-2 h-0.5 w-12 bg-sky-500" />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                    {methodology.map((m, i) => (
                        <motion.div
                            key={m.step}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.45 }}
                            className="relative rounded-2xl border border-slate-900 bg-slate-950/40 p-6 hover:border-sky-500/20 transition-colors"
                        >
                            <div className="text-3xl font-black bg-gradient-to-br from-sky-400 to-indigo-500 bg-clip-text text-transparent opacity-50">{m.step}</div>
                            <h3 className="mt-4 text-sm font-black text-slate-50 uppercase tracking-tight">{m.title}</h3>
                            <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">{m.desc}</p>
                            {i < methodology.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-sky-500/20" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Industries + Tech stack */}
            <section className="mb-16 grid gap-6 md:grid-cols-2">
                <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-950/40 p-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-6">Securing Innovation</h3>
                    <div className="flex flex-wrap gap-2">
                        {industries.map((ind) => (
                            <span key={ind} className="rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-2 text-[10px] font-bold text-sky-200 uppercase tracking-wider">{ind}</span>
                        ))}
                    </div>
                </div>
                <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-950/40 p-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-6">Integrated Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/40 bg-slate-900/40 px-4 py-2 text-[10px] font-bold text-slate-300 hover:border-sky-500/40 hover:text-white transition-colors uppercase tracking-wider">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Area */}
            <section className="rounded-[3rem] border border-sky-500/20 bg-gradient-to-br from-sky-950/20 to-slate-950/60 p-10 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-50 uppercase mb-6">
                    Ready to harden your <span className="text-sky-400">Defense</span>?
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/contact" className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-105 transition-all">
                        Security Assessment →
                    </Link>
                    <a href="https://www.mihawk.tech/" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/5 px-10 py-4 text-sm font-black uppercase tracking-widest text-sky-100 hover:bg-sky-500/10 transition">
                        Experience Mihawk Platform
                    </a>
                </div>
                <div className="mt-8">
                    <Link href="/services" className="text-xs font-bold text-slate-500 hover:text-sky-400 transition-colors uppercase tracking-widest">
                        ← View all managed services
                    </Link>
                </div>
            </section>
        </PageShell>
    );
}
