const ExperienceSkeleton = () => {
  return (
    <section className="relative flex flex-col items-center w-full min-h-screen px-4 py-40">
      {/* Title skeleton */}
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-white/5" />
        <div className="h-1 w-24 animate-pulse rounded-full bg-red-900/20" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-16">
        <div className="h-9 w-80 animate-pulse rounded-lg bg-white/5" />
        <div className="h-5 w-64 animate-pulse rounded bg-white/5" />
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0 w-full max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-red-800/30 via-red-900/15 to-transparent md:left-1/2 md:-translate-x-px" />

        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="relative flex items-start gap-0 pb-10 last:pb-0">
            {/* Timeline dot */}
            <div className="absolute left-5 -translate-x-1/2 z-10 md:left-1/2">
              <div className="h-12 w-12 animate-pulse rounded-full border-2 border-red-800/30 bg-gray-950" />
            </div>

            {/* Spacer */}
            <div className="w-12 shrink-0 md:hidden" />

            {/* Card */}
            <div className="ml-4 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:ml-0 md:w-[calc(50%-2rem)]">
              <div className="flex flex-col gap-3">
                <div className="h-5 w-40 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                <div className="h-16 w-full animate-pulse rounded bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSkeleton;
