// frontend/components/Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/industries', label: 'Industries' },
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About Us' },
];

const serviceSubLinks = [
  { href: '/solutions/ai-data', label: 'AI & Data Science', desc: 'Transforming data into actionable intelligence and automated workflows.' },
  { href: '/solutions/cybersecurity', label: 'AI-driven Cybersecurity', desc: 'Intelligent threat detection and proactive enterprise defense.' },
  { href: '/solutions/performance', label: 'Performance Engineering', desc: 'Building high-speed, scalable, and resilient systems.' },
  { href: '/solutions/automation', label: 'Automation', desc: 'Streamlining operations with intelligent automation and RPA.' },
];

const industrySubLinks = [
  { href: '/industries/banking', label: 'Fintech', desc: 'Secure, compliant, and data-driven fintech solutions.' },
  { href: '/industries/healthcare', label: 'Health-Tech', desc: 'Predictive diagnostics and patient-centric platforms.' },
  { href: '/industries/retail', label: 'Retail-Tech', desc: 'Omnichannel analytics and intelligent supply chains.' },
  { href: '/industries/manufacturing', label: 'Martech', desc: 'Smart factories and IoT-powered operational efficiency.' },
];

const productSubLinks = [
  { href: '/products/ai-data', label: 'AI & Data Science', desc: 'Enterprise-grade MLOps and scalable model deployment.' },
  { href: '/products/mihawk', label: 'AI-driven CyberSecurity', desc: 'Centralized threat intelligence and compliance monitoring.' },
];

function BrandLogo() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      <Image
        src="/logo/logo.png"
        alt="Giggs Software Labs"
        width={56}
        height={56}
        className="h-12 md:h-14 w-auto object-contain"
        priority
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
    <div className="h-4 w-full overflow-hidden pointer-events-none relative flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 18, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -18, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute text-[9px] md:text-[11px] font-extrabold tracking-tight text-center leading-tight select-none"
          style={{
            color: '#3B9BD5',
            whiteSpace: 'nowrap',
            fontVariant: 'small-caps'
          }}
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
      style={{ background: '#ffffff' }}
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Panel: Description */}
          <div className="w-full md:w-1/3 shrink-0">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400 mb-3">{type}</h3>
            <p className="text-sm text-slate-500 leading-relaxed pr-4">
              {type === 'Solutions'
                ? 'Explore our core capabilities and comprehensive solutions designed to unlock intelligent business transformation.'
                : 'Discover how we bring specialized intelligence to solve complex challenges across diverse sectors.'}
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
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setOpenMobileDropdown(null);
  }, [router.asPath]);

  const mottoLines = [
    'Engineering Intelligence',
    'Powering Performance',
    'Securing the Future',
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-4'}`}
      style={{
        background: '#ffffff',
        borderBottom: activeDropdown ? '1px solid transparent' : '1px solid rgba(0,0,0,0.08)',
        transition: 'border-color 0.2s ease, padding 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4rem] items-center justify-between py-2">

          <div className="flex items-center">
            <Link href="/" aria-label="Go to home" className="relative flex items-center -mt-2">
              <div className="relative z-10 transition-transform hover:scale-[1.02]">
                <BrandLogo />
              </div>
              <div className="absolute left-1/2 top-full -translate-x-1/2 mt-0.5 w-[160px]">
                <MottoCycler lines={mottoLines} intervalMs={4000} />
              </div>
            </Link>
          </div>

          {/* Nav + Mobile Toggle — all pushed right */}
          <div className="flex items-center gap-1 lg:gap-2 ml-auto">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const hasDropdown = link.label === 'Solutions' || link.label === 'Industries' || link.label === 'Products';
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
                      className={`relative px-4 py-2 text-[13px] font-black uppercase tracking-[0.2em] transition-all rounded-full ${isActive ? 'text-[#2980B9]' : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'}`}
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
                          items={
                            link.label === 'Solutions' ? serviceSubLinks :
                              link.label === 'Industries' ? industrySubLinks :
                                productSubLinks
                          }
                          onClose={() => setActiveDropdown(null)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3 ml-4 pl-4 border-l border-sky-500/20">
              <Button href="/contact" variant="secondary" className="px-5 py-2 !text-[12px] !rounded-full">
                Contact Us
              </Button>
              <Button href="/careers" variant="primary" className="px-5 py-2 !text-[12px] !rounded-full">
                Careers
              </Button>
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



      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 z-[90] md:hidden border-b border-gray-200 shadow-2xl p-6 h-[calc(100vh-5rem)] overflow-y-auto"
            style={{ background: '#ffffff' }}
          >
            <div className="flex flex-col gap-6 pb-20">
              {navLinks.map((link) => {
                const hasDropdown = link.label === 'Solutions' || link.label === 'Industries' || link.label === 'Products';
                const isDropdownOpen = openMobileDropdown === link.label;

                return (
                  <div key={link.href}>
                    {hasDropdown ? (
                      <button
                        onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : link.label)}
                        className="flex items-center justify-between w-full text-2xl font-black text-slate-800 uppercase tracking-tight"
                      >
                        <span>{link.label}</span>
                        <svg className={`h-6 w-6 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="block text-2xl font-black text-slate-800 uppercase tracking-tight"
                      >
                        {link.label}
                      </Link>
                    )}

                    <AnimatePresence>
                      {hasDropdown && isDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 flex flex-col gap-4 pl-4 border-l-2 border-sky-100 py-2">
                            {(
                              link.label === 'Solutions' ? serviceSubLinks :
                                link.label === 'Industries' ? industrySubLinks :
                                  productSubLinks
                            ).map((sub) => (
                              <Link key={sub.href} href={sub.href} className="flex flex-col">
                                <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{sub.label}</span>
                                <span className="text-[10px] text-slate-500 mt-0.5 leading-tight">{sub.desc}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
