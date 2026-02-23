// frontend/components/CookieConsent.js
import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show banner only if user hasn't already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Small delay so it doesn't flash on page load
            const timer = setTimeout(() => setVisible(true), 800);
            return () => clearTimeout(timer);
        }
    }, []);

    function handleAccept() {
        localStorage.setItem('cookieConsent', 'accepted');
        setVisible(false);
    }

    function handleReject() {
        localStorage.setItem('cookieConsent', 'rejected');
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-0"
            style={{ animation: 'slideUp 0.5s ease-out' }}
        >
            <div className="mx-auto max-w-4xl mb-4 md:mb-6 rounded-2xl border border-slate-700/60 bg-slate-900/95 backdrop-blur-xl shadow-[0_-4px_40px_rgba(0,0,0,0.5)] p-5 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Icon + Text */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🍪</span>
                            <h3 className="text-sm font-bold text-white">We value your privacy</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                            By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                            You can reject non-essential cookies by clicking &quot;Reject&quot;.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={handleReject}
                            className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800 hover:text-white transition-colors"
                        >
                            Reject
                        </button>
                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-black text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:brightness-110 transition"
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
