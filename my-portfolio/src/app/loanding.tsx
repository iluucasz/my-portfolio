"use client";
import React, { useEffect, useState } from "react";

const LoandingPage = () => {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(time);
      setIsLoading(true);
    };
  }, []);

  console.log(isloading, " isloading 1111");

  if (!isloading) return null;

  return (
    <div className="absolute top-2/4 left-2/4 z-10 text-xl">LoandingPage</div>
  );
};

export default LoandingPage;
