// frontend/pages/products/globixx.js
import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageShell from '../../components/pageshell';
import {
    Ship, Plane, Truck, Cpu, BarChart3, Workflow, Globe,
    ChevronDown, ArrowRight,
} from 'lucide-react';

/* ── Globixx feature data ── */
const features = [
    {
        Icon: Ship,
        title: 'Sea Freight',
        desc: 'End-to-end maritime logistics with integrated compliance and license management.',
        details: [
            'Global container tracking & visibility',
            'Automated customs documentation',
            'Freight rate optimization',
            'Hazardous cargo compliance',
        ],
    },
    {
        Icon: Plane,
        title: 'Air Freight',
        desc: 'High-speed international cargo services with direct airline coordination and air-bridges.',
        details: [
            'Real-time flight status tracking',
            'Consolidated shipment management',
            'Express customs clearance',
            'Last-mile delivery integration',
        ],
    },
    {
        Icon: Truck,
        title: 'Road Freight',
        desc: 'IoT-enabled domestic transportation for seamless container movement across India.',
        details: [
            'GPS-based real-time vehicle tracking',
            'Route optimization & fuel efficiency',
            'Digital proof of delivery (e-POD)',
            'Multi-modal transport coordination',
        ],
    },
    {
        Icon: Workflow,
        title: 'Operation Automation',
        desc: 'Streamline shipping logistics and eliminate errors with intelligent automated workflows.',
        details: [
            'Smart task assignments & in-tray',
            'Multi-level approval processes',
            'Automated RFQ generation',
            'Rule-based document preparation',
        ],
    },
    {
        Icon: BarChart3,
        title: 'Business Intelligence',
        desc: 'Comprehensive dashboards and reporting for 100% transparency on margins and KPIs.',
        details: [
            'Real-time shipment analytics',
            'Cost vs. Margin analysis',
            'Carrier performance monitoring',
            'Invoice auditing & reconciliation',
        ],
    },
    {
        Icon: Cpu,
        title: 'ERP & SAP Integration',
        desc: 'Seamlessly connect your logistics data with existing enterprise resource planning systems.',
        details: [
            'Direct SAP integration module',
            'Data synchronization across platforms',
            'API-first architecture for legacy systems',
            'Real-time inventory & order syncing',
        ],
    },
    {
        Icon: BarChart3,
        title: 'Performance Analytics',
        desc: 'A unified dashboard for a 360-degree insight into every shipment and business growth.',
        details: [
            'Shipment volume trending',
            'Route-based cost analysis',
            'Carrier performance benchmarking',
            'Historical growth tracking',
        ],
    },
    {
        Icon: Globe,
        title: 'Global Transparency',
        desc: 'Monitor, understand, and optimize your trade through IOT analytics and robotics.',
        details: [
            'Multi-currency cost conversion',
            'Compliance audit logging',
            'Electronic booking & rate explorer',
            'Real-time shipment health telemetry',
        ],
    },
];

const stats = [
    { value: '100%', label: 'Shipment Visibility', sub: 'End-to-end tracking' },
    { value: '40%', label: 'Ops Efficiency', sub: 'Through automation' },
    { value: '0', label: 'Compliance Errors', sub: 'Automated auditing' },
    { value: '24/7', label: 'Support & Ops', sub: 'Global trade assistance' },
];

const techStack = [
    'Big Data', 'Cloud Computing', 'IoT', 'Artificial Intelligence', 'SAP Integration', 'Mobile Solutions',
    'LaaS', 'SaaS', 'API-First', 'Real-time Analytics', 'Automated Workflows', 'Electronic BL',
];

const useCases = [
    { title: 'Importers', desc: 'Secure the most competitive rates and gain 100% visibility over incoming cargo.' },
    { title: 'Exporters', desc: 'Scale your international reach with automated compliance and reliable multi-modal logistics.' },
    { title: 'Freight Forwarders', desc: 'Digitize your operations and offer a premium tracking experience to your clients.' },
    { title: '3PL & 4PL Providers', desc: 'Manage complex supply chains with a single platform for end-to-end logistics orchestration.' },
    { title: 'E-commerce (5PL)', desc: 'Accelerate cross-border e-commerce with real-time tracking and automated shipping tasks.' },
    { title: 'Manufacturing', desc: 'Integrate logistics with SAP to ensure materials arrive exactly when they are needed.' },
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
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_6px_rgba(56,189,248,0.4)] flex-shrink-0" />
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

