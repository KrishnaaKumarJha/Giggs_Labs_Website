import { useRouter } from 'next/router';

export default function AnimatedBackground() {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Existing blobs (keep for some depth) */}
      <div
        className="absolute -top-40 -left-10 h-80 w-80 rounded-full bg-[#00E0FF]/20 blur-3xl opacity-40"
        style={{ animation: 'floatBlob 26s ease-in-out infinite alternate' }}
      />

      {/* If Home Page, only show the basic blobs (since index.js handles its own) 
          If NOT Home Page, show the full premium background background */}
      {!isHomePage && (
        <>
          {/* BASE DARK LAYER */}
          <div className="absolute inset-0 bg-slate-950" />

          {/* VIBRANT GRADIENT OVERLAY (Matching index.js) */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: -30,
              background: 'linear-gradient(135deg, rgba(2,6,23,0.7) 0%, rgba(0,30,60,0.6) 30%, rgba(15,10,50,0.65) 60%, rgba(2,6,23,0.7) 100%)',
            }}
          />

          {/* COLOR ACCENT WASH (Matching index.js) */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: -20,
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,224,255,0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(122,91,255,0.08) 0%, transparent 50%)',
            }}
          />

          {/* SUBTLE STATIC VIGNETTE */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0)_0,_#020617_70%)] opacity-80" />
        </>
      )}

      {/* Original blobs (kept but toned down for home page compatibility) */}
      <div
        className="absolute -top-40 -left-10 h-80 w-80 rounded-full bg-[#00E0FF]/32 blur-3xl"
        style={{ animation: 'floatBlob 26s ease-in-out infinite alternate' }}
      />

      {/* top-center soft glow */}
      <div
        className="absolute -top-52 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#4C8DFF]/30 blur-3xl"
        style={{ animation: 'floatBlobReverse 30s ease-in-out infinite alternate' }}
      />

      {/* bottom-right purple blob */}
      <div
        className="absolute bottom-[-140px] right-[-60px] h-96 w-96 rounded-full bg-[#7A5BFF]/32 blur-3xl"
        style={{ animation: 'floatBlob 32s ease-in-out infinite alternate' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0)_0,_#020617_55%)]" />
    </div>
  );
}
