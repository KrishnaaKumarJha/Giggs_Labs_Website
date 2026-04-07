import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
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

    // Admin panel: navigate to /admin/login in the browser URL bar

    // Nudge observers after initial mount and after route changes.
    const handleScrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
    router.events.on('routeChangeComplete', (url) => {
      nudge();
      // Track Google Analytics pageviews on route change
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-XFQVZ1YRWM', {
          page_path: url,
        });
      }
    });
    return () => {
      router.events.off('routeChangeStart', handleScrollTop);
      router.events.off('routeChangeComplete', nudge);
    };
  }, [router, router.events]);

  return (
    <>
      <Head>
        <title>Giggs Software Labs — Engineering the Intelligent Enterprise</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Giggs Software Labs" />
        <meta property="og:title" content="Giggs Software Labs — Engineering the Intelligent Enterprise" />
        <meta property="og:description" content="AI-driven engineering company powering enterprise transformation through AI & Data Science, Cybersecurity, Performance Engineering, and Automation." />
        <meta property="og:image" content="https://giggslab.com/images/og-card-v2.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta itemprop="image" content="https://giggslab.com/images/og-card-v2.png" />
        <link rel="image_src" href="https://giggslab.com/images/og-card-v2.png" />
        <meta property="og:url" content="https://giggslab.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Giggs Software Labs — Engineering the Intelligent Enterprise" />
        <meta name="twitter:description" content="AI & Data · Cybersecurity · Performance Engineering · Automation — Transforming enterprises with intelligent systems." />
        <meta name="twitter:image" content="https://giggslab.com/images/og-card-v2.png" />
        <meta name="description" content="Giggs Software Labs is an AI-driven engineering company helping organizations build intelligent, secure, and high-performance digital systems." />
        <meta name="theme-color" content="#0B1F3B" />
      </Head>

      {/* Google Analytics Scripts */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XFQVZ1YRWM"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XFQVZ1YRWM', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <AnimatedBackground />
      <Navbar />
      <Chatbot />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <ScrollToTopButton />
      <CookieConsent />
    </>
  );
}

export default MyApp;
