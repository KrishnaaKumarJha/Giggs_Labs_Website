import PageShell from '../../components/pageshell';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck, BrainCircuit, Activity, Zap, Cpu, Settings, Target,
  Layers, Users, TrendingUp, Smartphone, Globe, Code, ArrowRight, BarChart3
} from 'lucide-react';

/* 1. Who We Are */
const whoWeAre = [
  { title: "15+ Years Experience", desc: "Testing Architects deployed globally. Deep expertise in Manual, Automation, Security, and Performance.", Icon: Target },
  { title: "Enterprise Architects", desc: "Specialized group providing Reliable, Extensible & Innovative Solutions. Core focus: Innovations, Intelligence, RPA, and DevOps.", Icon: BrainCircuit },
  { title: "Successful Deliveries", desc: "End-to-end lifecycle mastery — Strategy, Development, Testing, UAT, and Production Monitoring. 100% Result-Oriented method.", Icon: ShieldCheck },
];

/* 2. Core Services */
const coreServices = [
  { title: "Performance Engineering", desc: "Deep-dive architecture optimization and bottleneck resolution.", Icon: Cpu },
  { title: "Performance Testing", desc: "Rigorous load, stress, and endurance validation.", Icon: Zap },
  { title: "Capacity Planning", desc: "Predictive modeling for infrastructure scaling and resourcing.", Icon: TrendingUp },
  { title: "Advisory & Transformation", desc: "Consultative guidance for maturing enterprise QAOps.", Icon: Users },
  { title: "Continuous Integration", desc: "Direct DevOps pipeline integration and execution.", Icon: Code },
  { title: "AI-Driven Analytics", desc: "Real-time reporting, baseline capture, and defect variance analysis.", Icon: Activity },
];

/* 3. Portfolio */
const portfolio = [
  { title: "Financial Domain", desc: "Cash Management Solutions & Core Banking Platforms" },
  { title: "E-Commerce", desc: "High-traffic retail and digital marketplace architectures" },
  { title: "SAP Applications", desc: "Enterprise resource planning and integration testing" },
  { title: "Social Media", desc: "High-concurrency, real-time data flow testing" },
  { title: "Database Testing", desc: "Structural integrity and query optimization under load" },
  { title: "IVR Testing", desc: "Interactive Voice Response and telecommunications systems" },
];

/* 4. Ecosystem Nodes */
const ecosystem = [
  { num: "01", title: "Automation Framework", desc: "Design framework, build Test Data framework, execute automation scripting." },
  { num: "02", title: "Execution Strategy", desc: "Manage input test data, establish maintenance strategy, enable unattended automation." },
  { num: "03", title: "Reports Analysis", desc: "Real-time dashboards, version-to-version comparisons, variance/defect analysis." },
  { num: "04", title: "Continuous Testing", desc: "DevOps pipeline integration, log analysis-based regression, AI-driven reports." },
];

const tiers = [
  "Big Workload Validation",
  "Network Protocol Level",
  "Hardware Usage (CPU, Memory, I/O)",
  "Infrastructure Capacity",
  "Critical Conditions",
];

const mobileCaps = [
  { title: "Network Simulation", desc: "Validating across 3G, 4G, and WiFi" },
  { title: "App Architecture", desc: "Responsive, Native, and Hybrid Apps" },
  { title: "Geographic Realism", desc: "Cloud-based global load tests for latency mapping" },
];

const roadmap = [
  "Architecture Evaluation",
  "Real End User Simulation",
  "Monitoring & Profiling",
  "Deep-Dive Tuning",
  "Production Monitoring",
];

const funnel = [
  "Discovery & Audit",
  "Strategic Blueprinting",
  "Framework Implementation",
  "Continuous QAOps Optimization"
];

