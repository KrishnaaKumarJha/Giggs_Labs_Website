import Head from 'next/head';
import Button from '../../components/Button';

export default function Retail() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-500/30 font-sans flex flex-col">
            <Head>
                <title>Retail & E-commerce | Giggs Software Labs</title>
                <meta name="description" content="Omnichannel analytics and intelligent supply chains." />
            </Head>

            <main className="">
                <section className="relative mx-auto max-w-7xl px-4 pt-4 pb-16 md:pt-8 md:pb-24 md:px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-400 mb-6 w-max">
                            Industry
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white futuristic mb-6">
                            Next-Generation <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">Retail & Commerce</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10">
                            Drive hyper-personalization, intelligent inventory forecasting, and frictionless omnichannel experiences powered by advanced data science.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button href="/contact" variant="primary">Explore Retail Tech</Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
