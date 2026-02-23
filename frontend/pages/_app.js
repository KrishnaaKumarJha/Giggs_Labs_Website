// frontend/pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'highlight.js/styles/github-dark.css';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import CookieConsent from '../components/CookieConsent';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Disable browser scroll restoration to prevent jumping issues on navigation
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Nudge observers after initial mount and after route changes.
    const handleScrollTop = () => {
      window.scrollTo(0, 0);
      if (typeof document !== 'undefined') {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    const nudge = () => {
      handleScrollTop();
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('scroll'));
      }, 60);
    };

    nudge();

    router.events.on('routeChangeStart', handleScrollTop);
    router.events.on('routeChangeComplete', nudge);
    return () => {
      router.events.off('routeChangeStart', handleScrollTop);
      router.events.off('routeChangeComplete', nudge);
    };
  }, [router.events]);

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Chatbot />
      <main className="pt-20">
        <Component {...pageProps} />
      </main>
      <Footer />
      <ScrollToTopButton />
      <CookieConsent />
    </>
  );
}

export default MyApp;