export default function AutoLoadAI() {
  return (
    <PageShell
      eyebrow="Case Study"
      title="AutoLoad AI"
      description="Next Generation Performance Testing Solution. 15+ years of testing expertise. Enterprise-grade. AI-augmented. Result-oriented."
      align="center"
    >
      {/* Removed the hard bg-color boxes */}
      <div className="relative overflow-hidden w-full pb-32 bg-transparent text-slate-300 font-inter">
        {/* Subtle Tech Pattern Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(30,123,255,0.05),_transparent_40%),radial-gradient(ellipse_60%_40%_at_bottom_left,_rgba(30,123,255,0.05)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-32">
          
          {/* WHO WE ARE */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#1E7BFF] mb-2">Who We Are</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whoWeAre.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-3xl border border-slate-800/60 bg-slate-900/30 p-8 hover:border-[#1E7BFF]/30 hover:bg-slate-900/50 transition-all group backdrop-blur-sm"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E7BFF]/10 border border-[#1E7BFF]/20 group-hover:scale-110 transition-transform">
                    <item.Icon className="text-[#1E7BFF] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CORE SERVICES */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Core Services</h2>
              <div className="mt-4 h-1 w-12 bg-[#1E7BFF] mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreServices.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-slate-900/30 p-8 transition-all hover:border-[#1E7BFF]/40 hover:shadow-[0_0_30px_rgba(30,123,255,0.15)] group backdrop-blur-sm"
                >
                  <svc.Icon className="text-[#1E7BFF] mb-6 w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{svc.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{svc.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CASE STUDY RESULTS */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Real-World Impact</h2>
              <div className="mt-4 h-1 w-12 bg-[#1E7BFF] mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-[2.5rem] border border-slate-800/60 bg-slate-900/30 backdrop-blur-sm p-10 lg:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5"><Globe className="w-32 h-32 text-[#1E7BFF]" /></div>
                <div className="relative z-10">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E7BFF] mb-4">Corporate Bank</div>
                  <div className="text-5xl md:text-7xl font-bold text-white mb-6">3,900%</div>
                  <h3 className="text-xl font-bold text-slate-300 mb-4">Increase in concurrent users</h3>
                  <div className="space-y-4 text-sm">
                    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4">
                      <span className="text-slate-300 block font-bold mb-1">Legacy Problem</span>
                      <span className="text-slate-400">Maxed at 5 concurrent users, 20+ sec response times, crashes.</span>
                    </div>
                    <div className="rounded-2xl border border-[#1E7BFF]/30 bg-[#1E7BFF]/10 p-4">
                      <span className="text-white block font-bold mb-1">Our Solution</span>
                      <span className="text-slate-300">Bypassed caching via simulated test data. Layered monitoring across HTTPD, Tomcat, SQL. &gt;85% reduction in response time.</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-[2.5rem] border border-slate-800/60 bg-slate-900/30 backdrop-blur-sm p-10 lg:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5"><Zap className="w-32 h-32 text-[#1E7BFF]" /></div>
                <div className="relative z-10">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E7BFF] mb-4">E-Commerce Platform</div>
                  <div className="text-5xl md:text-7xl font-bold text-white mb-6">97%</div>
                  <h3 className="text-xl font-bold text-slate-300 mb-4">Reduction in response time</h3>
                  <div className="space-y-4 text-sm">
                    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4">
                      <span className="text-slate-300 block font-bold mb-1">Legacy Problem</span>
                      <span className="text-slate-400">15,000 discrete micro-services, unknown baselines, slow behavior.</span>
                    </div>
                    <div className="rounded-2xl border border-[#1E7BFF]/30 bg-[#1E7BFF]/10 p-4">
                      <span className="text-white block font-bold mb-1">Our Solution</span>
                      <span className="text-slate-300">Deployed QAOps pipeline. Concurrency skyrocketed from 50 to 1,200. Lighthouse went from 20 to 78.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* GRID LAYOUT FOR VARIOUS DIAGRAMS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* ECOSYSTEM */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Settings className="text-[#1E7BFF]" /> Automation Ecosystem
              </h2>
              <div className="relative border-l-2 border-slate-800/60 ml-6 space-y-8 pb-4">
                {ecosystem.map((node, i) => (
                  <motion.div
                    key={node.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-8"
                  >
                    <div className="absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#1E7BFF] text-xs font-bold text-white ring-4 ring-slate-950">
                      {node.num}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{node.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{node.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 5-TIER ARCHITECTURE */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Layers className="text-[#1E7BFF]" /> 5-Tier Architecture
              </h2>
              <div className="flex flex-col gap-3">
                {tiers.map((tier, i) => (
                  <motion.div
                    key={tier}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#1E7BFF]/20 to-blue-600/10 border border-[#1E7BFF]/30 text-sm font-bold text-white uppercase tracking-widest text-center px-4"
                    style={{
                      width: `${100 - (i * 8)}%`,
                      margin: '0 auto',
                    }}
                  >
                    {tier}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* MOBILE CAPABILITIES */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Smartphone className="text-[#1E7BFF]" /> Mobile Performance
              </h2>
              <div className="flex gap-4 h-[300px]">
                {mobileCaps.map((cap, i) => (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 rounded-[2rem] border border-slate-800/60 bg-slate-900/30 p-6 flex flex-col items-center text-center justify-center hover:border-[#1E7BFF]/40 relative overflow-hidden group backdrop-blur-sm"
                  >
                    <div className="absolute top-4 w-16 h-1.5 rounded-full bg-slate-800/60" /> {/* Simulate phone notch */}
                    <div className="w-12 h-12 rounded-full bg-[#1E7BFF]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Target className="w-5 h-5 text-[#1E7BFF]" />
                    </div>
                    <h3 className="font-bold text-white text-sm mb-2">{cap.title}</h3>
                    <p className="text-[11px] text-slate-400">{cap.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ADVISORY FUNNEL */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <BarChart3 className="text-[#1E7BFF]" /> Advisory Funnel
              </h2>
              <div className="flex flex-col items-center gap-2">
                {funnel.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-center bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm font-bold text-slate-300 py-4 px-6 text-center"
                    style={{ width: `${100 - (i * 15)}%` }}
                  >
                    {step}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* CAPACITY PLAN ROADMAP */}
          <section className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/60 rounded-3xl p-10 lg:p-14">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#1E7BFF] mb-10 text-center">Capacity Planning Roadmap</h2>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800/60 -translate-y-1/2 z-0" />
              
              {roadmap.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center w-full md:w-auto"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-950 border-4 border-slate-700/60 flex items-center justify-center text-slate-400 font-bold relative z-10 mb-4">
                    {i + 1}
                  </div>
                  <div className="text-center font-bold text-slate-300 text-[11px] uppercase tracking-widest max-w-[120px]">
                    {step}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA FOOTER */}
          <section className="pt-20 border-t border-slate-800/60 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Start Your Transformation</h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E7BFF] px-8 py-4 font-bold text-white hover:bg-blue-600 transition-all hover:scale-105"
            >
              Initiate Discovery <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

        </div>
      </div>
    </PageShell>
  );
}
