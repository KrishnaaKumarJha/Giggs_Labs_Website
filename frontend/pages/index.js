// frontend/pages/index.js
import Link from 'next/link';
import Image from 'next/image';
import {
  motion, useAnimation, useInView, AnimatePresence,
} from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

// ─── Shared ───────────────────────────────────────────────────────────────────
const heroTabs = [
  { id: 'ai-data', label: 'AI & Data Engineering', title: 'AI and Data Science & Engineering', tagline: 'Transforming Data into Intelligence. Intelligence into Action.', video: '/hero/ai.mp4', buttonText: 'Explore our AI & Data Capabilities', buttonHref: '/services#ai-data' },
  { id: 'cyber', label: 'AI-driven Cybersecurity', title: 'AI-driven Cybersecurity', tagline: 'Securing the Future Through Intelligence.', video: '/hero/cyber.mp4', buttonText: 'Get resilient defenses with AI', buttonHref: '/services#cyber' },
  { id: 'performance', label: 'Performance Engineering', title: 'Performance Engineering', tagline: 'Delivering Reliability, Speed, and Scalability.', video: '/hero/performance.mp4', buttonText: 'Explore Performance Capabilities', buttonHref: '/services#performance' },
  { id: 'automation', label: 'Automation Engineering', title: 'Automation', tagline: 'Automating the Enterprise for Speed, Efficiency, and Scale.', video: '/hero/automation.mp4', buttonText: 'Automate with intelligent systems', buttonHref: '/services#automation' },
];

// ─── PILLARS — text taken directly from live site ────────────────────────────
// Brand palette: Deep Tech Blue #0B1F3B | Electric Blue #1E7BFF | AI Violet #7A5CFF | Neon Cyan #2ED6FF
const PILLARS = [
  {
    id: 'data', index: '01',
    label: 'AI & Data Science & Engineering',
    shortLabel: 'AI & Data',
    title: `AI & Data Science
      & Engineering`,
    tagline: `Transforming Data into Intelligence.
Intelligence into Action.`,
    description: 'Our AI and Data Engineering solutions help organizations unlock the full value of their data. We build scalable, intelligent platforms that empower faster decision-making, predictive insights, and end-to-end automation.',
    capabilities: ['Generative AI & ML Models', 'Data Engineering', 'MLOps', 'Advanced Analytics', 'AI Strategy'],
    outcomes: 'Accelerated data-to-insight conversion, predictive decision systems, enterprise-grade scalability.',
    href: '/services/ai-data',
    accent: '#2ED6FF', accentAlt: '#1E7BFF',
    visual: 'data',
  },
  {
    id: 'cyber', index: '02',
    label: 'AI-driven Cybersecurity',
    shortLabel: 'Cybersecurity',
    title: `AI-driven
Cybersecurity`,
    tagline: `Securing the Future
Through Intelligence.`,
    description: 'With cyber threats growing more sophisticated, Giggs Software Labs integrates AI into every layer of security. Our intelligent cybersecurity framework enables proactive threat detection, automated response, and continuous compliance.',
    capabilities: ['AI Threat Detection', 'Predictive Defense', 'SOC Automation', 'Cloud Security', 'Zero Trust Architecture'],
    outcomes: 'Real-time visibility, faster breach detection, reduced false positives.',
    href: '/services/cybersecurity',
    accent: '#2ED6FF', accentAlt: '#1E7BFF',
    visual: 'cyber',
  },
  {
    id: 'performance', index: '03',
    label: 'Performance Engineering',
    shortLabel: 'Performance',
    title: `Performance
Engineering`,
    tagline: `Delivering Reliability,
Speed, and Scalability.`,
    description: 'We engineer systems that perform flawlessly under pressure. Our Performance Engineering practice optimizes applications, infrastructure, and cloud environments to ensure consistent, cost-effective, and scalable performance.',
    capabilities: ['App & Infra Optimization', 'APM', 'Load Testing', 'Cloud Cost Optimization', 'CI/CD Automation'],
    outcomes: 'Sub-second response times, improved efficiency, lower cloud costs.',
    href: '/services/performance',
    accent: '#2ED6FF', accentAlt: '#1E7BFF',
    visual: 'performance',
  },
  {
    id: 'automation', index: '04',
    label: 'Automation Engineering',
    shortLabel: 'Automation',
    title: `Automation
Engineering`,
    tagline: `Automating the Enterprise for
Speed, Efficiency, and Scale.`,
    description: 'Our Automation solutions eliminate inefficiencies across business and IT operations. From process digitization to DevOps and infrastructure automation, we enable a faster, error-free, and adaptive enterprise.',
    capabilities: ['RPA', 'Test Automation', 'IaC', 'Workflow Orchestration', 'Hyperautomation'],
    outcomes: 'Reduced manual effort, faster go-to-market, unified governance.',
    href: '/services/automation',
    accent: '#2ED6FF', accentAlt: '#1E7BFF',
    visual: 'automation',
  },
];

