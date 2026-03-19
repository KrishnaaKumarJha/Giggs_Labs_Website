import Head from 'next/head';
import Link from 'next/link';
import PageShell from '../../components/pageshell';

export default function Industries() {
    return (
        <PageShell
            eyebrow="Domains"
            title="Industries We Serve"
            description="Deep domain expertise paired with intelligent engineering. We bring tailored transformation to every sector we partner with."
            videoSrc="/hero/solutions.mp4"
            videoOpacity={0.7}
        >
            <Head>
                <title>Industries | Giggs Software Labs</title>
                <meta name="description" content="Deep domain expertise paired with intelligent engineering across industries." />
            </Head>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12">
                {[
                    {
                        name: 'Fintech & BFSI',
                        link: '/industries/banking',
                        solve: 'Intelligent risk modeling, AI compliance, and targeted fraud analytics.',
                        icon: (
                            <svg className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                    },
                    {
                        name: 'Retail Tech',
                        link: '/industries/retail',
                        solve: 'Customer analytics, recommendation engines, and dynamic demand forecasting.',
                        icon: (
                            <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        ),
                    },
                    {
                        name: 'Health Tech',
                        link: '/industries/healthcare',
                        solve: 'Predictive diagnostics, data interoperability, and intelligent patient tracking.',
                        icon: (
                            <svg className="h-8 w-8 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        ),
                    },
                    {
                        name: 'Manufacturing',
                        link: '/industries/manufacturing',
                        solve: 'Smart factory IoT integration, digital twins, and robust predictive maintenance.',
                        icon: (
                            <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ),
                    },
                ].map((industry) => (
                    <Link href={industry.link} key={industry.name} className="block group">
                        <div className="h-full relative rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)] hover:border-sky-500/30">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/50 border border-slate-800 shadow-inner group-hover:bg-slate-900 group-hover:border-sky-500/30 transition-colors">
                                    {industry.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">{industry.name}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {industry.solve}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PageShell>
    );
}
