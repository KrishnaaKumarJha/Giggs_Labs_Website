import PageShell from '../../components/pageshell';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cloud, Hexagon, Component, ShieldCheck, Cpu, Database, 
  GitBranch, Server, ArrowRight, Cog, HardDrive, LayoutTemplate, Globe
} from 'lucide-react';

/* 2. Platform Ecosystem */
const ecosystems = [
  { title: "AWS", sub: "Throughput & Reliability" },
  { title: "Azure", sub: "Enterprise & Analytics" },
  { title: "Google Cloud", sub: "Intelligent Workloads" },
];

/* 3. Architectures */
const architectures = [
  { platform: "AWS", driver: "High-Traffic Commerce", pattern: "Horizontal Auto-Scaling & Multi-AZ Clustering", data: "RDS & Edge Caching (CloudFront)", diff: "Unmatched horizontal elasticity for volatile loads" },
  { platform: "Azure", driver: "Secure Data Processing & Streaming", pattern: "VNET-Secured Distributed SaaS & Async Queues", data: "Hadoop, Talend Pipelines & Blob Storage", diff: "Deep enterprise governance & pipeline orchestration" },
  { platform: "GCP", driver: "AI/ML Pipeline Integration", pattern: "Kubernetes Orchestration & Global Load Balancing", data: "BigQuery Data Warehousing & Real-time Analytics", diff: "Purpose-built data science and containerized microservices" },
];

