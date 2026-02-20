// frontend/pages/products/index.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

const products = [
    {
        href: '/products/mihawk',
        icon: '🛡️',
        title: 'Mihawk',
        tagline: 'Flagship Security Platform',
        description: 'Enterprise-grade cybersecurity platform that combines AI-driven threat intelligence, automated incident response, and continuous compliance monitoring.',
        color: 'from-orange-400 to-amber-500',
        accent: 'text-orange-400',
        glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]',
        highlights: ['Threat Detection', 'Incident Response', 'Compliance', '24/7 Monitoring'],
    },
    {
        href: '/products/ai-data',
        icon: '🧠',
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
        icon: '⚡',
        title: 'Performance Suite',
        tagline: 'Reliability & Scale',
        description: 'Optimization tools and platforms to ensure your applications perform under real-world pressure with maximum efficiency.',
        color: 'from-amber-400 to-orange-500',
        accent: 'text-amber-400',
        glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]',
        highlights: ['Observability', 'Load Testing', 'Cost Optimization', 'Scale'],
    },
];

const philosophy = [
    { title: 'Security First', desc: 'Secure by design, not as an afterthought.', icon: '🔒' },
    { title: 'Built to Scale', desc: 'Infrastructure that grows with your vision.', icon: '📈' },
    { title: 'AI Enhanced', desc: 'Leveraging intelligence to automate complexity.', icon: '🤖' },
];

export default function ProductsIndexPage() {
    return (
        <PageShell fluid={true}>
            {/* ─── 1. HIGH-IMPACT HERO ─── */}
            <section className="relative -mt-20 flex min-h-[80vh] items-center justify-center overflow-hidden">
                {/* Background video */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="/hero/automation.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
                            GIGGS SOFTWARE LABS PRODUCTS
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-50 uppercase leading-[0.95]">
                            Engineering <br />
                            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent italic">The Future.</span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-xl text-slate-200 leading-relaxed font-medium backdrop-blur-sm px-4">
                            Flagship platforms and specialized toolsets designed to solve complex challenges in security, data, and performance.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button onClick={() => document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' })} className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-950 transition-all hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                                View Platforms
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-slate-950 to-transparent z-10" />
            </section>

            {/* ─── 2. PRODUCT GRID ─── */}
            <section id="product-grid" className="relative z-20 py-24 px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center gap-4 mb-20">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-500 px-4 whitespace-nowrap">The Ecosystem</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
                    </div>

                    <div className="grid gap-10 md:grid-cols-3">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Link href={product.href} className="group block h-full">
                                    <article className={`relative h-full overflow-hidden rounded-[3rem] border border-slate-800/80 bg-slate-900/40 p-10 transition-all duration-500 hover:border-slate-700/80 hover:bg-slate-900/60 shadow-2xl ${product.glow}`}>
                                        {/* Subtle accent glow */}
                                        <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${product.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.05]`} />

                                        <div className="relative z-10">
                                            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-slate-800 bg-slate-950/50 text-4xl group-hover:scale-110 group-hover:bg-slate-900/50 transition-all duration-500">
                                                {product.icon}
                                            </div>

                                            <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${product.accent} mb-3`}>
                                                {product.tagline}
                                            </div>

                                            <h3 className="text-3xl font-black text-slate-50 tracking-tighter mb-4 transition-colors group-hover:text-white">
                                                {product.title}
                                            </h3>

                                            <p className="text-sm text-slate-400 leading-relaxed font-medium mb-8">
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
                                                <svg className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
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
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-sky-400 mb-6 font-mono">
                                Core Philosophy
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-50 tracking-tighter uppercase leading-[0.9] mb-8">
                                How we build <span className="text-slate-500">Value.</span>
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-10">
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
                                    className="flex gap-6 p-6 rounded-3xl border border-slate-800/60 bg-slate-950/40 hover:border-sky-500/30 transition-all duration-300 group"
                                >
                                    <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-50 mb-1">{item.title}</h3>
                                        <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 4. BOTTOM CTA ─── */}
            <section className="pb-32 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-6xl relative rounded-3xl border border-slate-800/60 bg-slate-950/40 text-center backdrop-blur-3xl shadow-[0_0_100px_rgba(56,189,248,0.15)]"
                >
                    {/* Background gradient — inner div clips to rounded corners */}
                    <div className="absolute inset-0 rounded-3xl" style={{ overflow: 'hidden' }}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.15),_transparent_70%)]" />
                    </div>

                    <div className="relative z-10 px-8 py-20 md:px-24 md:py-32">
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-50 uppercase mb-8" style={{ lineHeight: '1.2', paddingTop: '0.1em' }}>
                            Ready to <br />
                            <span className="italic bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Power Up?</span>
                        </h2>
                        <p className="mx-auto max-w-xl text-lg text-slate-300 font-medium mb-12">
                            Deploy our flagship platforms today and start transforming your technical debt into strategic advantage.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-sky-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] active:scale-95">
                                Secure a Demo
                            </Link>
                            <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/60 px-10 py-5 text-sm font-black uppercase tracking-widest text-slate-50 hover:bg-slate-900 transition-all active:scale-95">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageShell>
    );
}
