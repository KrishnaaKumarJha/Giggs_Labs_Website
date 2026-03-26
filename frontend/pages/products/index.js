// frontend/pages/products/index.js
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import { 
    ShieldCheck, BrainCircuit, ArrowRight, Activity, 
    Lock, Zap, Globe, Cpu, Workflow, BarChart3, 
    Search, Siren, ShieldAlert, CheckCircle2
} from 'lucide-react';

const mihawkFeatures = [
    { title: 'SIEM & Detection', desc: 'AI-powered real-time monitoring and anomaly detection.' },
    { title: 'Email Security', desc: 'Advanced behavioral analysis for phishing and malware protection.' },
    { title: 'Threat Hunting', desc: 'Proactive investigation to uncover hidden network threats.' },
    { title: 'DFIR', desc: 'Rapid digital forensics and incident response containment.' },
    { title: 'VAPT', desc: 'Simulated real-world attacks via OWASP and PTES methodologies.' },
    { title: 'Compliance', desc: 'Automated auditing for GDPR, HIPAA, and PCI DSS.' },
];

const globixxFeatures = [
    { title: 'Sea/Air/Road Freight', desc: 'Multi-modal logistics with integrated license management.' },
    { title: 'Smart Workflows', desc: 'Rule-based task automation and approval processes.' },
    { title: 'Track & Trace', desc: 'IoT-enabled real-time container visibility.' },
    { title: 'Automated RFQs', desc: 'Dynamic quote generation based on system parameters.' },
    { title: 'SAP Integration', desc: 'Seamless data syncing with enterprise ERP systems.' },
    { title: 'Audit Analytics', desc: 'Performance dashboards for 100% margin transparency.' },
];