// ─── Animated SVG Visuals ─────────────────────────────────────────────────────
function DataVisual({ accent, accentAlt, active }) {
  return (
    <svg viewBox="0 0 440 440" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={accent} stopOpacity="0" /><stop offset="50%" stopColor={accent} stopOpacity="0.95" /><stop offset="100%" stopColor={accentAlt} stopOpacity="0" /></linearGradient>
        <linearGradient id="dg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={accentAlt} stopOpacity="0" /><stop offset="55%" stopColor={accentAlt} stopOpacity="0.7" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></linearGradient>
        <filter id="dglow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="dglow2"><feGaussianBlur stdDeviation="8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* Grid */}
      {[80, 140, 200, 260, 320, 380].map(y => <line key={y} x1="30" y1={y} x2="410" y2={y} stroke="rgba(255,255,255,0.035)" strokeWidth="1" />)}
      {[80, 140, 200, 260, 320, 380].map(x => <line key={x} x1={x} y1="30" x2={x} y2="410" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />)}
      {/* Area fill */}
      <path d="M30,310 100,260 170,210 240,165 310,120 380,85 380,410 30,410Z" fill={accent} fillOpacity="0.05" />
      {/* Lines */}
      <polyline points="30,310 100,260 170,210 240,165 310,120 380,85" stroke="url(#dg1)" strokeWidth="2.5" strokeLinecap="round" filter="url(#dglow)" style={{ animation: 'dash1 3s ease-in-out infinite alternate' }} />
      <polyline points="30,340 100,315 170,280 240,245 310,210 380,180" stroke="url(#dg2)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: 'dash2 4.5s ease-in-out infinite alternate' }} />
      <polyline points="30,370 100,360 170,340 240,310 310,280 380,250" stroke={accent} strokeWidth="1" strokeOpacity="0.25" strokeLinecap="round" style={{ animation: 'dash3 5.5s ease-in-out infinite alternate' }} />
      {/* Nodes */}
      {[[100, 260], [170, 210], [240, 165], [310, 120], [380, 85]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="16" stroke={accent} strokeWidth="1" strokeOpacity="0.12" fill="none" style={{ animation: `dring ${2 + i * 0.4}s ease-in-out infinite` }} />
          <circle cx={cx} cy={cy} r="6" fill={accent} opacity="0.9" filter="url(#dglow)" style={{ animation: `dpulse ${1.6 + i * 0.35}s ease-in-out infinite alternate` }} />
        </g>
      ))}
      {/* Particles */}
      {[[60, 90], [190, 55], [330, 75], [400, 215], [55, 340], [275, 355], [140, 380], [360, 330]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 1.5 : 2} fill={i % 2 === 0 ? accent : accentAlt} opacity="0.45" style={{ animation: `float${i % 3} ${2.2 + i * 0.38}s ease-in-out infinite alternate` }} />
      ))}
      <text x="220" y="428" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="10" fontFamily="monospace" letterSpacing="5">DATA → INTELLIGENCE → ACTION</text>
      <style>{`
        @keyframes dash1{from{opacity:.6;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dash2{from{opacity:.3;transform:translateY(-6px)}to{opacity:.85;transform:translateY(5px)}}
        @keyframes dash3{from{opacity:.1}to{opacity:.4}}
        @keyframes dpulse{from{r:5;opacity:.7}to{r:7.5;opacity:1}}
        @keyframes dring{0%{r:12;opacity:.4}50%{r:20;opacity:0}100%{r:12;opacity:.4}}
        @keyframes float0{from{transform:translate(0,0)}to{transform:translate(5px,-10px)}}
        @keyframes float1{from{transform:translate(0,0)}to{transform:translate(-7px,7px)}}
        @keyframes float2{from{transform:translate(0,0)}to{transform:translate(6px,6px)}}
      `}</style>
    </svg>
  );
}

