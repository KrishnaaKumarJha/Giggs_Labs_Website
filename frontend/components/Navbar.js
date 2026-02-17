// frontend/components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Products' },
  { href: '/blog', label: 'Insights' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

const serviceSubLinks = [
  { href: '/services/cybersecurity', label: 'Cybersecurity', icon: '🛡️', desc: 'AI-driven defense & zero trust' },
  { href: '/services/ai-data', label: 'AI & Data', icon: '🧠', desc: 'ML models, pipelines & analytics' },
  { href: '/services/performance', label: 'Performance', icon: '⚡', desc: 'Speed, scale & observability' },
  { href: '/services/automation', label: 'Automation', icon: '🤖', desc: 'RPA, IaC & workflow engines' },
];

function BrandLogo() {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <img
        src="/logo/logo.png"
        alt="Giggs Software Lab"
        className="h-12 w-auto object-contain"
        style={{ display: 'block', transform: 'none' }}
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
    <div className="h-4 w-full overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 18, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -18, opacity: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="text-[10px] text-sky-400/80 text-center leading-tight select-none"
          style={{ whiteSpace: 'nowrap' }}
        >
          {current}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Services Dropdown (desktop) ── */
function ServicesDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-full left-0 mt-3 w-[340px] rounded-2xl border border-slate-700/60 bg-black/80 backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.5)] p-2 z-50"
    >
      {/* Small arrow */}
      <div className="absolute -top-2 left-6 w-4 h-4 rotate-45 bg-black/80 border-l border-t border-slate-700/60" />

      <div className="relative grid gap-1">
        {serviceSubLinks.map((sub) => (
          <Link
            key={sub.href}
            href={sub.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10 group"
          >
            <span className="text-xl flex-shrink-0">{sub.icon}</span>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-slate-100 group-hover:text-sky-400 transition-colors">
                {sub.label}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                {sub.desc}
              </div>
            </div>
            <svg className="ml-auto h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* View all services link */}
      <div className="mt-1 border-t border-slate-700/50 pt-2 px-3 pb-1">
        <Link
          href="/services"
          className="flex items-center justify-center gap-1 text-[11px] font-semibold text-sky-400 hover:text-sky-300 transition-colors"
        >
          View all services
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTimeoutRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  }, [router.pathname]);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-sky-100 bg-sky-50/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,163,255,0.1)] transition-all duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center">
          <Link href="/" aria-label="Go to home" className="relative flex items-center -mt-2">
            <div className="relative z-10 transition-all duration-300" style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.2)' }}>
              <BrandLogo />
            </div>

            <div className="absolute left-1/2 top-full -translate-x-1/2 mt-0.5 w-[140px]">
              <MottoCycler
                lines={[
                  'Engineering Intelligence.',
                  'Powering Performance.',
                  'Securing the Future.',
                ]}
                intervalMs={3000}
              />
            </div>
          </Link>
        </div>

        {/* ── Desktop nav ── */}
        <div className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => {
            const active = router.pathname === link.href || (link.href === '/services' && router.pathname.startsWith('/services'));
            const isServices = link.href === '/services';

            if (isServices) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <Link
                    href={link.href}
                    className={`group relative text-xs font-bold uppercase tracking-widest transition-all ${active ? 'text-sky-600' : 'text-sky-900/60 hover:text-sky-600'
                      }`}
                  >
                    <span className="relative inline-flex items-center gap-1 transition-transform duration-200 group-hover:-translate-y-[1px]">
                      {link.label}
                      <svg
                        className={`h-3 w-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>

                    <span
                      className={`pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-sky-500 transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {servicesOpen && <ServicesDropdown />}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs font-bold uppercase tracking-widest transition-all ${active ? 'text-sky-600' : 'text-sky-900/60 hover:text-sky-600'
                  }`}
              >
                <span className="relative inline-block transition-transform duration-200 group-hover:-translate-y-[1px]">
                  {link.label}
                </span>

                <span
                  className={`pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-sky-500 transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />
              </Link>
            );
          })}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-sky-200 bg-white text-sky-900 hover:bg-sky-50 transition sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="border-t border-sky-100 bg-sky-50/95 backdrop-blur-xl sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 text-xs font-bold uppercase tracking-widest text-sky-900/60">
            {navLinks.map((link) => {
              const active = router.pathname === link.href || (link.href === '/services' && router.pathname.startsWith('/services'));
              const isServices = link.href === '/services';

              if (isServices) {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition ${active ? 'bg-sky-100 text-sky-600' : 'hover:bg-sky-50 hover:text-sky-600'}`}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-1 space-y-0.5">
                            {serviceSubLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] normal-case tracking-normal font-medium text-sky-800/70 hover:bg-sky-100/60 hover:text-sky-600 transition"
                              >
                                <span className="text-base">{sub.icon}</span>
                                <span>{sub.label}</span>
                              </Link>
                            ))}
                            <Link
                              href="/services"
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] normal-case tracking-normal font-medium text-sky-500 hover:bg-sky-100/60 transition"
                            >
                              View all services →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md transition ${active ? 'bg-sky-100 text-sky-600' : 'hover:bg-sky-50 hover:text-sky-600'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