export default function ProductsIndexPage() {
    return (
        <PageShell
            eyebrow="The Product Ecosystem"
            title="Intelligence. Redefined."
            description="Explore our world-class platforms designed to secure your infrastructure and automate your global trade operations."
            videoSrc="/hero/automation.mp4"
            videoOpacity={0.6}
            align="center"
            fluid={true}
        >
            <Head>
                <title>Products | Giggs Software Labs</title>
            </Head>

            {/* ─── 0. INTRO SECTION ─── */}
            <section className="relative z-20 pt-16 pb-32 px-4 bg-transparent overflow-visible">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
                <div className="mx-auto max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
                    >
                        <Activity size={16} className="text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Digital Transformation Hub</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white tracking-tighter mb-8 leading-[1.1]">
                        Two Flagships. <br />
                        <span className="text-blue-500 italic">One Mission.</span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-slate-300 font-medium leading-relaxed">
                        At Giggs Labs, we focus on engineering excellence. Whether it&apos;s securing your digital assets with 
                        Mihawk or digitizing your international trade with Globixx, our products are built for scale, 
                        compliance, and absolute reliability.
                    </p>
                </div>
            </section>

            <section className="relative z-20 py-24 bg-transparent overflow-visible">
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-sm font-black uppercase tracking-[0.4em] text-blue-400 mb-4">Cybersecurity Flagship</div>
                            <h3 className="text-5xl md:text-7xl font-space-grotesk font-bold text-white mb-6">Mihawk.</h3>
                            <p className="text-xl text-slate-300 font-medium mb-10 leading-relaxed">
                                A unified security platform that protects your digital assets 24/7. From AI-powered SIEM 
                                to forensic incident response, Mihawk ensures your enterprise is hardened against any threat.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                {mihawkFeatures.map((f, i) => (
                                    <div key={f.title} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                                        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                                            <CheckCircle2 size={18} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm uppercase tracking-tight mb-1">{f.title}</h4>
                                            <p className="text-[12px] text-slate-400 leading-tight">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/products/mihawk" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[12px] px-8 py-4 rounded-full transition-all group">
                                Explore Mihawk Deep-Dive
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative rounded-[3rem] border border-white/10 bg-slate-900/50 p-12 backdrop-blur-xl">
                                <ShieldCheck size={80} strokeWidth={1} className="text-blue-500 mb-8" />
                                <div className="space-y-8">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                                        <div className="text-xs font-black uppercase tracking-widest text-blue-400">Detection Accuracy</div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-3xl font-bold text-white mb-1">&lt;15min</div>
                                        <div className="text-xs font-black uppercase tracking-widest text-blue-400">Mean Response Time</div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-300">OWASP</div>
                                        <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-300">NIST</div>
                                        <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-300">PTES</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative z-20 py-32 bg-transparent overflow-visible">
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.1),_transparent_40%)] pointer-events-none" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1 relative group"
                        >
                            <div className="relative rounded-[3rem] border border-white/10 bg-slate-900/50 p-12 backdrop-blur-xl overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-full h-1 bg-blue-600/50" />
                                <Globe size={80} strokeWidth={1} className="text-blue-500 mb-8" />
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-sm">
                                            <Cpu size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white uppercase tracking-tight">SAP Integration</div>
                                            <div className="text-[11px] text-slate-400 italic">ERP Connective Framework</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-sm">
                                            <Workflow size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white uppercase tracking-tight">Auto-Auditing</div>
                                            <div className="text-[11px] text-slate-400 italic">100% Margin Transparency</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-sm">
                                            <BarChart3 size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white uppercase tracking-tight">IOT Insights</div>
                                            <div className="text-[11px] text-slate-400 italic">Global Visibility OS</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <div className="text-sm font-black uppercase tracking-[0.4em] text-blue-400 mb-4">Logistics OS</div>
                            <h3 className="text-5xl md:text-7xl font-space-grotesk font-bold text-white mb-6 tracking-tighter">Globixx.</h3>
                            <p className="text-xl text-slate-300 font-medium mb-10 leading-relaxed">
                                India&apos;s first tech-driven international trade management platform. Globixx automates 
                                complex shipping logistics, ensures compliance, and provides end-to-end transparency 
                                for modern supply chains.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                {globixxFeatures.map((f, i) => (
                                    <div key={f.title} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                                        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                                            <CheckCircle2 size={18} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm uppercase tracking-tight mb-1">{f.title}</h4>
                                            <p className="text-[12px] text-slate-400 leading-tight">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/products/globixx" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[12px] px-8 py-4 rounded-full transition-all group shadow-xl shadow-blue-500/10">
                                Discover Globixx Platform
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative z-20 py-32 bg-transparent overflow-visible">
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h2 className="text-4xl font-space-grotesk font-bold text-white mb-8 tracking-tight">The Core Principles.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Security First', desc: 'Embedded protection at every layer of our stack.', Icon: Lock },
                            { title: 'Maximum Scale', desc: 'Built to handle thousands of shipments and millions of logs.', Icon: Zap },
                            { title: 'Compliance Driven', desc: 'Pre-configured for global legal and trade standards.', Icon: Globe },
                        ].map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-sm"
                            >
                                <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
                                    <p.Icon size={32} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{p.title}</h4>
                                <p className="text-slate-400 font-medium leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative z-20 py-32 bg-transparent overflow-visible">
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-16 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden border border-white/5 shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1),_transparent_70%)]" />
                        <h2 className="relative z-10 text-4xl md:text-5xl font-space-grotesk font-bold mb-8 tracking-tighter leading-tight">
                            Build the <span className="text-blue-400 italic">Future of Enterprise</span> with us.
                        </h2>
                        <p className="relative z-10 text-lg text-slate-300 font-medium mb-12 max-w-2xl mx-auto">
                            Join hundreds of organizations that trust our engineering expertise to secure their assets and automate their operations.
                        </p>
                        <div className="relative z-10 flex flex-wrap justify-center gap-6">
                            <Link href="/contact" className="group inline-flex items-center gap-4 rounded-full bg-[#1E7BFF] px-12 py-6 text-base font-black uppercase tracking-[0.2em] text-white hover:bg-blue-600 transition-all shadow-[0_0_40px_rgba(30,123,255,0.4)] hover:shadow-[0_0_60px_rgba(30,123,255,0.6)] hover:-translate-y-1.5 active:scale-95">
                                Talk to an Expert
                                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageShell>
    );
}
