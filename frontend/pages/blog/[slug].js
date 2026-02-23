// frontend/pages/blog/[slug].js
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import PageShell from '../../components/pageshell';

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/posts/${params.slug}/`);
    if (!res.ok) return { notFound: true };
    const post = await res.json();
    return { props: { post } };
  } catch (err) {
    return { notFound: true };
  }
}

export default function PostPage({ post }) {
  const dateFormatted = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <PageShell
      eyebrow={post.category}
      title={post.title}
      description={post.excerpt}
    >
      <div className="max-w-4xl mx-auto px-4">

        {/* ═══ BREADCRUMBS & META ═══ */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5 text-[11px] font-bold tracking-widest text-[#00E0FF] uppercase italic">
          <Link href="/blog" className="flex items-center gap-2 hover:text-white transition-colors group">
            <span className="text-base group-hover:-translate-x-1 transition-transform">←</span> BACK TO THE HUB
          </Link>
          <div className="flex items-center gap-4 text-slate-500">
            <span>{dateFormatted.toUpperCase()}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-white">{post.category.toUpperCase()}</span>
          </div>
        </div>

        {/* ═══ HEADER ═══ */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {post.image && (
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
              <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
            </div>
          )}
        </motion.header>

        {/* ═══ CONTENT ═══ */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          {/* Main content body */}
          <div className="prose prose-invert prose-slate max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-50
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
            prose-a:text-[#00C2FF] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-code:text-[#00E0FF] prose-code:bg-slate-900/60
            prose-pre:bg-slate-900/40 prose-pre:border prose-pre:border-slate-800
            prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
          >
            <ReactMarkdown
              children={post.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            />
          </div>

          {/* Footer of article */}
          <div className="mt-20 pt-12 border-t border-slate-800 flex flex-col items-center text-center">
            <p className="text-slate-400 text-sm mb-6">Found this resource valuable? Explore more deep dives on technical ecosystems.</p>
            <Link
              href="/blog"
              className="px-8 py-3 rounded-full border border-slate-700 bg-slate-900/20 text-white font-bold text-xs hover:border-[#00E0FF] hover:bg-[#00E0FF]/5 transition-all"
            >
              KEEP EXPLORING HUB
            </Link>
          </div>
        </motion.article>

      </div>
    </PageShell>
  );
}
