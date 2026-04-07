import PageShell from '../../components/pageshell';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldAlert, Activity, GitMerge, Fingerprint, Lock,
  Clock, AlertTriangle, Monitor, CheckCircle, ArrowRight,
  Database, Zap, Eye, Server, RefreshCw, Cpu
} from 'lucide-react';

export default function MiHawk() {
  return (
    <PageShell
      eyebrow="Next Generation SOC Architecture"
      title="Why AI-Driven Cybersecurity Matters"
      description="Closing the Latency Gap with MiHawk Platform"
      align="center"
    >
      <div className="relative overflow-hidden w-full pb-32 bg-transparent text-slate-300 font-inter">
        {/* Standard Subtle Background Texture */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(30,123,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(30,123,255,.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-32">

          {/* THE BUSINESS RISK (3 Stats) */}
          <section className="pt-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#1E7BFF] mb-8 text-center flex items-center justify-center gap-3">
              <AlertTriangle className="text-[#1E7BFF]" /> The Business Risk
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: "60%", desc: "Organizations experience at least one cyber incident annually" },
                { stat: "$4.5M", desc: "Average breach cost including downtime and recovery" },
                { stat: "287 Days", desc: "Average time to detect and contain a breach" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-slate-800/60 bg-slate-900/30 backdrop-blur-sm p-8 text-center hover:border-[#1E7BFF]/40 transition-colors"
                >
                  <div className="text-5xl font-bold text-white mb-4">{item.stat}</div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#1E7BFF]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center mt-8 text-slate-400 italic tracking-wider">&quot;Cyber-attacks are no longer a matter of &apos;if&apos; but &apos;when.&apos;&quot;</p>
          </section>

          {/* THE OPERATIONAL CRISIS (Drowning in noise) */}
          <section className="flex flex-col lg:flex-row items-center gap-12 bg-slate-900/30 backdrop-blur-sm rounded-[2rem] border border-slate-800/60 p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -m-20 opacity-5">
              <Activity className="w-96 h-96 text-[#1E7BFF]" />
            </div>

            <div className="flex-1 space-y-6 z-10">
              <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Drowning in Noise</h2>
              {[
                { title: "Alert Overload", desc: "~1,500 daily alerts make manual review mathematically impossible." },
                { title: "False Positive Fatigue", desc: "Analysts waste time chasing ghosts, leading to burnout." },
                { title: "Triage Over Response", desc: "Teams spend more time sorting data than stopping actual threats." },
              ].map((box, i) => (
                <div key={i} className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <ShieldAlert className="w-6 h-6 text-[#1E7BFF] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">{box.title}</h3>
                    <p className="text-sm text-slate-400">{box.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 text-center bg-slate-900 p-10 rounded-[2rem] border border-[#1E7BFF]/30 z-10 w-full">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Historical Mean Time to Respond (MTTR)</h3>
              <div className="text-7xl font-bold text-white">18 <span className="text-4xl text-[#1E7BFF]">HOURS</span></div>
            </div>
          </section>

          {/* TOOL SPRAWL TRAP vs THE LATENCY GAP */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Tool Sprawl */}
            <div>
              <h2 className="text-xl font-bold uppercase text-[#1E7BFF] mb-6">The Tool Sprawl Trap</h2>
              <div className="grid grid-cols-2 gap-4 h-[300px]">
                {['Disconnected Silos', 'Manual Correlation', 'Higher Costs', 'Weaker Security'].map((trap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 flex items-center justify-center text-center font-bold text-white uppercase tracking-wider relative overflow-hidden backdrop-blur-sm"
                  >
                    <span className="relative z-10">{trap}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">More tools ≠ Better security. Tool sprawl creates blind spots.</p>
            </div>

            {/* Latency Gap Comparison */}
            <div>
              <h2 className="text-xl font-bold uppercase text-[#1E7BFF] mb-6">Closing the Latency Gap</h2>
              <div className="flex flex-col gap-4 h-[300px]">
                {/* Legacy */}
                <div className="flex-1 bg-slate-900/30 border border-slate-800/60 rounded-2xl p-8 flex items-center justify-between opacity-50 grayscale backdrop-blur-sm">
                  <div>
                    <h3 className="text-slate-400 font-bold uppercase tracking-widest mb-2">Legacy Response</h3>
                    <div className="text-3xl font-bold text-slate-300">12–24 Hours</div>
                  </div>
                  <Clock className="w-12 h-12 text-slate-500" />
                </div>

                {/* MiHawk */}
                <div className="flex-1 bg-[#1E7BFF]/10 border border-[#1E7BFF]/40 rounded-2xl p-8 flex items-center justify-between shadow-[0_0_30px_rgba(30,123,255,0.1)] backdrop-blur-sm">
                  <div>
                    <h3 className="text-[#1E7BFF] font-bold uppercase tracking-widest mb-2">MiHawk AI Verdict</h3>
                    <div className="text-4xl font-bold text-white">15 Minutes</div>
                  </div>
                  <Zap className="w-12 h-12 text-[#1E7BFF]" />
                </div>
              </div>
            </div>

          </section>

          {/* INTRODUCING MIHAWK (4 quadrants) */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">One Platform. <span className="text-[#1E7BFF]">Complete Protection.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/60 rounded-3xl overflow-hidden border border-slate-800/60">
              {[
                { title: "Unified SIEM", desc: "Enterprise-grade log management.", Icon: Database },
                { title: "Automated Mitigation", desc: "Intelligent response and threat containment.", Icon: Lock },
                { title: "Integrated Ticketing", desc: "Native incident lifecycle management.", Icon: GitMerge },
                { title: "Compliance Monitoring", desc: "Continuous posture assessment.", Icon: Eye },
              ].map((q, i) => (
                <div key={i} className="bg-slate-900 p-10 hover:bg-slate-800/80 transition-colors group">
                  <q.Icon className="w-10 h-10 text-[#1E7BFF] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">{q.title}</h3>
                  <p className="text-slate-400 font-medium">{q.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* THE ARCHITECTURE (Pipeline Flow) */}
          <section className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/60 rounded-[3rem] p-8 md:p-16">
            <h2 className="text-2xl font-bold text-[#1E7BFF] uppercase tracking-widest mb-12 text-center">A Unified Intelligence Ecosystem</h2>
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">

              {/* Input */}
              <div className="flex-1 rounded-2xl border border-slate-800/60 bg-slate-900 p-8 relative flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">01. INGESTION</div>
                <h3 className="text-white font-bold mb-4">SIEM Logs + EDR + Network</h3>
                <p className="text-sm text-slate-400 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">Unified Visibility: Integrates disparate tools, eliminating sprawl instantly.</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center -my-2 lg:my-0">
                <ArrowRight className="text-slate-600 w-8 h-8 lg:rotate-0 rotate-90" />
              </div>

              {/* Engine */}
              <div className="flex-1 rounded-2xl border border-[#1E7BFF]/40 bg-[#1E7BFF]/10 p-8 relative flex flex-col justify-center shadow-[0_0_40px_rgba(30,123,255,0.1)] z-10 scale-105">
                <div className="text-xs font-bold text-[#1E7BFF] uppercase tracking-[0.2em] mb-4">02. AI VERDICT ENGINE</div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Cpu className="text-[#1E7BFF]" /> Behavioral Baselines + Risk Scoring</h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800/60">Uses unsupervised ML, moving beyond static rules to identity anomalous actions.</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center -my-2 lg:my-0">
                <ArrowRight className="text-slate-600 w-8 h-8 lg:rotate-0 rotate-90" />
              </div>

              {/* Output */}
              <div className="flex-1 rounded-2xl border border-slate-800/60 bg-slate-900 p-8 relative flex flex-col justify-center">
                <div className="text-xs font-bold text-[#1E7BFF] uppercase tracking-[0.2em] mb-4">03. ACTION NODES</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-[#1E7BFF]/10 text-[#1E7BFF] border border-[#1E7BFF]/20 text-xs font-bold p-2 rounded text-center">AD SOAR (Disable)</div>
                  <div className="bg-[#1E7BFF]/10 text-[#1E7BFF] border border-[#1E7BFF]/20 text-xs font-bold p-2 rounded text-center">IR (Isolate Host)</div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">Orchestration: Connects decisions directly to enforcement points instantly.</p>
              </div>

            </div>
          </section>

          {/* AI VERDICT VS MANUAL TRIAGE */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 rounded-[2rem] p-8 border border-slate-800/60 flex flex-col items-center justify-center text-center backdrop-blur-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">The Analyst Dilemma</div>
              <div className="w-32 h-32 rounded-full border-[4px] border-slate-800/60 border-t-slate-500 animate-spin flex items-center justify-center mb-6">
                <span className="animate-none absolute text-slate-400 font-bold">30%</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Time: 45+ Minutes</h3>
              <p className="text-slate-500 mt-2">Manual log correlation pending</p>
            </div>

            <div className="bg-[#1E7BFF]/5 rounded-[2rem] p-8 border border-[#1E7BFF]/30 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(30,123,255,0.1)] relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,123,255,0.1)_0%,transparent_70%)]" />
              <div className="text-xs font-bold uppercase tracking-widest text-[#1E7BFF] mb-6 relative z-10">The MiHawk Verdict</div>
              <div className="w-24 h-24 bg-[#1E7BFF]/10 rounded-2xl flex items-center justify-center border border-[#1E7BFF]/30 mb-6 relative z-10">
                <CheckCircle className="w-12 h-12 text-[#1E7BFF]" />
              </div>
              <h3 className="text-2xl font-bold text-white relative z-10">Time: <span className="text-[#1E7BFF]">Instant</span></h3>
              <div className="mt-4 bg-[#1E7BFF]/20 border border-[#1E7BFF]/30 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest relative z-10 text-sm">
                Verdict: Identified (92% Confidence)
              </div>
            </div>
          </section>

          {/* IMPACT & BENEFITS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-[#1E7BFF] uppercase mb-8 tracking-tight">Core Solutions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "SIEM", desc: "Enterprise correlation", Icon: Database },
                  { title: "EDR", desc: "Endpoint isolation", Icon: Monitor },
                  { title: "Email Sec", desc: "Phishing defense", Icon: ShieldAlert },
                  { title: "DFIR", desc: "Digital Forensics", Icon: Fingerprint },
                ].map((sol, i) => (
                  <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/60 hover:border-[#1E7BFF]/40 transition-colors backdrop-blur-sm">
                    <sol.Icon className="w-6 h-6 text-[#1E7BFF] mb-3" />
                    <h3 className="font-bold text-white mb-1">{sol.title}</h3>
                    <p className="text-xs text-slate-400">{sol.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1E7BFF] uppercase mb-8 tracking-tight">Top Benefits</h2>
              <div className="flex flex-col gap-4">
                {[
                  "Rapid Response: Compressed MTTR via playbooks.",
                  "Cost Efficiency: Lowest Total Cost of Ownership.",
                  "Analyst Productivity: 80% reduction in false positives.",
                  "Audit Readiness: Continuous compliance monitoring."
                ].map((ben, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl border border-slate-800/60 border-l-[4px] border-l-[#1E7BFF]">
                    <span className="font-bold text-slate-300">{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA BLOCK */}
          <section className="bg-slate-900/40 border border-[#1E7BFF]/30 rounded-[3rem] p-12 text-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E7BFF] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />

            <h2 className="text-3xl lg:text-5xl font-bold uppercase text-white mb-6 relative z-10 leading-tight">
              Modern Threats Require a <br /><span className="text-[#1E7BFF]">Modern Platform</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 relative z-10">
              One unified platform to detect threats, respond automatically, and track incidents without the complexity and cost of disparate tools.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E7BFF] px-8 py-4 font-bold text-white hover:bg-blue-600 transition-all hover:scale-105 shadow-[0_0_40px_rgba(30,123,255,0.2)] relative z-10"
            >
              See MiHawk in Action <ArrowRight className="w-6 h-6" />
            </Link>
          </section>

        </div>
      </div>
    </PageShell>
  );
}
