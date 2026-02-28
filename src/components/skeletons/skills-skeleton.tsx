const SkillsSkeleton = () => {
  return (
    <section className="relative flex flex-col items-center w-full px-4 py-40 overflow-hidden">
      {/* Title skeleton */}
      <div className="mb-12 flex flex-col items-center gap-2">
        <div className="h-8 w-44 animate-pulse rounded-lg bg-white/5" />
        <div className="h-1 w-22 animate-pulse rounded-full bg-red-900/20" />
      </div>

      {/* Grid of skill cards */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-red-900/20" />
              <div className="h-5 w-28 animate-pulse rounded bg-white/5" />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-red-800/15 via-white/5 to-transparent" />

            {/* Skill items */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-center gap-2.5">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-red-800/20" />
                  <div className="h-4 w-full animate-pulse rounded bg-white/5" style={{ maxWidth: `${60 + Math.random() * 30}%` }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSkeleton;
