const AboutSkeleton = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 py-40 overflow-hidden">
      <div className="flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left column */}
        <div className="flex flex-1 flex-col items-center gap-6 lg:items-start">
          {/* Badge */}
          <div className="h-8 w-48 animate-pulse rounded-full bg-white/5" />

          {/* Title */}
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <div className="h-10 w-72 animate-pulse rounded-lg bg-white/5" />
          </div>

          {/* Typing role */}
          <div className="h-8 w-40 animate-pulse rounded-lg bg-white/5" />

          {/* Bio text */}
          <div className="flex flex-col gap-3 max-w-lg w-full">
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-10 animate-pulse rounded-full bg-white/5" />
            ))}
          </div>

          {/* CV button */}
          <div className="h-12 w-40 animate-pulse rounded-xl bg-red-900/20" />
        </div>

        {/* Right column - Profile image placeholder */}
        <div className="flex-shrink-0">
          <div className="h-[280px] w-[280px] animate-pulse rounded-2xl bg-white/5 md:h-[340px] md:w-[340px]" />
        </div>
      </div>
    </section>
  );
};

export default AboutSkeleton;
