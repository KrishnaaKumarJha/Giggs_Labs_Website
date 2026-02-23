// frontend/pages/about.js
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Package, Cloud, Lightbulb, Settings, Target, Handshake, Radio, Zap, Bot } from 'lucide-react';
import PageShell from '../components/pageshell';

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
const whatWeDo = [
  { icon: Package, title: 'Product Development' },
  { icon: Cloud, title: 'SaaS Platforms' },
  { icon: Brain, title: 'AI Solutions' },
  { icon: Shield, title: 'Cybersecurity' },
];

const metrics = [
  { value: '100', suffix: '+', label: 'Apps & Products Delivered' },
  { value: '18', suffix: '+', label: 'Years of Leadership Experience' },
  { value: '3', label: 'Global Offices' },
  { value: '6', suffix: '+', label: 'Industries Served' },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation with Integrity',
    tagline: 'Forward Thinking',
    desc: 'We bring creative excellence and ethical standards to every project — from high-level architecture to production deployment.',
    color: 'cyan',
  },
  {
    icon: Settings,
    title: 'Engineering Excellence',
    tagline: 'Precision Craftsmanship',
    desc: 'Technical rigor, clean code, and production-first thinking are non-negotiable in every solution we deliver.',
    color: 'sky',
  },
  {
    icon: Target,
    title: 'Customer Centricity',
    tagline: 'Your Success, Our Mission',
    desc: 'Every engagement starts with understanding your goals. We engineer solutions that drive real business outcomes, not just ship features.',
    color: 'violet',
  },
  {
    icon: Handshake,
    title: 'Collaboration that Delivers',
    tagline: 'Trusted Partnership',
    desc: 'We integrate seamlessly with your team — transparent communication, clear handoffs, and shared accountability for results.',
    color: 'blue',
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
    name: 'President Name',
    role: 'President & CEO',
    vision: 'Our mission is to bridge the gap between complex engineering and human-centric design. We don’t just build software; we architect the future of digital interaction.',
    image: 'president-placeholder',
    color: 'cyan',
  },
  {
    name: 'VP Name',
    role: 'Vice President of Engineering',
    vision: 'Excellence is not an act, but a habit. We instill technical rigor and creative freedom in every squad to ensure our clients lead their respective markets.',
    image: 'vp-placeholder',
    color: 'blue',
  },
];

