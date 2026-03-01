'use client'
import { TPageDataProp } from '@/app/page';
import { TLight } from '@/types/higthLigthProjects';
import Image from 'next/image';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MdOutlineTag } from 'react-icons/md';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { FiCalendar, FiPlay } from 'react-icons/fi';
import ModalExperience from './modalProject';
import { TitleSection } from '@/components/TitleSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectGallery = ({ pageData }: TPageDataProp) => {
  const [openModalId, setOpenModalId] = useState<null | number>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const LIST_PROJECTS: TLight[] = pageData?.highLightProjects ?? [];

  const toggleModal = (projectId: number) => {
    setOpenModalId(prev => (prev === projectId ? null : projectId));
  };

  // 3D tilt on mousemove
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const xDeg = (y - 0.5) * 12;
    const yDeg = (x - 0.5) * -12;
    card.style.transform = `perspective(800px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

    const imgLayer = card.querySelector<HTMLElement>('.gallery-card-image');
    const glowLayer = card.querySelector<HTMLElement>('.gallery-card-glow');
    if (imgLayer) {
      const ox = (x - 0.5) * -8;
      const oy = (y - 0.5) * -8;
      imgLayer.style.transform = `translate3d(${ox}px, ${oy}px, 15px) scale(1.05)`;
    }
    if (glowLayer) {
      glowLayer.style.opacity = '1';
      glowLayer.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(220,38,38,0.15), transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    card.style.transform = '';
    const imgLayer = card.querySelector<HTMLElement>('.gallery-card-image');
    const glowLayer = card.querySelector<HTMLElement>('.gallery-card-glow');
    if (imgLayer) imgLayer.style.transform = '';
    if (glowLayer) {
      glowLayer.style.opacity = '0';
    }
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.gallery-card-wrapper');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, rotateX: 8, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [LIST_PROJECTS.length]);

  return (
    <>
      {/* Modals */}
      {LIST_PROJECTS.map((item: TLight, index: number) =>
        openModalId === index ? (
          <ModalExperience item={item} setOpen={() => setOpenModalId(null)} key={index} />
        ) : null
      )}

      <section
        ref={sectionRef}
        className="flex flex-col items-center gap-16 py-40 min-h-screen w-full overflow-x-hidden"
      >
        <TitleSection name="Galeria de Projetos" />

        {/* Subtitle */}
        <p className="max-w-2xl text-center text-sm text-gray-400 -mt-8 px-4">
          Explore todos os projetos que desenvolvi. Clique em qualquer card para ver mais detalhes.
        </p>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="gallery-grid w-full max-w-6xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {LIST_PROJECTS.map((item: TLight, index: number) => (
            <div key={index} className="gallery-card-wrapper" style={{ perspective: '800px' }}>
              <div
                ref={(el) => {
                  if (el) cardRefs.current.set(index, el);
                  else cardRefs.current.delete(index);
                }}
                className="gallery-card group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm cursor-pointer transition-[box-shadow] duration-500 hover:shadow-2xl hover:shadow-red-900/20 hover:border-red-800/30"
                onClick={() => toggleModal(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, box-shadow 0.5s ease' }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Project image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden gallery-card-image" style={{ transition: 'transform 0.15s ease-out' }}>
                  <Image
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={item.imageProject.url}
                    alt={item.title}
                    fill
                    unoptimized
                    draggable={false}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/50 to-transparent" />

                  {/* Hover action hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                      <HiOutlineExternalLink className="text-sm" />
                      Ver detalhes
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 space-y-3">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-tight group-hover:text-red-100 transition-colors duration-300 min-w-0">
                      <MdOutlineTag className="text-red-500 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </h3>
                    {item.linkDoProjeto && (
                      <a
                        href={item.linkDoProjeto}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Ir ao projeto"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-red-500/30 bg-red-900/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-red-700 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-900/30 hover:scale-110"
                      >
                        <FiPlay className="text-lg ml-0.5" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                    {item.shortDescription}
                  </p>

                  {/* Footer: date + techs */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                      <FiCalendar className="text-red-400/60" />
                      {item.dateProject}
                    </span>

                    {/* Tech icons preview (max 4) */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex items-center gap-1">
                        {(item.technologies as any[]).slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.04] text-[10px] text-gray-400"
                            title={tech.name}
                          >
                            <span
                              className="opacity-60"
                              dangerouslySetInnerHTML={{ __html: tech.iconSvg }}
                              style={{ width: 12, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            />
                          </span>
                        ))}
                        {(item.technologies as any[]).length > 4 && (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.04] text-[9px] text-gray-500 font-medium">
                            +{(item.technologies as any[]).length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Dynamic glow layer */}
                <div
                  className="gallery-card-glow absolute inset-0 pointer-events-none rounded-xl z-20"
                  style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {LIST_PROJECTS.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-gray-500">
            <span className="text-4xl">📂</span>
            <p className="text-sm">Nenhum projeto encontrado.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ProjectGallery;
