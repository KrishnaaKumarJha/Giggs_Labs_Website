// frontend/components/ScrollToTopButton.js
import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // guard for browser only
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      setVisible(window.scrollY > 250);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className="fixed bottom-24 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#00E0FF]/60 bg-slate-950/90 text-slate-100 shadow-[0_0_35px_rgba(56,189,248,0.8)] backdrop-blur hover:scale-105 hover:border-[#00E0FF] transition-transform"
      aria-label="Back to top"
    >
      <span className="text-lg leading-none">↑</span>
    </button>
  );
}
