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
  { href: '/solutions/ai-data', label: 'AI & Data Science / Data Engineering', desc: 'Transforming data into actionable intelligence and automated workflows.' },
  { href: '/solutions/cybersecurity', label: 'AI-driven Cybersecurity', desc: 'Intelligent threat detection and proactive enterprise defense.' },
  { href: '/solutions/performance', label: 'Performance Engineering', desc: 'Building high-speed, scalable, and resilient systems.' },
  { href: '/solutions/automation', label: 'Automation', desc: 'Streamlining operations with intelligent automation and RPA.' },
];

const industrySubLinks = [
  { href: '/industries/fintech', label: 'FinTech', desc: 'Secure, compliant, and intelligent fintech platforms.' },
  { href: '/industries/healthtech', label: 'HealthTech', desc: 'Predictive diagnostics and interoperable healthcare systems.' },
  { href: '/industries/retailtech', label: 'RetailTech', desc: 'Omnichannel analytics and intelligent retail platforms.' },
  { href: '/industries/martech', label: 'MarTech', desc: 'Intelligent marketing platforms and personalized engagement.' },
];

const productSubLinks = [
  { href: '/products/mihawk', label: 'Mihawk', desc: 'Enterprise-grade cybersecurity and compliance monitoring platform.' },
  { href: '/products/globixx', label: 'Globixx', desc: 'Digital transformation engine for international trade and logistics.' },
];

function BrandLogo() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      <Image
        src="/logo/logo.png"
        alt="Giggs Software Labs"
        width={64}
        height={64}
        className="h-10 md:h-12 w-auto object-contain"
        priority
      />
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);



  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 ${scrolled ? 'shadow-md py-1' : 'py-2'}`}
      style={{
        background: '#ffffff',
        borderBottom: activeDropdown ? '1px solid transparent' : '1px solid rgba(0,0,0,0.08)',
        transition: 'border-color 0.2s ease, padding 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4rem] items-center justify-between py-2">

          <div className="flex items-center">
            <Link href="/" aria-label="Go to home" className="relative flex items-center">
              <div className="relative z-10 transition-transform hover:scale-[1.02]">
                <BrandLogo />
              </div>
            </Link>
          </div>

          {/* Nav + Mobile Toggle — all pushed right */}
          <div className="flex items-center gap-1 lg:gap-2 ml-auto">
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const hasDropdown = ['Solutions', 'Industries', 'Products'].includes(link.label);
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
            <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-sky-500/20">
              <Button href="/contact" variant="primary" className="px-5 py-2 !text-[12px] !rounded-full">
                Talk to an Expert
              </Button>
              <Button href="/careers" variant="secondary" className="px-5 py-2 !text-[12px] !rounded-full">
                Careers
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 border border-slate-200 transition-all ${isOpen ? 'rotate-90' : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>



      {/* Mobile Menu — Enhanced */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[3.75rem] z-[90] lg:hidden h-[calc(100vh-3.75rem)] overflow-y-auto overscroll-contain"
            style={{ background: '#ffffff' }}
          >

            <div className="flex flex-col px-6 pt-2 pb-24">
              {navLinks.map((link, i) => {
                const hasDropdown = ['Solutions', 'Industries', 'Products'].includes(link.label);
                const isDropdownOpen = openMobileDropdown === link.label;
                const isActive = router.asPath.startsWith(link.href) && (link.href !== '/' || router.asPath === '/');

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    {hasDropdown ? (
                      <button
                        onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : link.label)}
                        className="flex items-center justify-between w-full py-4 group"
                      >
                        <span className={`text-lg font-extrabold uppercase tracking-tight transition-colors ${isActive ? 'text-sky-600' : 'text-slate-800'}`}>
                          {link.label}
                        </span>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${isDropdownOpen ? 'bg-sky-50 rotate-180' : 'bg-slate-50'}`}>
                          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                    ) : (
                      <Link href={link.href} className="block py-4">
                        <span className={`text-lg font-extrabold uppercase tracking-tight transition-colors ${isActive ? 'text-sky-600' : 'text-slate-800'}`}>
                          {link.label}
                        </span>
                      </Link>
                    )}

                    <AnimatePresence>
                      {hasDropdown && isDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-2 pb-4 pl-1">
                            {(
                              link.label === 'Solutions' ? serviceSubLinks :
                                link.label === 'Industries' ? industrySubLinks :
                                  productSubLinks
                            ).map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-sky-50 hover:border-sky-200 transition-all"
                              >
                                <span className="text-sm font-bold text-slate-800 tracking-tight">{sub.label}</span>
                                <span className="text-[11px] text-slate-500 mt-0.5 leading-snug">{sub.desc}</span>
                              </Link>
                            ))}

                            <Link href={link.href} className="flex items-center gap-2 p-3 rounded-xl hover:bg-slate-50 transition-all">
                              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                                View all {link.label}
                              </span>
                              <svg className="h-3 w-3 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pt-8 mt-4">
                <Button href="/contact" variant="primary" className="w-full justify-center py-4 text-[13px] font-black uppercase tracking-[0.15em] !rounded-2xl shadow-lg shadow-sky-500/20">
                  Talk to an Expert
                </Button>
                <Button href="/careers" variant="secondary" className="w-full justify-center py-4 text-[13px] font-black uppercase tracking-[0.15em] !rounded-2xl">
                  Careers
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
