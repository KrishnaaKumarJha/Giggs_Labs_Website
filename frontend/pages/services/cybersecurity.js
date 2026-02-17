// frontend/pages/services/cybersecurity.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

const capabilities = [
    { name: 'AI-powered Threat Detection & Predictive Defense', detail: 'Machine learning models that identify and neutralize threats before they reach your systems. Behavioral analysis, anomaly detection, and predictive threat intelligence keep you ahead of attackers.' },
    { name: 'SOC Automation with SOAR Playbooks', detail: 'Automated incident response workflows that reduce mean-time-to-respond by up to 80%. Orchestrate threat containment, evidence collection, and stakeholder notification without manual intervention.' },
    { name: 'Cloud Security Posture Management (CSPM)', detail: 'Continuous assessment and remediation of cloud misconfigurations across multi-cloud environments. Automated compliance checks against CIS, NIST, and custom benchmarks.' },
    { name: 'Zero Trust Architecture', detail: 'Implementation of identity-centric security with micro-segmentation, least-privilege access, continuous verification, and device health attestation across your entire infrastructure.' },
    { name: 'Vulnerability Assessment & Penetration Testing', detail: 'Comprehensive security audits, black-box and white-box penetration testing, red team exercises, and detailed remediation roadmaps to strengthen your security posture.' },
    { name: 'Security Awareness & Incident Response Training', detail: 'Tabletop exercises, phishing simulations, and customized training programs to build a security-first culture. Incident response plan development and regular drill exercises.' },
    { name: 'Identity & Access Management (IAM)', detail: 'Centralized identity governance, SSO, MFA, privileged access management, and role-based access controls across cloud and on-premise environments.' },
    { name: 'Data Loss Prevention (DLP)', detail: 'Endpoint, network, and cloud DLP policies to prevent unauthorized data exfiltration. Classification, encryption, and monitoring of sensitive data across all channels.' },
];

const stats = [
    { value: '80%', label: 'Faster MTTR', sub: 'Mean time to respond' },
    { value: '24/7', label: 'Continuous Monitoring', sub: 'AI-powered SOC' },
    { value: '99.9%', label: 'Threat Detection', sub: 'Real-time accuracy' },
    { value: 'SOC2', label: 'Compliance Ready', sub: 'ISO 27001 · GDPR' },
];

const industries = ['Banking & Finance', 'Healthcare', 'SaaS Platforms', 'Government', 'E-commerce', 'Telecom', 'Manufacturing', 'Insurance'];

const techStack = ['SIEM', 'SOAR', 'Splunk', 'CrowdStrike', 'AWS Security Hub', 'Terraform', 'Vault', 'ElasticSearch', 'Palo Alto', 'Fortinet'];

const methodology = [
    { step: '01', title: 'Security Assessment', desc: 'Comprehensive audit of your current security posture, including infrastructure, applications, policies, and compliance gaps.' },
    { step: '02', title: 'Threat Modeling', desc: 'Identify attack vectors, risk-rank assets, and map out adversary tactics specific to your industry and tech stack.' },
    { step: '03', title: 'Architecture & Implementation', desc: 'Design and deploy defense-in-depth architecture with zero-trust principles, automated detection, and incident response playbooks.' },
    { step: '04', title: 'Continuous Monitoring & Improvement', desc: 'Ongoing SOC operations, threat hunting, vulnerability management, and quarterly reviews to evolve your defenses.' },
];

export default function CybersecurityPage() {
    return (
        <PageShell
            eyebrow="Services / Cybersecurity"
            title="AI-driven Cybersecurity"
            description="In a world where threats evolve daily, reactive security isn't enough. We embed AI into every layer of defense — from endpoint to cloud — enabling continuous monitoring, automated incident response, and zero-trust enforcement at scale."
        >

            {/* Stats row */}
            <section className="mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                            className="rounded-2xl border border-violet-500/20 bg-slate-950/60 p-5 text-center"
                        >
                            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-xs font-semibold text-slate-200">{stat.label}</div>
                            <div className="text-[10px] text-slate-500">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Capabilities */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/80 mb-5">Core Capabilities</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.35 }}
                            className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5 hover:border-violet-500/30 transition-colors"
                        >
                            <h3 className="text-sm font-semibold text-slate-100">{cap.name}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{cap.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/80 mb-5">Our Methodology</h2>
                <div className="grid gap-4 md:grid-cols-4">
                    {methodology.map((m, i) => (
                        <motion.div
                            key={m.step}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.45 }}
                            className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 hover:border-violet-500/30 transition-colors"
                        >
                            <div className="text-2xl font-mono font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{m.step}</div>
                            <h3 className="mt-2 text-sm font-semibold text-slate-50">{m.title}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                            {i < methodology.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-violet-700/40 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Industries + Tech stack */}
            <section className="mb-12 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/80 mb-4">Industries We Secure</h3>
                    <div className="flex flex-wrap gap-2">
                        {industries.map((ind) => (
                            <span key={ind} className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1.5 text-[11px] text-violet-200">{ind}</span>
                        ))}
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/80 mb-4">Security Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:border-violet-500/50 transition-colors">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTAs */}
            <section className="flex flex-wrap gap-3 mb-12">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:brightness-110 transition">
                    Get a security assessment →
                </Link>
                <a href="https://www.mihawk.tech/" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-violet-500/40 bg-violet-500/10 px-6 py-3 text-sm font-medium text-violet-200 hover:bg-violet-500/20 transition">
                    Our Product — Mihawk →
                </a>
                <Link href="/services" className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/60 px-6 py-3 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                    ← All Services
                </Link>
            </section>
        </PageShell>
    );
}
