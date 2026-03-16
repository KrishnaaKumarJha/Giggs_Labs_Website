// frontend/pages/about.js
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Shield, Zap, Bot, Lightbulb, Settings, Target, Handshake, Radio } from 'lucide-react';
import PageShell from '../components/pageshell';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ── helper components ── */
const StatCounter = ({ value, suffix = '', decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value);
      if (isNaN(end)) {
        setDisplayValue(value);
        return;
      }

      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = start + (end - start) * easeProgress;
        setDisplayValue(currentVal.toFixed(decimals));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, decimals]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

/* ── data ── */
const values = [
  {
    icon: Lightbulb,
    title: 'Innovation with Integrity',
    tagline: 'Forward Thinking',
    desc: 'We bring creative excellence and ethical standards to every project — from high-level architecture to production deployment.',
    color: 'cyan',
    border: 'hover:border-cyan-500/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(0,224,255,0.15)]',
    bg: 'from-cyan-500/10 to-transparent',
    accentText: 'text-cyan-400',
    tag: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-200',
  },
  {
    icon: Settings,
    title: 'Engineering Excellence',
    tagline: 'Precision Craftsmanship',
    desc: 'Technical rigor, clean code, and production-first thinking are non-negotiable in every solution we deliver.',
    color: 'sky',
    border: 'hover:border-sky-500/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]',
    bg: 'from-sky-500/10 to-transparent',
    accentText: 'text-sky-400',
    tag: 'border-sky-500/30 bg-sky-500/5 text-sky-200',
  },
  {
    icon: Target,
    title: 'Customer Centricity',
    tagline: 'Your Success, Our Mission',
    desc: 'Every engagement starts with understanding your goals. We engineer solutions that drive real business outcomes, not just ship features.',
    color: 'violet',
    border: 'hover:border-violet-500/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(122,91,255,0.15)]',
    bg: 'from-violet-500/10 to-transparent',
    accentText: 'text-violet-400',
    tag: 'border-violet-500/30 bg-violet-500/5 text-violet-200',
  },
  {
    icon: Handshake,
    title: 'Collaboration that Delivers',
    tagline: 'Trusted Partnership',
    desc: 'We integrate seamlessly with your team — transparent communication, clear handoffs, and shared accountability for results.',
    color: 'blue',
    border: 'hover:border-blue-500/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
    bg: 'from-blue-500/10 to-transparent',
    accentText: 'text-blue-400',
    tag: 'border-blue-500/30 bg-blue-500/5 text-blue-200',
  },
];

const offices = [
  {
    location: 'Noida, India',
    detail: 'A-144, Sector 132, Noida, India',
    flag: '🇮🇳',
    image: '/noida.png'
  },
  {
    location: 'California, USA',
    detail: 'Silicon Valley Engineering Hub',
    flag: '🇺🇸',
    image: '/california.png'
  },
  {
    location: 'Riyadh, Saudi Arabia',
    detail: 'Middle East Strategy Post',
    flag: '🇸🇦',
    image: '/riyadh.png'
  },
];

const leadership = [
  {
    name: 'Ramesh Chowdhary',
    role: 'President & CEO',
    vision: 'Our mission is to bridge the gap between complex engineering and human-centric design. We don\'t just build software; we architect the future of digital interaction.',
    image: '/images/ramesh.jpg',
    color: 'cyan',
  },
  {
    name: 'VP Name',
    role: 'Vice President of Engineering',
    vision: 'Excellence is not an act, but a habit. We instill technical rigor and creative freedom in every squad to ensure our clients lead their respective markets.',
    image: '/vp-placeholder.png',
    color: 'blue',
  },
];

/* ── page ── */
export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const res = await fetch(`${apiUrl}/posts/`);
    const posts = await res.json();
    const formatted = posts.map((p) => ({
      ...p,
      date_display: new Date(p.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    }));
    return { props: { posts: formatted } };
  } catch (err) {
    console.error('Error fetching posts:', err);
    return { props: { posts: [] } };
  }
}

