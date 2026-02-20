// frontend/pages/services/ai-data.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

const capabilities = [
    { name: 'Generative AI & LLM Applications', detail: 'Custom LLMs, fine-tuned models, RAG pipelines, and prompt engineering for production-grade AI applications. We build intelligent agents, copilots, document processors, and content engines powered by state-of-the-art foundation models.' },
    { name: 'Data Engineering & Architecture', detail: 'End-to-end ETL/ELT pipelines, data lakes, warehouses, and real-time streaming architectures. We design and implement data platforms using Kafka, Spark, Airflow, dbt, and modern lakehouse patterns.' },
    { name: 'MLOps & Model Serving', detail: 'Automated model training, versioning, A/B testing, and low-latency inference endpoints. Full lifecycle management with monitoring, drift detection, and automated retraining pipelines.' },
    { name: 'Advanced Analytics & BI', detail: 'Interactive dashboards, predictive analytics, anomaly detection, and business intelligence platforms. We turn data into actionable insights using modern visualization and statistical techniques.' },
    { name: 'Computer Vision', detail: 'Object detection, image classification, OCR, video analytics, and visual inspection systems for manufacturing, retail, healthcare, and security applications.' },
    { name: 'NLP & Conversational AI', detail: 'Sentiment analysis, entity extraction, text classification, summarization, and intelligent conversational agents. Multilingual support with production-grade accuracy and latency.' },
    { name: 'Recommendation Systems', detail: 'Collaborative filtering, content-based, and hybrid recommendation engines for e-commerce, media, and SaaS platforms. Real-time personalization at scale.' },
    { name: 'AI Strategy & Advisory', detail: 'Roadmap planning, use-case prioritization, tech stack selection, and build-vs-buy analysis to maximize ROI on AI investments. We help you identify high-impact AI opportunities.' },
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
    { step: '01', title: 'Data Discovery & Audit', desc: 'Assess your data landscape — sources, quality, governance, and readiness. Identify high-value use cases and define success metrics.' },
    { step: '02', title: 'Proof of Concept', desc: 'Build rapid prototypes to validate feasibility, measure model accuracy, and demonstrate business impact before committing to full build.' },
    { step: '03', title: 'Production Engineering', desc: 'Scale from prototype to production with proper MLOps, monitoring, testing, and deployment automation. Build for reliability and performance.' },
    { step: '04', title: 'Iterate & Optimize', desc: 'Continuous model improvement, retraining, A/B testing, and feature engineering. Expand to new use cases based on learnings and ROI.' },
];

export default function AiDataPage() {
    return (
        <PageShell
            eyebrow="Services / AI & Data"
            title="AI & Data Science / Engineering"
            description="We build scalable AI and data platforms that turn raw data into real-time intelligence, powering predictive decision-making and automation across the enterprise."
        >

            {/* Capabilities */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-5">Core Capabilities</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.35 }}
                            className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5 hover:border-cyan-500/30 transition-colors"
                        >
                            <h3 className="text-sm font-semibold text-slate-100">{cap.name}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{cap.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-5">Our Methodology</h2>
                <div className="grid gap-4 md:grid-cols-4">
                    {methodology.map((m, i) => (
                        <motion.div
                            key={m.step}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.45 }}
                            className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="text-2xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{m.step}</div>
                            <h3 className="mt-2 text-sm font-semibold text-slate-50">{m.title}</h3>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                            {i < methodology.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-cyan-700/40 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Use cases + Tech stack */}
            <section className="mb-12 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-4">Use Cases</h3>
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
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-cyan-400 to-blue-500" />
                                {uc}
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-500/50 transition-colors">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTAs */}
            <section className="flex flex-wrap gap-3 mb-12">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-medium text-black shadow-lg hover:brightness-110 transition">
                    Discuss your AI project →
                </Link>
                <Link href="/services" className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/60 px-6 py-3 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition">
                    ← All Services
                </Link>
            </section>
        </PageShell>
    );
}
