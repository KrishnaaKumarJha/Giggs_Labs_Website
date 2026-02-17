// frontend/pages/index.js
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

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
        <h2 className="inline-block bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#7A5BFF] bg-clip-text text-2xl md:text-3xl font-extrabold tracking-tight text-transparent">
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
              <div className="mt-1 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#7A5BFF] blur-[0.5px]" />
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

const showcases = [
  {
    title: 'Mihawk — Our Product',
    description:
      'Our flagship enterprise-grade cybersecurity platform that combines AI-driven threat detection, automated incident response, and continuous compliance monitoring — protecting digital assets 24/7.',
    category: 'Our product',
    stack: ['SIEM', 'SOAR', 'AI/ML', 'Threat Intelligence', 'Compliance'],
    image: '/images/Realtime_Operations_Platform.png',
    linkText: 'Visit Mihawk',
    linkHref: 'https://www.mihawk.tech/',
    external: true,
    accent: 'violet',
  },
  {
    title: 'AI & Data Engineering',
    description:
      'End-to-end data platforms and AI solutions — from ingestion and ETL pipelines to fine-tuned LLMs, RAG systems, and real-time predictive analytics.',
    category: 'AI / Data',
    stack: ['Generative AI', 'MLOps', 'Data Pipelines', 'Python', 'Spark'],
    image: '/images/Analytics_BI_Engine.png',
    linkText: 'Explore AI & Data',
    linkHref: '/services/ai-data',
    external: false,
    accent: 'cyan',
  },
  {
    title: 'Performance Engineering',
    description:
      'We tune applications, infrastructure, and cloud workloads to ensure they perform under real-world pressure with maximum reliability and cost-efficiency.',
    category: 'Performance',
    stack: ['Observability', 'Load Testing', 'Cost Optimization', 'Kubernetes', 'Cloud'],
    image: '/images/Multi_tenant_SaaS_Platform.png',
    linkText: 'Explore Performance',
    linkHref: '/services/performance',
    external: false,
    accent: 'amber',
  },
  {
    title: 'Automation & Product Engineering',
    description:
      'Building adaptive, self-healing execution layers and high-quality digital products — from business workflows to rapid MVP development.',
    category: 'Automation / Product',
    stack: ['RPA', 'Next.js', 'Infrastructure as Code', 'Product Strategy', 'CI/CD'],
    image: '/images/Realtime_Operations_Platform.png',
    linkText: 'Explore Automation',
    linkHref: '/services/automation',
    external: false,
    accent: 'emerald',
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
    }, 5000);

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
        transition: { duration: 5, ease: 'linear' },
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
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-10 pb-10 lg:pt-12 lg:pb-12">
          <div className="max-w-3xl">
            {/* eyebrow — Big and bold simple text */}
            <div className="mb-12 text-sm md:text-base font-black uppercase tracking-[0.5em] text-[#00E0FF] drop-shadow-[0_0_12px_rgba(0,224,255,0.6)]">
              Giggs Software Labs
            </div>

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

              {/* BUTTON 2 — Talk to us (smaller width + smaller padding) */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full
      bg-gradient-to-r from-[#00C2FF] to-[#0066FF]
      px-4 py-2 font-medium text-black
      shadow-[0_0_14px_rgba(56,189,248,0.5)]
      hover:brightness-110 transition
      w-[40%] self-start"
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
      px-5 py-2.5 font-medium text-violet-100
      hover:bg-violet-500/25 transition
      w-full"
                >
                  Our Product →
                </a>
              )}

            </div>

          </div>
        </div>

        {/* PARTNERS STRIP – static logos */}
        <div className="relative z-30 mt-10 w-full py-4">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-end gap-14 px-7 pr-20">
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
                className="h-7 flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </section>
      {/* =============== END HERO SECTION =============== */}

      {/* INDUSTRIES WE SERVE + INSIGHTS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        {/* FIRST FOLD: use a motion container controlled by `firstFoldControls` */}
        <motion.div
          ref={firstFoldRef}
          initial={{ opacity: 0, y: 18 }}
          animate={firstFoldControls}
          className="mt-12"
        >
          <SectionTitle
            eyebrow="Industries we serve"
            title="Empowering every industry with intelligence."
            subtitle="From global enterprises to digital-first startups, we bring domain-aware engineering and AI-led innovation across sectors."
            align="left"
          />

          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {[
              'Banking & Financial Services',
              'Healthcare',
              'Retail & E-commerce',
              'Manufacturing',
              'Telecom',
              'Public Sector',
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-sky-500/30 bg-slate-950/80 px-4 py-1.5 text-slate-200 shadow-[0_0_16px_rgba(56,189,248,0.25)]"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 shadow-[0_0_30px_rgba(15,23,42,0.9)]">
              <h3 className="text-sm font-semibold text-slate-50">
                Insights &amp; thought leadership
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Ideas that inspire digital transformation. We share patterns,
                architectures, and playbooks distilled from production work across
                industries.
              </p>
              <ul className="mt-4 space-y-2 text-[12px] text-slate-300">
                <li>• AI &amp; Data Innovation</li>
                <li>• Cybersecurity trends and zero-trust patterns</li>
                <li>• Performance engineering best practices</li>
                <li>• Automation playbooks and reference architectures</li>
              </ul>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center text-xs font-medium text-sky-400 hover:text-sky-300"
              >
                Explore articles &amp; case studies →
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 shadow-[0_0_30px_rgba(15,23,42,0.9)]">
              <h3 className="text-sm font-semibold text-slate-50">
                Security &amp; AI: key capabilities
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                By blending AI-native detection with strong engineering hygiene,
                we help teams stay ahead of evolving threats.
              </p>
              <ul className="mt-4 space-y-2 text-[12px] text-slate-300">
                <li>• AI threat detection &amp; predictive defense</li>
                <li>• SOC automation and response orchestration</li>
                <li>• Cloud security posture and hardening</li>
                <li>• Zero trust architecture implementation</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>



      {/* WHAT WE BUILD — Modern Grid Rebuild */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
        <div className="mb-12">
          <SectionTitle
            eyebrow="Solutions & architecture"
            title="What we build"
            subtitle="From our flagship cybersecurity product to specialized AI and automation layers — we deliver production-grade systems that scale."
            align="left"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {showcases.map((item, idx) => {
            const accentMap = {
              violet: {
                icon: '🛡️',
                border: 'hover:border-violet-500/50',
                glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]',
                bg: 'from-violet-500/10 to-transparent',
                accent: 'text-violet-400',
                tag: 'border-violet-500/30 bg-violet-500/5 text-violet-200',
                btn: 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30'
              },
              cyan: {
                icon: '🧠',
                border: 'hover:border-cyan-500/50',
                glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]',
                bg: 'from-cyan-500/10 to-transparent',
                accent: 'text-cyan-400',
                tag: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-200',
                btn: 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
              },
              emerald: {
                icon: '🤖',
                border: 'hover:border-emerald-500/50',
                glow: 'group-hover:shadow-[0_0_40px_rgba(52,211,153,0.15)]',
                bg: 'from-emerald-500/10 to-transparent',
                accent: 'text-emerald-400',
                tag: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200',
                btn: 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
              },
              amber: {
                icon: '⚡',
                border: 'hover:border-amber-500/50',
                glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]',
                bg: 'from-amber-500/10 to-transparent',
                accent: 'text-amber-400',
                tag: 'border-amber-500/30 bg-amber-500/5 text-amber-200',
                btn: 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
              },
            };
            const c = accentMap[item.accent] || accentMap.cyan;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group h-full"
              >
                <div className={`relative h-full overflow-hidden rounded-[2.5rem] border border-slate-800/60 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-500 ${c.border} ${c.glow}`}>
                  {/* Decorative background glow */}
                  <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${c.bg} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative flex flex-col h-full">
                    {/* Header: Icon + Category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl filter transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                          {c.icon}
                        </span>
                        <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] ${c.accent}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className={`h-1.5 w-1.5 rounded-full ${c.accent.replace('text', 'bg')} animate-pulse`} />
                    </div>

                    {/* Intuitive Tech Box (Replaced Image) */}
                    <div className="relative mb-8 overflow-hidden rounded-2xl bg-slate-900/30 aspect-video flex items-center justify-center group/box border border-slate-800/40">
                      {/* Animated Background Pattern & Glow */}
                      <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${c.bg} group-hover/box:opacity-20 transition-opacity duration-700`} />
                      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

                      {/* Decorative Lines */}
                      <div className={`absolute inset-0 opacity-5`}
                        style={{ backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                      {/* Centered Glowing Icon */}
                      <div className="relative z-10 transition-transform duration-500 group-hover/box:scale-110">
                        {/* Inner Glow */}
                        <div className={`absolute inset-0 blur-2xl opacity-30 ${c.accent.replace('text', 'bg')} scale-125`} />
                        <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          {c.icon}
                        </span>
                      </div>

                      {/* Corner Accents */}
                      <div className={`absolute left-0 bottom-0 h-12 w-12 border-l border-b border-white/10 rounded-bl-2xl transition-colors duration-500 group-hover/box:border-white/20`} />
                      <div className={`absolute right-0 top-0 h-12 w-12 border-r border-t border-white/10 rounded-tr-2xl transition-colors duration-500 group-hover/box:border-white/20`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold tracking-tight text-slate-50 mb-3 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                        {item.description}
                      </p>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className={`rounded-full border px-3 py-1 text-[10px] font-medium transition-colors ${c.tag}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA Section */}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800/40">
                        {item.external ? (
                          <a
                            href={item.linkHref}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${c.btn}`}
                          >
                            {item.linkText}
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                          </a>
                        ) : (
                          <Link
                            href={item.linkHref}
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${c.btn}`}
                          >
                            {item.linkText}
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                          </Link>
                        )}
                        <span className="text-[10px] font-mono text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                          Case Study
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            title="What teams say"
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

      {/* TECH STACK STRIP */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-6 md:px-7 md:py-7 shadow-[0_0_35px_rgba(15,23,42,0.9)]">
          <div className="mb-5">
            <SectionTitle
              eyebrow="Tools we ship with"
              title="Stack we’re comfortable owning"
              subtitle="Battle-tested technologies we actively design, deploy, and scale in production."
              align="left"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              'Python',
              'Django',
              'Django REST Framework',
              'FastAPI',
              'PostgreSQL',
              'Redis',
              'Kafka / streaming',
              'Next.js',
              'React',
              'Tailwind CSS',
              'Docker',
              'AWS / GCP',
              'CI/CD pipelines',
              'Observability & logging',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#00E0FF]/25 bg-slate-900/80 px-4 py-1.5 text-slate-200 shadow-[0_0_12px_rgba(56,189,248,0.15)] transition hover:border-[#00E0FF] hover:text-[#00E0FF] hover:shadow-[0_0_18px_rgba(56,189,248,0.4)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Notes & breakdowns"
            title="From the lab"
            subtitle="Architecture notes, postmortems, and engineering write-ups."
            align="left"
          />
          <Link
            href="/blog"
            className="text-xs font-medium text-sky-400 hover:text-sky-300"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Designing realtime systems without burning the database',
              tag: 'Architecture',
            },
            {
              title: 'What we look at before choosing a tech stack for a product',
              tag: 'Product engineering',
            },
            {
              title:
                'Observability basics for small teams shipping serious systems',
              tag: 'Reliability',
            },
          ].map((post, i) => (
            <Link
              key={i}
              href="/blog"
              className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-5 transition hover:border-sky-500/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                {post.tag}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-50 group-hover:text-sky-100">
                {post.title}
              </h3>
              <p className="mt-3 text-[12px] text-slate-400">
                Read the full breakdown on the blog.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* LOCATION / MAP */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="relative rounded-[32px] border border-[#00E0FF]/30 bg-slate-950/90 p-[1px] shadow-[0_0_45px_rgba(56,189,248,0.45)]">
          <div className="rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950/80 px-5 py-6 md:px-7 md:py-7">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-slate-50 futuristic">
                  Our location
                </h2>
                <p className="mt-1 text-xs md:text-sm text-slate-300">
                  Based in{' '}
                  <span className="text-slate-100 font-semibold">
                    Noida (U.P), India
                  </span>
                  , collaborating with teams across time zones.
                </p>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full border border-[#00E0FF]/40 bg-slate-950/80 px-3 py-1 text-[11px] text-slate-200 shadow-[0_0_20px_rgba(56,189,248,0.4)] md:mt-0">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#4ade80]" />
                <span className="ml-2">
                  Open to remote projects · IST (UTC+5:30)
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-stretch">
              <div className="space-y-3 text-xs md:text-sm text-slate-300">
                <p>
                  Our studio is located in a well-connected tech hub, close to
                  major corporate campuses and infrastructure. Most of our work
                  happens remotely with structured communication and clear
                  handoffs.
                </p>
                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">
                    HQ address
                  </div>
                  <p className="mt-1 text-[13px] text-slate-100">
                    Giggs Software Labs
                    <br />
                    144, Block A, Logix Technova, Sector-132, Noida, Uttar Pradesh, India
                  </p>
                </div>
                <ul className="space-y-1 text-[12px] text-slate-400">
                  <li>• Remote-first, with optional on-site collaboration.</li>
                  <li>• Comfortable working with US, EU, and APAC teams.</li>
                  <li>• Calls typically scheduled between 11:00–21:00 IST.</li>
                </ul>
              </div>

              <div className="h-64 md:h-80 lg:h-96 overflow-hidden rounded-3xl border border-[#00E0FF]/45 bg-slate-950/90 shadow-[0_0_40px_rgba(56,189,248,0.5)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.037489042097!2d77.37679877408867!3d28.508519789703996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9007ae07f77%3A0xe81ebb50e203f693!2sGiggs%20Software%20Labs!5e0!3m2!1sen!2sin!4v1764838008660!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
                  className="h-7 md:h-8 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300"
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
                href="/projects"
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
