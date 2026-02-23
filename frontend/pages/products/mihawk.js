// frontend/pages/products/mihawk.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageShell from '../../components/pageshell';
import {
    Search, Siren, ShieldCheck, Radio, Lock, ClipboardCheck,
    ChevronDown, ArrowRight,
} from 'lucide-react';

/* ── Mihawk feature data ── */
const features = [
    {
        Icon: Search,
        title: 'Penetration Testing',
        desc: 'Simulated real-world attacks against your web apps, APIs, cloud infrastructure, and internal networks.',
        details: [
            'OWASP Top 10, API, and mobile application testing',
            'Internal & external network pentesting',
            'Red teaming & adversary emulation',
            'Detailed remediation-priority reports',
        ],
    },
    {
        Icon: Siren,
        title: 'Incident Response',
        desc: '24/7 incident response with containment, eradication, recovery, and post-incident forensics.',
        details: [
            'Rapid triage & threat containment',
            'Malware analysis & reverse engineering',
            'Digital forensics & evidence collection',
            'Post-incident reporting & hardening',
        ],
    },
    {
        Icon: ShieldCheck,
        title: 'Security Assessments',
        desc: 'Comprehensive evaluation of your security posture &#8212; identifying gaps before attackers do.',
        details: [
            'Vulnerability scanning & risk assessment',
            'Cloud security posture review (AWS, Azure, GCP)',
            'Compliance audits (SOC 2, ISO 27001, GDPR)',
            'Zero Trust readiness evaluation',
        ],
    },
    {
        Icon: Radio,
        title: 'Real-time Threat Monitoring',
        desc: 'AI-powered continuous monitoring across endpoints, networks, and cloud workloads.',
        details: [
            'SIEM integration & log correlation',
            'Behavioral analytics & anomaly detection',
            'Automated alerting & escalation workflows',
            'Dark web & threat intelligence feeds',
        ],
    },
    {
        Icon: Lock,
        title: 'Identity & Access Management',
        desc: 'Identity-centric security with SSO, MFA, least-privilege access, and role-based controls.',
        details: [
            'SSO & MFA implementation',
            'Privileged access management (PAM)',
            'Identity governance & lifecycle automation',
            'Micro-segmentation & conditional access',
        ],
    },
    {
        Icon: ClipboardCheck,
        title: 'Compliance & GRC',
        desc: 'Navigate regulatory complexity with automated compliance tracking and audit-ready docs.',
        details: [
            'SOC 2 Type II preparation & attestation',
            'ISO 27001 implementation support',
            'GDPR & HIPAA readiness',
            'Continuous compliance monitoring dashboards',
        ],
    },
];

const stats = [
    { value: '500+', label: 'Threats Detected Daily', sub: 'Across client environments' },
    { value: '99.9%', label: 'Detection Accuracy', sub: 'AI-powered precision' },
    { value: '<15min', label: 'Mean Response Time', sub: 'From alert to action' },
    { value: '24/7', label: 'Monitoring Coverage', sub: 'Global SOC operations' },
];

const techStack = [
    'SIEM', 'SOAR', 'Splunk', 'CrowdStrike', 'AWS Security Hub', 'Azure Sentinel',
    'Terraform', 'Vault', 'ElasticSearch', 'Nessus', 'Burp Suite', 'Wireshark',
    'Metasploit', 'YARA', 'Snort', 'MITRE ATT&CK',
];

const useCases = [
    { title: 'SaaS Startups', desc: 'Achieve SOC 2 compliance and secure your platform from day one.' },
    { title: 'Financial Services', desc: 'Protect sensitive financial data with continuous monitoring and compliance automation.' },
    { title: 'Healthcare & Pharma', desc: 'Safeguard patient data and meet HIPAA requirements with end-to-end security.' },
    { title: 'Enterprise IT', desc: 'Modernize your SOC, reduce alert fatigue, and implement Zero Trust.' },
    { title: 'E-commerce', desc: 'Defend against payment fraud, DDoS attacks, and data breaches in real time.' },
    { title: 'Government & Defence', desc: 'Air-gapped environments, classified data handling, and national security frameworks.' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
    }),
};