function CyberVisual({ accent, accentAlt }) {
  const nodes = [[220, 70], [120, 150], [220, 150], [320, 150], [70, 240], [165, 240], [275, 240], [370, 240], [220, 320]];
  const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [3, 7], [4, 8], [5, 8], [6, 8], [7, 8]];
  return (
    <svg viewBox="0 0 440 440" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent} stopOpacity="0.8" /><stop offset="100%" stopColor={accentAlt} stopOpacity="0.1" /></linearGradient>
        <radialGradient id="cgc" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={accent} stopOpacity="0.25" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></radialGradient>
        <filter id="cglow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="220" cy="220" r="190" fill="url(#cgc)" />
      {edges.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={accent} strokeOpacity="0.2" strokeWidth="1" style={{ animation: `cedge ${2.2 + i * 0.18}s ease-in-out infinite alternate` }} />)}
      <path d="M220 45 L300 88 L300 190 Q300 258 220 292 Q140 258 140 190 L140 88 Z" stroke={accent} strokeWidth="1.8" strokeOpacity="0.3" fill="none" style={{ animation: 'shieldP 3.5s ease-in-out infinite alternate' }} />
      <path d="M220 68 L278 103 L278 183 Q278 238 220 268 Q162 238 162 183 L162 103 Z" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="0.8" strokeOpacity="0.15" />
      {nodes.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="16" stroke={i === 0 ? accent : accentAlt} strokeWidth="1" strokeOpacity="0.18" fill="none" style={{ animation: `cring ${2 + i * 0.28}s ease-in-out infinite` }} />
          <circle cx={cx} cy={cy} r="6" fill={i === 0 ? accent : accentAlt} opacity="0.92" filter="url(#cglow)" style={{ animation: `cpulse ${1.6 + i * 0.22}s ease-in-out infinite alternate` }} />
        </g>
      ))}
      <rect x="60" y="0" width="320" height="3.5" fill="url(#cg1)" opacity="0.7" rx="2" style={{ animation: 'scan 2.8s linear infinite' }} />
      <style>{`
        @keyframes cedge{from{stroke-opacity:.08}to{stroke-opacity:.38}}
        @keyframes cpulse{from{r:4.5}to{r:7}}
        @keyframes cring{0%{r:12;opacity:.35}50%{r:22;opacity:0}100%{r:12;opacity:.35}}
        @keyframes shieldP{from{opacity:.5}to{opacity:1}}
        @keyframes scan{from{transform:translateY(0)}to{transform:translateY(440px)}}
      `}</style>
    </svg>
  );
}

function PerformanceVisual({ accent, accentAlt }) {
  const bars = [
    { x: 55, y: 270, w: 70, h: 100, pct: '100%', d: '0s' }, { x: 145, y: 235, w: 70, h: 135, pct: '92%', d: '0.15s' },
    { x: 235, y: 195, w: 70, h: 175, pct: '78%', d: '0.3s' }, { x: 325, y: 160, w: 70, h: 210, pct: '65%', d: '0.45s' },
  ];
  return (
    <svg viewBox="0 0 440 440" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent} /><stop offset="100%" stopColor={accentAlt} stopOpacity="0.35" /></linearGradient>
        <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accentAlt} /><stop offset="100%" stopColor={accent} stopOpacity="0.2" /></linearGradient>
        <filter id="pglow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <marker id="marr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill={accent} fillOpacity="0.5" /></marker>
      </defs>
      {/* Grid */}
      {[155, 205, 255, 305, 355].map(y => <line key={y} x1="40" y1={y} x2="410" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
      <line x1="40" y1="380" x2="420" y2="380" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {bars.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill="url(#pg1)" opacity="0.12" style={{ animationDelay: b.d, animation: 'barUp 1.4s ease forwards' }} />
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8" stroke={accent} strokeWidth="1.8" fill="none" opacity="0.7" filter="url(#pglow)" style={{ animationDelay: b.d, animation: 'barUp 1.4s ease forwards' }} />
          <rect x={b.x + 5} y={b.y + 5} width={b.w - 10} height="4" rx="2" fill={accent} opacity="0.65" style={{ animationDelay: b.d, animation: 'barUp 1.4s ease forwards' }} />
          <text x={b.x + b.w / 2} y={b.y - 10} textAnchor="middle" fill={accent} fontSize="11" fontFamily="monospace" fontWeight="700" opacity="0.8" style={{ animationDelay: b.d, animation: 'barUp 1.4s ease forwards' }}>{b.pct}</text>
        </g>
      ))}
      {/* Trend line */}
      <polyline points="90,270 180,235 270,195 360,160" stroke={accent} strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="5 4" fill="none" />
      <path d="M40 390 L410 390" stroke={accent} strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#marr)" />
      <text x="220" y="428" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="10" fontFamily="monospace" letterSpacing="5">PERFORMANCE OVER TIME</text>
      <style>{`@keyframes barUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </svg>
  );
}

function AutomationVisual({ accent, accentAlt }) {
  const hubs = [[220, 220], [220, 90], [348, 158], [348, 282], [220, 350], [92, 282], [92, 158]];
  const spokes = [1, 2, 3, 4, 5, 6].map(i => [0, i]);
  const outer = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1]];
  return (
    <svg viewBox="0 0 440 440" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ag1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={accent} stopOpacity="0.3" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></radialGradient>
        <filter id="aglow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id="ag2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={accent} /><stop offset="100%" stopColor={accentAlt} /></linearGradient>
      </defs>
      <circle cx="220" cy="220" r="180" fill="url(#ag1)" />
      <circle cx="220" cy="220" r="135" stroke={accent} strokeOpacity="0.07" strokeWidth="1.5" fill="none" />
      <circle cx="220" cy="220" r="88" stroke={accentAlt} strokeOpacity="0.07" strokeWidth="1" fill="none" />
      {spokes.map(([a, b], i) => <line key={i} x1={hubs[a][0]} y1={hubs[a][1]} x2={hubs[b][0]} y2={hubs[b][1]} stroke={accent} strokeOpacity="0.28" strokeWidth="1.8" style={{ animation: `aspoke ${2.2 + i * 0.32}s ease-in-out infinite alternate` }} />)}
      {outer.map(([a, b], i) => <line key={i} x1={hubs[a][0]} y1={hubs[a][1]} x2={hubs[b][0]} y2={hubs[b][1]} stroke={accentAlt} strokeOpacity="0.18" strokeWidth="1" style={{ animation: `aspoke ${3.2 + i * 0.22}s ease-in-out infinite alternate` }} />)}
      {hubs.slice(1).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="20" stroke={accentAlt} strokeWidth="1" strokeOpacity="0.18" fill="none" style={{ animation: `aring ${2.2 + i * 0.28}s ease-in-out infinite` }} />
          <circle cx={cx} cy={cy} r="9" fill="rgba(255,255,255,0.04)" stroke={accentAlt} strokeWidth="1.6" strokeOpacity="0.55" />
          <circle cx={cx} cy={cy} r="3.5" fill={accentAlt} opacity="0.9" filter="url(#aglow)" />
        </g>
      ))}
      <circle cx="220" cy="220" r="34" fill="rgba(255,255,255,0.03)" stroke={accent} strokeWidth="2.2" strokeOpacity="0.5" />
      <circle cx="220" cy="220" r="20" fill={accent} fillOpacity="0.14" />
      <circle cx="220" cy="220" r="9" fill="url(#ag2)" filter="url(#aglow)" style={{ animation: 'chub 2.2s ease-in-out infinite alternate' }} />
      <circle cx="220" cy="90" r="5" fill={accent} opacity="0.85" filter="url(#aglow)" style={{ transformOrigin: '220px 220px', animation: 'orbit 5.5s linear infinite' }} />
      <circle cx="220" cy="90" r="2.5" fill="#fff" opacity="0.6" style={{ transformOrigin: '220px 220px', animation: 'orbit 5.5s linear infinite' }} />
      <style>{`
        @keyframes aspoke{from{stroke-opacity:.08}to{stroke-opacity:.42}}
        @keyframes aring{0%{r:16;opacity:.38}50%{r:26;opacity:0}100%{r:16;opacity:.38}}
        @keyframes chub{from{r:8}to{r:11.5}}
        @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </svg>
  );
}

