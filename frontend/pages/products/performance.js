// frontend/pages/products/performance.js
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

export default function PerformanceProductPage() {
    return (
        <PageShell>
            <section className="relative -mt-20 flex min-h-[70vh] items-center justify-center overflow-hidden">
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-400">
                            Performance Product
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-50 uppercase">
                            Coming <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent italic">Soon.</span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed font-medium">
                            Our Performance Engineering suite is currently under development. We are building tools to deliver reliability, speed, and scale at your fingertips.
                        </p>
                    </motion.div>
                </div>
            </section>
        </PageShell>
    );
}
