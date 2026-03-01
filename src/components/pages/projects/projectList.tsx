'use client'
import { TPageDataProp } from '@/app/page';
import { TLight } from '@/types/higthLigthProjects';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MdOutlineTag } from 'react-icons/md';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { FiPlay } from 'react-icons/fi';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import ModalExperience from './modalProject';

const MAX_VISIBILITY = 3;

const ProjectList = ({ pageData }: TPageDataProp) => {
  const [openModalId, setOpenModalId] = useState<null | number>(null);
  const [active, setActive] = useState(0);
  const pathname = usePathname();
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const toggleModal = (projectId: number) => {
    setOpenModalId(prev => (prev === projectId ? null : projectId));
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const xDeg = (y - 0.5) * 10;
    const yDeg = (x - 0.5) * -10;
    card.style.transform = `perspective(1000px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

    const imgLayer = card.querySelector<HTMLElement>('.card-layer-image');
    const contentLayer = card.querySelector<HTMLElement>('.card-layer-content');
    if (imgLayer) {
      const ox = (x - 0.5) * -12;
      const oy = (y - 0.5) * -12;
      imgLayer.style.transform = `translate3d(${ox}px, ${oy}px, 20px) scale(1.08)`;
    }
    if (contentLayer) {
      const ox = (x - 0.5) * 8;
      const oy = (y - 0.5) * 8;
      contentLayer.style.transform = `translate3d(${ox}px, ${oy}px, 40px)`;
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    card.style.transform = '';
    const imgLayer = card.querySelector<HTMLElement>('.card-layer-image');
    const contentLayer = card.querySelector<HTMLElement>('.card-layer-content');
    if (imgLayer) imgLayer.style.transform = '';
    if (contentLayer) contentLayer.style.transform = '';
  }, []);

  const LIST_PROJECTS = pageData?.highLightProjects ?? [];
  const displayedProjects = pathname === '/' ? LIST_PROJECTS.slice(0, 7) : LIST_PROJECTS;
  const count = displayedProjects.length;
  const directionRef = useRef(1); // 1 = forward, -1 = backward

  // Auto-advance every 5s (ping-pong) — pauses while modal is open
  useEffect(() => {
    if (count <= 1 || openModalId !== null) return;
    const timer = setInterval(() => {
      setActive(prev => {
        if (directionRef.current === 1 && prev >= count - 1) {
          directionRef.current = -1;
          return prev - 1;
        }
        if (directionRef.current === -1 && prev <= 0) {
          directionRef.current = 1;
          return prev + 1;
        }
        return prev + directionRef.current;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [count, openModalId]);

  return (
    <>
      {/* Modals */}
      {displayedProjects.map((item: TLight, index: number) =>
        openModalId === index ? (
          <ModalExperience item={item} setOpen={() => setOpenModalId(null)} key={index} />
        ) : null
      )}

      <div className="mb-4" />

      <div className="project-carousel">
            {active > 0 && (
              <button className="project-carousel__nav project-carousel__nav--left" onClick={() => setActive(i => i - 1)}>
                <TiChevronLeftOutline />
              </button>
            )}

            {displayedProjects.map((item: TLight, index: number) => {
              const offset = active - index;
              const absOffset = Math.abs(offset);
              const direction = Math.sign(offset);
              const isActive = index === active;
              const isVisible = absOffset < MAX_VISIBILITY;

              return (
                <div
                  key={index}
                  className="project-carousel__card-container"
                  style={{
                    '--active': isActive ? 1 : 0,
                    '--offset': offset / 3,
                    '--direction': direction,
                    '--abs-offset': absOffset / 3,
                    pointerEvents: isActive ? 'auto' : 'none',
                    opacity: isVisible ? 1 : 0,
                    display: absOffset > MAX_VISIBILITY ? 'none' : 'block',
                  } as React.CSSProperties}
                >
                <div
                  ref={(el) => {
                    if (el) cardRefs.current.set(index, el);
                    else cardRefs.current.delete(index);
                  }}
                  className="project-carousel__card group"
                  onClick={() => isActive && toggleModal(index)}
                  onMouseMove={(e) => isActive && handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="card-frame-border" />
                  <div className="absolute inset-0 overflow-hidden rounded-[inherit] card-layer-image">
                      <Image
                        className="h-full w-full object-cover"
                        src={item.imageProject.url}
                        alt={item.slug}
                        fill
                        unoptimized
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-end p-5 card-layer-content"
                      style={{ opacity: 'var(--active)' } as React.CSSProperties}>
                      <div className="card-hover-title flex items-center justify-between gap-2">
                        <h2 className="flex items-center gap-1.5 text-lg font-bold text-white drop-shadow-lg">
                          <MdOutlineTag className="text-red-500" />
                          {item.title}
                        </h2>
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
                      <p className="card-hover-desc mt-2 text-sm leading-relaxed text-gray-300 line-clamp-3">
                        {item.shortDescription}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModal(index);
                        }}
                        className="card-hover-btn mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-red-900/80 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-red-800 hover:shadow-lg hover:shadow-red-900/30"
                        type="button"
                      >
                        <HiOutlineExternalLink className="text-sm" />
                        Ver projeto
                      </button>
                    </div>
                </div>
                </div>
              );
            })}

            {active < count - 1 && (
              <button className="project-carousel__nav project-carousel__nav--right" onClick={() => setActive(i => i + 1)}>
                <TiChevronRightOutline />
              </button>
            )}
          </div>

          {count > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {displayedProjects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-6 bg-red-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
    </>
  );
};

export default ProjectList;