const VISUAL_MAP = { data: DataVisual, cyber: CyberVisual, performance: PerformanceVisual, automation: AutomationVisual };

// ─── Four Pillars — Lightweight scroll-reveal cards ──────────────────────────
// Single PillarCard: whileInView only, no sticky, no window listeners
function PillarCard({ pillar, idx }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const flip = idx % 2 !== 0;
  const VisualComp = VISUAL_MAP[pillar.visual];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900/50 backdrop-blur-sm"
      style={{ boxShadow: `0 0 40px ${pillar.accent}0a` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.accent}80, ${pillar.accentAlt}60, transparent)` }} />

      {/* Subtle bg glow */}
      <div className="absolute pointer-events-none"
        style={{
          [flip ? 'left' : 'right']: '-60px', top: '50%', transform: 'translateY(-50%)',
          width: 320, height: 320, borderRadius: '50%',
          background: `radial-gradient(circle, ${pillar.accent}0f 0%, transparent 70%)`,
          filter: 'blur(32px)',
        }} />

      <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch`}>

        {/* ── TEXT BLOCK ── */}
        <div className={`flex flex-col justify-center p-8 md:p-10 ${flip ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* Index badge + label */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-black border"
              style={{ color: pillar.accent, borderColor: `${pillar.accent}50`, background: `${pillar.accent}15` }}
            >
              {pillar.index}
            </span>
            <span className="h-px w-6" style={{ background: `${pillar.accent}60` }} />
            <span className="text-[10px] font-black uppercase tracking-[0.28em]" style={{ color: pillar.accent }}>
              {pillar.label}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-extrabold tracking-tight text-white mb-3 leading-[1.05]"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', whiteSpace: 'pre-line' }}
          >
            {pillar.title}
          </h3>

          {/* Tagline */}
          <p
            className="font-semibold mb-4 leading-snug whitespace-pre-line text-sm md:text-base"
            style={{
              background: `linear-gradient(110deg, ${pillar.accent}, ${pillar.accentAlt})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            {pillar.tagline}
          </p>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-md">
            {pillar.description}
          </p>

          {/* Capabilities */}
          <div className="flex flex-wrap gap-2 mb-5">
            {pillar.capabilities.map((cap) => (
              <span
                key={cap}
                className="px-3 py-1 rounded-full text-[10px] font-bold border"
                style={{ borderColor: `${pillar.accent}35`, background: `${pillar.accent}0d`, color: pillar.accent }}
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Outcomes */}
          <div className="flex items-start gap-2 mb-7 p-3 rounded-xl border border-slate-700/30 bg-slate-800/30">
            <span className="shrink-0 text-[9px] font-black uppercase tracking-widest pt-0.5" style={{ color: pillar.accent }}>Outcomes</span>
            <span className="text-slate-300 text-xs leading-relaxed">{pillar.outcomes}</span>
          </div>

          {/* CTA */}
          <div>
            <Link
              href={pillar.href}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white border transition-all duration-200 hover:scale-[1.03]"
              style={{
                borderColor: `${pillar.accent}50`,
                background: `linear-gradient(135deg, ${pillar.accent}20, ${pillar.accentAlt}10)`,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 20px ${pillar.accent}35`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              Learn more
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── VISUAL BLOCK ── */}
        <div className={`relative flex items-center justify-center p-6 md:p-8 min-h-[280px] lg:min-h-[400px] ${flip ? 'lg:order-1' : 'lg:order-2'} border-t lg:border-t-0 ${flip ? 'lg:border-r' : 'lg:border-l'} border-slate-700/30`}>
          {/* Tinted bg */}
          <div className="absolute inset-0" style={{ background: `${pillar.accent}06` }} />
          {/* Visual */}
          <div className="relative z-10 w-full max-w-[320px] aspect-square">
            <VisualComp accent={pillar.accent} accentAlt={pillar.accentAlt} />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function FourPillarsSection() {
  return (
    <section className="relative w-full py-16 md:py-20 px-4 md:px-6">
      {/* Background matches rest of site — transparent, lets the global gradient show */}

      <div className="mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8" style={{ background: '#2ED6FF', opacity: 0.6 }} />
            <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: '#2ED6FF' }}>
              Our Expertise · Your Competitive Edge
            </span>
          </div>
          <h2 className="font-extrabold text-white tracking-tight leading-[1.0] mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            The Four Pillars{' '}
            <span className="text-slate-500">of Innovation.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Giggs Software Labs drives transformation through four core pillars — from intelligent data ecosystems to AI-powered cybersecurity, performance engineering, and enterprise automation.
          </p>
        </motion.div>

        {/* ── Pillar cards, stacked vertically ── */}
        <div className="flex flex-col gap-6 md:gap-8">
          {PILLARS.map((pillar, idx) => (
            <PillarCard key={pillar.id} pillar={pillar} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeHeroTab, setActiveHeroTab] = useState(heroTabs[0].id);
  const [heroDirection, setHeroDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);
  const heroTimerRef = useRef(null);

  const startHeroTimer = () => {
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    setProgressKey(k => k + 1);
    heroTimerRef.current = setInterval(() => {
      setActiveHeroTab(prev => {
        const ci = heroTabs.findIndex(t => t.id === prev);
        setHeroDirection(1);
        return heroTabs[(ci + 1) % heroTabs.length].id;
      });
      setProgressKey(k => k + 1);
    }, 6000);
  };

  useEffect(() => { startHeroTimer(); return () => clearInterval(heroTimerRef.current); }, []);

  const firstFoldControls = useAnimation();
  const firstFoldRef = useRef(null);
  const firstFoldInView = useInView(firstFoldRef, { amount: 0.22 });
  useEffect(() => {
    if (firstFoldInView) { firstFoldControls.start({ opacity: 1, y: 0, transition: { duration: 0.62, ease: 'easeOut' } }); return; }
    if (typeof window !== 'undefined' && window.scrollY < 32) {
      const t = setTimeout(() => firstFoldControls.start({ opacity: 1, y: 0, transition: { duration: 0.62, ease: 'easeOut' } }), 90);
      return () => clearTimeout(t);
    }
    firstFoldControls.set({ opacity: 0, y: 18 });
  }, [firstFoldInView, firstFoldControls]);

  const handleHeroTabClick = (id) => {
    if (id === activeHeroTab) return;
    const ci = heroTabs.findIndex(t => t.id === activeHeroTab);
    const ni = heroTabs.findIndex(t => t.id === id);
    setHeroDirection(ni > ci ? 1 : -1);
    setActiveHeroTab(id);
    setProgressKey(k => k + 1);
    startHeroTimer();
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 pb-20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -40 }}>
        <video key={activeVideo} src={activeVideo} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-70" />
      </div>
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: -30, background: 'linear-gradient(135deg,rgba(2,6,23,.65) 0%,rgba(0,30,60,.55) 30%,rgba(15,10,50,.60) 60%,rgba(2,6,23,.65) 100%)' }} />
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: -20, background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(0,224,255,.08) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 100%,rgba(122,91,255,.06) 0%,transparent 50%)' }} />

      {/* HERO */}
      <section className="relative w-full overflow-hidden text-white min-h-[75vh]">
        <div className="absolute inset-0 z-0 bg-slate-900">
          {heroTabs.map(tab => (
            <video key={tab.id} src={tab.video} autoPlay muted loop playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeHeroTab === tab.id ? 'opacity-100' : 'opacity-0'}`} />
          ))}
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg,rgba(0,0,0,.95) 0%,rgba(0,0,0,.85) 35%,rgba(0,0,0,.4) 55%,rgba(0,0,0,0) 100%)' }} />
        <div className="pointer-events-none absolute right-[-10%] top-[-25%] z-10 h-56 w-56 rounded-full bg-cyan-400/35 blur-3xl" />
        <div className="pointer-events-none absolute left-[-8%] bottom-[-20%] z-10 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-8 lg:pt-12 pb-10 lg:pb-12">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: 'easeOut' }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-1.5 text-xs sm:text-[13px] font-black uppercase tracking-[0.25em] text-sky-300 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Giggs Software Labs
            </motion.div>
            <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
              {heroTabs.map(tab => {
                const isActive = activeHeroTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => handleHeroTabClick(tab.id)}
                    className={`relative whitespace-nowrap px-3 pt-1.5 pb-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 border overflow-hidden ${isActive ? 'bg-sky-500/20 border-sky-400/60 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,.25)]' : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-500/60'}`}>
                    {tab.label}
                    {isActive && <span key={progressKey} className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-full" style={{ animation: 'hero-tab-progress 6s linear forwards' }} />}
                  </button>
                );
              })}
            </div>
            <style jsx>{`@keyframes hero-tab-progress{from{width:0%}to{width:100%}}`}</style>
            <div className="h-[400px] sm:h-[380px] lg:h-[340px]">
              {heroTabs.map(tab => activeHeroTab === tab.id && (
                <motion.div key={tab.id} initial={{ opacity: 0, x: heroDirection * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: heroDirection * -30 }} transition={{ duration: .45, ease: 'easeOut' }} className="mt-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">{tab.title}</h1>
                  <p className="mt-4 text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">{tab.tagline}</p>
                  <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">At Giggs Software Labs, we combine the power of AI, Automation, Cybersecurity, and Performance Engineering to help enterprises innovate faster, operate smarter, and scale securely in the digital era.</p>
                  <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 w-full">
                    <Button href={tab.buttonHref} variant="primary" className="w-full sm:w-auto">{tab.buttonText}</Button>
                    <Button href="/contact" variant="secondary" className="w-full sm:w-auto">Talk to an Expert</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="relative w-full border-b border-slate-800 bg-slate-900/50 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">Trusted by global organizations across</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-bold text-slate-300 md:text-base">
            <span>India</span><span className="text-sky-500">•</span><span>Saudi Arabia</span><span className="text-sky-500">•</span><span>Singapore</span><span className="text-sky-500">•</span><span>UAE</span><span className="text-sky-500">•</span><span>USA</span>
          </div>
        </div>
      </section>

      {/* FIXED PARTNER LOGOS */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-800/40 bg-slate-950/80 py-4 backdrop-blur-lg shadow-[0_-4px_30px_rgba(0,0,0,.5)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {[{ src: '/logo/kantarW.png', alt: 'Kantar' }, { src: '/logo/SaksoftW.png', alt: 'Saksoft' }, { src: '/logo/accentureW.png', alt: 'Accenture' }, { src: '/logo/jioW.png', alt: 'Jio' }, { src: '/logo/ITC_Infotech_transparent_large.png', alt: 'ITC' }, { src: '/logo/infogainW.png', alt: 'Infogain' }].map(p => (
              <Image key={p.alt} src={p.src} alt={p.alt} width={120} height={32} className="h-6 md:h-8 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
            ))}
          </div>
        </div>
      </div>

      {/* EMPOWERING */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 md:px-6">
        <SectionTitle eyebrow="Empowering Intelligence" title="Empowering Every Industry with Intelligence." align="center" />
        <div className="max-w-4xl mx-auto mt-4 text-center">
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            At Giggs Software Labs, we combine the power of{' '}<span className="text-sky-300 font-semibold">AI</span>,{' '}<span className="text-sky-400 font-semibold">Automation</span>,{' '}<span className="text-blue-400 font-semibold">Cybersecurity</span>, and{' '}<span className="text-blue-300 font-semibold">Performance Engineering</span>{' '}to help enterprises innovate faster, operate smarter, and scale securely in the digital era.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] px-6 py-2.5 font-medium text-black shadow-[0_0_20px_rgba(56,189,248,.5)] hover:brightness-110 transition">Explore Our Solutions</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-sky-500/40 bg-slate-950/60 px-6 py-2.5 font-medium text-slate-100 hover:border-sky-400 hover:bg-slate-900/80 transition">Talk to an Expert</Link>
          </div>
        </div>
      </section>

      {/* ===== FOUR PILLARS ===== */}
      <FourPillarsSection />

      {/* ENTERPRISE TRANSFORMATION */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 md:px-6">
        <div className="mb-10 grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Engineering Digital<br className="hidden lg:block" /> Transformation at Scale</h2>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">Giggs Software Labs combines engineering precision with AI-powered innovation to help enterprises transform faster, operate smarter, and scale securely.</p>
          </div>
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
            { title: 'Speed', desc: 'Accelerate digital product delivery', icon: <svg className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, border: 'border-sky-500/30', bg: 'bg-sky-500/5' },
            { title: 'Intelligence', desc: 'Leverage AI and advanced analytics', icon: <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, border: 'border-indigo-500/30', bg: 'bg-indigo-500/5' },
            { title: 'Security', desc: 'Build resilient and secure digital ecosystems', icon: <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, border: 'border-blue-500/30', bg: 'bg-blue-500/5' },
          ].map(col => (
            <div key={col.title} className={`relative overflow-hidden rounded-2xl border ${col.border} ${col.bg} p-8 backdrop-blur-sm transition hover:bg-slate-900/60`}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/50 shadow-inner border border-slate-800">{col.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-white">{col.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-10 text-center max-w-3xl mx-auto"><SectionTitle eyebrow="Domains" title="Industries We Serve" subtitle="Deep domain expertise paired with intelligent engineering." align="center" /></div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Fintech', icon: <svg className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, solve: 'Intelligent risk modeling, AI compliance, and fraud analytics.' },
            { name: 'Health Tech', icon: <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, solve: 'Predictive diagnostics, data interoperability, and patient intelligence.' },
            { name: 'Retail Tech', icon: <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>, solve: 'Customer analytics, recommendation engines, and demand forecasting.' },
            { name: 'Martech', icon: <svg className="h-8 w-8 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>, solve: 'AI-driven campaigns, hyper-personalization, and automated marketing workflows.' },
          ].map(industry => (
            <div key={industry.name} className="group relative rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,.2)] hover:border-sky-500/30">
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/50 border border-slate-800 shadow-inner">{industry.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{industry.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{industry.solve}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionTitle eyebrow="Proof of Work" title="Real Impact. Real Results." subtitle="How we engineer transformative outcomes for global enterprises." align="left" />
          <Button href="/blog#case-studies" variant="secondary" className="shrink-0 max-w-max">View All Case Studies</Button>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            { category: 'Retail AI Platform', metric: 'Reduced forecasting errors by 35%', desc: 'Built an intelligent demand forecasting engine processing billions of data points in real time.', color: 'sky' },
            { category: 'Cybersecurity Automation', metric: 'Detected threats 5x faster', desc: 'Deployed a predictive defense system and automated SOC triaging using advanced behavioral analytics.', color: 'indigo' },
            { category: 'Performance Optimization', metric: 'Improved system speed by 40%', desc: 'Engineered a highly available cloud-native architecture capable of handling extreme peak traffic.', color: 'blue' },
          ].map(study => (
            <div key={study.category} className="group relative rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,.2)] hover:border-sky-500/30">
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">{study.category}</div>
              <div className={`mb-4 text-2xl md:text-3xl font-black text-${study.color}-400 leading-tight`}>{study.metric}</div>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">{study.desc}</p>
              <div className="mt-auto flex items-center text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Read the case study<span className="ml-2 transition-transform group-hover:translate-x-1">→</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
        <div className="relative overflow-hidden rounded-[3rem] border border-slate-800/60 bg-slate-950/40 p-1 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,.5)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(56,189,248,.08),_transparent_70%)]" />
          <div className="relative z-10 p-6 md:p-10">
            <div className="mb-8 md:mb-12"><SectionTitle eyebrow="Reach" title="Global Engineering Presence" subtitle="Collaborating with organizations across the world." align="center" /></div>
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-slate-800/50 bg-slate-900/20 p-2 md:p-6 transition-all duration-500 hover:border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="relative h-64 md:h-[28rem] w-full overflow-hidden rounded-3xl bg-slate-950/50 border border-slate-800/40">
                  <Image src="/regions-map.png" alt="World map" fill className="object-cover opacity-80" style={{ filter: 'brightness(1.1) grayscale(0.2)' }} />
                  {[{ l: '12%', t: '22%', n: 'USA', c: 'cyan' }, { l: '70%', t: '44%', n: 'Saudi Arabia', c: 'sky' }, { l: '84%', t: '42%', n: 'India', c: 'indigo' }, { l: '74%', t: '46%', n: 'UAE', c: 'blue' }, { l: '92%', t: '55%', n: 'Singapore', c: 'sky' }].map(loc => (
                    <div key={loc.n} className="absolute" style={{ left: loc.l, top: loc.t }}>
                      <div className={`h-6 w-6 md:h-8 md:w-8 rounded-full bg-${loc.c}-500/20 blur-md animate-pulse`} />
                      <div className={`absolute inset-0 m-auto h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-${loc.c}-400 shadow-[0_0_12px_#38bdf8]`} />
                      <div className="mt-1 md:mt-2 -translate-x-1/2 rounded-md bg-slate-950/90 border border-slate-800 px-1.5 md:px-2 py-0.5 text-[8px] md:text-[9px] font-bold text-white backdrop-blur-sm whitespace-nowrap">{loc.n}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full">
          <SectionTitle eyebrow="Thought Leadership" title="Insights from Giggs Experts" subtitle="Explore our blogs, whitepapers, and case studies to discover how enterprises are reimagining the future with AI, Data, and Automation." align="left" />
          <Button href="/blog" variant="secondary" className="shrink-0 max-w-max">Explore Insights</Button>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            { type: 'Blog', title: 'The Rise of AI-Driven Cybersecurity', desc: 'How predictive behavioral analytics are replacing signature-based detection models in modern enterprise SOCs.', date: 'Mar 12, 2024', color: 'sky' },
            { type: 'Whitepaper', title: 'Building Intelligent Data Platforms', desc: 'A comprehensive guide to transitioning from legacy data warehouses to scalable, real-time AI data lakes.', date: 'Feb 28, 2024', color: 'indigo' },
            { type: 'Article', title: 'Performance Engineering in Cloud Native Systems', desc: 'Techniques for ensuring sub-second response times and extreme scalability in distributed microservices architectures.', date: 'Feb 15, 2024', color: 'blue' },
          ].map(insight => (
            <Link key={insight.title} href="/blog" className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all hover:-translate-y-2 hover:bg-slate-900 hover:border-sky-500/30 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,.15)]">
              <div>
                <div className={`mb-4 inline-flex items-center rounded-full border border-${insight.color}-500/30 bg-${insight.color}-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-${insight.color}-300`}>{insight.type}</div>
                <h3 className="mb-3 text-xl font-bold text-slate-100 group-hover:text-white transition-colors">{insight.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{insight.desc}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mt-6 pt-6 border-t border-slate-800/50">
                <span>{insight.date}</span><span className="text-sky-400 group-hover:translate-x-1 transition-transform">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-5xl px-4 pb-14 md:px-6">
        <div className="mb-10"><SectionTitle eyebrow="Trust" title="Trusted by global organizations" subtitle="" align="center" /></div>
        <div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {[{ name: 'Kantar', src: '/logo/kantarW.png' }, { name: 'JioHotstar', src: '/logo/jioW.png' }, { name: 'Xebia', src: '/logo/xebiaW.png' }, { name: 'Accenture', src: '/logo/accentureW.png' }, { name: 'ITCinfotech', src: '/logo/ITC_Infotech_transparent_large.png' }, { name: 'HappiestMinds', src: '/logo/happiestW.png' }, { name: 'JioStar', src: '/logo/JioStarW.png' }, { name: 'Gspann', src: '/logo/GspannW.png' }, { name: 'Infogain', src: '/logo/infogainW.png' }, { name: 'Successive Digital', src: '/logo/Succesive_digitalW.png' }, { name: 'Saksoft', src: '/logo/SaksoftW.png' }, { name: 'Impetus', src: '/logo/ImpetusW.png' }].map(partner => (
            <div key={partner.name} className="flex items-center justify-center py-2">
              <Image src={partner.src} alt={partner.name} width={100} height={28} className="h-6 md:h-7 w-auto flex-shrink-0 object-contain opacity-40 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-500/30 bg-slate-900 p-8 md:p-14 shadow-[0_0_50px_rgba(56,189,248,.15)] text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,.1),_transparent_60%)] blur-2xl" />
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Start Your Digital Transformation Journey</h2>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-10">Speak with Giggs experts to explore how AI, automation and intelligent engineering can transform your business.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button href="/contact" variant="primary" className="w-full sm:w-auto px-8 py-4 text-base">Schedule Consultation</Button>
              <Button href="/contact" variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}