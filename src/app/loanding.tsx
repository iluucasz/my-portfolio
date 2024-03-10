"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import loading from '../../public/images/loading.gif';

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

  if (!isloading) return null;

  return (
    <div className="absolute top-2/4 left-2/4 z-10">
      <Image width={200} height={200} src={loading} alt="loading" />
    </div>
  );
};

export default LoandingPage;
