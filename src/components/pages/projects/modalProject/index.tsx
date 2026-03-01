'use client'
import { CmsIcon } from "@/components/csm-icon";
import { TLight } from "@/types/higthLigthProjects";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiExternalLink, FiGithub, FiZoomIn, FiPlay } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineTag } from "react-icons/md";

type TItemProp = {
  item: TLight;
  key: number;
};

const ModalExperience = ({ item, setOpen }: TItemProp & { setOpen: (open: boolean) => void }) => {
  const [imagePreview, setImagePreview] = useState(false);
  const List_Tech = item.technologies || [];
  const List_Social = item.socialMedias || [];

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    },
    [setOpen]
  );

  // Lock body scroll & listen for Escape
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
    {/* Fullscreen image preview */}
    {imagePreview && (
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fadeIn cursor-zoom-out"
        onClick={() => setImagePreview(false)}
      >
        <button
          type="button"
          onClick={() => setImagePreview(false)}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-gray-400 backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-red-900/60 hover:text-white hover:rotate-90"
        >
          <IoClose className="text-xl" />
        </button>
        <div className="relative w-[90vw] h-[80vh] max-w-5xl">
          <Image
            src={item.imageProject.url}
            alt={item.title}
            fill
            quality={100}
            sizes="90vw"
            className="object-contain"
          />
        </div>
      </div>
    )}

    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 pt-24 sm:p-6 sm:pt-24 animate-fadeIn"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-xl" />

      {/* Modal */}
      <div
        className="project-modal relative z-10 w-full max-w-[560px] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-hidden rounded-xl animate-scaleIn mx-2 sm:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent z-20" />

        {/* Inner scroll container */}
        <div className="overflow-y-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] project-modal-scroll">

          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-gray-400 backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-red-900/60 hover:text-white hover:shadow-lg hover:shadow-red-900/20 hover:rotate-90"
          >
            <IoClose className="text-xl" />
          </button>

          {/* Project image hero */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={item.imageProject.url}
              alt={item.title}
              fill
              quality={95}
              sizes="(max-width: 560px) 100vw, 560px"
              className="object-cover"
            />
            {/* View image button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setImagePreview(true); }}
              className="absolute top-4 left-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-gray-400 backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-red-900/60 hover:text-white hover:shadow-lg hover:shadow-red-900/20"
              title="Ver imagem"
            >
              <FiZoomIn className="text-base" />
            </button>

            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/30 to-transparent" />

            {/* Title block over image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-900/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-300 backdrop-blur-sm">
                  <MdOutlineTag className="text-red-400 text-xs" />
                  {item.slug}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-lg">
                  {item.title}
                </h2>
                {item.linkDoProjeto && (
                  <a
                    href={item.linkDoProjeto}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ir ao projeto"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-red-900/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-red-700 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-900/30 hover:scale-110"
                  >
                    <FiPlay className="text-base ml-0.5" />
                  </a>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <MdOutlineCalendarToday className="text-red-400 text-xs" />
                <span>{item.dateProject}</span>
              </div>
            </div>
          </div>

          {/* Content body */}
          <div className="relative p-4 space-y-4 bg-[#0a0a14]">

            {/* Description */}
            <div>
              <p className="text-sm leading-[1.8] text-gray-400 max-h-[6.5rem] overflow-y-auto pr-1 project-modal-scroll">
                {item.shortDescription}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Technologies */}
            {List_Tech.length > 0 && (
              <div>
                <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Tecnologias utilizadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {List_Tech.map((tech, index) => (
                    <span
                      key={index}
                      className="group/tech inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-gray-400 transition-all duration-300 hover:border-red-800/40 hover:bg-red-900/10 hover:text-white hover:shadow-sm hover:shadow-red-900/10"
                    >
                      <span className="opacity-70 transition-opacity group-hover/tech:opacity-100">
                        <CmsIcon icon={tech.iconSvg} height="15px" width="15px" />
                      </span>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links section */}
            {List_Social.length > 0 && (
              <>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div>
                  <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Redes sociais
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {List_Social.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20"
                      >
                        <CmsIcon icon={social.iconSvg} height="16px" width="16px" />
                        <span>{social.name || 'Acessar'}</span>
                        <FiExternalLink className="text-xs opacity-40" />
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Main CTA */}
            <a
              href={item.linkForGit}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg border border-red-500/20 bg-gradient-to-r from-red-900/80 to-red-800/80 px-5 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-red-500/40 hover:from-red-800 hover:to-red-700 hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
              <FiGithub className="relative text-lg" />
              <span className="relative">Ver Projeto no GitHub</span>
              <FiExternalLink className="relative text-sm opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModalExperience;