// frontend/pages/index.js
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, ShieldCheck, Zap, Bot } from 'lucide-react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
    },
  },
};

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

        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentVal = start + (end - start) * easeProgress;
        setDisplayValue(currentVal.toFixed(decimals));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, decimals]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};


// HERO TABS DATA – each with its own MP4 video
// NOTE: I've added `buttonText` and `buttonHref` to each tab
const heroTabs = [
  {
    id: 'ai-data',
    label: 'AI & Data Engineering',
    title: 'AI and Data Science & Engineering',
    tagline: 'Transforming Data into Intelligence. Intelligence into Action.',
    // larger subtitle will be rendered as classes below
    video: '/hero/ai.mp4',
    buttonText: 'Explore our AI & Data Capabilities',
    buttonHref: '/services#ai-data',
  },
  {
    id: 'cyber',
    label: 'AI-driven Cybersecurity',
    title: 'AI-driven Cybersecurity',
    tagline: 'Securing the Future Through Intelligence.',
    video: '/hero/cyber.mp4',
    buttonText: 'Get resilient defenses with AI',
    buttonHref: '/services#cyber',
  },
  {
    id: 'performance',
    label: 'Performance Engineering',
    title: 'Performance Engineering',
    tagline: 'Delivering Reliability, Speed, and Scalability.',
    video: '/hero/performance.mp4',
    buttonText: 'Explore Performance Capabilities',
    buttonHref: '/services#performance',
  },
  {
    id: 'automation',
    label: 'Automation Engineering',
    title: 'Automation',
    tagline: 'Automating the Enterprise for Speed, Efficiency, and Scale.',
    video: '/hero/automation.mp4',
    buttonText: 'Automate with intelligent systems',
    buttonHref: '/services#automation',
  },
];


