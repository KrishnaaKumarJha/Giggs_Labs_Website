// frontend/pages/index.js
import Link from 'next/link';
import Image from 'next/image';
import {
  motion, useAnimation, useInView, AnimatePresence,
} from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../components/Button';
import PageShell from '../components/pageshell';
import SectionTitle from '../components/SectionTitle';
import { Rocket, BrainCircuit, ArrowUpRight, ShieldCheck, Handshake, ChevronRight } from 'lucide-react';

// ─── Shared ───────────────────────────────────────────────────────────────────
// Hero metrics pulled from audit Image 3
const HERO_METRICS = [
  { label: 'Deployments', value: '120+' },
  { label: 'Retention', value: '98%' },
  { label: 'First delivery', value: '6–12wk' },
];

// ─── PILLARS — text taken directly from live site ────────────────────────────
// Brand palette: Deep Tech Blue #0B1F3B | Electric Blue #1E7BFF | AI Violet #7A5CFF | Neon Cyan #2ED6FF
const PILLARS = [
  {
    id: 'data', index: '01',
    label: 'AI & Data Science',
    title: 'AI & Data Engineering',
    tagline: 'Transforming Data into Intelligence.',
    description: 'We build scalable ML platforms and data pipelines that turn raw business data into automated decisions — so your team acts on insight, not gut feel.',
    capabilities: [
      { tech: 'Generative AI & ML', impact: '' },
      { tech: 'Data Engineering', impact: '' },
      { tech: 'MLOps', impact: 'models ship in weeks, not months' },
    ],
    outcomes: 'Faster data-to-insight cycles, predictive decision systems, enterprise-grade scalability.',
    href: '/services/ai-data',
    accent: '#2ED6FF', accentAlt: '#1E7BFF',
    visual: 'data',
  },
  {
    id: 'cyber', index: '02',
    label: 'AI-Driven Cybersecurity',
    title: 'AI-Driven Cybersecurity',
    tagline: 'Securing the Future Through Intelligence.',
    description: 'We integrate AI into every security layer so threats are detected before damage occurs — not after. Real-time response, automated compliance, and continuous monitoring.',
    capabilities: [
      { tech: 'AI Threat Detection', impact: '' },
      { tech: 'SOC Automation', impact: 'alerts that matter, noise removed' },
      { tech: 'Zero Trust', impact: 'no implicit access, ever' },
    ],
    outcomes: 'Real-time threat visibility, faster breach detection, SOC 2 / ISO 27001 readiness.',
    href: '/services/cybersecurity',
    accent: '#2ED6FF', accentAlt: '#1E7BFF',
    visual: 'cyber',
  },
  {
    id: 'performance', index: '03',
    label: 'Performance Engineering',
    title: 'Performance Engineering',
    tagline: 'Delivering Reliability & Speed.',
    description: 'We optimize infrastructure and code to handle extreme scale. We eliminate bottlenecks so your systems perform flawlessly under pressure, every time.',
    capabilities: [
      { tech: 'App & Infra Optimization', impact: '' },
      { tech: 'APM', impact: 'visibility into every millisecond' },
      { tech: 'Cloud Cost Optimization', impact: 'cut waste, not performance' },
    ],
    outcomes: 'Sub-second response times, 99.99% availability, minimized cloud overhead.',
    href: '/services/performance',
    accent: '#2ED6FF', accentAlt: '#1E7BFF',
    visual: 'performance',
  },
  {
    id: 'automation', index: '04',
    label: 'Automation Engineering',
    title: 'Automation Engineering',
    tagline: 'Automating at Enterprise Scale.',
    description: 'We eliminate manual friction across your entire stack. From DevOps to business processes, we build the "digital nervous system" that powers your growth.',
    capabilities: [
      { tech: 'RPA', impact: 'automate high-volume manual tasks' },
      { tech: 'IaC', impact: 'infra that scales with code, not headcount' },
      { tech: 'Hyperautomation', impact: '' },
    ],
    outcomes: '80% reduced manual effort, faster go-to-market, unified governance.',
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

function DashboardVisual() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-8 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        <span className="ml-2 text-[10px] font-mono text-slate-500">ml-pipeline: main</span>
      </div>
      <div className="p-6 pt-12 font-mono text-[11px] leading-relaxed">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <p className="text-blue-400">import <span className="text-white">torch, sklearn</span></p>
            <p className="text-purple-400">class <span className="text-white">RiskModel(nn.Module):</span></p>
            <p className="text-indigo-400">  def <span className="text-white">forward(self, x):</span></p>
            <p className="text-slate-400">    z = self.encoder(x)</p>
            <p className="text-slate-400">    # FinTech risk scoring</p>
            <p className="text-slate-400">    return self.head(z)</p>
            <p className="text-emerald-400">model = RiskModel(cfg)</p>
            <p className="text-emerald-400">AutoDeploy.ship(model)</p>
            <p className="text-slate-500 mt-4"># ✓ Deployed in 6 weeks</p>
          </div>
          <div className="w-48 space-y-4">
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
              <p className="text-[10px] text-slate-500 mb-1 caps">Latency P99</p>
              <p className="text-lg font-bold text-white">12ms</p>
              <p className="text-[9px] text-emerald-400">▲ 2x faster</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
              <p className="text-[10px] text-slate-500 mb-1 caps">Throughput</p>
              <p className="text-lg font-bold text-white">4.2k/s</p>
              <p className="text-[9px] text-emerald-400">▲ 40% faster</p>
            </div>
          </div>
        </div>
        <div className="mt-8 relative h-24 w-full">
           <svg className="w-full h-full" viewBox="0 0 400 100">
             <path d="M0,80 Q50,75 100,60 T200,40 T300,30 T400,10" fill="none" stroke="#38bdf8" strokeWidth="2" />
             <path d="M0,80 Q50,75 100,60 T200,40 T300,30 T400,10 L400,100 L0,100 Z" fill="url(#grad)" opacity="0.1" />
             <defs>
               <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" style={{stopColor: '#38bdf8', stopOpacity: 1}} />
                 <stop offset="100%" style={{stopColor: '#38bdf8', stopOpacity: 0}} />
               </linearGradient>
             </defs>
           </svg>
           <div className="absolute top-0 right-0 p-2 text-[8px] text-sky-400 font-bold tracking-widest">LIVE DATA</div>
        </div>
      </div>
    </div>
  );
}
function ComplianceStrip() {
  const badges = [
    { label: 'SOC 2 Type II', icon: <ShieldCheck className="w-3 h-3" /> },
    { label: 'ISO 27001', icon: <ShieldCheck className="w-3 h-3" /> },
    { label: 'GDPR Compliant', icon: <ShieldCheck className="w-3 h-3" /> },
    { label: 'HIPAA Ready', icon: <ShieldCheck className="w-3 h-3" /> },
    { label: 'NDA-First Engagement', icon: <Handshake className="w-3 h-3" /> },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4 border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
      {badges.map(b => (
        <div key={b.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-700/50 bg-slate-800/30 text-[10px] font-bold text-slate-400 caps tracking-wider">
          <span className="text-sky-400">{b.icon}</span>
          {b.label}
        </div>
      ))}
    </div>
  );
}

function AudienceSelector() {
  return (
    <section className="relative z-10 w-full py-16 px-4 md:px-6 bg-slate-950">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-tight">New to Giggs?</h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Select your industry and current stage so we can show you the most relevant case studies and delivery models.</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          {['FinTech', 'HealthTech', 'Enterprise IT'].map(industry => (
            <button key={industry} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all text-left group">
              <p className="text-[10px] font-black tracking-[0.2em] text-sky-500 mb-2 uppercase">I'm in</p>
              <p className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">{industry}</p>
              <div className="mt-4 flex items-center text-[11px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-widest">
                Explore Path <ArrowUpRight className="ml-1 w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
function EnterpriseSecurityPortal() {
  return (
    <section className="relative z-10 w-full py-24 px-4 md:px-6 border-t border-slate-900 bg-[#070e1a]">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">Enterprise Readiness</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Built for <span className="text-sky-400">Security-First</span> Procurement.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">We Understand the Rigor of Enterprise Compliance. Giggs Software Labs Operates on an NDA-First Engagement Model, Ensuring Your IP and Data are Protected from Day Zero.</p>
            
            <div className="space-y-4">
              {[
                { title: 'NDA-First Data Protection', desc: 'Secure legal framework for all data & IP handling.' },
                { title: 'SOC 2 & ISO Alignment', desc: 'Working within your existing compliance frameworks.' },
                { title: 'Production-First MLOps', desc: 'We skip the "labs" phase and go straight to secure deployment.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50">
                  <div className="mt-1 h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
            <div>
              <p className="text-xl font-bold text-white mb-6">The Giggs Security Standard</p>
             <ul className="space-y-6">
                <li className="flex items-start gap-4">
                   <div className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                     <ShieldCheck className="w-4 h-4 text-sky-400" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-200 uppercase tracking-widest text-[9px] mb-1">Infrastructure</p>
                     <p className="text-xs text-slate-400">VPC-only deployments. No public endpoints by default. Zero Trust architecture.</p>
                   </div>
                </li>
                <li className="flex items-start gap-4">
                   <div className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                     <BrainCircuit className="w-4 h-4 text-sky-400" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-200 uppercase tracking-widest text-[9px] mb-1">Model Governance</p>
                     <p className="text-xs text-slate-400">Strict data residency. PII scrubbing at the gateway. Audit trails for every inference.</p>
                   </div>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, idx }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-black border border-sky-500/30 text-sky-400 bg-sky-400/10">{pillar.index}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500">{pillar.label}</span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">{pillar.title}</h3>
      <p className="text-sm font-semibold text-sky-300 mb-4">{pillar.tagline}</p>
      <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{pillar.description}</p>

      {/* JARGON TRANSLATION TAGS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {pillar.capabilities.map((cap) => (
          <div key={cap.tech} className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-slate-200">{cap.tech}</span>
            {cap.impact && <span className="text-[9px] font-medium text-slate-500 caps tracking-tighter">— {cap.impact}</span>}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800/50">
        <div className="mb-6 rounded-xl bg-sky-400/5 p-4 border border-sky-500/10">
           <p className="text-[9px] font-black text-sky-500 uppercase tracking-widest mb-1.5">Outcome</p>
           <p className="text-xs text-slate-300 leading-relaxed font-medium">{pillar.outcomes}</p>
        </div>
        <Link href={pillar.href} className="inline-flex items-center text-sm font-bold text-white hover:text-sky-400 transition-colors group">
          Learn more <ArrowUpRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function FourPillarsSection() {
  return (
    <section className="relative w-full py-20 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-sky-500 mb-4">Our Expertise · Your Edge</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">The Four Pillars <span className="text-slate-500">of Innovation.</span></h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">Giggs Software Labs drives transformation through four core practices — engineered from the ground up for enterprise reliability.</p>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-sky-400 group transition-colors">
            Explore All Services <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
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

  return (
    <PageShell fluid={true}>
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#334155 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,rgba(56,189,248,0.15),transparent_70%)]" />

      {/* HERO SECTION - REDESIGNED PER AUDIT */}
      <section className="relative z-10 w-full pt-0 lg:pt-2 pb-16 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* TEXT CONTENT */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-2.5 mb-8">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-sky-400 backdrop-blur-md w-fit">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  GIGGS SOFTWARE LABS
                </div>
                <p className="text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 pl-1.5 whitespace-nowrap opacity-90 leading-tight">
                  ENGINEERING INTELLIGENCE · POWERING PERFORMANCE · SECURING THE FUTURE
                </p>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
                AI Engineering for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 whitespace-nowrap">FinTech & HealthTech.</span> <br />
                Deploy 40% Faster.
              </h1>
              
              <p className="text-xl md:text-2xl font-medium text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Consulting & Implementation for Production ML Systems. <br />
                <span className="text-slate-500 font-bold block mt-2">— Not SaaS.</span>
              </p>

              {/* QUICK METRICS */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 border-l border-slate-800 pl-6">
                {HERO_METRICS.map(m => (
                  <div key={m.label}>
                    <p className="text-2xl font-black text-white">{m.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Deployments</p>
                  </div>
                ))}
              </div>

                <div className="w-full sm:w-auto">
                  <Button href="/contact" variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg !rounded-xl">
                    Talk to an Expert
                  </Button>
                  <p className="mt-3 text-[11px] font-medium text-slate-500 text-center sm:text-left pl-1 italic">
                    Book a 30-min discovery call — no pitch, no commitment.
                  </p>
                </div>
            </motion.div>

            {/* DECORATIVE VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <DashboardVisual />
              {/* Decorative blobs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      <ComplianceStrip />
      
      {/* TRUST BAR */}
      <section className="relative z-10 w-full bg-slate-950/50 py-12 border-b border-slate-900">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-10">Trusted by global organizations across India · Saudi Arabia · Singapore · UAE · USA</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {[
              { src: '/logo/manual_AmazonW.png', alt: 'Amazon', h: 'h-6 md:h-10' },
              { src: '/logo/JioStarW.png', alt: 'Jio Star', h: 'h-8 md:h-12' },
              { src: '/logo/disney_hotstar.png', alt: 'Disney Hotstar', h: 'h-10 md:h-14' },
              { src: '/logo/manual_kantarW.png', alt: 'Kantar', h: 'h-5 md:h-9' },
              { src: '/logo/accentureW.png', alt: 'Accenture', h: 'h-6 md:h-10' },
            ].map(p => (
              <div key={p.alt} className="flex items-center justify-center p-2">
                <Image src={p.src} alt={p.alt} width={140} height={40} className={`${p.h} w-auto object-contain transition-all hover:scale-105`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AudienceSelector />

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
            <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">Giggs Software Labs Combines Engineering Precision with AI-Powered Innovation to Help Enterprises Transform Faster, Operate Smarter, and Scale Securely.</p>
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

      {/* PROOF OF WORK (REBRANDED FROM CASE STUDIES) */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <div className="mb-14">
          <SectionTitle eyebrow="Proof of Work" title="Real Impact. Real Results." subtitle="How we engineer transformative outcomes for global enterprises." align="left" />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            { category: 'Performance Optimization', metric: 'Improved system speed by 40%', desc: 'Engineered a highly available cloud-native architecture capable of handling extreme peak traffic.', color: 'sky', href: '/case-studies/autoload-ai' },
            { category: 'Cybersecurity Automation', metric: 'Detected threats 5x faster', desc: 'Deployed a predictive defense system and automated SOC triaging using advanced behavioral analytics.', color: 'indigo', href: '/case-studies/mihawk' },
            { category: 'Cloud & Automation', metric: 'Reduced manual effort by 60%', desc: 'Built platform-agnostic cloud architecture across AWS, Azure, and GCP — engineered for scale and intelligent automation.', color: 'blue', href: '/case-studies/automation-engineering' },
          ].map(study => (
            <Link key={study.category} href={study.href} className="group relative rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,.2)] hover:border-sky-500/30">
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">{study.category}</div>
              <div className={`mb-4 text-2xl md:text-3xl font-black text-${study.color}-400 leading-tight`}>{study.metric}</div>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">{study.desc}</p>
              <div className="mt-auto flex items-center text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Read the case study<span className="ml-2 transition-transform group-hover:translate-x-1">→</span></div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — Compact Single Card */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border border-slate-800/60 bg-slate-950/50 backdrop-blur-xl"
        >
          {/* Subtle glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(56,189,248,.08),transparent_70%)]" />

          <div className="relative z-10 p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-px w-6 bg-sky-400/60" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">Client Commendations</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Trusted by Enterprises.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">Proven by Outcomes.</span>
                </h2>
              </div>
              <Link
                href="/testimonials"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white border border-slate-700 bg-slate-900/60 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all shrink-0"
              >
                View All Testimonials
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* 4 Stat Columns with Lucide Icons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/30 rounded-2xl overflow-hidden">
              {[
                { Icon: Rocket, stat: '30–40%', label: 'Faster Delivery', sub: 'Accelerating timelines without compromising quality', color: 'sky' },
                { Icon: BrainCircuit, stat: 'Deep', label: 'Technical Expertise', sub: 'AI, Data, Cybersecurity & Scalable Systems', color: 'indigo' },
                { Icon: ShieldCheck, stat: 'Enhanced', label: 'System Resilience', sub: 'Improved performance across critical workflows', color: 'blue' },
                { Icon: Handshake, stat: 'Long-term', label: 'Partnerships', sub: 'Outcome-driven, not just delivery-driven', color: 'sky' },
              ].map((item, idx) => (
                <div key={item.label} className="group bg-slate-950/60 p-6 hover:bg-slate-900/40 transition-colors">
                  <item.Icon className={`w-5 h-5 text-${item.color}-400 mb-3 group-hover:scale-110 transition-transform`} />
                  <div className={`text-xl font-black text-white mb-0.5`}>{item.stat}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-300 mb-2">{item.label}</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Social Proof Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
              <span>Partnered across</span>
              {['Media & OTT', 'Enterprise IT', 'FinTech', 'High-Growth Startups'].map((s, i) => (
                <React.Fragment key={s}>
                  {i > 0 && <span className="text-slate-700">·</span>}
                  <span className="text-slate-400">{s}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
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
                  {[{ l: '12%', t: '22%', n: 'USA', c: 'cyan' }, { l: '70%', t: '44%', n: 'Saudi Arabia', c: 'sky' }, { l: '84%', t: '42%', n: 'India', c: 'indigo' }, { l: '75.5%', t: '44%', n: 'UAE', c: 'blue' }, { l: '95%', t: '65%', n: 'Singapore', c: 'sky' }].map(loc => (
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

      <EnterpriseSecurityPortal />

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-500/30 bg-slate-900 p-8 md:p-14 shadow-[0_0_50px_rgba(56,189,248,.15)] text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,.1),_transparent_60%)] blur-2xl" />
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-6">Next Step</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Talk to an Engineer, <br />Not a Salesperson.</h2>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-10">No boilerplate templates. No generic slides. We'll discuss your specific architecture and how we can ship your core ML system in 6–12 weeks.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button href="/contact" variant="primary" className="w-full sm:w-auto px-10 py-5 text-lg !rounded-2xl">Book Discovery Call</Button>
            </div>
            <p className="mt-6 text-xs text-slate-500 italic">Expectation: 30-min architectural deep-dive. NDA available upon request.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}