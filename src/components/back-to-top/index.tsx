"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <div className="fixed right-5 bottom-7 z-20">
      <button
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gray-950/80 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-500 hover:border-red-800/50 hover:bg-red-900/30 hover:shadow-red-900/20 hover:scale-110 ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border border-red-800/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />

        {/* Arrow icon */}
        <IoMdArrowRoundUp className="text-xl text-gray-400 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5" />

        {/* Bottom accent dot */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-red-800/50 transition-all duration-500 group-hover:bg-red-500 group-hover:shadow-[0_0_6px_2px_rgba(220,50,50,0.4)]" />
      </button>
    </div>
  );
};

export default BackToTop;
