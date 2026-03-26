import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/pageshell';
import SectionTitle from '../../components/SectionTitle';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Stethoscope, Database, Brain, Activity, ShieldPlus, LineChart, CheckCircle2 } from 'lucide-react';

/* ── DATA ── */
const subPages = [
    { title: 'Interoperability & Data Exchanges', desc: 'Connecting fragmented healthcare systems using FHIR and HL7 standards.', icon: Activity, capabilities: ['FHIR API development', 'HL7 integration', 'health information exchanges (HIE)'] },
    { title: 'Telemedicine & Patient Portals', desc: 'Building secure, high-performance platforms for remote care and patient engagement.', icon: Stethoscope, capabilities: ['telehealth platforms', 'remote patient monitoring (RPM)', 'secure patient portals'] },
    { title: 'Healthcare AI & Analytics', desc: 'Applying artificial intelligence for clinical decision support and predictive health outcomes.', icon: Brain, capabilities: ['clinical NLP', 'predictive disease modeling', 'medical imaging AI'] },
    { title: 'Data Security & HIPAA Compliance', desc: 'Securing electronic health records (EHR) and protecting patient data privacy.', icon: ShieldPlus, capabilities: ['PHI encryption', 'HIPAA compliance automation', 'medical device security (IoMT)'] },
    { title: 'Health Data Lakes & Warehousing', desc: 'Unifying clinical, operational, and financial data for advanced population health analytics.', icon: Database, capabilities: ['clinical data lakes', 'population health analytics', 'EHR data migrations'] }
];

const stats = [
    {
        "value": "Private",
        "label": "Patient Data Security",
        "sub": "Encrypted at rest & transit"
    },
    {
        "value": "Compliant",
        "label": "HIPAA Ready",
        "sub": "Audit-ready infrastructure"
    },
    {
        "value": "Unified",
        "label": "Clinical Interoperability",
        "sub": "HL7 & FHIR standards"
    },
    {
        "value": "Smart",
        "label": "AI-Driven Insights",
        "sub": "Predictive healthcare models"
    }
];
const techStack = ['FHIR', 'HL7v2', 'AWS HealthLake', 'Google Cloud Healthcare API', 'Epic App Orchard', 'Cerner SMART', 'DICOM', 'HIPAA Enclaves', 'Python (Clinical AI)', 'React Native'];
const allUseCases = [
    {
        "title": "Hospital Networks",
        "desc": "Interoperable clinical data systems ensuring seamless information flow across departments."
    },
    {
        "title": "Telehealth Providers",
        "desc": "Highly available, HIPAA-compliant platforms for remote patient care and monitoring."
    },
    {
        "title": "Clinical Research",
        "desc": "Secure data lakes and analytics environments for processing massive trial datasets securely."
    },
    {
        "title": "Medical Devices",
        "desc": "IoMT security and data pipelines for connected medical devices and patient wearables."
    },
    {
        "title": "Health Insurance Payers",
        "desc": "Predictive analytics for risk modeling and highly secure member engagement portals."
    },
    {
        "title": "Digital Therapy Clinics",
        "desc": "Scalable infrastructure powering evidence-based software therapies and patient tracking."
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
    }),
};

