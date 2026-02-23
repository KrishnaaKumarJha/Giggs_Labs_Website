// frontend/components/PageShell.js
import { motion } from 'framer-motion';

const shellContainer = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const shellItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

export default function PageShell({
  title,
  eyebrow,
  description,
  children,
  fluid,
  videoSrc,
  videoOpacity = 0.5,
  overlayOpacity = 0.4,
  align = 'left',
  simpleHero,
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left';

  // Fluid pages render children full-width (for product pages with custom full-bleed heroes)
  if (fluid) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 pt-20" style={{ overflow: 'visible' }}>
        {children}
      </main>
    );
  }

  return (
    <main
      className={`min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 relative ${videoSrc ? 'overflow-hidden' : ''}`}
      style={videoSrc ? {} : { overflow: 'visible' }}
    >
      {videoSrc && (
        <div className="absolute inset-0 z-0 h-[50vh] md:h-[60vh] overflow-hidden">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{ opacity: videoOpacity }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950" style={{ opacity: overlayOpacity }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        </div>
      )}

      <section
        className="page-content relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-16 md:px-6 lg:pt-24"
        style={{ overflow: 'visible' }}
      >
        {/* header */}
        <div className={`max-w-3xl ${alignCls}`}>
          {eyebrow && (
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-[#00E0FF]/30 bg-slate-950/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 backdrop-blur-md mb-6 ${align === 'center' ? 'justify-center mx-auto' : ''}`}
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00E0FF] animate-pulse" />
              {eyebrow}
            </div>
          )}

          {title && (
            <h1
              className={`mt-4 font-black tracking-tighter ${align === 'center' ? 'text-4xl md:text-6xl uppercase leading-[0.95] drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'text-3xl sm:text-4xl'}`}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400">
                {title}
              </span>
            </h1>
          )}

          {description && (
            <p
              className={`mt-8 text-slate-100 font-semibold leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] ${align === 'center' ? 'text-xl md:text-2xl max-w-3xl mx-auto' : 'text-base md:text-lg opacity-90'}`}
            >
              {description}
            </p>
          )}
        </div>

        {/* page body */}
        <div className="mt-8" style={{ overflow: 'visible' }}>
          {children}
        </div>
      </section>
    </main>
  );
}
