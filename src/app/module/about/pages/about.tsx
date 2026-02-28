'use client'
import { TPageDataProp } from "@/app/page";
import ContactList from "@/components/contact_list/contactList";
import ParallaxLayer from "@/components/parallax-layer";
import { RichText } from "@/components/rich-text";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Cursor } from 'react-simple-typewriter';
import { gsap } from "gsap";


export const About = ({ pageData }: TPageDataProp) => {
  let getWriting = pageData?.iam.text ?? '';

  const textList = getWriting.replace(/'/g, "").split(", ")

  const textAboutMe = pageData?.introduction.raw ?? [];

  const imageProfile = pageData?.profilePicture.url ?? "";

  const [text, setText] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);

  /* ── 3D tilt on profile image ── */
  const handleImageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const xDeg = (y - 0.5) * 16;
    const yDeg = (x - 0.5) * -16;
    el.style.transform = `perspective(800px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

    const glowLayer = el.querySelector<HTMLElement>('.about-img-glow');
    const imgLayer = el.querySelector<HTMLElement>('.about-img-layer');
    if (glowLayer) {
      glowLayer.style.transform = `translate3d(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px, 10px)`;
      glowLayer.style.opacity = '0.8';
    }
    if (imgLayer) {
      imgLayer.style.transform = `translate3d(${(x - 0.5) * 8}px, ${(y - 0.5) * 8}px, 30px)`;
    }
  }, []);

  const handleImageMouseLeave = useCallback(() => {
    const el = imageRef.current;
    if (!el) return;
    el.style.transform = '';
    const glowLayer = el.querySelector<HTMLElement>('.about-img-glow');
    const imgLayer = el.querySelector<HTMLElement>('.about-img-layer');
    if (glowLayer) { glowLayer.style.transform = ''; glowLayer.style.opacity = ''; }
    if (imgLayer) imgLayer.style.transform = '';
  }, []);

  //animation writting
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to("#about-greeting", { y: 0, opacity: 1, duration: 0.6 })
      .to("#about-title", { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
      .to("#about-role", { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
      .to("#about-text", { y: 0, opacity: 1, duration: 0.6 }, "-=0.2")
      .to("#about-image", { scale: 1, opacity: 1, rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" }, "-=0.4")
      .to("#about-socials", { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .to("#about-cv", { y: 0, opacity: 1, duration: 0.4 }, "-=0.2")
      .to("#about-scroll", { opacity: 1, duration: 0.4 }, "-=0.1");

    let count = 0;
    let index = 0;
    const textInterval = setInterval(() => {
      const currentText = textList[index];
      const characterList = currentText.split("");
      if (count < characterList.length) {
        const newC = characterList[count];
        setText((text) => text + newC);
        count++;
      } else {
        if (index < textList.length - 1) {
          index++;
        } else {
          index = 0;
        }
        setText("");
        count = 0;
      }
    }, 400);

    return () => {
      clearInterval(textInterval);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="sobre" className="relative flex items-center justify-center min-h-screen px-4 py-40 text-white overflow-hidden">
      {/* Subtle background glow */}
      <ParallaxLayer speed={-0.06} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-red-900/10 blur-[120px]" />
      </ParallaxLayer>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

        {/* Left column - Text content */}
        <div className="flex flex-1 flex-col items-center gap-6 lg:items-start">
          {/* Greeting */}
          <p
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-400 backdrop-blur-sm translate-y-8 opacity-0"
            id="about-greeting"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            &lt;Lucas S Santos /&gt;
          </p>

          {/* Main heading */}
          <h1
            className="text-center text-3xl font-bold leading-tight tracking-tight lg:text-left lg:text-5xl translate-y-8 opacity-0"
            id="about-title"
          >
            Eu sou um{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
              Desenvolvedor
            </span>
          </h1>

          {/* Typing role */}
          <div
            className="flex h-10 items-center text-xl font-semibold text-red-400 lg:text-2xl translate-y-8 opacity-0"
            id="about-role"
          >
            <span>{text}</span>
            <Cursor cursorColor='#dc2626' cursorStyle="|" />
          </div>

          {/* Bio text — Star Wars crawl effect */}
          <div
            className="star-wars-crawl-container max-w-lg translate-y-8 opacity-0"
            id="about-text"
          >
            <div className="star-wars-crawl">
              <div className="star-wars-crawl-content">
                <div className="crawl-spacer" />
                <RichText content={textAboutMe} />
                <div className="crawl-spacer" />
                <RichText content={textAboutMe} />
              </div>
            </div>
          </div>

          {/* Social links */}
          <div
            className="flex items-center gap-4 translate-y-8 opacity-0"
            id="about-socials"
          >
            <ContactList pageData={pageData} />
          </div>

          {/* Download CV button */}
          <a
            href="https://docs.google.com/document/d/1pmIcwyN3nTWk0yUV51qu93IRra1qkXUwayKVQqqPYY0/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-red-900 to-red-800 px-6 py-3 text-base font-semibold text-white transition-all hover:from-red-800 hover:to-red-700 hover:shadow-lg hover:shadow-red-900/30 active:scale-[0.97] translate-y-8 opacity-0"
            id="about-cv"
          >
            <HiOutlineDocumentDownload className="text-xl" />
            Baixar CV
          </a>
        </div>

        {/* Right column - Profile image */}
        <div
          className="relative flex-shrink-0"
          id="about-image"
          style={{ opacity: 0, transform: 'scale(0.88) perspective(800px) rotateX(12deg) rotateY(-8deg)' }}
        >
          <div
            ref={imageRef}
            className="relative will-change-transform"
            style={{ transition: 'transform 0.15s ease-out' }}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
          {/* Glow behind image — parallax layer */}
          <div className="about-img-glow absolute inset-0 rounded-full bg-gradient-to-br from-red-900/40 to-red-600/20 blur-2xl will-change-transform"
            style={{ transition: 'transform 0.15s ease-out, opacity 0.4s ease' }}
          />

          {/* Animated border ring + image — parallax layer */}
          <div className="about-img-layer relative rounded-2xl p-[3px] bg-gradient-to-br from-red-500/60 via-red-900/30 to-transparent will-change-transform"
            style={{ transition: 'transform 0.15s ease-out' }}
          >
            <div className="overflow-hidden rounded-2xl bg-gray-950">
              {imageProfile && (
                <Image
                  width={400}
                  height={400}
                  quality={90}
                  src={imageProfile}
                  alt="Foto de perfil"
                  className="h-[280px] w-[280px] object-cover md:h-[340px] md:w-[340px]"
                  sizes="(max-width: 768px) 280px, 340px"
                  priority
                />
              )}
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute -bottom-4 -right-4 grid grid-cols-3 gap-1.5 opacity-30">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-red-500" />
            ))}
          </div>
          </div>{/* end tilt wrapper */}
        </div>
      </div>

      {/* Scroll indicator — animated mouse */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 opacity-0"
        id="about-scroll"
      >
        <div className="relative h-9 w-6 rounded-full border-2 border-gray-400/50">
          <div
            className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 rounded-full bg-gray-400/70"
            style={{ animation: 'scrollWheel 1.8s ease-in-out infinite' }}
          />
        </div>
        <span className="text-[10px] font-medium tracking-widest uppercase text-gray-500/70">Scroll</span>
      </div>
    </section>
  );
};
