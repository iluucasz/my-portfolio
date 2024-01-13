'use client'
import { TitleSection } from '@/components/TitleSection'
import React from 'react'
import ProjectList from './projectList';
import profile from "../../../../public/images/h.png"
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Projects = () => {

  const pathname = usePathname()

  return (
    <>
      <TitleSection name='Projetos' />
      <section className='flex flex-col gap-6 items-center justify-center h-full my-16'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {
            Array.from({ length: 6 }).map((_, index) => {
              return (
                <ProjectList key={index} src={profile} label='Kenzie Hub' description='Um projeto fullstack feito com as principais linguagens de mercado' />
              )
            })
          }
        </div>
        {pathname == '/' ? <Link href={'/projects'} className='flex items-center p-5 justify-center h-14 w-38 rounded-lg border-2 border-slate-950 font-medium transition-colors text-slate-950 hover:border-red-950 hover:text-red-950 shadow-lg'> <IoIosArrowForward /> Ver todos os projetos</Link> : null}
      </section>
    </>
  )
}

export default Projects;