function FeatureCard({ feature, index }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="group relative overflow-hidden rounded-[2rem] border border-[#0B1F3B]/80 bg-[#0B1F3B]/30 p-1 backdrop-blur-md transition-all duration-500 hover:border-[#1E7BFF]/30 hover:shadow-[0_0_30px_rgba(30,123,255,0.12)]"
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1E7BFF]/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-5 md:p-6 cursor-pointer outline-none">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E7BFF]/10 to-transparent border border-[#1E7BFF]/20 group-hover:border-[#1E7BFF]/40 transition-all shadow-lg">
                                <feature.icon size={22} strokeWidth={1.5} className="text-[#1E7BFF]" />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium pl-[64px]">{feature.desc}</p>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{duration: 0.3}} className="flex-shrink-0 mt-2 text-slate-500 group-hover:text-[#1E7BFF]">
                        <ChevronDown size={20} />
                    </motion.div>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="px-5 pb-5 md:px-6 md:pb-6">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1E7BFF]/20 to-transparent mb-5" />
                            <ul className="space-y-3 pl-[64px]">
                                {(feature.capabilities || []).map((d, i) => (
                                    <motion.li key={d} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3 text-sm text-slate-300 font-medium capitalize">
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] flex-shrink-0" />
                                        {d}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}

export default function IndustryPage() {
    return (
        <PageShell eyebrow="Industries" title="HealthTech Solutions" description="Giggs Software Labs builds next-generation healthcare technology infrastructures, emphasizing interoperability, data security, and AI-driven clinical insights." videoSrc="/hero/solutions.mp4" videoOpacity={0.6} align="center">
            <Head><title>HealthTech Solutions | Giggs Software Labs</title></Head>

            {/* KEY CHALLENGES */}
            <div className="flex flex-col items-center mt-6 mb-20 gap-8">
                <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-slate-400">
                    <span className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-2 text-sky-300 backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" /> EHR interoperability</span>
<span className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-blue-300 backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" /> HIPAA data security</span>
<span className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-cyan-300 backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" /> telehealth platforms</span>
<span className="flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-2 text-indigo-300 backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" /> AI diagnostics</span>
<span className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-2 text-sky-300 backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" /> health data analytics</span>

                </div>
            </div>

            {/* STATS */}
            <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 mb-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative overflow-hidden rounded-3xl border border-[#0B1F3B] bg-[#0B1F3B]/30 p-8 text-center backdrop-blur-sm hover:border-[#1E7BFF]/30 transition-all duration-300">
                            <div className="absolute inset-0 bg-[#1E7BFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="text-3xl md:text-4xl font-space-grotesk font-black text-white">{stat.value}</div>
                                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#1E7BFF]">{stat.label}</div>
                                <div className="mt-1 text-xs font-roboto text-slate-400 font-medium">{stat.sub}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CORE OFFERINGS ACCORDION */}
            <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 mb-32">
                <div className="mb-14 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#1E7BFF]" />
                        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1E7BFF]">Core Capabilities</div>
                        <span className="h-px w-8 bg-gradient-to-r from-[#1E7BFF] to-transparent" />
                    </div>
                    <h2 className="font-space-grotesk text-[36px] md:text-[48px] font-black tracking-tight text-white leading-tight">
                        Deep <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E7BFF] to-[#0A4B99]">Engineering</span> Focus
                    </h2>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {subPages.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
                </div>
            </section>

            {/* TECH STACK / INTEGRATIONS */}
            <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 mb-32">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[3rem] border border-[#0B1F3B] bg-[#0B1F3B]/20 p-10 md:p-16 backdrop-blur-md shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E7BFF]/10 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1E7BFF] mb-6">Technologies</div>
                        <h3 className="font-space-grotesk text-[32px] md:text-[40px] font-black text-white mb-10 tracking-tight">Ecosystem & Integrations</h3>
                        <div className="flex flex-wrap gap-4">
                            {techStack.map((tech) => (
                                <span key={tech} className="rounded-xl border border-[#0B1F3B] bg-[#0B1F3B]/50 px-6 py-3 text-sm font-bold text-slate-300 hover:border-[#1E7BFF]/50 hover:bg-[#1E7BFF]/10 transition-all cursor-default">{tech}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* USE CASES */}
            <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 mb-32">
                <div className="mb-14 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#1E7BFF]" />
                        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1E7BFF]">Industry Verticals</div>
                        <span className="h-px w-8 bg-gradient-to-r from-[#1E7BFF] to-transparent" />
                    </div>
                    <h2 className="font-space-grotesk text-[36px] md:text-[48px] font-black tracking-tight text-white leading-tight">Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E7BFF] to-[#0A4B99]">Scale</span></h2>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {allUseCases.map((uc, i) => (
                        <motion.div key={uc.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#0B1F3B] hover:border-[#1E7BFF]/40 bg-[#0B1F3B]/20 hover:bg-[#0B1F3B]/40 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(30,123,255,0.15)] cursor-default h-full">
                            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#1E7BFF]/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="relative z-10 flex-1 flex flex-col">
                                <h4 className="text-lg md:text-xl font-space-grotesk font-bold tracking-tight text-white mb-3 group-hover:text-[#1E7BFF] transition-colors duration-300">{uc.title}</h4>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{uc.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 pb-40">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[4rem] border border-[#1E7BFF]/20 bg-[#0B1F3B]/40 p-16 md:p-24 text-center shadow-[0_0_100px_rgba(30,123,255,0.05)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,123,255,0.15),_transparent_60%)]" />
                    <div className="relative z-10">
                        <h2 className="font-space-grotesk text-[40px] md:text-[56px] font-black tracking-tight text-white mb-6 leading-tight">
                            Better Tech. Better Care.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                            Partner with Giggs Software Labs to modernize your clinical and administrative healthcare systems.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#1E7BFF] px-10 py-5 text-sm font-black uppercase tracking-[0.15em] text-white hover:bg-blue-600 transition-all shadow-[0_0_30px_rgba(30,123,255,0.3)] hover:shadow-[0_0_50px_rgba(30,123,255,0.5)] hover:-translate-y-1">
                                Talk to an Expert
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageShell>
    );
}