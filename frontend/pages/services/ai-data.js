// frontend/pages/services/ai-data.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import {
    Sparkles, Database, Cpu, BarChart3, Eye, MessageSquare, Star, Compass,
    Search, FlaskConical, Server, RotateCw, ArrowRight,
} from 'lucide-react';

const capabilities = [
    { name: 'Generative AI & LLMs', short: 'Custom LLM apps, RAG pipelines, and intelligent agents.', Icon: Sparkles },
    { name: 'Data Engineering', short: 'Scalable ETL/ELT, data lakes, and streaming architectures.', Icon: Database },
    { name: 'MLOps & Model Serving', short: 'Automated training, versioning, and inference endpoints.', Icon: Cpu },
    { name: 'Advanced Analytics', short: 'Dashboards, predictive analytics, and anomaly detection.', Icon: BarChart3 },
    { name: 'Computer Vision', short: 'Object detection, OCR, and visual inspection systems.', Icon: Eye },
    { name: 'NLP & Conversational AI', short: 'Sentiment analysis, summarization, and chat agents.', Icon: MessageSquare },
    { name: 'Recommendation Systems', short: 'Personalization engines for real-time user experiences.', Icon: Star },
    { name: 'AI Strategy & Advisory', short: 'Roadmapping, use-case prioritization, and ROI analysis.', Icon: Compass },
];

const useCases = [
    'Predictive maintenance for manufacturing',
    'Customer churn prediction & retention engines',
    'Intelligent document processing & extraction',
    'Real-time recommendation systems',
    'Fraud detection & risk scoring',
    'Supply chain demand forecasting',
    'Automated content generation & curation',
    'Patient outcome prediction in healthcare',
];

const techStack = ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenAI', 'Hugging Face', 'Kafka', 'Spark', 'Airflow', 'dbt', 'PostgreSQL', 'Pinecone', 'Weights & Biases'];

const methodology = [
    { step: '01', title: 'Data Discovery', desc: 'Assess data landscape, quality, and readiness.', Icon: Search },
    { step: '02', title: 'Proof of Concept', desc: 'Rapid prototypes to validate feasibility and impact.', Icon: FlaskConical },
    { step: '03', title: 'Production Build', desc: 'Scale with MLOps, monitoring, and deployment automation.', Icon: Server },
    { step: '04', title: 'Iterate & Optimize', desc: 'Continuous improvement, retraining, and A/B testing.', Icon: RotateCw },
];

export default function AiDataPage() {
    return (
        <PageShell
            eyebrow="Services / AI & Data"
            title="AI & Data Science / Engineering"
            description="Scalable AI and data platforms that turn raw data into real-time intelligence."
        >

            {/* ─── VIDEO HERO BANNER ─── */}
            <section className="relative -mx-4 md:-mx-6 mb-16 overflow-hidden rounded-[2.5rem] border border-cyan-500/20">
                <div className="relative h-[300px] md:h-[420px] w-full">
                    <video
                        src="/hero/ai.mp4"
                        autoPlay muted loop playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-cyan-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.08),_transparent_60%)]" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-3">Intelligence at Scale</span>
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                            Transforming Data into Intelligence
                        </h3>
                        <p className="max-w-md text-sm text-slate-300/90 font-medium leading-relaxed">
                            From generative AI to real-time analytics — we build the intelligent systems that power data-driven enterprises.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── CAPABILITIES ─── */}
            <section className="mb-20">
                <div className="mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80">Core Capabilities</h2>
                    <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
                </div>
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.4 }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-slate-900/20 p-5 hover:border-cyan-500/30 transition-all duration-300"
                        >
                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 group-hover:border-cyan-500/40 group-hover:from-cyan-500/20 transition-all duration-300">
                                    <cap.Icon size={24} strokeWidth={1.5} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
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
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80">Our Methodology</h2>
                    <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
                </div>
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-cyan-500/20 -translate-y-1/2" />
                    <div className="grid gap-5 md:grid-cols-4 relative z-10">
                        {methodology.map((m, i) => (
                            <motion.div
                                key={m.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="group rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/80 to-slate-900/30 p-6 hover:border-cyan-500/30 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-3xl font-black bg-gradient-to-br from-cyan-400/80 to-blue-500/60 bg-clip-text text-transparent leading-none">{m.step}</div>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/8 border border-cyan-500/15 group-hover:bg-cyan-500/15 transition-colors">
                                        <m.Icon size={18} strokeWidth={1.5} className="text-cyan-400" />
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
                    className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-950/60 to-cyan-950/10 p-6"
                >
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80 mb-4">Use Cases</h3>
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
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
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
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/40 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all cursor-default">{tech}</span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ─── CTA ─── */}
            <section className="flex flex-wrap gap-3 mb-12">
                <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3.5 text-sm font-bold text-black shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 transition-all">
                    Discuss your AI project
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services" className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/60 px-8 py-3.5 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                    ← All Services
                </Link>
            </section>
        </PageShell>
    );
}
