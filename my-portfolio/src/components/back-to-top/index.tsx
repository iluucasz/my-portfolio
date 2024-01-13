'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdArrowRoundUp } from "react-icons/io";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle scroll and determine if button should be visible
  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // Function to handle the click and scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <div className='fixed right-4 bottom-6 z-20'>
      {isVisible && (
        <button
          className='text-red-900 rounded-full bg-slate-900'
          onClick={scrollToTop}
        >
          <IoMdArrowRoundUp size={40} />
        </button>
      )}
    </div>
  );
}

export default BackToTop;
