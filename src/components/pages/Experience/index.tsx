'use client'
import ExperienceItem from './experience_item';
import { TExperienceDataProp } from '@/app/page';
import ParallaxLayer from '@/components/parallax-layer';
import { TitleSection } from '@/components/TitleSection';
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Experience = ({ experienceData }: TExperienceDataProp) => {
  const subTitle = experienceData[0]?.subtitle;
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  /* ── 3D tilt on mousemove ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const xDeg = (y - 0.5) * 12;
    const yDeg = (x - 0.5) * -12;
    card.style.transform = `perspective(1000px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

    const content = card.querySelector<HTMLElement>('.exp-card-content');
    const glow = card.querySelector<HTMLElement>('.exp-card-glow');
    if (content) {
      content.style.transform = `translate3d(${(x - 0.5) * 8}px, ${(y - 0.5) * 8}px, 30px)`;
    }
    if (glow) {
      glow.style.transform = `translate3d(${(x - 0.5) * -15}px, ${(y - 0.5) * -15}px, 10px)`;
      glow.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    card.style.transform = '';
    const content = card.querySelector<HTMLElement>('.exp-card-content');
    const glow = card.querySelector<HTMLElement>('.exp-card-glow');
    if (content) content.style.transform = '';
    if (glow) { glow.style.transform = ''; glow.style.opacity = ''; }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate header
    gsap.fromTo('#exp-header',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '#exp-header', start: 'top 85%' }
      }
    );

    // Animate each timeline card
    const cards = document.querySelectorAll('.exp-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '#exp-timeline', start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <section className="relative flex flex-col items-center w-full min-h-screen px-4 py-40">
        {/* Background glow */}
        <ParallaxLayer speed={0.06} className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-red-900/8 blur-[120px]" />
        </ParallaxLayer>

        {/* Section title */}
        <TitleSection name="Experiência" />

        {/* Header */}
        <div className='flex flex-col items-center gap-3 mb-16' id='exp-header'>
          <h3 className='text-3xl font-bold text-white lg:text-4xl'>Formação e experiência</h3>
          <p className='max-w-md text-center text-base text-gray-400'>{subTitle}</p>
        </div>

        {/* Timeline */}
        <div className='relative flex flex-col gap-0 w-full max-w-2xl' id='exp-timeline'>
          {/* Vertical line */}
          <div className='absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-red-800/60 via-red-900/30 to-transparent md:left-1/2 md:-translate-x-px' />

          <ExperienceItem
            experienceData={experienceData}
            cardRefs={cardRefs}
            onCardMouseMove={handleMouseMove}
            onCardMouseLeave={handleMouseLeave}
          />
        </div>
      </section>
    </>
  )
}

export default Experience;