"use client";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050a12]">
      {/* Subtle star dots in background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.15 + Math.random() * 0.3,
              animationDuration: `${1.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Glowing sun/fire orb */}
        <div className="relative">
          {/* Outer heat haze */}
          <div className="absolute -inset-8 rounded-full bg-orange-500/5 blur-2xl animate-pulse" />
          <div
            className="absolute -inset-5 rounded-full bg-amber-500/8 blur-xl"
            style={{ animation: 'pulse 2s ease-in-out infinite 0.3s' }}
          />

          {/* Core orb */}
          <div className="relative h-16 w-16 rounded-full">
            <svg className="absolute inset-0 h-16 w-16 animate-spin" style={{ animationDuration: '3s' }}>
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke="url(#fireGrad)"
                strokeWidth="2.5"
                strokeDasharray="40 80 20 40"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,200,80,0.9)" />
                  <stop offset="40%" stopColor="rgba(255,120,30,0.7)" />
                  <stop offset="70%" stopColor="rgba(255,60,10,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,180,60,0.8)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner glowing core */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-amber-400/40 via-orange-500/30 to-red-600/20 blur-[2px]" />
            <div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-200/50 to-orange-400/30 animate-pulse"
              style={{ animationDuration: '1.5s' }}
            />

            {/* Tiny ember particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '2px',
                  height: '2px',
                  background: `rgba(255,${150 + i * 15},${30 + i * 10},0.8)`,
                  top: `${50 + Math.sin((i / 6) * Math.PI * 2) * 42}%`,
                  left: `${50 + Math.cos((i / 6) * Math.PI * 2) * 42}%`,
                  animation: `pulse ${1 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`,
                  boxShadow: `0 0 4px rgba(255,${150 + i * 15},${30 + i * 10},0.6)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium tracking-widest text-orange-200/60 uppercase">
            Carregando
          </span>
          <span className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block h-1 w-1 rounded-full bg-orange-400/70 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
