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
        <div className={`max-w-4xl ${alignCls}`}>

          {title && (
            <h1
              className={`mt-4 font-extrabold leading-tight tracking-tight text-white futuristic ${
                align === 'center' 
                ? 'text-4xl sm:text-5xl lg:text-7xl drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
                : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}
            >
              {title}
            </h1>
          )}

          {description && (
            <p
              className={`mt-8 text-slate-300 font-medium leading-relaxed ${
                align === 'center' 
                ? 'text-lg md:text-xl max-w-3xl mx-auto' 
                : 'text-base md:text-lg opacity-90'
              }`}
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
