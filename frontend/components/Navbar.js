// frontend/components/Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

const serviceSubLinks = [
  { href: '/services/cybersecurity', label: 'Cybersecurity', desc: 'Enterprise-grade threat intelligence and 24/7 autonomous protection.' },
  { href: '/services/ai-data', label: 'AI & Data', desc: 'Scalable machine learning and predictive analytics for real-world intelligence.' },
  { href: '/services/performance', label: 'Performance', desc: 'Precision tuning and architectural optimization for mission-critical systems.' },
  { href: '/services/automation', label: 'Automation', desc: 'Hyper-automated workflows and self-healing infrastructure deployments.' },
];

const productSubLinks = [
  { href: '/products/mihawk', label: 'Mihawk', desc: 'Flagship security platform with AI-driven detection and automated response.' },
  { href: '/products/ai-data', label: 'AI & Data', desc: 'Intelligent data pipelines and agentic AI solutions as a service.' },
  { href: '/products/performance', label: 'Performance', desc: 'Suite of optimization tools for high-load application environments.' },
];

function BrandLogo() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      <img
        src="/logo/logo.png"
        alt="Giggs Software Labs"
        className="h-8 md:h-9 w-auto object-contain"
        style={{ display: 'block' }}
      />
    </div>
  );
}

function MottoCycler({ lines = [], intervalMs = 3200 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!lines || lines.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % lines.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [lines, intervalMs]);

  const current = lines[index] ?? '';

  return (
    <div className="w-full select-none relative" style={{ height: '14px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="absolute inset-0 text-[10px] text-sky-600 text-center font-bold uppercase tracking-[0.18em] leading-normal select-none"
          style={{ whiteSpace: 'nowrap' }}
        >
          {current}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Mega Dropdown Component ── */
function MegaDropdown({ active, items, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute left-0 w-full top-full z-50 pointer-events-auto border-b border-sky-200/40 shadow-2xl"
      style={{ background: 'linear-gradient(180deg, rgba(224,242,255,0.98) 0%, rgba(240,248,255,0.99) 50%, rgba(255,255,255,0.98) 100%)' }}
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Panel: Description */}
          <div className="w-full md:w-1/3 shrink-0">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400 mb-3">{type} Portfolio</h3>
            <p className="text-sm text-slate-500 leading-relaxed pr-4">
              {type === 'Services'
                ? 'Explore our core capabilities and comprehensive solutions designed to unlock intelligent business transformation.'
                : 'Discover our cutting-edge product suites built for scale, intelligence, and continuous performance.'}
            </p>
          </div>

          {/* Right Panel: Links Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="group relative flex flex-col justify-center rounded-xl p-4 transition-all hover:bg-white/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-tight transition-colors group-hover:text-sky-600">
                    {sub.label}
                  </div>
                  <svg className="h-4 w-4 text-sky-500 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-medium group-hover:text-slate-600">
                  {sub.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [router.asPath]);

  const mottoLines = [
    'Engineering Intelligence',
    'Powering Performance',
    'Securing the Future',
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 backdrop-blur-xl ${scrolled ? 'shadow-md py-2' : 'py-4'}`}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(224,242,255,0.97) 60%, rgba(186,225,255,0.95) 100%)',
        borderBottom: activeDropdown ? '1px solid transparent' : '1px solid rgba(59,155,213,0.25)',
        transition: 'border-color 0.2s ease, padding 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4rem] items-center justify-between py-2">

          <div className="flex items-center">
            <Link href="/" aria-label="Go to home" className="flex flex-col items-center">
              <div className="transition-transform hover:scale-[1.02]">
                <BrandLogo />
              </div>
              <span
                className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-tight whitespace-nowrap leading-tight mt-0.5"
                style={{ color: '#3B9BD5' }}
              >
                Giggs Software Labs
              </span>
            </Link>
          </div>

          {/* Nav + Mobile Toggle — all pushed right */}
          <div className="flex items-center gap-1 lg:gap-2 ml-auto">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const hasDropdown = link.label === 'Services' || link.label === 'Products';
                const isActive = router.asPath.startsWith(link.href) && (link.href !== '/' || router.asPath === '/');

                return (
                  <div
                    key={link.href}
                    className="h-full flex items-center"
                    onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-full ${isActive ? 'text-[#2980B9]' : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'}`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full" style={{ backgroundColor: '#3B9BD5' }} />
                      )}
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === link.label && hasDropdown && (
                        <MegaDropdown
                          active={activeDropdown === link.label}
                          type={link.label}
                          items={link.label === 'Services' ? serviceSubLinks : productSubLinks}
                          onClose={() => setActiveDropdown(null)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 border border-slate-200 transition-all ${isOpen ? 'rotate-90' : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gradient bleed — fades the navbar's blue bottom edge into the page */}
      {!activeDropdown && (
        <div
          className="pointer-events-none absolute left-0 w-full"
          style={{
            top: '100%',
            height: '60px',
            background: 'linear-gradient(180deg, rgba(186,225,255,0.45) 0%, rgba(135,206,250,0.18) 35%, rgba(56,189,248,0.06) 65%, transparent 100%)',
            zIndex: 90,
          }}
        />
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 z-[90] md:hidden backdrop-blur-xl border-b border-sky-200/40 shadow-2xl p-6"
            style={{ background: 'linear-gradient(180deg, rgba(224,242,255,0.97) 0%, rgba(240,248,255,0.98) 40%, rgba(255,255,255,0.96) 100%)' }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="text-2xl font-black text-slate-800 uppercase tracking-tight"
                  >
                    {link.label}
                  </Link>

                  {(link.label === 'Services' || link.label === 'Products') && (
                    <div className="mt-4 flex flex-col gap-3 pl-4 border-l-2 border-sky-100">
                      {(link.label === 'Services' ? serviceSubLinks : productSubLinks).map((sub) => (
                        <Link key={sub.href} href={sub.href} className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{sub.label}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5">{sub.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