function FeatureCard({ feature, index }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="group relative overflow-hidden rounded-[2rem] border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-slate-900/20 p-1 backdrop-blur-md transition-all duration-500 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-blue-500/5 opacity-0 transition group-hover:opacity-100" />

            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-5 md:p-6 cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/5 border border-sky-500/20 group-hover:border-sky-500/40 transition-all">
                                <feature.Icon size={20} strokeWidth={1.5} className="text-sky-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-50 tracking-tight">{feature.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium pl-[52px]">{feature.desc}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1 text-slate-500 group-hover:text-sky-400 transition-colors"
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 md:px-6 md:pb-6">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-4" />
                            <ul className="space-y-2 pl-[52px]">
                                {feature.details.map((d, i) => (
                                    <motion.li
                                        key={d}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className="flex items-start gap-2 text-sm text-slate-300"
                                    >
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.4)] flex-shrink-0" />
                                        {d}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}

export default function MihawkProductPage() {
    return (
        <PageShell fluid={true}>
            {/* ═══════ HERO ═══════ */}
            <section className="relative -mt-20 w-full overflow-hidden min-h-[75vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <video
                        src="/hero/cyber.mp4"
                        autoPlay muted loop playsInline
                        className="h-full w-full object-cover"
                    />
                </div>

                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.8) 35%, rgba(2,6,23,0.4) 55%, rgba(2,6,23,0) 100%)',
                    }}
                />
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_rgba(56,189,248,0.06),_transparent_60%)]" />

                <div className="relative z-20 w-full">
                    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
                        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>

                            <motion.div variants={fadeUp} className="mb-8 overflow-visible">
                                <div className="relative h-12 w-full max-w-[200px] md:h-16 md:max-w-[280px]">
                                    <Image
                                        src="/logo/mihawk.svg"
                                        alt="Mihawk Logo"
                                        fill
                                        sizes="(max-width: 768px) 200px, 280px"
                                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                                        priority
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/5 px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-widest text-sky-400 mb-6 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
                                Flagship Security Platform
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-slate-50 leading-[1.1]">
                                Secure the <br />
                                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent italic pb-3 inline-block">Unseen.</span>
                            </motion.h1>

                            <p className="mt-8 mx-auto md:mx-0 max-w-2xl text-lg text-slate-300 leading-relaxed font-medium">
                                Mihawk is our enterprise-grade cybersecurity platform that combines AI-driven threat intelligence,
                                automated incident response, and continuous compliance monitoring &#8212; protecting your digital assets 24/7.
                            </p>

                            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="https://www.mihawk.tech/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:scale-105 transition-all duration-300"
                                >
                                    Visit Mihawk Platform
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/5 px-8 py-3.5 text-sm font-bold text-sky-200 hover:bg-sky-500/15 transition-all duration-300"
                                >
                                    Request a demo
                                </Link>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════ STATS ═══════ */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                            className="group relative overflow-hidden rounded-3xl border border-sky-500/15 bg-gradient-to-br from-slate-950/80 to-sky-950/20 p-6 text-center backdrop-blur-sm shadow-xl hover:border-sky-500/40 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.06),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-200">{stat.label}</div>
                                <div className="text-[10px] text-slate-500 font-medium">{stat.sub}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ CORE CAPABILITIES ═══════ */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mb-24">
                <div className="mb-12">
                    <div className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400">Security Ecosystem</div>
                    <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tighter text-slate-50">
                        Enterprise security, <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">fully managed</span>
                    </h2>
                    <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-blue-500" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {features.map((f, i) => (
                        <FeatureCard key={f.title} feature={f} index={i} />
                    ))}
                </div>
            </section>

            {/* ═══════ TECH STACK ═══════ */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-[3rem] border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-sky-950/10 p-8 md:p-12 backdrop-blur-md shadow-2xl"
                >
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 mb-6">Security Stack</div>
                    <h3 className="text-2xl font-black text-slate-50 mb-8 tracking-tight">Advanced Defense Technologies</h3>
                    <div className="flex flex-wrap gap-3">
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-slate-700/40 bg-slate-900/40 px-5 py-2.5 text-xs font-bold text-slate-300 hover:border-sky-500/40 hover:text-white transition-all duration-300 cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ═══════ USE CASES ═══════ */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mb-24">
                <div className="mb-12">
                    <div className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400">Industry Verticals</div>
                    <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tighter text-slate-50">
                        Built for <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">Scale</span>
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {useCases.map((uc, i) => (
                        <motion.div
                            key={uc.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-slate-900/20 p-7 hover:border-sky-500/30 transition-all duration-300"
                        >
                            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-500/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <h4 className="text-base font-black uppercase tracking-tight text-slate-100 mb-3 group-hover:text-sky-400 transition-colors">{uc.title}</h4>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">{uc.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ BOTTOM CTA ═══════ */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 pb-40">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-[3rem] border border-sky-500/20 bg-slate-950/40 p-12 md:p-16 text-center backdrop-blur-3xl shadow-[0_0_80px_rgba(56,189,248,0.1)]"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_70%)]" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-50 mb-6">
                            Deployment in <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent pb-2 inline-block">48 Hours</span>
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                            Get an enterprise-ready security assessment and launch your hardened infrastructure in less than 48 hours.
                        </p>
                        <div className="flex flex-wrap justify-center gap-5">
                            <a
                                href="https://www.mihawk.tech/"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)] hover:scale-105 transition-all duration-300"
                            >
                                Go To Mihawk Platform
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/5 px-10 py-4 text-sm font-black uppercase tracking-widest text-sky-200 hover:bg-sky-500/15 transition-all duration-300"
                            >
                                Talk To Security Experts
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageShell>
    );
}
