// frontend/pages/blog/index.js
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/pageshell';

const CATEGORIES = ['All', 'Article', 'Whitepaper', 'Case Study', 'Tech Report'];

export async function getServerSideProps() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/posts/');
    const posts = await res.json();

    const formatted = posts.map((p) => ({
      ...p,
      date_display: new Date(p.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    }));

    return { props: { posts: formatted } };
  } catch (err) {
    console.error('Error fetching posts:', err);
    return { props: { posts: [] } };
  }
}

export default function InsightsHub({ posts }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = posts[0]; // Latest post as featured
  const otherPosts = filteredPosts.filter((p) => p.id !== (activeCategory === 'All' ? featuredPost?.id : null));

  return (
    <PageShell
      eyebrow="Knowledge & Insights"
      title="The Giggs Intelligence Hub"
      description="Deep dives into AI engineering, cybersecurity research, and elite software architecture. Your resource for building at the edge."
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

        {/* ═══ FEATURED POST (Only show on 'All') ═══ */}
        {activeCategory === 'All' && featuredPost && (
          <section className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative grid md:grid-cols-2 gap-8 items-center rounded-[2rem] border border-slate-800/80 bg-slate-900/40 p-1 overflow-hidden hover:border-[#00E0FF]/40 transition-all cursor-pointer"
              >
                <div className="relative aspect-[16/10] md:aspect-square overflow-hidden rounded-[1.8rem]">
                  <img
                    src={featuredPost.image || '/images/Ai_Automation.png'}
                    alt={featuredPost.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#00E0FF] italic">FEATURED {featuredPost.category}</span>
                  </div>
                </div>
                <div className="p-6 md:p-10">
                  <span className="text-xs text-slate-500 mb-2 block">{featuredPost.date_display}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#00E0FF] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-400 text-base mb-6 line-clamp-3">
                    {featuredPost.excerpt || "Dive into our latest analysis of technical ecosystems and building production-grade solutions."}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#00E0FF]">
                    Begin Reading <span className="text-lg">→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </section>
        )}

        {/* ═══ POST GRID ═══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {otherPosts.length === 0 && posts.length > 0 && activeCategory !== 'All' ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500">No {activeCategory.toLowerCase()}s found yet.</p>
              </div>
            ) : otherPosts.length === 0 && posts.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500">The intelligence hub is currently being populated. Check back soon.</p>
              </div>
            ) : (
              otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="group h-full flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden hover:border-[#00E0FF]/30 hover:bg-slate-900/40 transition-all cursor-pointer shadow-xl shadow-black/40"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image || '/images/Cloud_DevOps.png'}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[9px] font-bold px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 uppercase tracking-widest ${post.category === 'Case Study' ? 'text-amber-400' :
                            post.category === 'Whitepaper' ? 'text-emerald-400' :
                              post.category === 'Tech Report' ? 'text-violet-400' : 'text-[#00C2FF]'
                          }`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-[10px] text-slate-500 mb-2">{post.date_display}</span>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#00E0FF] transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 mb-6 flex-1">
                        {post.excerpt || "Exploring the nuances of industrial-grade engineering."}
                      </p>
                      <div className="text-[11px] font-bold text-slate-300 group-hover:text-white flex items-center gap-1">
                        VIEW RESOURCE <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
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