export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeHeroTab, setActiveHeroTab] = useState(heroTabs[0].id);
  const [heroDirection, setHeroDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);
  const heroTimerRef = useRef(null);

  // Auto-cycle hero tabs every 6 seconds
  const startHeroTimer = () => {
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    setProgressKey((k) => k + 1);
    heroTimerRef.current = setInterval(() => {
      setActiveHeroTab((prev) => {
        const currentIndex = heroTabs.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % heroTabs.length;
        setHeroDirection(1);
        return heroTabs[nextIndex].id;
      });
      setProgressKey((k) => k + 1);
    }, 6000);
  };

  useEffect(() => {
    startHeroTimer();
    return () => clearInterval(heroTimerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 1) controls for first-fold (Industries) reveal
  const firstFoldControls = useAnimation();
  const firstFoldRef = useRef(null);
  const firstFoldInView = useInView(firstFoldRef, { amount: 0.22 });

  // FIRST-FOLD reveal control:
  useEffect(() => {
    if (firstFoldInView) {
      firstFoldControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.62, ease: 'easeOut' },
      });
      return;
    }

    if (typeof window !== 'undefined' && window.scrollY < 32) {
      const t = setTimeout(() => {
        firstFoldControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.62, ease: 'easeOut' },
        });
      }, 90);
      return () => clearTimeout(t);
    }

    firstFoldControls.set({ opacity: 0, y: 18 });
  }, [firstFoldInView, firstFoldControls]);

  const handleHeroTabClick = (id) => {
    if (id === activeHeroTab) return;
    const currentIndex = heroTabs.findIndex((t) => t.id === activeHeroTab);
    const nextIndex = heroTabs.findIndex((t) => t.id === id);
    setHeroDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveHeroTab(id);
    setProgressKey((k) => k + 1);
    startHeroTimer(); // reset auto-cycle on manual click
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      {/* GLOBAL BACKGROUND VIDEO (for sections other than hero) */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: -40 }}
      >
        <video
          key={activeVideo}
          src={activeVideo}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-70"
        />
      </div>

      {/* VIBRANT GRADIENT OVERLAY */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -30,
          background: 'linear-gradient(135deg, rgba(2,6,23,0.65) 0%, rgba(0,30,60,0.55) 30%, rgba(15,10,50,0.60) 60%, rgba(2,6,23,0.65) 100%)',
        }}
      />

      {/* SUBTLE COLOR ACCENT WASH */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -20,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,224,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(122,91,255,0.06) 0%, transparent 50%)',
        }}
      />

      {/* =============== HERO SECTION – VIDEO BACKGROUND PER TAB =============== */}
      <section className="relative w-full overflow-hidden text-white min-h-[75vh]">
        {/* Background video for current tab */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          {heroTabs.map((tab) => (
            <video
              key={tab.id}
              src={tab.video}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeHeroTab === tab.id ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))}
        </div>

        {/* Left-heavy dark overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Soft glows */}
        <div className="pointer-events-none absolute right-[-10%] top-[-25%] z-10 h-56 w-56 rounded-full bg-cyan-400/35 blur-3xl" />
        <div className="pointer-events-none absolute left-[-8%] bottom-[-20%] z-10 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />

        {/* Content – sits above everything */}
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-8 lg:pt-12 pb-10 lg:pb-12">
          <div className="max-w-3xl">

            {/* COMPANY NAME BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-1.5 text-xs sm:text-[13px] font-black uppercase tracking-[0.25em] text-sky-300 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Giggs Software Labs
            </motion.div>

            {/* HERO TABS */}
            <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
              {heroTabs.map((tab) => {
                const isActive = activeHeroTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleHeroTabClick(tab.id)}
                    className={`relative whitespace-nowrap px-3 pt-1.5 pb-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 border overflow-hidden ${isActive
                      ? 'bg-sky-500/20 border-sky-400/60 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-500/60'
                      }`}
                  >
                    {tab.label}
                    {/* Progress bar */}
                    {isActive && (
                      <span
                        key={progressKey}
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                        style={{
                          animation: 'hero-tab-progress 6s linear forwards',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Progress bar keyframes */}
            <style jsx>{`
              @keyframes hero-tab-progress {
                from { width: 0%; }
                to { width: 100%; }
              }
            `}</style>

            {/* ANIMATED TAB CONTENT */}
            <div className="h-[400px] sm:h-[380px] lg:h-[340px]">
              {heroTabs.map((tab) => (
                activeHeroTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: heroDirection * 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: heroDirection * -30 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="mt-2"
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white futuristic">
                      {tab.title}
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
                      {tab.tagline}
                    </p>
                    <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                      At Giggs Software Labs, we combine the power of AI, Automation, Cybersecurity, and
                      Performance Engineering to help enterprises innovate faster, operate smarter, and scale
                      securely in the digital era.
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 w-full">
                      <Button
                        href={tab.buttonHref}
                        variant="primary"
                        className="w-full sm:w-auto"
                      >
                        {tab.buttonText}
                      </Button>
                      <Button
                        href="/contact"
                        variant="secondary"
                        className="w-full sm:w-auto"
                      >
                        Talk to an Expert
                      </Button>
                    </div>
                  </motion.div>
                )
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =============== END HERO SECTION =============== */}

      {/* =============== CLIENT TRUST BAR =============== */}
      <section className="relative w-full border-b border-slate-800 bg-slate-900/50 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by global organizations across
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-bold text-slate-300 md:text-base">
            <span>India</span>
            <span className="text-sky-500">•</span>
            <span>Saudi Arabia</span>
            <span className="text-sky-500">•</span>
            <span>Singapore</span>
            <span className="text-sky-500">•</span>
            <span>UAE</span>
            <span className="text-sky-500">•</span>
            <span>USA</span>
          </div>

          {/* Optional Client Logos */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { src: '/logo/kantarW.png', alt: 'Kantar' },
              { src: '/logo/accentureW.png', alt: 'Accenture' },
              { src: '/logo/jioW.png', alt: 'Jio' },
              { src: '/logo/ITC_Infotech_transparent_large.png', alt: 'ITC' },
            ].map((p) => (
              <img key={p.alt} src={p.src} alt={p.alt} className="h-6 md:h-8 w-auto object-contain hover:opacity-100 transition-opacity" />
            ))}
          </div>
        </div>
      </section>
      {/* =============== END CLIENT TRUST BAR =============== */}

      {/* =============== EMPOWERING INTELLIGENCE =============== */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 md:px-6">
        <SectionTitle
          eyebrow="Empowering Intelligence"
          title="Empowering Every Industry with Intelligence."
          align="center"
        />

        <div className="max-w-4xl mx-auto mt-4 text-center">
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            At Giggs Software Labs, we combine the power of{' '}
            <span className="text-sky-300 font-semibold">AI</span>,{' '}
            <span className="text-sky-400 font-semibold">Automation</span>,{' '}
            <span className="text-blue-400 font-semibold">Cybersecurity</span>, and{' '}
            <span className="text-blue-300 font-semibold">Performance Engineering</span>{' '}
            to help enterprises innovate faster, operate smarter, and scale securely in the digital era.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] px-6 py-2.5 font-medium text-black shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:brightness-110 transition"
            >
              Explore Our Solutions
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-sky-500/40 bg-slate-950/60 px-6 py-2.5 font-medium text-slate-100 hover:border-sky-400 hover:bg-slate-900/80 transition"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>



      {/* =============== FOUR PILLARS OF INNOVATION =============== */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 md:px-6">
        <div className="mb-8">
          <SectionTitle
            eyebrow="Our Expertise. Your Competitive Edge."
            title="The Four Pillars of Innovation"
            subtitle="Giggs Software Labs drives transformation through four core pillars that redefine how technology empowers business outcomes. From intelligent data ecosystems to AI-powered cybersecurity, we bring engineering precision and innovation to every solution."
            align="center"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {[
            {
              title: 'AI and Data Science & Engineering',
              tagline: 'Transforming Data into Intelligence. Intelligence into Action.',
              video: '/hero/ai.mp4',
              description: 'Our AI and Data Engineering solutions help organizations unlock the full value of their data. We build scalable, intelligent platforms that empower faster decision-making, predictive insights, and end-to-end automation.',
              capabilities: ['Generative AI & ML Models', 'Data Engineering', 'MLOps', 'Advanced Analytics', 'AI Strategy'],
              outcomes: 'Accelerated data-to-insight conversion, predictive decision systems, enterprise-grade scalability.',
              border: 'hover:border-sky-500/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]',
              bg: 'from-sky-500/10 to-transparent',
              accentText: 'text-sky-400',
              tag: 'border-sky-500/30 bg-sky-500/5 text-sky-200',
              href: '/services/ai-data',
            },
            {
              title: 'AI-driven Cybersecurity',
              tagline: 'Securing the Future Through Intelligence.',
              video: '/hero/cyber.mp4',
              description: 'With cyber threats growing more sophisticated, Giggs Software Labs integrates AI into every layer of security. Our intelligent cybersecurity framework enables proactive threat detection, automated response, and continuous compliance.',
              capabilities: ['AI Threat Detection', 'Predictive Defense', 'SOC Automation', 'Cloud Security', 'Zero Trust Architecture'],
              outcomes: 'Real-time visibility, faster breach detection, reduced false positives.',
              border: 'hover:border-blue-500/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
              bg: 'from-blue-500/10 to-transparent',
              accentText: 'text-blue-400',
              tag: 'border-blue-500/30 bg-blue-500/5 text-blue-200',
              href: '/services/cybersecurity',
            },
            {
              title: 'Performance Engineering',
              tagline: 'Delivering Reliability, Speed, and Scalability.',
              video: '/hero/performance.mp4',
              description: 'We engineer systems that perform flawlessly under pressure. Our Performance Engineering practice optimizes applications, infrastructure, and cloud environments to ensure consistent, cost-effective, and scalable performance.',
              capabilities: ['App & Infra Optimization', 'APM', 'Load Testing', 'Cloud Cost Optimization', 'CI/CD Automation'],
              outcomes: 'Sub-second response times, improved efficiency, lower cloud costs.',
              border: 'hover:border-sky-400/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.12)]',
              bg: 'from-sky-400/10 to-transparent',
              accentText: 'text-sky-300',
              tag: 'border-sky-400/30 bg-sky-400/5 text-sky-200',
              href: '/services/performance',
            },
            {

              title: 'Automation',
              tagline: 'Automating the Enterprise for Speed, Efficiency, and Scale.',
              video: '/hero/automation.mp4',
              description: 'Our Automation solutions eliminate inefficiencies across business and IT operations. From process digitization to DevOps and infrastructure automation, we enable a faster, error-free, and adaptive enterprise.',
              capabilities: ['RPA', 'Test Automation', 'IaC', 'Workflow Orchestration', 'Hyperautomation'],
              outcomes: 'Reduced manual effort, faster go-to-market, unified governance.',
              border: 'hover:border-blue-400/50',
              glow: 'group-hover:shadow-[0_0_40px_rgba(96,165,250,0.12)]',
              bg: 'from-blue-400/10 to-transparent',
              accentText: 'text-blue-300',
              tag: 'border-blue-400/30 bg-blue-400/5 text-blue-200',
              href: '/services/automation',
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
                  {/* Header */}
                  <div className="flex items-center justify-end mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                  </div>

                  {/* Title + Tagline */}
                  <h3 className="text-xl font-bold tracking-tight text-slate-50 mb-1 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className={`text-sm font-medium mb-4 ${pillar.accentText}`}>
                    {pillar.tagline}
                  </p>

                  {/* Visual — looping video */}
                  {pillar.video && (
                    <div className="relative mb-5 overflow-hidden rounded-2xl aspect-video">
                      <video
                        src={pillar.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Key Capabilities */}
                  <div className="mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Key Capabilities</div>
                    <div className="flex flex-wrap gap-2">
                      {pillar.capabilities.map((cap) => (
                        <span key={cap} className={`rounded-full border px-3 py-1 text-[10px] font-medium transition-colors ${pillar.tag}`}>
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mt-auto pt-4 border-t border-slate-800/40">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Outcomes</div>
                    <p className="text-xs text-slate-300">{pillar.outcomes}</p>
                  </div>

                  {/* Learn more link */}
                  <Link
                    href={pillar.href}
                    className={`mt-4 inline-flex items-center gap-1 text-xs font-bold ${pillar.accentText} hover:brightness-125 transition`}
                  >
                    Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ENTERPRISE TRANSFORMATION SECTION */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 md:px-6">
        <div className="mb-10 grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Engineering Digital <br className="hidden lg:block" /> Transformation at Scale
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Giggs Software Labs combines engineering precision with AI-powered innovation to help enterprises transform faster, operate smarter, and scale securely.
            </p>
          </div>
          {/* Optional illustration/visual side mentioned in blueprint */}
          <div className="hidden lg:flex justify-end pr-8">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border border-sky-500/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-indigo-500/30 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 blur-md" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            {
              title: 'Speed',
              desc: 'Accelerate digital product delivery',
              icon: (
                <svg className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              border: 'border-sky-500/30',
              bg: 'bg-sky-500/5',
            },
            {
              title: 'Intelligence',
              desc: 'Leverage AI and advanced analytics',
              icon: (
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              border: 'border-indigo-500/30',
              bg: 'bg-indigo-500/5',
            },
            {
              title: 'Security',
              desc: 'Build resilient and secure digital ecosystems',
              icon: (
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
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
              <h3 className="mb-3 text-xl font-bold text-white">{col.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <SectionTitle
            eyebrow="Domains"
            title="Industries We Serve"
            subtitle="Deep domain expertise paired with intelligent engineering."
            align="center"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Fintech',
              icon: (
                <svg className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              solve: 'Intelligent risk modeling, AI compliance, and fraud analytics.',
            },
            {
              name: 'Health Tech',
              icon: (
                <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              solve: 'Predictive diagnostics, data interoperability, and patient intelligence.',
            },
            {
              name: 'Retail Tech',
              icon: (
                <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              ),
              solve: 'Customer analytics, recommendation engines, and demand forecasting.',
            },
          ].map((industry) => (
            <div
              key={industry.name}
              className="group relative rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)] hover:border-sky-500/30"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/50 border border-slate-800 shadow-inner">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{industry.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {industry.solve}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionTitle
            eyebrow="Proof of Work"
            title="Real Impact. Real Results."
            subtitle="How we engineer transformative outcomes for global enterprises."
            align="left"
          />
          <Button href="/insights#case-studies" variant="secondary" className="shrink-0 max-w-max">
            View All Case Studies
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            {
              category: 'Retail AI Platform',
              metric: 'Reduced forecasting errors by 35%',
              desc: 'Built an intelligent demand forecasting engine processing billions of data points in real time.',
              color: 'sky',
            },
            {
              category: 'Cybersecurity Automation',
              metric: 'Detected threats 5x faster',
              desc: 'Deployed a predictive defense system and automated SOC triaging using advanced behavioral analytics.',
              color: 'indigo',
            },
            {
              category: 'Performance Optimization',
              metric: 'Improved system speed by 40%',
              desc: 'Engineered a highly available cloud-native architecture capable of handling extreme peak traffic.',
              color: 'blue',
            },
          ].map((study) => (
            <div key={study.category} className="group relative rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)] hover:border-sky-500/30">
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                {study.category}
              </div>
              <div className={`mb-4 text-2xl md:text-3xl font-black text-${study.color}-400 leading-tight`}>
                {study.metric}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                {study.desc}
              </p>
              <div className="mt-auto flex items-center text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                Read the case study <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
        <div className="relative overflow-hidden rounded-[3rem] border border-slate-800/60 bg-slate-950/40 p-1 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(56,189,248,0.08),_transparent_70%)]" />

          <div className="relative z-10 p-6 md:p-10">
            <div className="mb-8 md:mb-12">
              <SectionTitle
                eyebrow="Reach"
                title="Global Engineering Presence"
                subtitle="Collaborating with organizations across the world."
                align="center"
              />
            </div>

            {/* Map Card */}
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-slate-800/50 bg-slate-900/20 p-2 md:p-6 transition-all duration-500 hover:border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="relative h-64 md:h-[28rem] w-full overflow-hidden rounded-3xl bg-slate-950/50 border border-slate-800/40">
                  <img
                    src="/regions-map.png"
                    alt="World map"
                    className="h-full w-full object-cover opacity-80"
                    style={{ filter: 'brightness(1.1) grayscale(0.2)' }}
                  />

                  {/* Pulsing Location Markers */}
                  {[
                    { l: '12%', t: '22%', n: 'USA', c: 'cyan' },
                    { l: '70%', t: '44%', n: 'Saudi Arabia', c: 'sky' },
                    { l: '84%', t: '42%', n: 'India', c: 'indigo' },
                    { l: '74%', t: '46%', n: 'UAE', c: 'blue' },
                    { l: '92%', t: '55%', n: 'Singapore', c: 'sky' },
                  ].map((loc) => (
                    <div key={loc.n} className="absolute" style={{ left: loc.l, top: loc.t }}>
                      <div className={`h-6 w-6 md:h-8 md:w-8 rounded-full bg-${loc.c}-500/20 blur-md animate-pulse`} />
                      <div className={`absolute inset-0 m-auto h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-${loc.c}-400 shadow-[0_0_12px_#38bdf8]`} />
                      <div className="mt-1 md:mt-2 -translate-x-1/2 rounded-md bg-slate-950/90 border border-slate-800 px-1.5 md:px-2 py-0.5 text-[8px] md:text-[9px] font-bold text-white backdrop-blur-sm whitespace-nowrap">
                        {loc.n}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* INSIGHTS & THOUGHT LEADERSHIP */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full">
          <SectionTitle
            eyebrow="Thought Leadership"
            title="Insights from Giggs Experts"
            subtitle="Explore our blogs, whitepapers, and case studies to discover how enterprises are reimagining the future with AI, Data, and Automation."
            align="left"
          />
          <Button href="/insights" variant="secondary" className="shrink-0 max-w-max">
            Explore Insights
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            {
              type: 'Blog',
              title: 'The Rise of AI-Driven Cybersecurity',
              desc: 'How predictive behavioral analytics are replacing signature-based detection models in modern enterprise SOCs.',
              date: 'Mar 12, 2024',
              color: 'sky',
            },
            {
              type: 'Whitepaper',
              title: 'Building Intelligent Data Platforms',
              desc: 'A comprehensive guide to transitioning from legacy data warehouses to scalable, real-time AI data lakes.',
              date: 'Feb 28, 2024',
              color: 'indigo',
            },
            {
              type: 'Article',
              title: 'Performance Engineering in Cloud Native Systems',
              desc: 'Techniques for ensuring sub-second response times and extreme scalability in distributed microservices architectures.',
              date: 'Feb 15, 2024',
              color: 'blue',
            },
          ].map((insight) => (
            <Link key={insight.title} href="/insights" className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all hover:-translate-y-2 hover:bg-slate-900 hover:border-sky-500/30 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.15)]">
              <div>
                <div className={`mb-4 inline-flex items-center rounded-full border border-${insight.color}-500/30 bg-${insight.color}-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-${insight.color}-300`}>
                  {insight.type}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                  {insight.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {insight.desc}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mt-6 pt-6 border-t border-slate-800/50">
                <span>{insight.date}</span>
                <span className="text-sky-400 group-hover:translate-x-1 transition-transform">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* OUR PARTNERS - Moved to bottom and shrunk */}
      <section className="mx-auto max-w-5xl px-4 pb-14 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="Trust"
            title="Trusted by global organizations"
            subtitle=""
            align="center"
          />
        </div>

        <div className="relative">
          <div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {[{ name: 'Kantar', src: '/logo/kantarW.png' },
            { name: 'JioHotstar', src: '/logo/jioW.png' },
            { name: 'Xebia', src: '/logo/xebiaW.png' },
            { name: 'Accenture', src: '/logo/accentureW.png' },
            { name: 'ITCinfotech', src: '/logo/ITC_Infotech_transparent_large.png' },
            { name: 'HappiestMinds', src: '/logo/happiestW.png' },
            { name: 'JioStar', src: '/logo/JioStarW.png' },
            { name: 'Gspann', src: '/logo/GspannW.png' },
            { name: 'Infogain', src: '/logo/infogainW.png' },
            { name: 'Successive Digital', src: '/logo/Succesive_digitalW.png' },
            { name: 'Saksoft', src: '/logo/SaksoftW.png' },
            { name: 'Impetus', src: '/logo/ImpetusW.png' },
            ].map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center py-2"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-6 md:h-7 w-auto flex-shrink-0 object-contain opacity-40 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-500/30 bg-slate-900 p-8 md:p-14 shadow-[0_0_50px_rgba(56,189,248,0.15)] text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_60%)] blur-2xl" />

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Start Your Digital Transformation Journey
            </h2>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-10">
              Speak with Giggs experts to explore how AI, automation and intelligent engineering can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button href="/contact" variant="primary" className="w-full sm:w-auto px-8 py-4 text-base">
                Schedule Consultation
              </Button>
              <Button href="/contact" variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
