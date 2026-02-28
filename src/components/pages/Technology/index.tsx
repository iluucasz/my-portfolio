'use client'
import { TPageDataProp } from '@/app/page';
import Techs from './techs';
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxLayer from '@/components/parallax-layer';
import { TitleSection } from '@/components/TitleSection';

const Technology = ({ pageData }: TPageDataProp) => {
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  /* ── 3D tilt on mousemove ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const xDeg = (y - 0.5) * 14;
    const yDeg = (x - 0.5) * -14;
    card.style.transform = `perspective(800px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

    const iconLayer = card.querySelector<HTMLElement>('.tech-icon-layer');
    const contentLayer = card.querySelector<HTMLElement>('.tech-content-layer');
    const glowLayer = card.querySelector<HTMLElement>('.tech-glow-layer');
    if (iconLayer) {
      iconLayer.style.transform = `translate3d(${(x - 0.5) * -16}px, ${(y - 0.5) * -16}px, 40px) scale(1.1)`;
    }
    if (contentLayer) {
      contentLayer.style.transform = `translate3d(${(x - 0.5) * 6}px, ${(y - 0.5) * 6}px, 25px)`;
    }
    if (glowLayer) {
      glowLayer.style.transform = `translate3d(${(x - 0.5) * -10}px, ${(y - 0.5) * -10}px, 5px)`;
      glowLayer.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    card.style.transform = '';
    const iconLayer = card.querySelector<HTMLElement>('.tech-icon-layer');
    const contentLayer = card.querySelector<HTMLElement>('.tech-content-layer');
    const glowLayer = card.querySelector<HTMLElement>('.tech-glow-layer');
    if (iconLayer) iconLayer.style.transform = '';
    if (contentLayer) contentLayer.style.transform = '';
    if (glowLayer) { glowLayer.style.transform = ''; glowLayer.style.opacity = ''; }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.tech-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.88, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#areaTech',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Animate decorative line
    gsap.fromTo('#tech-line',
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: '#areaTech', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <section className='relative flex flex-col justify-center items-center w-full px-4 py-40'>
        {/* Section title */}
        <TitleSection name="Tecnologias" />

        {/* Background glows */}
        <ParallaxLayer speed={-0.08} className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-red-900/[0.06] blur-[120px]" />
          <div className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-red-800/[0.04] blur-[100px]" />
        </ParallaxLayer>

        {/* Decorative vertical line */}
        <div className='absolute left-1/2 top-[12rem] bottom-[8rem] w-px -translate-x-1/2 pointer-events-none origin-top' id='tech-line'>
          <div className='h-full w-full bg-gradient-to-b from-transparent via-red-800/20 to-transparent' />
        </div>

        <div
          className='relative z-10 grid grid-cols-2 gap-4 w-full sm:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:max-w-[1000px]'
          style={{ perspective: '1200px' }}
          id='areaTech'
        >
          <Techs
            pageData={pageData}
            cardRefs={cardRefs}
            onCardMouseMove={handleMouseMove}
            onCardMouseLeave={handleMouseLeave}
          />
        </div>
      </section>
    </>
  )
}

export default Technology;