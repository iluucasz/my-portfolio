'use client'
import { TitleSection } from '@/components/TitleSection'
import React from 'react'
import ProjectList from './projectList';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TPageDataProp } from '@/app/page';


const Projects = ({ pageData }: TPageDataProp) => {

  const pathname = usePathname()
  return (
    <>
      <TitleSection name='Projetos' />
      <section className='flex flex-col gap-6 items-center justify-center h-[755px] my-16'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <ProjectList pageData={pageData} />
        </div>
        {pathname == '/' ?
          <Link href={'/projects'} className='flex items-center p-5 justify-center h-14 w-38 rounded-lg border-2 border-slate-950 font-medium transition-al text-slate-950 hover:border-white hover:text-white hover:scale-105 shadow-lg'>
            <IoIosArrowForward />
            Ver todos os projetos
          </Link> : null}
      </section>
    </>
  )
}

export default Projects;