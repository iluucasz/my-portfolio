import { TMySkills } from '@/types/mySkill-info';
import { HiOutlineSparkles } from 'react-icons/hi';
import { IoCheckmarkCircle } from 'react-icons/io5';

type ListSkillsProps = {
  item: TMySkills;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
};

const ListSkills = ({ item, index, cardRef, onMouseMove, onMouseLeave }: ListSkillsProps) => {
  const skills = [item.one, item.two, item.three, item.for].filter(Boolean);
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      className='skill-card group relative flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-7 backdrop-blur-sm overflow-hidden will-change-transform hover:border-red-800/40 hover:shadow-[0_8px_40px_-12px_rgba(139,30,30,0.3)]'
      style={{ transition: 'transform 0.15s ease-out, border-color 0.5s, box-shadow 0.5s' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Accent top line */}
      <div className='absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-red-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

      {/* Glow on hover — parallax layer */}
      <div className='skill-glow-layer pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-red-900/20 blur-[60px] opacity-0 will-change-transform'
        style={{ transition: 'transform 0.15s ease-out, opacity 0.4s ease' }}
      />

      {/* Large number watermark — parallax layer */}
      <span className='skill-num-layer absolute -top-2 -right-1 text-[5rem] font-black leading-none text-white/[0.03] select-none pointer-events-none will-change-transform group-hover:text-red-800/[0.08]'
        style={{ transition: 'transform 0.15s ease-out, color 0.5s' }}
      >
        {num}
      </span>

      {/* Content — parallax layer */}
      <div className='skill-content-layer relative flex flex-col gap-5 will-change-transform' style={{ transition: 'transform 0.15s ease-out' }}>
      {/* Header */}
      <div className='relative flex items-center gap-3'>
        <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-red-900/15 text-red-400/80 ring-1 ring-red-800/20 transition-all duration-500 group-hover:bg-red-900/25 group-hover:text-red-300 group-hover:ring-red-700/40 group-hover:shadow-[0_0_20px_-4px_rgba(220,50,50,0.2)]'>
          <HiOutlineSparkles className='text-xl' />
        </div>
        <h3 className='text-lg font-bold text-white/90 tracking-tight group-hover:text-white transition-colors duration-300'>{item.title}</h3>
      </div>

      {/* Divider */}
      <div className='h-px bg-gradient-to-r from-red-800/30 via-white/[0.06] to-transparent transition-all duration-500 group-hover:from-red-700/40 group-hover:via-white/10' />

      {/* Skill items */}
      <ul className='flex flex-col gap-3.5'>
        {skills.map((skill, i) => (
          <li key={i} className='flex items-start gap-2.5 text-sm text-gray-400/90 transition-colors duration-300 group-hover:text-gray-300'>
            <IoCheckmarkCircle className='mt-0.5 shrink-0 text-red-800/60 group-hover:text-red-500/80 transition-colors duration-300' />
            <span className='leading-relaxed'>{skill}</span>
          </li>
        ))}
      </ul>
      </div>{/* end skill-content-layer */}

      {/* Bottom accent dot */}
      <div className='absolute bottom-4 right-4 h-1 w-1 rounded-full bg-red-800/40 transition-all duration-500 group-hover:bg-red-500/60 group-hover:shadow-[0_0_8px_2px_rgba(220,50,50,0.3)]' />

      {/* Frame border draw-in on hover */}
      <div className='pointer-events-none absolute inset-0 rounded-2xl border border-red-800/0 group-hover:border-red-800/30 transition-[border-color] duration-700' />
    </div>
  );
}

export default ListSkills
