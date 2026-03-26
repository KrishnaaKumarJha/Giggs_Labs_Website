// frontend/pages/blog/index.js
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/pageshell';

const CATEGORIES = ['All', 'Article', 'Case Study', 'Tech Report'];

// This array now powers the Insights feed! 
// You can embed LinkedIn posts, YouTube videos, or any other website that allows iframes.
const fallbackPosts = [
  {
    id: 'embed-1',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7436329418236706816?collapsed=1',
    category: 'Article',
  },
  {
    id: 'embed-2',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7434790609779032065?collapsed=1', // Example YouTube embed
    category: 'Article',
  },
];

export default function InsightsHub() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return fallbackPosts;
    return fallbackPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageShell
      eyebrow="Insights & Thought Leadership"
      title="Insights"
      description="Deep dives into AI engineering, cybersecurity research, and elite software architecture. Your resource for building at the edge."
      videoSrc="/hero/automation.mp4"
      videoOpacity={0.6}
      align="center"
    >
      <div className="max-w-6xl mx-auto">

        {/* ═══ CATEGORY TABS ═══ */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-800/60 pb-4 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat ? 'text-[#00E0FF]' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E0FF]"
                />
              )}
            </button>
          ))}
        </div>

        {/* ═══ POST GRID ═══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-10 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
          >
            {filteredPosts.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500">No content found for this category yet.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ y: -4 }}
                  className="w-full bg-slate-100 rounded-[1.5rem] overflow-hidden shadow-xl shadow-black/40 flex flex-col border border-slate-700/50"
                >
                  {/* Card Header styling matching the brand */}
                  <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#00E0FF] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <svg className="w-4 h-4 text-[#00E0FF]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </div>

                  {/* External Iframe Container */}
                  {/* Height is fixed to 650px to provide a big, readable frame for external posts */}
                  <div className="w-full h-[650px] relative bg-white">
                    <iframe
                      src={post.embedUrl}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allowFullScreen=""
                      title={`External embedded post for ${post.category}`}
                    ></iframe>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ═══ NEWSLETTER / CTA ═══ */}
        <section className="mt-24 mb-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-700/40 bg-gradient-to-br from-slate-900 to-slate-950 p-12 text-center md:text-left md:flex items-center justify-between gap-10 shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 italic tracking-tight">Stay ahead of the curve.</h2>
              <p className="text-slate-400 text-sm">Join our network for monthly briefings on cybersecurity trends, AI deployment patterns, and architectural blueprints. No noise, just engineering.</p>
            </div>
            <div className="relative z-10 mt-8 md:mt-0 flex-shrink-0">
              <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-[#00E0FF] transition-colors shadow-lg shadow-white/10">
                Join our network
              </Link>
            </div>
            {/* Simple Background Deco */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00E0FF]/5 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-600/5 blur-[100px] rounded-full" />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
