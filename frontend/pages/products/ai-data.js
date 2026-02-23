// frontend/pages/products/ai-data.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '../../components/pageshell';
import { BrainCircuit, ArrowLeft } from 'lucide-react';

export default function AIDataProductPage() {
    return (
        <PageShell fluid={true}>
            <section className="relative -mt-20 flex min-h-[80vh] items-center justify-center overflow-hidden">
                {/* Background video */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="/hero/ai.mp4"
                        autoPlay muted loop playsInline
                        className="h-full w-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.06),_transparent_70%)]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                            AI & Data Product
                        </div>

                        <div className="flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
                                <BrainCircuit size={40} strokeWidth={1.5} className="text-cyan-400" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-50">
                            Coming <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">Soon.</span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed font-medium">
                            We are currently refining our AI & Data Engineering product. Stay tuned for updates on our upcoming intelligent solutions.
                        </p>

                        <div className="flex justify-center pt-4">
                            <Link href="/products" className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition-all">
                                <ArrowLeft size={16} />
                                Back to Products
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageShell>
    );
}
