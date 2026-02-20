// frontend/pages/products/ai-data.js
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';

export default function AIDataProductPage() {
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
                        <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-400">
                            AI & Data Product
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-50 uppercase">
                            Coming <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">Soon.</span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed font-medium">
                            We are currently refining our AI & Data Engineering product. Stay tuned for updates on our upcoming intelligent solutions.
                        </p>
                    </motion.div>
                </div>
            </section>
        </PageShell>
    );
}
