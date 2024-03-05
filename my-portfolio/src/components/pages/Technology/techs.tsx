import useFetchHygraph from '@/context/useHygraph';
import { useFetchData } from '@/hooks';
import { getRelativeTimeString } from '@/utils/get-relative-time';
import React, { ReactNode } from 'react';

type TTech = {
  icon: ReactNode,
  name: string,
  startDate: string
}

const Techs = () => {

  // const getPageData = useFetchHygraph((state) => state.getPageData);
  // const { data: pageData } = useFetchData({ requestCallBack: getPageData });

  // const LIST_TECHS = pageData?.knownTechs ?? [];

  return (
    <>
      {
        // LIST_TECHS.map((item: TTech) => {
        //   const relativeTime = getRelativeTimeString(new Date(item.startDate), 'pt-BR').replace('há ', '');
        //   return (
        //     <div key={item.name} className='flex flex-col gap-4 items-center justify-center h-28 p-4 w-full max-w-56 bg-slate-900/60 text-red-900 rounded-md cursor-pointer shadow-lg transition-all hover:scale-105 hover:text-slate-200 border-2 border-transparent hover:border-2 hover:border-red-900'>
        //       <div className='flex items-center gap-20'>
        //         <p className='font-bold'>{item.name}</p>
        //         {item.icon}
        //       </div>
        //       <span>{relativeTime} de experiência</span>
        //     </div>
        //   )
        // })
      }
    </>

  )
}

export default Techs;