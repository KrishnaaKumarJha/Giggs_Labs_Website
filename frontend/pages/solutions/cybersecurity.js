// frontend/pages/solutions/cybersecurity.js
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import { Shield, Brain, Activity, Cloud, Lock, LineChart, CheckCircle2 } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const subPages = [
    {
        title: 'Cybersecurity Consulting',
        desc: 'Helping organizations build secure digital ecosystems.',
        icon: Shield,
        capabilities: ['cybersecurity assessments', 'security architecture', 'risk management', 'compliance frameworks'],
    },
    {
        title: 'Threat Intelligence & AI Detection',
        desc: 'Using AI to detect threats earlier.',
        icon: Brain,
        capabilities: ['behavioral threat analytics', 'anomaly detection', 'AI-based threat prediction'],
    },
    {
        title: 'SOC Automation',
        desc: 'Automating security monitoring and incident response.',
        icon: Activity,
        capabilities: ['automated threat detection', 'AI alert prioritization', 'incident response workflows'],
    },
    {
        title: 'Cloud Security',
        desc: 'Protecting modern cloud environments.',
        icon: Cloud,
        capabilities: ['cloud security posture management', 'container security', 'Kubernetes security'],
        platforms: ['AWS', 'Azure', 'GCP'],
    },
    {
        title: 'Zero Trust Architecture',
        desc: 'Implementing modern security frameworks.',
        icon: Lock,
        capabilities: ['identity-based security', 'microsegmentation', 'secure access models'],
    },
    {
        title: 'Cyber Risk Analytics',
        desc: 'Using AI and data science for cyber risk management.',
        icon: LineChart,
        capabilities: ['security analytics dashboards', 'risk scoring models', 'predictive risk assessment'],
    }
];

export default function CybersecurityPage() {
    return (
        <PageShell>
            <Head>
                <title>AI-Driven Cybersecurity | Giggs Software Labs</title>
            </Head>

            {/* ─── HERO SECTION ─── */}
            <section className="relative -mt-20 pt-[120px] pb-16 md:pt-[140px] md:pb-20 overflow-hidden border-b border-slate-800 flex flex-col items-center justify-start min-h-[50vh]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-slate-950/60 z-10" />
                    <video
                        src="/hero/cyber.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-70"
                    />
                </div>
                <div className="container relative z-20 mx-auto px-4 text-center max-w-5xl">
                    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white futuristic">
                            AI-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ED6FF] to-[#1E7BFF]">Cybersecurity</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="font-roboto text-[22px] text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium mt-6">
                            Protect enterprise digital infrastructure with intelligent threat detection, automated response, and predictive security analytics.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="pt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E7BFF] hover:bg-blue-600 text-white font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">Talk to an Expert</Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── CAPABILITIES GRID ─── */}
            <section className="py-8 md:py-12 relative">
                <div className="container mx-auto px-4 max-w-7xl">

                    <div className="text-center mb-16">
                        <SectionTitle
                            eyebrow="Capabilities"
                            title="Next-Generation Enterprise Defense"
                            subtitle="From zero-trust architecture to automated threat intelligence, we build resilient security ecosystems."
                            align="center"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subPages.map((page, idx) => (
                            <motion.div

                                key={page.title}
                                initial="show"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                                }}
                                className="group flex flex-col rounded-[12px] border border-[#0B1F3B] bg-[#0B1F3B]/40 p-8 hover:border-[#1E7BFF]/50 transition-all duration-300"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[8px] bg-[#1E7BFF]/10 border border-[#1E7BFF]/20 text-[#1E7BFF] transition-all">
                                    <page.icon size={28} strokeWidth={1.5} />
                                </div>

                                <h3 className="font-space-grotesk text-[24px] md:text-[32px] font-bold text-white mb-3 leading-tight tracking-tight">{page.title}</h3>
                                <p className="font-roboto text-[16px] md:text-[18px] text-slate-300 mb-8 leading-relaxed flex-1">
                                    {page.desc}
                                </p>

                                <div className="space-y-6 mt-auto">

                                    {/* Capabilities */}
                                    {page.capabilities && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Capabilities</h4>
                                            <ul className="space-y-2">
                                                {page.capabilities.map(item => (
                                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                                                        <CheckCircle2 size={16} className="text-[#1E7BFF] mt-0.5 shrink-0" />
                                                        <span className="capitalize">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Platforms */}
                                    {page.platforms && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Cloud Platforms</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {page.platforms.map(platform => (
                                                    <span key={platform} className="text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md">
                                                        {platform}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ─── BOTTOM CTA ─── */}
            <section className="py-24 border-t border-[#0B1F3B] bg-[#0B1F3B]/30 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1E7BFF]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="container relative z-10 mx-auto px-4 max-w-3xl">
                    <SectionTitle
                        title="Secure Your Intelligent Enterprise"
                        subtitle="Partner with Giggs Software Labs to build zero-trust architecture and AI-powered defense mechanisms."
                        align="center"
                    />
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E7BFF] hover:bg-blue-600 text-white font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">Strengthen Your Defense</Link>
                        <Link href="/solutions" className="inline-flex items-center justify-center bg-transparent border border-[#1E7BFF] text-[#1E7BFF] hover:bg-[#1E7BFF]/10 font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">Explore All Solutions</Link>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
