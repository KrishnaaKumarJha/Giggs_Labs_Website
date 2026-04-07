// frontend/pages/products/index.js
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import {
    ShieldCheck, Globe, Rocket, Wrench, 
    BarChart3, Cloud, Users, ClipboardList, 
    Plug, ArrowRight, ShieldAlert, Cpu, Workflow
} from 'lucide-react';

/* ── 2 product areas — overview cards ── */
const productAreas = [
    {
        href: '/products/mihawk',
        Icon: ShieldCheck,
        title: 'Mihawk Security Platform',
        tagline: 'Enterprise-grade cybersecurity & compliance.',
        description: 'A unified security ecosystem designed to harden your digital infrastructure. From AI SIEM to deep forensics, Mihawk ensures zero-compromise protection.',
        color: 'from-blue-400 to-indigo-600',
        borderHover: 'hover:border-blue-500/50',
        glowHover: 'hover:shadow-[0_0_40px_rgba(37,99,235,0.25)]',
        accent: 'text-blue-400',
        highlights: ['AI SIEM', 'Managed SOC', 'Email Security', 'Compliance Automation'],
    },
    {
        href: '/products/globixx',
        Icon: Globe,
        title: 'Globixx Logistics OS',
        tagline: 'India\'s first tech-first trade platform.',
        description: 'Automating the complexities of global trade. Globixx provides end-to-end transparency, smart freight routing, and seamless ERP integrations.',
        color: 'from-cyan-400 to-blue-500',
        borderHover: 'hover:border-cyan-500/50',
        glowHover: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]',
        accent: 'text-cyan-400',
        highlights: ['Multi-modal Freight', 'SAP Integration', 'Track & Trace', 'Smart Workflow'],
    },
];

/* ── Product Engineering Core ── */
const coreServices = [
    { title: 'Security Architecture', body: 'Hardening existing products or building secure-by-design systems from scratch with deep compliance layers.', tags: ['NIST', 'OWASP', 'Zero-Trust'], badge: 'Secure-First', Icon: ShieldAlert },
    { title: 'Enterprise Integrations', body: 'Seamlessly connecting your product ecosystem with SAP, Oracle, or custom legacy ERPs for unified data flow.', tags: ['APIs', 'ERP Sync', 'ETL'], badge: 'Connected', Icon: Cpu },
    { title: 'Scalable Infrastructure', body: 'Cloud-native architecture that scales with your growth — ensuring zero downtime during high-traffic surges.', tags: ['Kubernetes', 'AWS/Azure', 'IaC'], badge: 'High Scale', Icon: Cloud },
    { title: 'Intelligent Dashboards', body: 'Turning raw operation data into intuitive, real-time command centers for high-level decision making.', tags: ['React', 'D3.js', 'Real-time'], badge: 'Insightful', Icon: BarChart3 },
];

/* ── Process steps — Specialized for Products ── */
const processSteps = [
    { step: '01', title: 'Product Discovery', desc: 'Understanding your user personas, operational pain points, and core business objectives.' },
    { step: '02', title: 'Architecture & UX', desc: 'Defining the tech stack, security protocols, and intuitive design systems for enterprise users.' },
    { step: '03', title: 'Agile Engineering', desc: 'Rapid development cycles with weekly demos, security audits, and continuous performance tuning.' },
    { step: '04', title: 'Launch & Scale', desc: 'Production deployment with 24/7 monitoring, scaling support, and feature expansion roadmap.' },
];

/* ── Engagement models ── */
const engagementModels = [
    { title: 'Dedicated Product Team', description: 'A full squad of developers, designers, and security leads dedicated to building and evolving your product ecosystem.', best: 'SaaS & Enterprise Platforms', Icon: Users },
    { title: 'Fixed-Scope MVP', description: 'Go from concept to production-ready MVP in a defined timeframe with fixed deliverables and transparent pricing.', best: 'New Product Launches', Icon: ClipboardList },
    { title: 'Product Audit & Triage', description: 'Critical security, speed, and architecture audits for existing products to identify bottlenecks and vulnerabilities.', best: 'Legacy Transformation', Icon: Plug },
];

