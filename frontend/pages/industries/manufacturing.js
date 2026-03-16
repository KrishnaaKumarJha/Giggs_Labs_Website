import Head from 'next/head';
import Button from '../../components/Button';

export default function Manufacturing() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-500/30 font-sans flex flex-col">
            <Head>
                <title>Manufacturing | Giggs Software Labs</title>
                <meta name="description" content="Smart factories and IoT-powered operational efficiency." />
            </Head>

            <main className="">
                <section className="relative mx-auto max-w-7xl px-4 pt-4 pb-16 md:pt-8 md:pb-24 md:px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-400 mb-6 w-max">
                            Industry
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white futuristic mb-6">
                            Industry 4.0 & <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">Smart Manufacturing</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10">
                            Unlock operational excellence with IoT integrations, digital twins, and AI-driven predictive maintenance for global supply chains.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button href="/contact" variant="primary">Explore Industry 4.0</Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