/* ── page ── */
export async function getServerSideProps() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/posts/');
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
      {/* ─── 1. FUTURISTIC HERO ─── */}
      <section className="relative -mt-20 pt-32 flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6"
          >


            <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-black tracking-tighter text-slate-50">
              Engineering Tomorrow. <span className="bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#7A5BFF] bg-clip-text text-transparent italic">Today.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed font-medium">
              At <span className="font-bold text-white">Giggs Software Labs</span>, we are passionate about building intelligent, secure, and scalable
              solutions that shape the digital enterprise of tomorrow. Our teams of AI engineers, data
              scientists, and automation architects deliver measurable impact across industries.
            </motion.p>


            <motion.div variants={fadeUp} className="pt-14 max-w-3xl mx-auto">
              <div className="relative rounded-[2rem] border border-slate-800/60 bg-slate-900/20 backdrop-blur-lg p-8 md:p-10 text-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00E0FF] to-[#4C8DFF] text-black text-[10px] font-black uppercase tracking-[0.3em] px-5 py-1.5 rounded-full shadow-lg shadow-[#00E0FF]/20">
                  Our Vision
                </div>
                <div className="text-5xl text-[#00E0FF]/20 font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-lg md:text-xl font-bold text-slate-100 leading-relaxed tracking-tight -mt-4">
                  To empower organizations through intelligent engineering and secure innovation — building the digital infrastructure that drives tomorrow&apos;s enterprises.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00E0FF]/40" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Giggs Software Labs</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00E0FF]/40" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. BY THE NUMBERS ─── */}
      <section className="container mx-auto px-4 py-20 border-t border-slate-800/40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#00E0FF] mb-2">Metrics of Merit</div>
            <h2 className="text-2xl font-black text-slate-50 uppercase tracking-tight">By the numbers</h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4 lg:gap-8">
            {metrics.map((m, idx) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="relative flex flex-col border-l border-slate-800 pl-6 last:border-r"
              >
                <div className="text-4xl font-black text-slate-50 tracking-tighter sm:text-5xl">
                  <StatCounter value={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-snug">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── 3. OUR VALUES ─── */}
      <section className="container mx-auto px-4 pt-16 pb-8 relative">
        {/* Section Line Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Our Values</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-slate-800/60 bg-slate-900/10 p-8 transition-all hover:border-slate-700 hover:bg-slate-900/30"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-${v.color}-500/10 text-3xl transition-transform duration-500 group-hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                  <div className={`absolute inset-0 rounded-full bg-${v.color}-500/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100`} />
                  <v.icon className="relative z-10 w-7 h-7 text-current" />
                </div>
                <h3 className="text-2xl font-black text-slate-50 tracking-tight">{v.title}</h3>
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] text-${v.color}-400 mt-1 mb-4`}>{v.tagline}</div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 4. LEADERSHIP VISION (President & VP) ─── */}
      <section className="container mx-auto px-4 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Leadership Vision</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {leadership.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[3rem] border border-slate-800/60 bg-slate-900/10 p-1 lg:p-1.5 transition-all hover:border-slate-700 hover:bg-slate-900/20"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Leader Image Section */}
                <div className="relative w-full md:w-2/5 aspect-[4/5] md:aspect-auto overflow-hidden rounded-[2.5rem]">
                  <div className={`absolute inset-0 z-0 bg-gradient-to-br from-${leader.color}-500/10 to-transparent`} />
                  <img
                    src={`/${leader.image}.png`}
                    alt={leader.name}
                    className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Gradient overlay for text transition if needed */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-slate-900/50 hidden md:block" />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-4xl text-cyan-500/30 font-serif leading-none italic">"</span>
                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-medium -mt-2">
                      {leader.vision}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-50 tracking-tight">{leader.name}</h3>
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

      {/* ─── 5. GLOBAL PRESENCE ─── */}
      <section className="container mx-auto px-4 pt-12 pb-4 overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4">Global Presence</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {offices.map((o) => (
            <motion.div
              key={o.location}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group relative h-80 w-full overflow-hidden"
            >
              {/* Cityscape Background (Fallback to gradient if image missing) */}
              <div className="absolute inset-0 z-0 bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <img
                  src={o.image}
                  alt={o.location}
                  className="h-full w-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-10 left-8 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{o.flag}</span>
                  <h3 className="text-xl font-black text-slate-50 tracking-tight">{o.location}</h3>
                </div>
                <div className="h-0.5 w-8 bg-cyan-500 mb-4 transition-all group-hover:w-24 duration-500" />
                <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {o.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center italic text-slate-400 font-medium tracking-wide">
          Three Continents. <span className="text-cyan-500 not-italic font-black">One Engineering Standard.</span>
        </div>
      </section>



      {/* ─── 7. INSIGHTS & THOUGHT LEADERSHIP ─── */}
      <section className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 px-4 whitespace-nowrap">Insights & Thought Leadership</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 max-w-3xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-black text-slate-50 tracking-tight mb-5">
            Ideas that Inspire{' '}
            <span className="bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#7A5BFF] bg-clip-text text-transparent italic">Digital Transformation</span>
          </h3>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Explore our deep dives into AI engineering, cybersecurity research, and architecture blueprints.
            From whitepapers and case studies to technical blog posts — we share the thinking behind the engineering.
          </p>
        </motion.div>

        {/* Rich content block (always visible) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16 rounded-[2.5rem] border border-slate-800/60 bg-slate-900/20 p-8 md:p-12"
        >
          <div className="flex flex-col justify-center">
            <Radio className="w-9 h-9 text-[#00E0FF] mb-4" />
            <h4 className="text-xl md:text-2xl font-black text-slate-50 tracking-tight mb-4">
              Engineering Knowledge, <span className="text-[#00E0FF] italic">Open-Sourced</span>
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
                  <topic.Icon className="w-5 h-5 text-slate-400 group-hover:text-[#00E0FF] transition-colors" />
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
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00E0FF]">Latest Publications</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800/50 to-transparent" />
            </div>

            {/* Featured post (latest) */}
            {posts[0] && (
              <Link href={`/blog/${posts[0].slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative grid md:grid-cols-2 gap-8 items-center rounded-[2rem] border border-slate-800/80 bg-slate-900/40 p-1 overflow-hidden hover:border-[#00E0FF]/40 transition-all cursor-pointer mb-12"
                >
                  <div className="relative aspect-[16/10] md:aspect-square overflow-hidden rounded-[1.8rem]">
                    <img
                      src={posts[0].image || '/images/Ai_Automation.png'}
                      alt={posts[0].title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#00E0FF] italic">FEATURED {posts[0].category}</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-10">
                    <span className="text-xs text-slate-500 mb-2 block">{posts[0].date_display}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#00E0FF] transition-colors leading-tight">
                      {posts[0].title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                      {posts[0].excerpt || 'Dive into our latest analysis.'}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#00E0FF]">
                      Begin Reading <span className="text-lg">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Post grid (remaining posts) */}
            {posts.length > 1 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      className="group h-full flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden hover:border-[#00E0FF]/30 hover:bg-slate-900/40 transition-all cursor-pointer shadow-xl shadow-black/40"
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
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#00E0FF] transition-colors line-clamp-2 mb-3">
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

        {/* Newsletter / CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 relative overflow-hidden rounded-[2.5rem] border border-slate-700/40 bg-gradient-to-br from-slate-900 to-slate-950 p-10 md:p-12 text-center md:text-left md:flex items-center justify-between gap-10 shadow-2xl"
        >
          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 italic tracking-tight">Stay ahead of the curve.</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              From AI deployment patterns and cybersecurity research to performance engineering playbooks and automation strategies — we publish deep dives, architecture notes, and postmortems that help engineering teams build at the edge.
            </p>
          </div>
          <div className="relative z-10 mt-6 md:mt-0 flex-shrink-0 flex flex-col items-center gap-3">
            <Link
              href="/blog"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-black font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#00E0FF]/20"
            >
              Explore all insights
            </Link>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Articles · Whitepapers · Case Studies</span>
          </div>
          {/* Background Deco */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00E0FF]/5 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-600/5 blur-[100px] rounded-full" />
        </motion.div>
      </section>

      {/* ─── 5. FINAL CTA ─── */}
      <section className="container mx-auto px-4 py-4 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-950/40 p-12 text-center backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-50 tracking-tighter mb-6">
              Ready to engineer your <span className="bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#7A5BFF] bg-clip-text text-transparent">future?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] px-10 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:brightness-110"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}