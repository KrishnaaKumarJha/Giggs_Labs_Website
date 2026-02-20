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
  { href: '/contact', label: 'Contact' },
];

const serviceSubLinks = [
  { href: '/services/cybersecurity', label: 'Cybersecurity', icon: '🛡️', desc: 'Enterprise-grade threat intelligence and 24/7 autonomous protection.' },
  { href: '/services/ai-data', label: 'AI & Data', icon: '🧠', desc: 'Scalable machine learning and predictive analytics for real-world intelligence.' },
  { href: '/services/performance', label: 'Performance', icon: '⚡', desc: 'Precision tuning and architectural optimization for mission-critical systems.' },
  { href: '/services/automation', label: 'Automation', icon: '🤖', desc: 'Hyper-automated workflows and self-healing infrastructure deployments.' },
];

const productSubLinks = [
  { href: '/products/mihawk', label: 'Mihawk', icon: '🛡️', desc: 'Flagship security platform with AI-driven detection and automated response.' },
  { href: '/products/ai-data', label: 'AI & Data', icon: '🧠', desc: 'Intelligent data pipelines and agentic AI solutions as a service.' },
  { href: '/products/performance', label: 'Performance', icon: '⚡', desc: 'Suite of optimization tools for high-load application environments.' },
];

function BrandLogo() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      <img
        src="/logo/logo.png"
        alt="Giggs Software Lab"
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
    <div className="w-full select-none" style={{ minHeight: '16px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="text-[10px] text-sky-600 text-center font-bold uppercase tracking-[0.18em] leading-normal select-none"
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
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="absolute left-1/2 -translate-x-1/2 top-full pt-6 z-50 pointer-events-auto"
      onMouseLeave={onClose}
    >
      <div className="w-[450px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{type} Portfolio</span>
            <div className="h-px flex-1 bg-slate-100 mx-4" />
          </div>

          <div className="grid grid-cols-1 gap-1">
            {items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="group relative flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all hover:bg-slate-50 hover:border-slate-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                  {sub.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-slate-900 uppercase tracking-tight">{sub.label}</div>
                  <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-1 font-medium">
                    {sub.desc}
                  </p>
                </div>
                <svg className="h-4 w-4 text-slate-300 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
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
    'Engineering Intelligence.',
    'Powering Performance.',
    'Securing the Future.',
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 bg-white border-b border-slate-100 ${scrolled ? 'shadow-sm py-2' : 'bg-white/95 backdrop-blur-md py-4'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4rem] items-center justify-between py-2">

          <div className="flex items-center">
            <Link href="/" aria-label="Go to home" className="flex flex-col items-start">
              <div className="transition-transform hover:scale-[1.02]">
                <BrandLogo />
              </div>
              <div className="w-full max-w-[280px]">
                <MottoCycler lines={mottoLines} intervalMs={2000} />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const hasDropdown = link.label === 'Services' || link.label === 'Products';
              const isActive = router.asPath.startsWith(link.href) && (link.href !== '/' || router.asPath === '/');

              return (
                <div
                  key={link.href}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-full ${isActive ? 'text-black' : 'text-slate-500 hover:text-black hover:bg-slate-50'}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-black" />
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

          <div className="flex items-center gap-4">
            <Link href="/careers" className="hidden md:inline-flex rounded-full bg-black px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-slate-800 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              Join Us
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-900 border border-slate-200 transition-all ${isOpen ? 'rotate-90' : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 z-[90] md:hidden bg-white border-b border-slate-100 shadow-2xl p-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="text-2xl font-black text-slate-900 uppercase tracking-tight"
                  >
                    {link.label}
                  </Link>

                  {(link.label === 'Services' || link.label === 'Products') && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(link.label === 'Services' ? serviceSubLinks : productSubLinks).map((sub) => (
                        <Link key={sub.href} href={sub.href} className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-xl">
                          {sub.icon}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link href="/careers" className="block text-center rounded-xl bg-black py-4 text-[11px] font-black uppercase tracking-widest text-white">
                  Join Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