export default function About({ posts = [] }) {
  return (
    <PageShell
      simpleHero={true}
      videoSrc="/hero/automation.mp4"
      videoOpacity={0.65}
      overlayOpacity={0.25}
    >
      {/* ─── 1. HERO ─── */}
      <section className="relative -mt-20 pt-24 flex min-h-[70vh] items-center justify-center">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white futuristic">
              Engineering the Intelligent Enterprise
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              <span className="font-bold text-white">Giggs Software Labs</span> is an AI-driven engineering company helping organizations build intelligent,
              secure, and high-performance digital systems. We combine deep engineering expertise with
              AI-driven innovation to deliver transformative outcomes across industries.
            </motion.p>

            <motion.div variants={fadeUp} className="pt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-[2rem] border border-slate-800/60 bg-slate-900/20 backdrop-blur-lg p-8 md:p-10 text-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2ED6FF] to-[#1E7BFF] text-black text-[10px] font-black uppercase tracking-[0.3em] px-5 py-1.5 rounded-full shadow-lg shadow-[#2ED6FF]/20">
                  Our Vision
                </div>
                <div className="text-4xl text-[#2ED6FF]/20 font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-sm md:text-base font-bold text-slate-100 leading-relaxed tracking-tight -mt-4">
                  To become a global leader in AI-driven engineering and intelligent enterprise systems.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#2ED6FF]/40" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Giggs Software Labs</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#2ED6FF]/40" />
                </div>
              </div>
              <div className="relative rounded-[2rem] border border-slate-800/60 bg-slate-900/20 backdrop-blur-lg p-8 md:p-10 text-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7A5CFF] to-[#1E7BFF] text-black text-[10px] font-black uppercase tracking-[0.3em] px-5 py-1.5 rounded-full shadow-lg shadow-[#7A5CFF]/20">
                  Our Mission
                </div>
                <div className="text-4xl text-[#7A5CFF]/20 font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-sm md:text-base font-bold text-slate-100 leading-relaxed tracking-tight -mt-4">
                  To empower organizations with AI-powered platforms, secure digital ecosystems, and high-performance infrastructure that accelerate innovation and business growth.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7A5CFF]/40" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Giggs Software Labs</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7A5CFF]/40" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="Our Story"
            title="How We Got Here"
            subtitle="Founded to bridge the gap between complex engineering and transformative business outcomes."
            align="center"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.p variants={fadeUp} className="text-base text-slate-300 leading-relaxed">
            Technology is evolving faster than ever. Organizations are under pressure to innovate rapidly, protect their digital ecosystems, and scale infrastructure to meet global demand. Yet many companies struggle with fragmented data systems, legacy infrastructure, security risks, and operational inefficiencies.
          </motion.p>
          <motion.p variants={fadeUp} className="text-base text-slate-300 leading-relaxed">
            <span className="font-bold text-white">Giggs Software Labs was founded to solve this challenge.</span> From day one, our vision has been simple: engineer intelligent systems that transform how enterprises operate.
          </motion.p>
          <motion.p variants={fadeUp} className="text-base text-slate-300 leading-relaxed">
            We combine deep engineering expertise with AI-driven innovation to help organizations build platforms that are faster, smarter, and more resilient. Today, Giggs partners with enterprises across industries to deliver transformative solutions in <span className="text-brand-highlight font-semibold">Artificial Intelligence</span>, <span className="text-brand-highlight font-semibold">Cybersecurity</span>, <span className="text-brand-highlight font-semibold">Performance Engineering</span>, and <span className="text-brand-highlight font-semibold">Enterprise Automation</span>.
          </motion.p>
          <motion.div variants={fadeUp} className="pt-4">
            <div className="rounded-2xl border border-brand-highlight/20 bg-brand-highlight/5 p-6 text-center">
              <p className="text-sm font-bold text-slate-100 italic">
                &ldquo;The future belongs to intelligent digital systems.&rdquo;
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="Our Expertise. Your Competitive Edge."
            title="What We Do"
            subtitle="Giggs Software Labs helps organizations design and operate modern digital ecosystems powered by AI, data intelligence, and scalable engineering."
            align="center"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Brain,
              title: 'AI & Data Engineering',
              desc: 'Transform enterprise data into intelligent decision systems through advanced analytics, machine learning, and scalable data platforms.',
              border: 'hover:border-sky-500/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]',
              bg: 'from-sky-500/10 to-transparent',
              accentText: 'text-sky-400',
            },
            {
              icon: Shield,
              title: 'AI-Driven Cybersecurity',
              desc: 'Protect digital infrastructure with predictive threat detection, intelligent security automation, and modern zero-trust architectures.',
              border: 'hover:border-blue-500/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
              bg: 'from-blue-500/10 to-transparent',
              accentText: 'text-blue-400',
            },
            {
              icon: Zap,
              title: 'Performance Engineering',
              desc: 'Design and optimize systems that deliver exceptional speed, scalability, and reliability across cloud-native environments.',
              border: 'hover:border-violet-500/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(122,91,255,0.15)]',
              bg: 'from-violet-500/10 to-transparent',
              accentText: 'text-violet-400',
            },
            {
              icon: Bot,
              title: 'Enterprise Automation',
              desc: 'Accelerate productivity and operational efficiency through intelligent automation and DevOps innovation.',
              border: 'hover:border-blue-400/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(96,165,250,0.12)]',
              bg: 'from-blue-400/10 to-transparent',
              accentText: 'text-blue-300',
            },
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group h-full"
            >
              <div className={`relative h-full overflow-hidden rounded-[2.5rem] border border-slate-800/60 bg-slate-950/40 p-6 md:p-8 backdrop-blur-md transition-all duration-500 ${pillar.border} ${pillar.glow}`}>
                {/* Decorative glow */}
                <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${pillar.bg} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative flex flex-col h-full">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/50 border border-slate-800 shadow-inner`}>
                    <pillar.icon className={`w-7 h-7 ${pillar.accentText}`} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-50 mb-3 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── OUR APPROACH ─── */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="Methodology"
            title="Our Approach"
            subtitle="Technology success isn't just about tools — it's about engineering discipline and strategic execution. Our multidisciplinary teams deliver measurable outcomes."
            align="center"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: (
                <svg className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Engineering Excellence',
              desc: 'Every solution is built with performance, scalability, and reliability at its core.',
              border: 'border-sky-500/30',
              bg: 'bg-sky-500/5',
            },
            {
              icon: (
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: 'AI-Driven Innovation',
              desc: 'We leverage advanced AI and data engineering to unlock new capabilities and insights.',
              border: 'border-indigo-500/30',
              bg: 'bg-indigo-500/5',
            },
            {
              icon: (
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Security by Design',
              desc: 'Cybersecurity is integrated into every layer of modern digital systems.',
              border: 'border-blue-500/30',
              bg: 'bg-blue-500/5',
            },
          ].map((col) => (
            <div
              key={col.title}
              className={`relative overflow-hidden rounded-2xl border ${col.border} ${col.bg} p-8 backdrop-blur-sm transition hover:bg-slate-900/60`}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/50 shadow-inner border border-slate-800">
                {col.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{col.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OUR VALUES ─── */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="What Drives Us"
            title="Our Values"
            subtitle="The principles that define how we engineer, collaborate, and deliver."
            align="center"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group h-full"
            >
              <div className={`relative h-full overflow-hidden rounded-[2.5rem] border border-slate-800/60 bg-slate-950/40 p-6 md:p-8 backdrop-blur-md transition-all duration-500 ${v.border} ${v.glow}`}>
                {/* Decorative glow */}
                <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${v.bg} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-end mb-4">
                    <div className={`h-1.5 w-1.5 rounded-full bg-${v.color}-400 animate-pulse`} />
                  </div>

                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/50 border border-slate-800 shadow-inner`}>
                    <v.icon className={`w-7 h-7 ${v.accentText}`} />
                  </div>

                  <h3 className="text-base font-bold tracking-tight text-slate-50 mb-1 group-hover:text-white transition-colors">
                    {v.title}
                  </h3>
                  <p className={`text-xs font-medium mb-4 ${v.accentText}`}>
                    {v.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── LEADERSHIP VISION ─── */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-4 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="Leadership"
            title="Leadership Vision"
            subtitle="The minds behind Giggs Software Labs."
            align="center"
          />
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {leadership.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[3rem] border border-slate-800/60 bg-slate-950/40 p-1 lg:p-1.5 transition-all hover:border-slate-700 hover:bg-slate-900/20 backdrop-blur-md"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Leader Image Section */}
                <div className={`relative w-full md:w-2/5 aspect-[4/5] md:aspect-auto overflow-hidden rounded-[2.5rem]`}>
                  <div className={`absolute inset-0 z-0 bg-gradient-to-br from-${leader.color}-500/10 to-transparent`} />
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-slate-900/50 hidden md:block" />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-4xl text-cyan-500/30 font-serif leading-none italic">&quot;</span>
                    <p className="text-base md:text-lg text-slate-200 leading-relaxed italic font-medium -mt-2">
                      {leader.vision}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-50 tracking-tight">{leader.name}</h3>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.2em] text-${leader.color}-400 mt-1`}>
                      {leader.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── INSIGHTS & THOUGHT LEADERSHIP ─── */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-4 md:px-6">
        {/* Rich content block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 rounded-[2.5rem] border border-slate-800/60 bg-slate-950/40 p-8 md:p-12 backdrop-blur-md"
        >
          <div className="flex flex-col justify-center">
            <Radio className="w-9 h-9 text-brand-highlight mb-4" />
            <h4 className="text-lg md:text-xl font-black text-slate-50 tracking-tight mb-4">
              Engineering Knowledge, <span className="text-brand-highlight italic">Open-Sourced</span>
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              At Giggs Software Labs, we believe the best engineering teams share what they learn. Our Insights Hub is where we publish technical deep-dives, architecture postmortems, and research findings from real-world enterprise projects.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Whether you&apos;re evaluating AI deployment strategies, building a zero-trust security layer, or optimizing cloud infrastructure costs — our publications are designed to give you the blueprints, not just the buzzwords.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {[
              { Icon: Brain, label: 'AI & Data Innovation', sub: 'Generative AI, MLOps, data pipelines, and predictive analytics' },
              { Icon: Shield, label: 'Cybersecurity Research', sub: 'Zero-trust architecture, threat intelligence, and SOC automation' },
              { Icon: Zap, label: 'Performance Engineering', sub: 'Load testing, APM, cloud cost optimization, and CI/CD patterns' },
              { Icon: Bot, label: 'Automation & DevOps', sub: 'RPA case studies, infrastructure-as-code, and workflow orchestration' },
            ].map((topic) => (
              <div key={topic.label} className="flex items-start gap-4 group">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/40">
                  <topic.Icon className="w-5 h-5 text-slate-400 group-hover:text-brand-highlight transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">{topic.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{topic.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Posts from Admin Dashboard */}
        {posts.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800/50 to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-highlight">Latest Publications</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800/50 to-transparent" />
            </div>

            {/* Featured post (latest) */}
            {posts[0] && (
              <Link href={`/blog/${posts[0].slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-[2rem] border border-slate-800/80 bg-slate-950/40 p-1 overflow-hidden hover:border-brand-highlight/40 transition-all cursor-pointer mb-12 backdrop-blur-md"
                >
                  <div className="relative aspect-[16/10] md:aspect-square overflow-hidden rounded-[1.8rem]">
                    <img
                      src={posts[0].image || '/images/Ai_Automation.png'}
                      alt={posts[0].title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-brand-highlight italic">FEATURED {posts[0].category}</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-10">
                    <span className="text-xs text-slate-500 mb-2 block">{posts[0].date_display}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-brand-highlight transition-colors leading-tight">
                      {posts[0].title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                      {posts[0].excerpt || 'Dive into our latest analysis.'}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-highlight">
                      Begin Reading <span className="text-lg">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Post grid (remaining posts) */}
            {posts.length > 1 && (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      className="group h-full flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden hover:border-brand-highlight/30 hover:bg-slate-900/40 transition-all cursor-pointer shadow-xl shadow-black/40"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={post.image || '/images/Cloud_DevOps.png'}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`text-[9px] font-bold px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 uppercase tracking-widest ${post.category === 'Case Study' ? 'text-amber-400' :
                            post.category === 'Whitepaper' ? 'text-emerald-400' :
                              post.category === 'Tech Report' ? 'text-violet-400' : 'text-[#00C2FF]'
                            }`}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="text-[10px] text-slate-500 mb-2">{post.date_display}</span>
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-highlight transition-colors line-clamp-2 mb-3">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-3 mb-6 flex-1">
                          {post.excerpt || 'Exploring the nuances of industrial-grade engineering.'}
                        </p>
                        <div className="text-[11px] font-bold text-slate-300 group-hover:text-white flex items-center gap-1">
                          VIEW RESOURCE <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ─── WHY ENTERPRISES CHOOSE GIGGS ─── */}
      <section className="mx-auto max-w-6xl px-4 pt-4 pb-14 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="Why Giggs"
            title="Why Enterprises Choose Giggs"
            subtitle="Organizations partner with Giggs Software Labs because we deliver more than technology. We deliver engineering outcomes."
            align="center"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] border border-slate-800/60 bg-slate-950/40 p-8 md:p-12 backdrop-blur-md"
        >
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-3xl">
            Our teams bring deep expertise across AI, cybersecurity, performance engineering, and automation — enabling enterprises to modernize faster and operate with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'AI Engineering Experts', desc: 'Deep technical expertise across AI, ML, and data engineering.' },
              { label: 'Global Delivery Model', desc: 'India, Saudi Arabia, Singapore, UAE, and USA.' },
              { label: 'Enterprise Scale Solutions', desc: 'Built for mission-critical, high-performance workloads.' },
              { label: 'Engineering-First Culture', desc: 'Precision, rigor, and innovation in every solution.' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="mx-auto max-w-6xl px-4 py-4 pb-8 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-950/40 p-12 text-center backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black text-slate-50 tracking-tighter mb-4">
              Build the Future with <span className="bg-gradient-to-r from-[#2ED6FF] via-[#1E7BFF] to-[#7A5CFF] bg-clip-text text-transparent">Giggs</span>
            </h2>
            <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto">
              Partner with our experts to design intelligent digital systems that power your next stage of growth.
            </p>
            <Button href="/contact" variant="primary">
              Talk to an Expert
            </Button>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}