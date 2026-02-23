// frontend/pages/index.js
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { BrainCircuit, ShieldCheck, Zap, Bot } from 'lucide-react';

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

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  underline = 'short',
}) => {
  const alignText = align === 'center' ? 'text-center' : 'text-left';
  const subtitleWidth = align === 'center' ? 'mx-auto' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      className={`${alignText} space-y-2`}
    >
      {eyebrow && (
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400/80">
          {eyebrow}
        </div>
      )}

      {title && (
        <h2 className="inline-block bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#0066FF] bg-clip-text text-2xl md:text-3xl font-extrabold tracking-tight text-transparent">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className={`text-sm text-slate-300 ${subtitleWidth} max-w-2xl`}>
          {subtitle}
        </p>
      )}

      {title && underline !== 'none' && (
        <>
          {underline === 'short' && (
            <div
              className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'
                }`}
            >
              <div className="mt-1 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#0066FF] blur-[0.5px]" />
            </div>
          )}

          {underline === 'full' && (
            <div className="mt-4 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#00E0FF]/50 to-transparent opacity-70 mx-auto" />
          )}
        </>
      )}
    </motion.div>
  );
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

  // HERO tab state
  const [activeHeroTab, setActiveHeroTab] = useState(heroTabs[0].id);
  const [heroDirection, setHeroDirection] = useState(1);

  // progress (underline) animation controller
  const progressControls = useAnimation();

  // 1) controls for first-fold (Industries) reveal
  const firstFoldControls = useAnimation();
  const firstFoldRef = useRef(null);
  const firstFoldInView = useInView(firstFoldRef, { amount: 0.22 });

  // 5-second auto-rotate, no hover pause
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroDirection(1);
      setActiveHeroTab((prevId) => {
        const currentIndex = heroTabs.findIndex((t) => t.id === prevId);
        const nextIndex = (currentIndex + 1) % heroTabs.length;
        return heroTabs[nextIndex].id;
      });
    }, 8000);

    return () => clearTimeout(timer);
  }, [activeHeroTab]);

  // derive active hero & index from the id
  const activeHero = heroTabs.find((t) => t.id === activeHeroTab);
  const activeHeroIndex = heroTabs.findIndex((t) => t.id === activeHeroTab);

  // Ensure progress underline animation runs after mount and on every tab change.
  useEffect(() => {
    progressControls.set({ scaleX: 0, transformOrigin: 'left' });
    const t = setTimeout(() => {
      progressControls.start({
        scaleX: 1,
        transition: { duration: 8, ease: 'linear' },
      });
    }, 30);
    return () => clearTimeout(t);
  }, [activeHeroTab, progressControls]);

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
        <div className="absolute inset-0 z-0">
          <video
            key={activeHero.video}
            src={activeHero.video}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
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
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-16 pb-10 lg:pt-20 lg:pb-12">
          <div className="max-w-3xl">


            {/* HERO TABS + UNDERLINE / PROGRESS BAR */}
            <div className="mb-6">
              <div className="max-w-4xl lg:mx-0 mx-auto">
                <div className="grid grid-cols-4 gap-4 text-xs sm:text-sm">
                  {heroTabs.map((tab) => {
                    const isActive = tab.id === activeHeroTab;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleHeroTabClick(tab.id)}
                        className={`pb-1 font-medium transition-colors text-left sm:text-center ${isActive
                          ? 'text-sky-300'
                          : 'text-slate-300/80 hover:text-white'
                          }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Underline rail with animated segment as progress */}
                <div className="mt-2 h-[2px] w-full rounded-full bg-slate-700/40 overflow-hidden">
                  <div className="grid grid-cols-4 h-full">
                    {heroTabs.map((tab, idx) => (
                      <div key={tab.id} className="relative">
                        {idx === activeHeroIndex && (
                          <motion.div
                            key={tab.id}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#4C8DFF] to-[#0072FF]"
                            initial={{ scaleX: 0 }}
                            animate={progressControls}
                            style={{ transformOrigin: 'left' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN HERO TEXT */}
            <motion.div
              key={activeHero.id}
              initial={{ opacity: 0, x: heroDirection > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                {activeHero.title}
              </h1>

              {/* subtitle made slightly larger for emphasis */}
              <p className="mt-2 text-base sm:text-lg text-sky-300">
                {activeHero.tagline}
              </p>
            </motion.div>

            {/* CTAs */}
            {/* CTAs - stacked layout */}
            <div className="mt-8 flex flex-col gap-4 text-xs sm:text-sm w-full max-w-xs">

              {/* BUTTON 1 — Pillar CTA */}
              <Link
                href={activeHero.buttonHref || '/services'}
                className="inline-flex items-center justify-center rounded-full
      bg-gradient-to-r from-[#00C2FF] to-[#0066FF]
      px-5 py-2.5 font-medium text-black
      shadow-[0_0_20px_rgba(56,189,248,0.6)]
      hover:brightness-110 transition w-full"
              >
                {activeHero.buttonText || 'Explore our 4 pillars'}
              </Link>

              {/* BUTTON 2 — Talk to us + Our Product (side by side) */}
              <div className="flex flex-row items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full
        bg-gradient-to-r from-[#00C2FF] to-[#0066FF]
        px-4 py-2 font-medium text-black
        shadow-[0_0_14px_rgba(56,189,248,0.5)]
        hover:brightness-110 transition"
                >
                  Talk to us
                </Link>

                {/* "Our Product" — only on Cybersecurity tab */}
                {activeHero.id === 'cyber' && (
                  <a
                    href="https://www.mihawk.tech/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full
        border border-violet-500/50 bg-violet-500/15
        px-4 py-2 font-medium text-violet-100
        hover:bg-violet-500/25 transition"
                  >
                    Our Product →
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* PARTNERS STRIP – static logos */}
        <div className="absolute bottom-0 left-0 right-0 z-30 w-full py-5">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-center gap-14 px-7">
            {[
              { src: '/logo/JioHotstar_transparent_large.png', alt: 'JioHotstar' },
              { src: '/logo/ITC_Infotech_transparent_large.png', alt: 'ITC' },
              { src: '/logo/kantarW.png', alt: 'Kantar' },
              { src: '/logo/accentureW.png', alt: 'Accenture' },
              { src: '/logo/jiostarW.png', alt: 'JioStar' },
            ].map((p) => (
              <img
                key={p.alt}
                src={p.src}
                alt={p.alt}
                className="h-7 md:h-9 flex-shrink-0 object-contain opacity-75 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </section>
      {/* =============== END HERO SECTION =============== */}

      {/* =============== EMPOWERING INTELLIGENCE =============== */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 md:px-6">
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
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="mb-12">
          <SectionTitle
            eyebrow="Our Expertise. Your Competitive Edge."
            title="The Four Pillars of Innovation"
            subtitle="Giggs Software Labs drives transformation through four core pillars that redefine how technology empowers business outcomes. From intelligent data ecosystems to AI-powered cybersecurity, we bring engineering precision and innovation to every solution."
            align="center"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              num: '01',
              title: 'AI and Data Science & Engineering',
              tagline: 'Transforming Data into Intelligence. Intelligence into Action.',
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
              num: '02',
              title: 'AI-driven Cybersecurity',
              tagline: 'Securing the Future Through Intelligence.',
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
              num: '03',
              title: 'Performance Engineering',
              tagline: 'Delivering Reliability, Speed, and Scalability.',
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
              num: '04',
              title: 'Automation',
              tagline: 'Automating the Enterprise for Speed, Efficiency, and Scale.',
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center justify-center h-8 w-8 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-bold ${pillar.accentText}`}>{pillar.num}</span>
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                  </div>

                  {/* Title + Tagline */}
                  <h3 className="text-xl font-bold tracking-tight text-slate-50 mb-1 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className={`text-sm font-medium mb-4 ${pillar.accentText}`}>
                    {pillar.tagline}
                  </p>

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


      {/* =============== INSIGHTS & THOUGHT LEADERSHIP =============== */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <SectionTitle
          eyebrow="Insights & Thought Leadership"
          title="Ideas that Inspire Digital Transformation."
          subtitle="Explore our blogs, whitepapers, and case studies to discover how enterprises are reimagining the future with AI, Data, and Automation."
          align="center"
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'AI & Data Innovation', icon: BrainCircuit, desc: 'Intelligent data ecosystems, generative AI, and predictive analytics insights.' },
            { title: 'Cybersecurity Trends', icon: ShieldCheck, desc: 'Zero-trust patterns, AI-driven threat detection, and compliance strategies.' },
            { title: 'Performance Engineering', icon: Zap, desc: 'Best practices for reliability, scalability, and cloud cost optimization.' },
            { title: 'Automation Playbooks', icon: Bot, desc: 'RPA, workflow orchestration, and hyperautomation reference architectures.' },
          ].map((topic) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 shadow-[0_0_30px_rgba(15,23,42,0.9)] transition-all duration-300 hover:border-sky-500/40"
            >
              <div className="mb-4 text-sky-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                <topic.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-slate-50 mb-2">{topic.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{topic.desc}</p>
              <Link
                href="/blog"
                className="mt-3 inline-flex items-center text-xs font-medium text-sky-400 hover:text-sky-300"
              >
                Read more →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>



      {/* HOW WE WORK */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="mb-8">
          <SectionTitle
            eyebrow="Process"
            title="How we work"
            subtitle="A simple, transparent process — from first call to production rollout."
            align="center"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {[
            {
              step: '01',
              title: 'Discovery',
              desc: 'We understand your product, constraints, and success metrics in detail.',
            },
            {
              step: '02',
              title: 'Architecture',
              desc: 'We design the system, choose the stack, and map out milestones.',
            },
            {
              step: '03',
              title: 'Build & iterate',
              desc: 'We ship in short cycles with regular demos and clear communication.',
            },
            {
              step: '04',
              title: 'Deploy & support',
              desc: 'We help roll out, monitor, and stabilize the system in production.',
            },
          ].map((p) => (
            <div
              key={p.step}
              className="relative rounded-3xl border border-slate-800 bg-slate-950/80 p-5"
            >
              <div className="text-[11px] font-mono text-sky-400">{p.step}</div>
              <h3 className="mt-2 text-sm font-semibold text-slate-50">
                {p.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="mb-8">
          <SectionTitle
            eyebrow="Signal from the field"
            title="What our clients say"
            subtitle="Early feedback from founders and engineering leaders we’ve partnered with."
            align="center"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                'They treated our product like their own. We went from prototype to a stable v1 in under two months.',
              name: 'Product Lead',
              role: 'Fintech startup',
            },
            {
              quote:
                'The team understood our data and reliability requirements immediately. Our pipelines are finally observable and predictable.',
              name: 'Head of Data',
              role: 'Analytics company',
            },
            {
              quote:
                'Clean communication, strong technical decisions, and no surprises during rollout. Exactly what we needed.',
              name: 'CTO',
              role: 'SaaS platform',
            },
          ].map((t, i) => (
            <div
              key={i}
              className="group relative rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-[0_0_25px_rgba(15,23,42,0.9)] transition-colors duration-300 hover:border-[#00E0FF]/60"
            >
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition" />

              <p className="text-sm text-slate-200 italic">“{t.quote}”</p>
              <div className="mt-4 text-xs text-slate-400">
                <div className="font-semibold text-slate-100">{t.name}</div>
                <div>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANY METRICS + MAP — High Impact Redesign */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="relative overflow-hidden rounded-[3rem] border border-slate-800/60 bg-slate-950/40 p-1 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(56,189,248,0.08),_transparent_70%)]" />

          <div className="relative z-10 p-6 md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
              <SectionTitle
                eyebrow="Proven performance"
                title="By the numbers"
                subtitle="Quantifiable signals of our engineering standards and global delivery capabilities."
                align="left"
              />

              <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live Systems
                </span>
                <span className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2">
                  <span className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
                  Global Reach
                </span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              {/* Map Card */}
              <div className="relative group overflow-hidden rounded-[2.5rem] border border-slate-800/50 bg-slate-900/20 p-6 transition-all duration-500 hover:border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Collaborative Reach</div>
                    <h3 className="text-xl font-bold text-slate-50">Global offerings</h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-md">
                      HQ in Noida, India with active collaborations across Europe, USA, and Saudi Arabia.
                    </p>
                  </div>

                  <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl bg-slate-950/50 border border-slate-800/40">
                    <img
                      src="/regions-map.png"
                      alt="World map"
                      className="h-full w-full object-cover opacity-80"
                      style={{ filter: 'brightness(1.1) grayscale(0.2)' }}
                    />

                    {/* Pulsing Location Markers */}
                    {[
                      { l: '12%', t: '22%', n: 'USA', c: 'cyan' },
                      { l: '52%', t: '12%', n: 'Europe', c: 'sky' },
                      { l: '82%', t: '40%', n: 'India', c: 'indigo' },
                      { l: '70%', t: '44%', n: 'Saudi Arabia', c: 'sky' },
                    ].map((loc) => (
                      <div key={loc.n} className="absolute" style={{ left: loc.l, top: loc.t }}>
                        <div className={`h-8 w-8 rounded-full bg-${loc.c}-500/20 blur-md animate-pulse`} />
                        <div className={`absolute inset-0 m-auto h-2 w-2 rounded-full bg-${loc.c}-400 shadow-[0_0_12px_#38bdf8]`} />
                        <div className="mt-2 -translate-x-1/2 rounded-md bg-slate-950/90 border border-slate-800 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
                          {loc.n}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {['India HQ', 'Saudi Arabia', 'UK/US Overlap', 'Remote-First'].map(tag => (
                      <span key={tag} className="text-[10px] font-medium text-slate-500 border border-slate-800/50 rounded-lg px-3 py-1 bg-slate-950/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { label: 'Scale', val: '10', suffix: '+', sub: 'Global Deployments', icon: '🌐', color: 'cyan' },
                  { label: 'Reliability', val: '99.9', suffix: '%', decimals: 1, sub: 'Target Uptime', icon: '⚡', color: 'emerald' },
                  { label: 'Security', val: '0', sub: 'Critical Breaches', icon: '🛡️', color: 'violet' },
                  { label: 'Velocity', val: 'Weekly', sub: 'Release Cycles', icon: '🚀', color: 'amber' },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-slate-900/10 p-5 transition-all hover:border-slate-700 hover:bg-slate-900/30"
                  >
                    {/* Abstract Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700"
                      style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{kpi.label}</div>
                        <div className={`text-4xl font-black text-slate-50 tracking-tighter group-hover:text-${kpi.color}-400 transition-colors`}>
                          {isNaN(parseFloat(kpi.val)) ? (
                            kpi.val
                          ) : (
                            <StatCounter value={kpi.val} suffix={kpi.suffix} decimals={kpi.decimals || 0} />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 font-medium">{kpi.sub}</div>
                      </div>
                      <div className="relative">
                        <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 ${kpi.color === 'cyan' ? 'bg-cyan-500' : kpi.color === 'emerald' ? 'bg-emerald-500' : kpi.color === 'violet' ? 'bg-violet-500' : 'bg-amber-500'} transition-opacity duration-500`} />
                        <span className="relative text-3xl grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 inline-block">
                          {kpi.icon}
                        </span>
                      </div>
                    </div>
                    {/* Animated performance bar */}
                    <div className="mt-5 h-1 w-full bg-slate-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r from-transparent via-${kpi.color}-500/40 to-${kpi.color}-500/80`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* OUR PARTNERS - Moved to bottom and shrunk */}
      <section className="mx-auto max-w-5xl px-4 pb-20 md:px-6">
        <div className="mb-10">
          <SectionTitle
            eyebrow="Collaborations"
            title="Our partners"
            subtitle="Teams we've collaborated with across engineering, analytics, and platform development."
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
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#00E0FF]/40 bg-slate-950/90 p-6 md:p-8 shadow-[0_0_40px_rgba(56,189,248,0.4)]">
          <div className="pointer-events-none absolute inset-y-0 right-[-20%] w-1/2 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.35),_transparent_60%)] blur-3xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
                Ready to build your next platform?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Tell us what you’re working on, and we’ll map out a lean,
                production-first approach — usually within 24–48 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] px-5 py-2.5 text-sm font-medium text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:brightness-110 transition"
              >
                Start a project
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/60 px-5 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition"
              >
                View case studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
