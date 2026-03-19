// frontend/pages/solutions/automation.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../../components/pageshell';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import { Workflow, Bot, Combine, FastForward, Blocks, Sparkles, CheckCircle2 } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const subPages = [
    {
        title: 'Intelligent Process Automation',
        desc: 'Automating enterprise workflows.',
        icon: Workflow,
        capabilities: ['business process automation', 'workflow orchestration', 'digital operations'],
    },
    {
        title: 'Robotic Process Automation (RPA)',
        desc: 'Automating repetitive tasks.',
        icon: Bot,
        capabilities: ['rule-based automation', 'data processing bots', 'financial process automation'],
    },
    {
        title: 'DevOps Automation',
        desc: 'Automating software development and deployment pipelines.',
        icon: Combine,
        capabilities: ['CI/CD automation', 'infrastructure automation', 'container pipelines'],
        tools: ['Jenkins', 'GitHub Actions', 'ArgoCD'],
    },
    {
        title: 'Test Automation',
        desc: 'Automating quality assurance.',
        icon: FastForward,
        capabilities: ['UI test automation', 'API testing', 'regression automation'],
    },
    {
        title: 'Infrastructure as Code',
        desc: 'Automating infrastructure deployment.',
        icon: Blocks,
        capabilities: ['infrastructure provisioning', 'cloud automation', 'environment replication'],
        tools: ['Terraform', 'Ansible', 'Pulumi'],
    },
    {
        title: 'Hyperautomation',
        desc: 'Combining AI + automation for end-to-end business automation.',
        icon: Sparkles,
        capabilities: ['AI-enabled workflows', 'intelligent orchestration', 'automation governance'],
    }
];

export default function EnterpriseAutomationPage() {
    return (
        <PageShell
            eyebrow="Capabilities"
            title="Enterprise Automation"
            description="Accelerate business operations and software delivery through intelligent automation and DevOps innovation."
            videoSrc="/hero/automation.mp4"
            videoOpacity={0.4}
            align="center"
        >
            <Head>
                <title>Enterprise Automation | Giggs Software Labs</title>
            </Head>

            <div className="flex justify-center mt-10 mb-20">
                <Button href="/contact" variant="primary">Talk to an Expert</Button>
            </div>

            {/* ─── CAPABILITIES GRID ─── */}
            <section className="py-8 md:py-12 relative">
                <div className="container mx-auto px-4 max-w-7xl">

                    <div className="text-center mb-16">
                        <SectionTitle
                            eyebrow="Capabilities"
                            title="End-to-End Delivery Velocity"
                            subtitle="From RPA bots to hyperautomated infrastructure, we eliminate friction and deploy faster."
                            align="center"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subPages.map((page, idx) => (
                            <motion.div
                                key={page.title}
                                initial="show"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                                className="group flex flex-col rounded-[12px] border border-[#0B1F3B] bg-[#0B1F3B]/40 p-8 hover:border-[#1E7BFF]/50 transition-all duration-300"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[8px] bg-[#1E7BFF]/10 border border-[#1E7BFF]/20 text-[#1E7BFF] transition-all">
                                    <page.icon size={28} strokeWidth={1.5} />
                                </div>

                                <h3 className="font-space-grotesk text-[24px] md:text-[32px] font-bold text-white mb-3 leading-tight tracking-tight">{page.title}</h3>
                                <p className="font-roboto text-[16px] md:text-[18px] text-slate-300 mb-8 leading-relaxed flex-1">
                                    {page.desc}
                                </p>

                                <div className="space-y-6 mt-auto">

                                    {/* Capabilities */}
                                    {page.capabilities && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Capabilities</h4>
                                            <ul className="space-y-2">
                                                {page.capabilities.map(item => (
                                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                                                        <CheckCircle2 size={16} className="text-[#1E7BFF] mt-0.5 shrink-0" />
                                                        <span className="capitalize">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Tools */}
                                    {page.tools && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {page.tools.map(tool => (
                                                    <span key={tool} className="text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md">
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ─── BOTTOM CTA ─── */}
            <section className="py-24 border-t border-[#0B1F3B] bg-[#0B1F3B]/30 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1E7BFF]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="container relative z-10 mx-auto px-4 max-w-3xl">
                    <SectionTitle
                        title="Ready to Automate Operations?"
                        subtitle="Partner with Giggs Software Labs to eliminate manual bottlenecks and hyperautomate your workflows."
                        align="center"
                    />
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E7BFF] hover:bg-blue-600 text-white font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">Start Your Automation</Link>
                        <Link href="/solutions" className="inline-flex items-center justify-center bg-transparent border border-[#1E7BFF] text-[#1E7BFF] hover:bg-[#1E7BFF]/10 font-inter font-bold rounded-[8px] px-[24px] py-[14px] transition-all">Explore All Solutions</Link>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