export default function ProductsPage() {
    return (
        <PageShell
            eyebrow="Proprietary Tech"
            title="Platforms Built for the Modern Enterprise."
            description="We build products that move the needle. From high-security defense platforms to global logistics operating systems, we engineer for stability and scale."
            videoSrc="/hero/automation.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Products | Giggs Software Labs</title>
                <meta name="description" content="Explore the proprietary tech platforms developed by Giggs Software Labs for security and logistics." />
            </Head>

            {/* ─── CUSTOM GRAPHIC ─── */}
            <div className="relative -mt-20 h-[30vh] flex items-center justify-center overflow-visible pointer-events-none">
                <div className="absolute inset-0 z-0 text-sky-500/30 overflow-hidden">
                    <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.1)_0%,_transparent_70%)] blur-3xl opacity-40" />
                    <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-5 animate-slow-spin">
                        <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
                            <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 190c-49.6 0-90-40.4-90-90s40.4-90 90-90 90 40.4 90 90-40.4 90-90 90z" />
                            <path d="M100 20c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 150c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70-31.4 70-70 70z" />
                            <circle cx="100" cy="100" r="10" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="container relative z-10 mx-auto px-4 text-center -mt-10 mb-20">
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-400">
                    <span className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-2 text-sky-300 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" /> Security-First
                    </span>
                    <span className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-blue-300 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" /> Enterprise Scale
                    </span>
                    <span className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-cyan-300 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" /> Automated Trade
                    </span>
                    <span className="flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-2 text-indigo-300 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" /> Intelligence-Driven
                    </span>
                </div>
            </div>

            {/* ═══════ PRODUCT CARDS ═══════ */}
            <section className="mb-14 pt-4 md:pt-6">
                <div className="flex items-center gap-4 mb-16">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 px-4 whitespace-nowrap">Core Platforms</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
                    {productAreas.map((area, i) => (
                        <motion.div
                            key={area.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <Link href={area.href} className="block h-full group">
                                <article
                                    className={`relative h-full overflow-hidden rounded-[2.5rem] border border-slate-800/80 bg-slate-900/40 p-8 transition-all duration-500 group-hover:border-slate-700/80 group-hover:bg-slate-900/60 ${area.glowHover}`}
                                >
                                    <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${area.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.05]`} />

                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/50 group-hover:scale-110 transition-transform duration-500">
                                                <area.Icon size={28} strokeWidth={1.5} className={area.accent} />
                                            </div>
                                            <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${area.accent}`}>
                                                {area.tagline}
                                            </div>
                                        </div>

                                        <h3 className="font-space-grotesk text-[24px] sm:text-[32px] font-bold text-white tracking-tight group-hover:text-[#1E7BFF] transition-colors">
                                            {area.title}
                                        </h3>

                                        <p className="mt-4 font-roboto text-[16px] text-slate-300 leading-relaxed">
                                            {area.description}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {area.highlights.map((h) => (
                                                <span
                                                    key={h}
                                                    className="rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors"
                                                >
                                                    {h}
                                                </span>
                                            ))}
                                        </div>

                                        <div className={`mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest ${area.accent} opacity-60 group-hover:opacity-100 transition-all`}>
                                            <span>Explore Technology</span>
                                            <svg className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ CORE SERVICES ═══════ */}
            <section className="mb-14 py-12 border-t border-slate-800/40">
                <div className="flex items-center gap-4 mb-16">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Product Engineering</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {coreServices.map((svc, i) => (
                        <motion.article
                            key={svc.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/40 p-8 transition-all hover:border-cyan-500/50 hover:bg-slate-900/30"
                        >
                            <div className="relative z-10 flex gap-6">
                                <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition-transform duration-500 group-hover:scale-110">
                                    <svc.Icon size={28} strokeWidth={1.5} className="text-cyan-400" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                        {svc.badge}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-50 tracking-tight">{svc.title}</h3>
                                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{svc.body}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {svc.tags.map((tag) => (
                                            <span key={tag} className="rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-[10px] font-bold text-slate-500">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* ═══════ HOW WE WORK — PROCESS ═══════ */}
            <section className="mb-14 py-12">
                <div className="text-center mb-16">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500 mb-4">Our Methodology</div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white futuristic text-center">Engineered for Reliability.</h2>
                    <div className="mt-4 h-1 w-12 bg-cyan-500 mx-auto" />
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {processSteps.map((p, i) => (
                        <motion.div
                            key={p.step}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: i * 0.1, duration: 0.45 }}
                            className="relative rounded-3xl border border-slate-800 bg-slate-950/60 p-6 hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="font-space-grotesk text-[36px] md:text-[42px] font-black text-[#1E7BFF]/20 group-hover:text-[#1E7BFF]/40 transition-colors duration-500 leading-none">{p.step}</div>
                            <h3 className="mt-4 text-[20px] sm:text-[24px] font-bold text-slate-50 tracking-tight">
                                {p.title}
                            </h3>
                            <p className="mt-3 font-roboto text-[16px] text-slate-400 leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ ENGAGEMENT MODELS ═══════ */}
            <section className="mb-14 py-12">
                <div className="flex items-center gap-4 mb-16">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4 whitespace-nowrap">Partnership Models</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {engagementModels.map((model, i) => (
                        <motion.div
                            key={model.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group rounded-[2.5rem] border border-slate-800/80 bg-slate-900/20 p-8 hover:border-cyan-500/40 transition-all hover:bg-slate-900/40"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                                <model.Icon size={28} strokeWidth={1.5} className="text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-50 tracking-tight">{model.title}</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed font-medium">{model.description}</p>
                            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                                Best for: {model.best}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ BOTTOM CTA ═══════ */}
            <section className="pb-14 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-950/40 p-8 md:p-16 text-center backdrop-blur-3xl"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_70%)]" />
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white futuristic leading-tight">
                            Build your <span className="text-[#1E7BFF] italic inline-block pb-2 pr-4">next flagship</span> with us.
                        </h2>
                        <p className="mx-auto max-w-2xl font-roboto text-[18px] text-slate-400">
                            Whether you need to harden your security platform or automate global trade, we bring the engineering depth to make it happen.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E7BFF] hover:bg-blue-600 text-white font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">
                                Talk to an Expert
                            </Link>
                            <Link href="/about" className="inline-flex items-center justify-center bg-transparent border border-[#1E7BFF] text-[#1E7BFF] hover:bg-[#1E7BFF]/10 font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">
                                Learn About our Engineering
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageShell>
    );
}
