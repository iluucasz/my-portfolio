import { TExperienceDataProp } from '@/app/page';
import { TMyExperience } from '@/types/experience-info';
import Image from 'next/image';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { HiOutlineExternalLink } from 'react-icons/hi';
import React from 'react';

type ExperienceItemProps = TExperienceDataProp & {
  cardRefs: React.RefObject<Map<number, HTMLDivElement>>;
  onCardMouseMove: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onCardMouseLeave: (index: number) => void;
};

const ExperienceItem = ({ experienceData, cardRefs, onCardMouseMove, onCardMouseLeave }: ExperienceItemProps) => {

  const LIST_EXPERIENCE = experienceData;

  return (
    <>
      {
        LIST_EXPERIENCE?.map((item: TMyExperience, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <div
              className={`exp-card relative flex items-start gap-0 pb-10 last:pb-0 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              key={index}
            >
              {/* Timeline dot + avatar */}
              <div className='absolute left-5 -translate-x-1/2 z-10 md:left-1/2'>
                <div className='relative rounded-full border-2 border-red-800/60 bg-gray-950 p-0.5 shadow-lg shadow-red-900/20'>
                  <Image
                    src={item.iconInstitute.url}
                    alt={item.nameInstitute}
                    width={80}
                    height={80}
                    quality={90}
                    className='h-10 w-10 rounded-full object-cover'
                  />
                </div>
              </div>

              {/* Spacer for mobile (left side) */}
              <div className='w-12 shrink-0 md:hidden' />

              {/* Card - alternates sides on md+ */}
              <div className={`flex-1 md:w-[calc(50%-28px)] ${
                isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'
              }`}>
                <div
                  ref={(el) => {
                    if (el) cardRefs.current?.set(index, el);
                    else cardRefs.current?.delete(index);
                  }}
                  className='group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm overflow-hidden will-change-transform hover:border-red-800/40 hover:bg-red-900/5 hover:shadow-lg hover:shadow-red-900/10'
                  style={{ transition: 'transform 0.15s ease-out, border-color 0.3s, background-color 0.3s, box-shadow 0.3s' }}
                  onMouseMove={(e) => onCardMouseMove(e, index)}
                  onMouseLeave={() => onCardMouseLeave(index)}
                >
                  {/* Glow — parallax layer */}
                  <div className='exp-card-glow pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-red-900/20 blur-[50px] opacity-0 will-change-transform'
                    style={{ transition: 'transform 0.15s ease-out, opacity 0.4s ease' }}
                  />

                  <div className='exp-card-content relative will-change-transform' style={{ transition: 'transform 0.15s ease-out' }}>
                  {/* Institute link */}
                  <a
                    href={item.linkInstitute}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`inline-flex items-center gap-1.5 text-sm font-medium text-red-400 transition-colors hover:text-red-300 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <HiOutlineExternalLink className='text-xs opacity-60' />
                    @{item.nameInstitute}
                  </a>

                  {/* Title */}
                  <h4 className='mt-2 text-lg font-semibold capitalize text-white'>
                    {item.titleInstitute}
                  </h4>

                  {/* Date range */}
                  <div className={`mt-2 flex items-center gap-2 text-xs text-gray-500 ${
                    isEven ? 'md:justify-end' : ''
                  }`}>
                    <MdOutlineCalendarToday className='text-red-800' />
                    <span>{item.dateStart}</span>
                    <span className='text-gray-600'>—</span>
                    <span>{item.dateEnd}</span>
                  </div>

                  {/* Description */}
                  <p className='mt-3 text-sm leading-relaxed text-gray-400'>
                    {item.descriptionExperience}
                  </p>
                  </div>{/* end exp-card-content */}
                </div>
              </div>

              {/* Empty spacer for the other side on md+ */}
              <div className='hidden md:block md:w-[calc(50%-28px)]' />
            </div>
          )
        })
      }
    </>
  )
}

export default ExperienceItem