import { TPageDataProp } from '@/app/page';
import { useFetchData } from '@/hooks';
import { TMySkills } from '@/types/mySkill-info';
import React from 'react'

const ListSkills = ({ pageData }: TPageDataProp) => {

  return (
    <>
      {/* {
      MY_SKILLS?.map((item)=>{
        return(
          <>
    <li className='flex flex-col gap-5 w-[400px] h-[300px] p-5 pl-10 bg-gradient-to-r from-[#3f171e] to-[#0f172a] text-red-900 border-2 border-red-900 shadow-md hover:scale-105 hover:text-red-700 hover:from-slate-900 hover:to-slate-900 transition-all cursor-pointer'>
      <h3 className='text-xl font-semibold mx-auto'>{item.title}</h3>
      <ul className='flex flex-col gap-3'>
        <li>{item.one}</li>
        <li>{item.two}</li>
        <li>{item.three}</li>
        <li>{item.for}</li>
      </ul>
    </li>
          </>
        )
      })
    } */}
    </>
  )
}

export default ListSkills
