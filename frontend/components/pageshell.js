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

export default function PageShell({ title, eyebrow, description, children }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-950/80 text-slate-100">
      {/* NOTE: .page-content provides consistent top spacing so headings won't sit right under the hero */}
      <section className="page-content mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 lg:pt-16">
        {/* header */}
        <motion.div
          className="max-w-3xl"
          variants={shellContainer}
          initial="hidden"
          animate="show"
        >
          {eyebrow && (
            <motion.div
              variants={shellItem}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-xs text-slate-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E0FF] shadow-[0_0_8px_#00E0FF]" />
              {eyebrow}
            </motion.div>
          )}

          {title && (
            <motion.h1
              variants={shellItem}
              className="mt-4 text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] via-[#4C8DFF] to-[#7A5BFF]">
                {title}
              </span>
            </motion.h1>
          )}

          {description && (
            <motion.p
              variants={shellItem}
              className="mt-3 text-sm text-slate-300 sm:text-base"
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* page body */}
        <div className="mt-8">
          {children}
        </div>
      </section>
    </main>
  );
}
