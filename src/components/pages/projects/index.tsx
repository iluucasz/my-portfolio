'use client'
import { TPageDataProp } from '@/app/page';
import { TitleSection } from '@/components/TitleSection';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import ProjectList from './projectList';


const Projects = ({ pageData }: TPageDataProp) => {

  const pathname = usePathname()


  return (
    <>
      <TitleSection name='Projetos' />
      <section className='flex flex-col items-center justify-around gap-10 my-20'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <ProjectList pageData={pageData} />
        </div>
        {pathname == '/' ?
          <Link href={'/projects'} className='flex justify-center items-center h-10 p-5 text-white bg-red-900 rounded-lg shadow-md opacity-75 transition-all cursor-pointer hover:scale-105 hover:opacity-100'>
            <IoIosArrowForward />
            Ver todos os projetos
          </Link> : null}
      </section>
    </>
  )
}

export default Projects;