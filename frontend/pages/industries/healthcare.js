import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

export default function Healthcare() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-500/30 font-sans flex flex-col">
            <Head>
                <title>Healthcare | Giggs Software Labs</title>
                <meta name="description" content="Predictive diagnostics and patient-centric platforms." />
            </Head>

            <Navbar />

            <main className="flex-grow pt-24 md:pt-32">
                <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 md:px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-400 mb-6 w-max">
                            Industry
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                            Digital Healthcare <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Innovation</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
                            Build HIPAA-compliant data lakes, predictive diagnostic models, and unified patient-centric digital experiences that improve health outcomes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button href="/contact" variant="primary">Explore HealthTech</Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
