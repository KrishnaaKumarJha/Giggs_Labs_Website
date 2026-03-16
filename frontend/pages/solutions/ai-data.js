// frontend/pages/solutions/ai-data.js
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import { Compass, Database, Cpu, Sparkles, Settings, BarChart3, CheckCircle2 } from 'lucide-react';

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
        title: 'AI Strategy & Consulting',
        desc: 'Helping enterprises define and implement AI transformation roadmaps.',
        icon: Compass,
        topics: ['Enterprise AI strategy', 'AI adoption frameworks', 'AI governance', 'AI operating models'],
        useCases: ['AI transformation programs', 'AI roadmap for enterprises'],
    },
    {
        title: 'Data Engineering',
        desc: 'Designing scalable modern data platforms.',
        icon: Database,
        capabilities: ['Data lake architecture', 'Data warehouses', 'ETL / ELT pipelines', 'real-time data streaming'],
        tools: ['Spark', 'Snowflake', 'Databricks', 'Kafka'],
    },
    {
        title: 'Machine Learning Engineering',
        desc: 'Building and deploying production-grade ML models.',
        icon: Cpu,
        capabilities: ['predictive models', 'model training pipelines', 'feature engineering', 'ML lifecycle management'],
    },
    {
        title: 'Generative AI Solutions',
        desc: 'Helping enterprises implement generative AI.',
        icon: Sparkles,
        solutions: ['enterprise copilots', 'AI assistants', 'document intelligence', 'generative search'],
        useCases: ['customer service AI', 'enterprise knowledge assistants'],
    },
    {
        title: 'MLOps & AI Platforms',
        desc: 'Operationalizing AI systems.',
        icon: Settings,
        capabilities: ['model deployment pipelines', 'model monitoring', 'AI infrastructure', 'scalable ML pipelines'],
    },
    {
        title: 'Advanced Analytics',
        desc: 'Turning data into business intelligence.',
        icon: BarChart3,
        capabilities: ['predictive analytics', 'prescriptive analytics', 'visualization platforms', 'executive dashboards'],
    }
];

export default function AIDataSciencePage() {
    return (
        <PageShell>
            <Head>
                <title>AI & Data Science Engineering | Giggs Software Labs</title>
            </Head>

            {/* ─── HERO SECTION ─── */}
            <section className="relative -mt-20 pt-[120px] pb-16 md:pt-[140px] md:pb-20 overflow-hidden border-b border-slate-800 flex flex-col items-center justify-start min-h-[50vh]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-slate-950/80 z-10" />
                    <video
                        src="/hero/ai.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="container relative z-20 mx-auto px-4 text-center max-w-5xl">
                    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white futuristic">
                            AI & Data Science <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ED6FF] to-[#1E7BFF]">Engineering</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="font-roboto text-[22px] text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium mt-6">
                            Build intelligent enterprise systems powered by scalable data platforms, machine learning models, and advanced analytics.
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
                            title="End-to-End AI & Data Solutions"
                            subtitle="From strategic advisory to production-grade model deployment, we deliver comprehensive data transformations."
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

                                    {/* Capabilities / Topics / Solutions */}
                                    {(page.capabilities || page.topics || page.solutions) && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                                                {page.capabilities ? 'Capabilities' : page.topics ? 'Key Topics' : 'Solutions'}
                                            </h4>
                                            <ul className="space-y-2">
                                                {(page.capabilities || page.topics || page.solutions).map(item => (
                                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                                                        <CheckCircle2 size={16} className="text-sky-500 mt-0.5 shrink-0" />
                                                        <span className="capitalize">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Use Cases */}
                                    {page.useCases && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Use Cases</h4>
                                            <ul className="space-y-2">
                                                {page.useCases.map(item => (
                                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300 border-l border-slate-700 pl-3">
                                                        <span className="capitalize">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Tools */}
                                    {page.tools && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {page.tools.map(tool => (
                                                    <span key={tool} className="text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md">
                                                        {tool}
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
                        title="Ready to Scale Your AI Ambitions?"
                        subtitle="Partner with Giggs Software Labs to architect, build, and deploy production-ready data and AI systems."
                        align="center"
                    />
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E7BFF] hover:bg-blue-600 text-white font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">Start Your Transformation</Link>
                        <Link href="/solutions" className="inline-flex items-center justify-center bg-transparent border border-[#1E7BFF] text-[#1E7BFF] hover:bg-[#1E7BFF]/10 font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">Explore All Solutions</Link>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