export default function AutomationEngineering() {
  return (
    <PageShell
      eyebrow="Architects of the Modern Cloud & Automation"
      title="Automation Engineering"
      description="Platform-agnostic cloud architecture engineered for scale, security, and intelligent automation."
      align="center"
    >
      <div className="relative overflow-hidden w-full pb-32 bg-transparent text-slate-300 font-inter">
        {/* Isometric Grid Blueprint Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(30,123,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(30,123,255,.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-32">

          {/* PLATFORM-AGNOSTIC ECOSYSTEM */}
          <section className="pt-8">
            <h2 className="text-sm font-bold text-[#1E7BFF] uppercase tracking-widest mb-12 text-center">
              Platform-Agnostic Ecosystem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ecosystems.map((eco, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900/40 border border-[#1E7BFF]/20 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center backdrop-blur-sm group hover:bg-slate-800/60 transition-colors"
                >
                  <Hexagon className="w-16 h-16 text-[#1E7BFF]/20 absolute z-0 group-hover:scale-125 transition-transform" />
                  <div className="text-4xl font-bold text-[#1E7BFF] mb-2 relative z-10">
                    {eco.title}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10">{eco.sub}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-center mt-10 text-slate-400 text-sm font-bold tracking-widest uppercase">One engineering team. Any cloud. Zero compromise.</p>
          </section>

          {/* DYNAMIC ARCHITECTURAL PATTERNS */}
          <section>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight mb-12 text-center">Dynamic Architectural Patterns</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {architectures.map((arch, i) => (
                <div key={i} className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-8 hover:border-[#1E7BFF]/40 transition-colors backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Cloud className="w-8 h-8 text-[#1E7BFF]" />
                    <h3 className="text-2xl font-bold text-white">{arch.platform}</h3>
                  </div>
                  
                  <div className="space-y-6 text-sm">
                    <div>
                      <div className="text-[#1E7BFF] font-bold uppercase tracking-wider text-[10px] mb-1">Core Driver</div>
                      <div className="text-slate-300 font-medium">{arch.driver}</div>
                    </div>
                    <div>
                      <div className="text-[#1E7BFF] font-bold uppercase tracking-wider text-[10px] mb-1">Key Pattern</div>
                      <div className="text-slate-300 font-medium">{arch.pattern}</div>
                    </div>
                    <div>
                      <div className="text-[#1E7BFF] font-bold uppercase tracking-wider text-[10px] mb-1">Data Backbone</div>
                      <div className="text-slate-300 font-medium">{arch.data}</div>
                    </div>
                    <div className="pt-4 border-t border-slate-800/60">
                      <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Differentiator</div>
                      <div className="text-slate-400 italic">{arch.diff}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BLUEPRINTS (Architecture Flows) */}
          <section className="space-y-12">
            
            {/* AWS Blueprint */}
            <div className="bg-slate-900/30 border border-[#1E7BFF]/30 rounded-[2.5rem] p-10 lg:p-14 relative overflow-hidden group backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E7BFF]/5 rounded-full blur-[100px] pointer-events-none" />
              <h3 className="text-[#1E7BFF] font-bold uppercase tracking-[0.2em] text-xs mb-8">AWS Horizontal Clustering Blueprint</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative z-10 w-full overflow-x-auto pb-4">
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><Globe className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">CloudFront</span>
                </div>
                <ArrowRight className="text-[#1E7BFF]/50 hidden md:block" />
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><GitBranch className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">Load Balancer</span>
                </div>
                <ArrowRight className="text-[#1E7BFF]/50 hidden md:block" />
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center relative">
                    <Server className="text-[#1E7BFF] w-8 h-8" />
                    <span className="absolute -top-2 -right-2 bg-[#1E7BFF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">x3</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">EC2 (Ubuntu)</span>
                </div>
                <ArrowRight className="text-[#1E7BFF]/50 hidden md:block" />
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><Database className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">RDS MySQL</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-400 border-l-[3px] border-[#1E7BFF] pl-4 max-w-3xl">
                Horizontally clustered environment governed by Load Balancer. Backend systems isolated in a black box VPS. CloudFront streams media at peak performance.
              </p>
            </div>

            {/* Azure Blueprint */}
            <div className="bg-slate-900/30 border border-[#1E7BFF]/30 rounded-[2.5rem] p-10 lg:p-14 relative overflow-hidden group backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#1E7BFF]/5 rounded-full blur-[100px] pointer-events-none" />
              <h3 className="text-[#1E7BFF] font-bold uppercase tracking-[0.2em] text-xs mb-8">Azure Distributed Analytics Blueprint</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative z-10 w-full overflow-x-auto pb-4">
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><GitBranch className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">LB</span>
                </div>
                <ArrowRight className="text-[#1E7BFF]/50 hidden md:block" />
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><Component className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">Tomcat + Java</span>
                </div>
                <ArrowRight className="text-[#1E7BFF]/50 hidden md:block" />
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><Database className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">MySQL DB</span>
                </div>
                <ArrowRight className="text-[#1E7BFF]/50 hidden md:block" />
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><Cog className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">Talend / ETL</span>
                </div>
                <ArrowRight className="text-[#1E7BFF]/50 hidden md:block" />
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1E7BFF]/40 flex items-center justify-center"><HardDrive className="text-[#1E7BFF] w-8 h-8" /></div>
                  <span className="text-xs font-bold text-slate-400">Azure Storage</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-400 border-l-[3px] border-[#1E7BFF] pl-4 max-w-3xl">
                Strict environment security via Azure NSG & VNET. Distributed across affinity groups. Big Data Pipeline driven by Talend over Hadoop infrastructure.
              </p>
            </div>

          </section>

          {/* DEVOPS & QUALITY AUTOMATION (Stats & Highlights) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* DevOps */}
            <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-900/30 backdrop-blur-sm p-10 text-center flex flex-col items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">End-to-End DevOps Enablement</h3>
              <div className="text-5xl lg:text-7xl font-bold text-[#1E7BFF] mb-2">
                50-70%
              </div>
              <div className="text-xl font-bold text-white mb-10">Reduction in manual effort</div>
              
              <div className="space-y-4 w-full text-left">
                {[
                  { core: "Hyper-automation", out: "Drastic manual effort reduction" },
                  { core: "AI-Augmented Bots", out: "Faster time-to-market releases" },
                  { core: "Standardization", out: "Lower global operational risk" },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="font-bold text-[#1E7BFF] text-sm">{item.core}</span>
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest text-right max-w-[150px]">{item.out}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Automation */}
            <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-900/30 backdrop-blur-sm p-10 text-center flex flex-col items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Quality Assurance Automation</h3>
              <div className="text-5xl lg:text-7xl font-bold text-[#1E7BFF] mb-2">
                80%
              </div>
              <div className="text-xl font-bold text-white mb-10">Reduction in testing effort</div>
              
              <div className="space-y-4 w-full text-left">
                {[
                  { core: "Test Frameworks", out: "Shift-left methodologies" },
                  { core: "CI/CD Integration", out: "Automated release validation" },
                  { core: "AI-Powered Testing", out: "Defect prediction & reduction" },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="font-bold text-[#1E7BFF] text-sm">{item.core}</span>
                    <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest text-right max-w-[150px]">{item.out}</span>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* CTA FOOTER */}
          <section className="pt-20 border-t border-slate-800/60 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Initiate Your Next Build</h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E7BFF] px-8 py-4 font-bold text-white hover:bg-blue-600 transition-all hover:scale-105"
            >
              Contact Engineering <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

        </div>
      </div>
    </PageShell>
  );
}
