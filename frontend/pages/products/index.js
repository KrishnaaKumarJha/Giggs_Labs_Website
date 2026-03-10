// frontend/pages/products/index.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import { ShieldCheck, BrainCircuit, Zap, Lock, TrendingUp, Bot, ArrowRight } from 'lucide-react';

const products = [
    {
        href: '/products/mihawk',
        Icon: ShieldCheck,
        title: 'Mihawk',
        tagline: 'Flagship Security Platform',
        description: 'Enterprise-grade cybersecurity platform that combines AI-driven threat intelligence, automated incident response, and continuous compliance monitoring.',
        color: 'from-sky-400 to-blue-600',
        accent: 'text-sky-400',
        glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.2)]',
        highlights: ['Threat Detection', 'Incident Response', 'Compliance', '24/7 Monitoring'],
    },
    {
        href: '/products/ai-data',
        Icon: BrainCircuit,
        title: 'AI & Data Engine',
        tagline: 'Intelligent Data Solutions',
        description: 'Scalable data platforms and AI solutions designed to transform data into intelligence and intelligence into action.',
        color: 'from-cyan-400 to-blue-500',
        accent: 'text-cyan-400',
        glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]',
        highlights: ['Generative AI', 'MLOps', 'Data Pipelines', 'Analytics'],
    },
    {
        href: '/products/performance',
        Icon: Zap,
        title: 'Performance Suite',
        tagline: 'Reliability & Scale',
        description: 'Optimization tools and platforms to ensure your applications perform under real-world pressure with maximum efficiency.',
        color: 'from-sky-300 to-blue-400',
        accent: 'text-sky-300',
        glow: 'group-hover:shadow-[0_0_40px_rgba(125,211,252,0.2)]',
        highlights: ['Observability', 'Load Testing', 'Cost Optimization', 'Scale'],
    },
];

const philosophy = [
    { title: 'Security First', desc: 'Secure by design, not as an afterthought.', Icon: Lock },
    { title: 'Built to Scale', desc: 'Infrastructure that grows with your vision.', Icon: TrendingUp },
    { title: 'AI Enhanced', desc: 'Leveraging intelligence to automate complexity.', Icon: Bot },
];

export default function ProductsIndexPage() {
    return (
        <PageShell fluid={true}>
            {/* ─── 1. HIGH-IMPACT HERO ─── */}
            <section className="relative -mt-20 pt-[120px] pb-4 md:pt-[140px] md:pb-6 overflow-hidden border-b border-[#0B1F3B]/30 flex flex-col items-center justify-start min-h-[50vh]">
                {/* Background video */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <video
                        src="/hero/automation.mp4"
                        autoPlay muted loop playsInline
                        className="h-full w-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-slate-950/80 z-10" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white futuristic leading-[1.1]">
                            Engineering.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ED6FF] to-[#1E7BFF] italic pb-3 inline-block">The Future.</span>
                        </h1>

                        <p className="mx-auto max-w-2xl font-roboto text-[18px] text-slate-300 leading-relaxed font-medium">
                            Flagship platforms and specialized toolsets designed to solve complex challenges in security, data, and performance.
                        </p>

                        <div className="flex justify-center gap-4 pt-4">
                            <button
                                onClick={() => document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center bg-[#1E7BFF] hover:bg-blue-600 text-white font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all"
                            >
                                Explore Our Products
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── 2. PRODUCT GRID ─── */}
            <section id="product-grid" className="relative z-20 pt-8 pb-24 px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center gap-4 mb-20">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-500 px-4 whitespace-nowrap">The Ecosystem</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
                    </div>

                    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Link href={product.href} className="group block h-full">
                                    <article className={`relative h-full overflow-hidden rounded-[2.5rem] border border-[#0B1F3B] bg-[#0B1F3B]/40 p-10 transition-all duration-500 hover:border-[#1E7BFF]/50 hover:bg-[#0B1F3B]/60 shadow-2xl ${product.glow}`}>
                                        <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${product.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.06]`} />

                                        <div className="relative z-10">
                                            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-[#1E7BFF]/20 bg-[#1E7BFF]/5 group-hover:scale-110 transition-all duration-500">
                                                <product.Icon size={36} strokeWidth={1.5} className="text-[#1E7BFF]" />
                                            </div>

                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2ED6FF] mb-3">
                                                {product.tagline}
                                            </div>

                                            <h3 className="font-space-grotesk text-[36px] font-bold text-white tracking-tighter mb-4 transition-colors group-hover:text-[#1E7BFF]">
                                                {product.title}
                                            </h3>

                                            <p className="font-roboto text-[16px] text-slate-300 leading-relaxed font-medium mb-8">
                                                {product.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-10 text-xs">
                                                {product.highlights.map(h => (
                                                    <span key={h} className="rounded-full border border-slate-800 bg-slate-950/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${product.accent} opacity-60 group-hover:opacity-100 transition-all`}>
                                                <span>Learn More</span>
                                                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3. CORE PHILOSOPHY ─── */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20" />
                <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
                        <div>
                            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400 mb-6">
                                Core Philosophy
                            </div>
                            <h2 className="font-space-grotesk text-[36px] md:text-[42px] font-bold text-white tracking-tighter leading-[0.95] mb-8">
                                How we build <span className="text-slate-500">Value.</span>
                            </h2>
                            <p className="font-roboto text-[18px] text-slate-300 leading-relaxed mb-10">
                                Every product at Giggs Labs is forged from real-world engineering challenges.
                                We don&apos;t build features; we build solutions that survive the rigors of scale and security.
                            </p>
                        </div>
                        <div className="grid gap-6">
                            {philosophy.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 p-6 rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-950/40 to-slate-900/20 hover:border-sky-500/30 transition-all duration-300 group"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-500/5 border border-sky-500/20 group-hover:border-sky-500/40 transition-all flex-shrink-0">
                                        <item.Icon size={28} strokeWidth={1.5} className="text-sky-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-inter text-[22px] font-bold text-white mb-1">{item.title}</h3>
                                        <p className="font-roboto text-[16px] text-slate-400 font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 4. BOTTOM CTA ─── */}
            <section className="pb-16 px-4" style={{ overflow: 'visible' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl relative rounded-3xl border border-slate-800/60 bg-slate-950/40 text-center shadow-[0_0_60px_rgba(56,189,248,0.12)]"
                    style={{ overflow: 'visible' }}
                >
                    <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ overflow: 'hidden' }}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.10),_transparent_70%)]" />
                    </div>

                    <div className="relative z-10 px-8 py-12 md:px-16 md:py-16" style={{ overflow: 'visible' }}>
                        <h2 className="font-space-grotesk text-[36px] md:text-[42px] font-bold text-white mb-4" style={{ lineHeight: '1.3' }}>
                            Ready to <br />
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#2ED6FF] to-[#1E7BFF] pb-3 pr-1 inline-block">Power Up?</span>
                        </h2>
                        <p className="mx-auto max-w-xl font-roboto text-[18px] text-slate-300 font-medium mb-8">
                            Deploy our flagship platforms today and start transforming your technical debt into strategic advantage.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E7BFF] hover:bg-blue-600 text-white font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">
                                Secure a Demo
                            </Link>
                            <Link href="/services" className="inline-flex items-center justify-center bg-transparent border border-[#1E7BFF] text-[#1E7BFF] hover:bg-[#1E7BFF]/10 font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageShell >
    );
}
