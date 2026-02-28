'use client'
import { TMySkillsDataProp } from '@/app/page'
import ListSkills from '@/components/skills_list/list_skill'
import { useEffect, useRef, useCallback } from 'react'
import ParallaxLayer from '@/components/parallax-layer'
import { TitleSection } from '@/components/TitleSection'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Skills = ({ mySkillsData }: TMySkillsDataProp) => {
  const listSkill = mySkillsData;
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

    const numLayer = card.querySelector<HTMLElement>('.skill-num-layer');
    const contentLayer = card.querySelector<HTMLElement>('.skill-content-layer');
    const glowLayer = card.querySelector<HTMLElement>('.skill-glow-layer');
    if (numLayer) {
      numLayer.style.transform = `translate3d(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px, 30px)`;
    }
    if (contentLayer) {
      contentLayer.style.transform = `translate3d(${(x - 0.5) * 8}px, ${(y - 0.5) * 8}px, 40px)`;
    }
    if (glowLayer) {
      glowLayer.style.transform = `translate3d(${(x - 0.5) * -15}px, ${(y - 0.5) * -15}px, 10px)`;
      glowLayer.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    card.style.transform = '';
    const numLayer = card.querySelector<HTMLElement>('.skill-num-layer');
    const contentLayer = card.querySelector<HTMLElement>('.skill-content-layer');
    const glowLayer = card.querySelector<HTMLElement>('.skill-glow-layer');
    if (numLayer) numLayer.style.transform = '';
    if (contentLayer) contentLayer.style.transform = '';
    if (glowLayer) { glowLayer.style.transform = ''; glowLayer.style.opacity = ''; }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.92, rotateX: 8 },
        {
          y: 0, opacity: 1, scale: 1, rotateX: 0,
          duration: 0.6, delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#areaSkill',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Animate the decorative line
    gsap.fromTo('#skill-line',
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#areaSkill',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="skills" className='relative flex flex-col items-center w-full px-4 py-40 overflow-hidden'>
      {/* Section title */}
      <TitleSection name="Soft Skills" />

      {/* Background glows */}
      <ParallaxLayer speed={-0.06} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-red-900/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-red-800/6 blur-[100px]" />
      </ParallaxLayer>

      {/* Grid */}
      <div
        className='relative z-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
        id='areaSkill'
        style={{ perspective: '1200px' }}
      >
        {/* Decorative vertical accent line (behind cards) */}
        <div
          id='skill-line'
          className='pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top hidden lg:block'
          style={{ background: 'linear-gradient(180deg, transparent, rgba(139,30,30,0.35) 30%, rgba(139,30,30,0.35) 70%, transparent)' }}
        />

        {listSkill.map((item, index) => (
          <ListSkills
            item={item}
            index={index}
            key={index}
            cardRef={(el: HTMLDivElement | null) => {
              if (el) cardRefs.current.set(index, el);
              else cardRefs.current.delete(index);
            }}
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills