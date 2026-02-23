// frontend/pages/projects.js  (renders as /projects → "Products" in nav)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ── Mihawk feature data ── */
const features = [
  {
    icon: '🔍',
    title: 'Penetration Testing',
    desc: 'Simulated real-world attacks against your web apps, APIs, cloud infrastructure, and internal networks — performed by offensive security experts using manual and automated techniques.',
    details: [
      'OWASP Top 10, API, and mobile application testing',
      'Internal & external network pentesting',
      'Red teaming & adversary emulation',
      'Detailed remediation-priority reports',
    ],
  },
  {
    icon: '🚨',
    title: 'Incident Response',
    desc: 'When a breach happens, speed matters. Mihawk provides 24/7 incident response with containment, eradication, recovery, and post-incident forensics.',
    details: [
      'Rapid triage & threat containment',
      'Malware analysis & reverse engineering',
      'Digital forensics & evidence collection',
      'Post-incident reporting & hardening',
    ],
  },
  {
    icon: '🛡️',
    title: 'Security Assessments',
    desc: 'Comprehensive evaluation of your security posture — identifying gaps in processes, technology, and compliance before attackers do.',
    details: [
      'Vulnerability scanning & risk assessment',
      'Cloud security posture review (AWS, Azure, GCP)',
      'Compliance audits (SOC 2, ISO 27001, GDPR)',
      'Zero Trust readiness evaluation',
    ],
  },
  {
    icon: '📡',
    title: 'Real-time Threat Monitoring',
    desc: 'AI-powered continuous monitoring across endpoints, networks, and cloud workloads — detecting anomalies and threats before they escalate.',
    details: [
      'SIEM integration & log correlation',
      'Behavioral analytics & anomaly detection',
      'Automated alerting & escalation workflows',
      'Dark web & threat intelligence feeds',
    ],
  },
  {
    icon: '🔐',
    title: 'Identity & Access Management',
    desc: 'Implement and audit identity-centric security with SSO, MFA, least-privilege access, and role-based controls across your entire stack.',
    details: [
      'SSO & MFA implementation',
      'Privileged access management (PAM)',
      'Identity governance & lifecycle automation',
      'Micro-segmentation & conditional access',
    ],
  },
  {
    icon: '📋',
    title: 'Compliance & GRC',
    desc: 'Navigate regulatory complexity with automated compliance tracking, policy management, and audit-ready documentation.',
    details: [
      'SOC 2 Type II preparation & attestation',
      'ISO 27001 implementation support',
      'GDPR & HIPAA readiness',
      'Continuous compliance monitoring dashboards',
    ],
  },
];

const stats = [
  { value: '500+', label: 'Threats Detected Daily', sub: 'Across client environments' },
  { value: '99.9%', label: 'Detection Accuracy', sub: 'AI-powered precision' },
  { value: '<15min', label: 'Mean Response Time', sub: 'From alert to action' },
  { value: '24/7', label: 'Monitoring Coverage', sub: 'Global SOC operations' },
];

const techStack = [
  'SIEM', 'SOAR', 'Splunk', 'CrowdStrike', 'AWS Security Hub', 'Azure Sentinel',
  'Terraform', 'Vault', 'ElasticSearch', 'Nessus', 'Burp Suite', 'Wireshark',
  'Metasploit', 'YARA', 'Snort', 'MITRE ATT&CK',
];

const useCases = [
  { title: 'SaaS Startups', desc: 'Achieve SOC 2 compliance and secure your platform from day one — without building an internal security team.' },
  { title: 'Financial Services', desc: 'Protect sensitive financial data with continuous monitoring, encryption-at-rest, and regulatory compliance automation.' },
  { title: 'Healthcare & Pharma', desc: 'Safeguard patient data and meet HIPAA requirements with end-to-end security assessments and access controls.' },
  { title: 'Enterprise IT', desc: 'Modernize your SOC, reduce alert fatigue, and implement Zero Trust across hybrid cloud environments.' },
  { title: 'E-commerce', desc: 'Defend against payment fraud, DDoS attacks, and data breaches with real-time threat intelligence and WAF management.' },
  { title: 'Government & Defence', desc: 'Air-gapped environments, classified data handling, and compliance with national security frameworks.' },
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
      className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 shadow-lg transition hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 transition group-hover:opacity-100" />

      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-5 md:p-6 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-slate-50">{feature.title}</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{feature.desc}</p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1 text-slate-400 group-hover:text-violet-400 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent mb-4" />
              <ul className="space-y-2">
                {feature.details.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 flex-shrink-0" />
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

export default function ProductsPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-950/80 text-slate-100">

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(139,92,246,0.12),_transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:px-6 lg:pt-20">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
              Our flagship product
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-[#00E0FF]">
                Mihawk
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-2 text-lg sm:text-xl text-slate-300 font-medium">
              Protect Your Digital Assets
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Mihawk is our enterprise-grade cybersecurity platform that combines AI-driven threat
              intelligence, automated incident response, and continuous compliance monitoring — helping
              organizations stay protected around the clock without the overhead of building an
              in-house security operations center.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.mihawk.tech/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:brightness-110 transition"
              >
                Visit Mihawk →
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-violet-500/40 bg-violet-500/10 px-6 py-3 text-sm font-medium text-violet-200 hover:bg-violet-500/20 transition"
              >
                Request demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-5 text-center shadow-lg"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-200">{stat.label}</div>
              <div className="text-[10px] text-slate-500">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ CORE CAPABILITIES ═══════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 mb-16">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-violet-400/90">What Mihawk offers</div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-50">
            Enterprise security, fully managed
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Click any capability below to explore what&apos;s included. Every module is designed to
            work standalone or as part of a unified security program.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════ TECH STACK ═══════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-6 md:p-8 shadow-lg"
        >
          <h3 className="text-sm uppercase tracking-[0.22em] text-violet-400/90 mb-4">Powered by</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-200 hover:border-violet-500/40 hover:text-violet-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ USE CASES / INDUSTRIES ═══════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 mb-16">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-violet-400/90">Who it&apos;s for</div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-50">
            Built for every industry
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 hover:border-violet-500/30 transition-colors"
            >
              <h4 className="text-sm font-semibold text-slate-100">{uc.title}</h4>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 mb-16">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-violet-400/90">How it works</div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-50">
            From onboarding to protection in 48 hours
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: '01', title: 'Discovery', desc: 'We map your attack surface, assets, and compliance requirements.' },
            { step: '02', title: 'Deploy', desc: 'Agents and integrations are deployed across your infrastructure — zero downtime.' },
            { step: '03', title: 'Monitor', desc: 'AI-powered 24/7 monitoring begins with real-time alerting and automated triage.' },
            { step: '04', title: 'Harden', desc: 'Continuous recommendations and automated remediation to reduce your attack surface.' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/40 p-5"
            >
              <span className="text-3xl font-black text-violet-500/20">{s.step}</span>
              <h4 className="mt-2 text-sm font-semibold text-slate-100">{s.title}</h4>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ BOTTOM CTA ═══════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-slate-950/60 p-8 md:p-10 text-center"
          style={{ boxShadow: '0 0 60px rgba(139,92,246,0.15)' }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15),_transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
              Ready to secure your business?
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
              Get a free security assessment and see how Mihawk can protect your
              digital assets — no commitments, no surprises.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://www.mihawk.tech/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:brightness-110 transition"
              >
                Explore Mihawk →
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-violet-500/40 bg-violet-500/10 px-6 py-3 text-sm font-medium text-violet-200 hover:bg-violet-500/20 transition"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
