const ProjectsSkeleton = () => {
  return (
    <section className="flex flex-col items-center justify-around gap-10 py-40 h-full">
      {/* Title skeleton */}
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-white/5" />
        <div className="h-1 w-20 animate-pulse rounded-full bg-red-900/20" />
      </div>

      {/* Carousel placeholder */}
      <div className="relative w-[23rem] h-[23rem] mx-auto flex items-center justify-center max-sm:w-[18rem] max-sm:h-[18rem]">
        {/* Back card */}
        <div className="absolute w-full h-full rounded-2xl border border-white/5 bg-white/[0.02] animate-pulse"
          style={{ transform: 'rotateY(16deg) scaleY(0.87) translateZ(-10rem) translateX(5rem)', opacity: 0.4 }} />
        {/* Middle card */}
        <div className="absolute w-full h-full rounded-2xl border border-white/8 bg-white/[0.03] animate-pulse"
          style={{ transform: 'rotateY(8deg) scaleY(0.93) translateZ(-5rem) translateX(2.5rem)', opacity: 0.6 }} />
        {/* Front card */}
        <div className="absolute w-full h-full rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse flex flex-col justify-end p-5">
          <div className="h-5 w-32 animate-pulse rounded bg-white/5 mb-2" />
          <div className="h-4 w-full animate-pulse rounded bg-white/5 mb-1" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-white/5 mb-3" />
          <div className="h-8 w-28 animate-pulse rounded-full bg-red-900/20" />
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-2 rounded-full animate-pulse ${i === 0 ? 'w-6 bg-red-900/30' : 'w-2 bg-white/10'}`} />
        ))}
      </div>

      {/* Button skeleton */}
      <div className="h-12 w-52 animate-pulse rounded-full bg-red-900/20" />
    </section>
  );
};

export default ProjectsSkeleton;
