import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PageShell from '../../components/pageshell';
import {
    ShieldAlert, Radio, CloudCog, Lock, Bug, Siren,
    Rocket, Target, Workflow, RefreshCw,
    ArrowRight,
} from 'lucide-react';

const capabilities = [
    { name: 'Mihawk Adaptive Defense', short: 'ML-powered threat neutralization before breach.', Icon: ShieldAlert },
    { name: 'Managed SOC & SOAR', short: 'Automated incident response with Mihawk playbooks.', Icon: Radio },
    { name: 'Cloud Posture Monitoring', short: 'Real-time CSPM across multi-cloud environments.', Icon: CloudCog },
    { name: 'Zero Trust Architecture', short: 'Identity-centric micro-segmentation & verification.', Icon: Lock },
    { name: 'Vulnerability Management', short: 'Red team exercises & remediation roadmaps.', Icon: Bug },
    { name: '24/7 Incident Response', short: 'Automated containment & remediation in minutes.', Icon: Siren },
];

const stats = [
    { value: '48h', label: 'Rapid Deployment', sub: 'From audit to ops' },
    { value: '24/7', label: 'SOC Operations', sub: 'Mihawk Managed' },
    { value: 'Zero', label: 'Trust Model', sub: 'Verified & Secure' },
    { value: '85%', label: 'Automation Rate', sub: 'Reduced manual toil' },
];

const industries = ['Banking & Finance', 'Healthcare', 'SaaS Platforms', 'Government', 'E-commerce', 'Telecom', 'Manufacturing', 'Insurance'];

const techStack = ['SIEM', 'SOAR', 'Splunk', 'CrowdStrike', 'AWS Security Hub', 'Terraform', 'Vault', 'ElasticSearch', 'Palo Alto', 'Fortinet'];

const methodology = [
    { step: '01', title: 'Mihawk Deployment', desc: 'Rapid integration of the Mihawk security stack for immediate visibility.', Icon: Rocket },
    { step: '02', title: 'Adversary Modeling', desc: 'Industry-specific attack vector identification via threat intelligence.', Icon: Target },
    { step: '03', title: 'SOC Orchestration', desc: 'Automated detection & response playbooks tailored to your needs.', Icon: Workflow },
    { step: '04', title: 'Continuous Evolution', desc: 'AI engine learns from every interaction, hardening your perimeter.', Icon: RefreshCw },
];


export default function CybersecurityPage() {
    return (
        <PageShell
            eyebrow="Managed Services"
            title="Mihawk Operations"
            description="24/7 managed defense, strategic implementation, and automated threat neutralization tailored for the modern enterprise."
        >

            {/* ─── VIDEO HERO BANNER ─── */}
            <section className="relative -mx-4 md:-mx-6 mb-16 overflow-hidden rounded-[2.5rem] border border-sky-500/20">
                <div className="relative h-[300px] md:h-[420px] w-full">
                    <video
                        src="/hero/cyber.mp4"
                        autoPlay muted loop playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Cinematic overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-sky-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.08),_transparent_60%)]" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="relative h-8 w-[140px] shrink-0">
                                <Image src="/logo/mihawk.svg" alt="Mihawk Logo" fill sizes="140px" style={{ objectFit: 'contain', objectPosition: 'left' }} />
                            </div>
                            <div className="h-6 w-px bg-sky-500/40" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">Managed Security</span>
                        </div>
                        <p className="max-w-md text-sm text-slate-300/90 font-medium leading-relaxed">
                            The intelligence of <span className="text-sky-400 font-bold">Mihawk</span> meets the expertise of Giggs Labs.
                            A unified defense strategy for your most critical assets.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── STATS ROW ─── */}
            <section className="mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.08, duration: 0.5, type: 'spring' }}
                            className="group relative overflow-hidden rounded-2xl border border-sky-500/15 bg-gradient-to-br from-slate-950/80 to-sky-950/20 p-6 text-center hover:border-sky-500/40 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.06),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent leading-none">
                                    {stat.value}
                                </div>
                                <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-200">{stat.label}</div>
                                <div className="mt-0.5 text-[10px] text-slate-500 font-medium">{stat.sub}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── CAPABILITIES ─── */}
            <section className="mb-20">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-400">Operational Excellence</h2>
                        <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-sky-500 to-transparent" />
                    </div>
                </div>
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.4 }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-slate-900/20 p-6 hover:border-sky-500/30 transition-all duration-300"
                        >
                            {/* Hover accent glow */}
                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-500/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/5 border border-sky-500/20 group-hover:border-sky-500/40 group-hover:from-sky-500/20 transition-all duration-300">
                                    <cap.Icon size={24} strokeWidth={1.5} className="text-sky-400 group-hover:text-sky-300 transition-colors" />
                                </div>
                                <h3 className="text-[13px] font-bold text-slate-100 group-hover:text-white transition-colors">{cap.name}</h3>
                                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{cap.short}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── METHODOLOGY VISUAL TIMELINE ─── */}
            <section className="mb-20">
                <div className="mb-10">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-400">Implementation Lifecycle</h2>
                    <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-sky-500 to-transparent" />
                </div>
                <div className="relative">
                    {/* Connecting line behind the cards */}
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
                                <h3 className="text-sm font-black text-slate-50 uppercase tracking-tight">{m.title}</h3>
                                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── INDUSTRIES + TECH ─── */}
            <section className="mb-20 grid gap-6 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[2rem] border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-sky-950/10 p-8"
                >
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 mb-6">Securing Innovation</h3>
                    <div className="flex flex-wrap gap-2">
                        {industries.map((ind) => (
                            <span key={ind} className="rounded-full border border-sky-500/15 bg-sky-500/5 px-4 py-2 text-[10px] font-bold text-sky-200 uppercase tracking-wider hover:border-sky-500/40 hover:bg-sky-500/10 transition-all cursor-default">{ind}</span>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[2rem] border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-slate-900/20 p-8"
                >
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 mb-6">Integrated Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/30 bg-slate-900/40 px-4 py-2 text-[10px] font-bold text-slate-300 hover:border-sky-500/40 hover:text-white transition-all cursor-default uppercase tracking-wider">{tech}</span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ─── CTA ─── */}
            <section className="relative overflow-hidden rounded-[3rem] border border-sky-500/20 p-10 md:p-16 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-950/30 via-slate-950/80 to-indigo-950/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.08),_transparent_70%)]" />
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-50 uppercase mb-6">
                        Ready to harden your <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">Defense</span>?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] hover:scale-105 transition-all">
                            Security Assessment
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="https://www.mihawk.tech/" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/5 px-10 py-4 text-sm font-black uppercase tracking-widest text-sky-100 hover:bg-sky-500/15 transition-all">
                            Experience Mihawk
                        </a>
                    </div>
                    <div className="mt-8">
                        <Link href="/services" className="text-xs font-bold text-slate-500 hover:text-sky-400 transition-colors uppercase tracking-widest">
                            ← View all managed services
                        </Link>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
