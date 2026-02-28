import { TPageDataProp } from '@/app/page';
import { CmsIcon } from '@/components/csm-icon';
import { TKnownTechs } from '@/types/knownTechs';
import { getRelativeTimeString } from '@/utils/get-relative-time';
import React from 'react';

type TechsProps = TPageDataProp & {
  cardRefs: React.RefObject<Map<number, HTMLDivElement>>;
  onCardMouseMove: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onCardMouseLeave: (index: number) => void;
};

const Techs = ({ pageData, cardRefs, onCardMouseMove, onCardMouseLeave }: TechsProps) => {

  const LIST_TECHS = pageData?.knownTechs ?? [];

  return (
    <>
      {
        LIST_TECHS.map((item: TKnownTechs, index: number) => {
          const relativeTime = getRelativeTimeString(new Date(item.startDate), 'pt-BR').replace('há ', '');
          return (
            <div
              key={item.name}
              ref={(el) => {
                if (el) cardRefs.current?.set(index, el);
                else cardRefs.current?.delete(index);
              }}
              className='tech-card group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-6 backdrop-blur-sm overflow-hidden will-change-transform hover:border-red-800/40 hover:shadow-[0_8px_40px_-12px_rgba(139,30,30,0.25)]'
              style={{ transition: 'transform 0.15s ease-out, border-color 0.5s, box-shadow 0.5s' }}
              onMouseMove={(e) => onCardMouseMove(e, index)}
              onMouseLeave={() => onCardMouseLeave(index)}
            >
              {/* Accent top line */}
              <div className='absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-red-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              {/* Glow — parallax layer */}
              <div
                className='tech-glow-layer pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-red-900/20 blur-[50px] opacity-0 will-change-transform'
                style={{ transition: 'transform 0.15s ease-out, opacity 0.4s ease' }}
              />

              {/* Icon — parallax layer */}
              <div
                className='tech-icon-layer relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-gray-400 will-change-transform group-hover:border-red-800/30 group-hover:text-white'
                style={{ transition: 'transform 0.15s ease-out, border-color 0.5s, color 0.3s' }}
              >
                {/* Ring glow on hover */}
                <div className='absolute inset-0 rounded-xl bg-red-900/0 blur-md transition-all duration-500 group-hover:bg-red-900/20' />
                <CmsIcon icon={item.iconSvg} height='30px' width='30px' />
              </div>

              {/* Content — parallax layer */}
              <div className='tech-content-layer relative flex flex-col items-center gap-2 will-change-transform' style={{ transition: 'transform 0.15s ease-out' }}>
                {/* Name */}
                <p className='text-sm font-semibold text-white tracking-wide'>{item.name}</p>

                {/* Divider */}
                <div className='h-px w-8 bg-gradient-to-r from-transparent via-red-800/40 to-transparent opacity-50 group-hover:opacity-100 group-hover:w-12 transition-all duration-500' />

                {/* Experience time */}
                <span className='rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-gray-500 transition-all duration-300 group-hover:border-red-800/30 group-hover:bg-red-900/15 group-hover:text-red-300'>
                  {relativeTime}
                </span>
              </div>

              {/* Bottom accent dot */}
              <div className='absolute bottom-3 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-red-800/30 transition-all duration-500 group-hover:bg-red-500/60 group-hover:shadow-[0_0_8px_2px_rgba(220,50,50,0.3)]' />

              {/* Frame border draw-in on hover */}
              <div className='pointer-events-none absolute inset-0 rounded-2xl border border-red-800/0 group-hover:border-red-800/20 transition-[border-color] duration-700' />
            </div>
          )
        })
      }
    </>
  )
}

export default Techs;