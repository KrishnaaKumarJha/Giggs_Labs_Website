// frontend/pages/products/performance.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '../../components/pageshell';
import { Gauge, ArrowLeft } from 'lucide-react';

export default function PerformanceProductPage() {
    return (
        <PageShell fluid={true}>
            <section className="relative -mt-20 flex min-h-[80vh] items-center justify-center overflow-hidden">
                {/* Background video */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="/hero/performance.mp4"
                        autoPlay muted loop playsInline
                        className="h-full w-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.06),_transparent_70%)]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#1E7BFF]/30 bg-[#1E7BFF]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2ED6FF] backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2ED6FF] shadow-[0_0_8px_#2ED6FF] animate-pulse" />
                            Performance Product
                        </div>

                        <div className="flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E7BFF]/10 to-blue-500/5 border border-[#1E7BFF]/20">
                                <Gauge size={40} strokeWidth={1.5} className="text-[#1E7BFF]" />
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white futuristic">
                            Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ED6FF] to-[#1E7BFF] italic">Soon.</span>
                        </h1>

                        <p className="mx-auto max-w-2xl font-roboto text-[18px] text-slate-300 leading-relaxed font-medium">
                            Our Performance Engineering suite is currently under development. We are building tools to deliver reliability, speed, and scale at your fingertips.
                        </p>

                        <div className="flex justify-center pt-4">
                            <Link href="/products" className="inline-flex items-center justify-center bg-transparent border border-[#1E7BFF] text-[#1E7BFF] hover:bg-[#1E7BFF]/10 font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">
                                <ArrowLeft size={16} className="mr-2" />
                                Back to Products
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageShell>
    );
}
