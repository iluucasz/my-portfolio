import { getRelativeTimeString } from '@/utils/get-relative-time';
import React, { ReactNode } from 'react';

type TTech = {
  tech: {
    icon: ReactNode,
    name: string,
    startDate: string
  }
}

const Techs = ({ tech }: TTech) => {
  const relativeTime = getRelativeTimeString(new Date(tech.startDate), 'pt-BR').replace('há ', '');
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-28 p-4 w-full max-w-56 bg-slate-900/60 text-red-900 rounded-md cursor-pointer shadow-lg transition-all hover:scale-105 hover:text-slate-200 border-2 border-transparent hover:border-2 hover:border-red-900'>
      <div className='flex items-center gap-20'>
        <p className='font-bold'>{tech.name}</p>
        {tech.icon}
      </div>
      <span>{relativeTime} de experiência</span>
    </div>
  )
}

export default Techs;