// frontend/components/AnimatedBackground.js

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* top-left cyan blob */}
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

      {/* subtle dark radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0)_0,_#020617_55%)]" />
    </div>
  );
}