export default function GlobixxProductPage() {
    return (
        <PageShell
            eyebrow="Digital Logistics Transformation"
            title="Moving Trade Forward."
            description="Globixx is India's first tech and data-driven international trade logistics management platform. We bring pro-active monitoring to your international trade through logistics automation and compliance management."
            videoSrc="/hero/automation.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Globixx | Digital Logistics Platform | Giggs Software Labs</title>
            </Head>

            {/* ─── CUSTOM ACTION ─── */}
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="mb-12">
                <motion.div variants={fadeUp} className="mb-8 overflow-visible">
                    <div className="text-[12px] font-black uppercase tracking-[0.4em] text-sky-400 mb-2">Powered by Giggs Labs</div>
                    <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold text-white tracking-tighter">
                        Globixx<span className="text-sky-500">.</span>
                    </h1>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                    <a
                        href="https://globixx.com"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:scale-105 transition-all duration-300"
                    >
                        Visit Globixx Platform
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <Link
                        href="/contact"
                        className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/5 px-8 py-3.5 text-sm font-bold text-sky-200 hover:bg-sky-500/15 transition-all duration-300"
                    >
                        Schedule a Demo
                    </Link>
                </motion.div>
            </motion.div>

            {/* ═══════ STATS ═══════ */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                            className="group relative overflow-hidden rounded-3xl border border-sky-500/15 bg-gradient-to-br from-slate-950/80 to-blue-950/20 p-6 text-center backdrop-blur-sm shadow-xl hover:border-sky-500/40 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.06),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="text-2xl md:text-3xl font-space-grotesk font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-[11px] font-inter font-bold uppercase tracking-widest text-slate-200">{stat.label}</div>
                                <div className="text-[10px] font-roboto text-slate-500 font-medium">{stat.sub}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ CORE CAPABILITIES ═══════ */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mb-24">
                <div className="mb-12">
                    <div className="text-[11px] font-inter font-bold uppercase tracking-[0.3em] text-sky-400">Logistics OS</div>
                    <h2 className="mt-2 font-space-grotesk text-[36px] md:text-[42px] font-bold tracking-tight text-white mb-4">
                        Modernizing trade through <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Intelligence</span>
                    </h2>
                    <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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
            className="rounded-[3rem] border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-blue-950/10 p-8 md:p-12 backdrop-blur-md shadow-2xl"
        >
            <div className="text-[10px] font-inter font-bold uppercase tracking-[0.4em] text-sky-400 mb-6">Technologies</div>
            <h3 className="font-space-grotesk text-[36px] font-bold text-white mb-8 tracking-tight">The Digital Foundation</h3>
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
                    <div className="text-[11px] font-inter font-bold uppercase tracking-[0.3em] text-sky-400">Market Segments</div>
                    <h2 className="mt-2 font-space-grotesk text-[36px] md:text-[42px] font-bold tracking-tight text-white">
                        Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Agility</span>
                    </h2>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                        <h2 className="font-space-grotesk text-[36px] md:text-[42px] font-bold tracking-tight text-white mb-6">
                            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 pb-2 inline-block">Digital Journey</span>
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                            Transform your logistics operations with the power of Big Data, AI, and IoT. Join the future of international trade today.
                        </p>
                        <div className="flex flex-wrap justify-center gap-5">
                            <a
                                href="https://globixx.com"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)] hover:scale-105 transition-all duration-300"
                            >
                                Get Started Now
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/5 px-10 py-4 text-sm font-black uppercase tracking-widest text-sky-200 hover:bg-sky-500/15 transition-all duration-300"
                            >
                                Talk To An Expert
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageShell>
    );
}
