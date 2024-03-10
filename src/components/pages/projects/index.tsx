'use client'
import { TPageDataProp } from '@/app/page';
import { TitleSection } from '@/components/TitleSection';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import ProjectList from './projectList';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Projects = ({ pageData }: TPageDataProp) => {

  const pathname = usePathname()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('#ScrollProject', {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: '0deg',
      scrollTrigger: {
        trigger: '#areaProject',
        start: 'top 1000px',
        end: 'bottom 1200px',
        scrub: true
      }
    })
    return () => { gsap.killTweensOf("#ScrollProject") }
  }, [])


  return (
    <>
      <TitleSection name='Projetos' />
      <section className='flex flex-col items-center justify-around gap-10 my-28 h-full'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3' id='areaProject'>
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