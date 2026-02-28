'use client'
import { TPageDataProp } from '@/app/page';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import { TitleSection } from '@/components/TitleSection';
import ProjectList from './projectList';


const Projects = ({ pageData }: TPageDataProp) => {

  const pathname = usePathname()

  return (
    <>
      <section className='flex flex-col items-center justify-around gap-16 py-40 h-full overflow-x-hidden w-full'>
        {/* Section title */}
        <TitleSection name="Projetos" />

        <div className='w-full max-w-5xl px-4 overflow-hidden'>
          <ProjectList pageData={pageData} />
        </div>
        {pathname == '/' ?
          <Link href={'/projects'} className='flex items-center gap-2 rounded-full border border-red-500/40 bg-red-900/60 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-red-800 hover:shadow-lg hover:shadow-red-900/30 hover:scale-105'>
            Ver todos os projetos
            <IoIosArrowForward />
          </Link> : null}
      </section>
    </>
  )
}

export default Projects;