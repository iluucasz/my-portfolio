const TechnologySkeleton = () => {
  return (
    <section className="relative flex flex-col justify-center items-center w-full px-4 py-40">
      {/* Title skeleton */}
      <div className="mb-12 flex flex-col items-center gap-2">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-white/5" />
        <div className="h-1 w-24 animate-pulse rounded-full bg-red-900/20" />
      </div>

      {/* Grid of tech cards */}
      <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:max-w-[960px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
          >
            {/* Icon */}
            <div className="h-12 w-12 animate-pulse rounded-xl bg-white/5" />
            {/* Name */}
            <div className="h-4 w-16 animate-pulse rounded bg-white/5" />
            {/* Time */}
            <div className="h-5 w-14 animate-pulse rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologySkeleton;
