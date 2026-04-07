import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/pageshell';
import { getImageUrl } from '../../utils/api';

const CATEGORIES = ['All', 'Article', 'Case Study', 'Tech Report'];

// Current hardcoded LinkedIn posts (Set to empty, add via dashboard)
const fallbackPosts = [];

export default function InsightsHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
  const BACKEND_URL = API_URL.replace(/\/api$/, ''); // Ensure no trailing /api and no double slashes later

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/posts`);
        if (res.ok) {
          const data = await res.json();
          setDbPosts(data);
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [API_URL]);

  // Merge hardcoded posts with database posts
  const allPosts = useMemo(() => {
    return [...fallbackPosts, ...dbPosts];
  }, [dbPosts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return allPosts;
    return allPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory, allPosts]);

  const standardPosts = useMemo(() => filteredPosts.filter(p => !p.embed_url), [filteredPosts]);
  const embedPosts = useMemo(() => filteredPosts.filter(p => !!p.embed_url), [filteredPosts]);

  return (
    <PageShell
      eyebrow="Insights & Thought Leadership"
      title="Insights"
      description="Deep dives into AI engineering, cybersecurity research, and elite software architecture. Your resource for building at the edge."
      videoSrc="/hero/automation.mp4"
      videoOpacity={0.6}
      align="center"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* ═══ CATEGORY TABS ═══ */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat ? 'text-[#00E0FF]' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E0FF]" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + allPosts.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-24"
          >
            {loading && dbPosts.length === 0 ? (
              <div className="py-20 text-center text-slate-500">Syncing insights hub...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-500">No content found for this category yet.</p>
              </div>
            ) : (
              <>
                {/* ═══ FEATURED INSIGHTS (STANDARD POSTS) ═══ */}
                {standardPosts.length > 0 && (
                  <section>
                    <div className="mb-10">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-[#00E0FF] rounded-full"></span>
                        Featured Insights
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">Deep dives into technical architecture and research.</p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {standardPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          whileHover={{ y: -6 }}
                          className="group flex flex-col rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden hover:border-[#00E0FF]/30 transition-all shadow-xl"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={getImageUrl(post.image)}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 z-10">
                              <span className="text-[9px] font-bold px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[#00E0FF] uppercase tracking-widest">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-white group-hover:text-[#00E0FF] transition-colors line-clamp-2 mb-3 leading-tight">
                              {post.title}
                            </h3>
                            <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1 font-medium leading-relaxed">
                              {post.excerpt || "Exploring technical architecture at the edge."}
                            </p>
                            <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-1">
                              READ FULL ARTICLE <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* ═══ LINKEDIN & EXTERNAL FEED (EMBEDDED POSTS) ═══ */}
                {embedPosts.length > 0 && (
                  <section>
                    <div className="mb-10">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-[#7A5BFF] rounded-full"></span>
                        Social & Community
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">Latest updates and discussions from our network.</p>
                    </div>
                    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 max-w-5xl">
                      {embedPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          whileHover={{ y: -4 }}
                          className="w-full bg-slate-900/60 rounded-[1.5rem] overflow-hidden shadow-xl shadow-black/40 flex flex-col border border-white/10"
                        >
                          <div className="bg-slate-900 border-b border-white/5 px-4 py-3 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#00E0FF] uppercase tracking-wider">
                              {post.category}
                            </span>
                            <svg className="w-4 h-4 text-[#00E0FF]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                          </div>
                          <div className="w-full h-[650px] relative bg-white">
                            <iframe
                              src={post.embed_url}
                              className="absolute top-0 left-0 w-full h-full"
                              frameBorder="0"
                              allowFullScreen=""
                              title={`Embedded content for ${post.category}`}
                            ></iframe>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ═══ NEWSLETTER / CTA ═══ */}
        <section className="mt-24 mb-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-12 text-center md:text-left md:flex items-center justify-between gap-10 shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Stay ahead of the curve.</h2>
              <p className="text-slate-400 text-sm font-medium">Join our network for monthly briefings on cybersecurity trends, AI deployment patterns, and architectural blueprints.</p>
            </div>
            <div className="relative z-10 mt-8 md:mt-0 flex-shrink-0">
              <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-[#00E0FF] transition-colors shadow-lg shadow-white/10">
                Join our network
              </Link>
            </div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00E0FF]/5 blur-[100px] rounded-full" />
          </div>
        </section>
      </div>
    </PageShell>
  );
}

