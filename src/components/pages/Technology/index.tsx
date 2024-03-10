'use client'
import { TPageDataProp } from '@/app/page';
import { TitleSection } from '@/components/TitleSection';
import Techs from './techs';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Technology = ({ pageData }: TPageDataProp) => {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('#ScrollTech', {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: '0deg',
      scrollTrigger: {
        trigger: '#areaTech',
        start: 'top 1100px',
        end: 'bottom 1150px',
        scrub: true
      }
    })
  }, [])

  return (
    <>
      <TitleSection name='Tecnologias' />
      <section className='flex justify-center items-center w-full h-screen min-h-screen overflow-hidden'>
        <div className='grid grid-cols-2 gap-2 w-full md:grid-cols-3 md:gap-4 lg:max-w-[900px] ' id='areaTech' >
          <Techs pageData={pageData} />
        </div>
      </section>
    </>
  )
}

export default Technology;