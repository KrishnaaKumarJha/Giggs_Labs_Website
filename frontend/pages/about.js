// frontend/pages/about.js
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Shield, Zap, Bot, Lightbulb, Settings, Target, Handshake, Radio, Linkedin } from 'lucide-react';
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
    role: 'CEO & President',
    vision: 'Visionary technology leader with 20+ years of experience driving AI-led innovation, global expansion, and scalable business growth.',
    image: '/images/Ramesh_C.png',
    position: 'object-center',
    color: 'cyan',
    linkedin: 'https://linkedin.com/in/rameshchowdhary'
  },
  {
    name: 'Vijay Gangwar',
    role: 'Vice President',
    vision: 'Business and technology leader with 25+ years of experience driving strategic partnerships, digital transformation, and scalable enterprise growth.',
    image: '/images/vijay.jpeg',
    position: 'object-center',
    containerClass: 'p-4 bg-slate-900/40',
    imageClass: 'rounded-2xl opacity-90 group-hover:opacity-100 group-hover:scale-105',
    color: 'blue',
    linkedin: 'https://linkedin.com/in/vijay-gangwar-456a688'
  },
  {
    name: 'Parmod Kumar Aggarwal',
    role: 'Chief Delivery Officer',
    vision: 'Delivery leader specializing in global execution, scalable technology solutions, and operational excellence across enterprise environments.',
    image: '/images/pk.jpg',
    color: 'violet',
    linkedin: 'https://linkedin.com/in/parmod-aggarwal-2a1232'
  },
  {
    name: 'Nitish Kumar',
    role: 'Talent Acquisition Manager',
    vision: 'Talent leader with 13+ years of experience driving strategic hiring and building high-performing teams across AI/ML, Data Engineering, and global markets.',
    image: '/images/NK_R.png',
    color: 'indigo',
    linkedin: 'https://linkedin.com/in/nitishkumar-materailplus'
  }
];

/**
 * leadership IMAGE EDITING GUIDE:
 * 1. Place new images in: /public/images/
 * 2. Recommended Format: .jpg, .png, or .webp
 * 3. Ideal Dimensions: Portrait aspect ratio (e.g., 800px width x 1000px height)
 * 4. Update the 'image' path in the array above.
 */

/* ── page ── */
export default function About() {
  return (
    <PageShell
      eyebrow="Our Story"
      title="Engineering the Intelligent Enterprise"
      description="Giggs Software Labs is an AI-driven engineering company helping organizations build intelligent, secure, and high-performance digital systems."
      videoSrc="/hero/automation.mp4"
      videoOpacity={0.6}
      align="center"
    >
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="pt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
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
      </div>

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
            title="Leadership Vision"
            subtitle="The minds behind Giggs Software Labs."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {leadership.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-slate-950/40 p-1 transition-all hover:border-[#00E0FF]/30 hover:bg-slate-900/20 backdrop-blur-md"
            >
              <div className="flex flex-col">
                {/* Leader Image — custom focus and sizing */}
                <div className={`relative w-full aspect-[3/2] overflow-hidden rounded-t-[1.8rem] ${leader.containerClass || ''}`}>
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className={`object-cover ${leader.position || 'object-top'} ${leader.imageClass || 'opacity-90 group-hover:opacity-100 group-hover:scale-105'} transition-all duration-700`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* LinkedIn Link Overlay */}
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 z-20 w-9 h-9 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all hover:scale-110 active:scale-95"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div>

                {/* Content Section — compact */}
                <div className="p-5">
                  <p className="text-xs text-slate-400 leading-relaxed italic mb-4">
                    &ldquo;{leader.vision}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-white/5">
                    <h3 className="text-base font-black text-slate-50 tracking-tight">{leader.name}</h3>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E0FF] mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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