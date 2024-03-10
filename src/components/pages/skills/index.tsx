'use client'
import { TMySkillsDataProp } from '@/app/page'
import { TitleSection } from '@/components/TitleSection'
import ListSkills from '@/components/skills_list/list_skill'
import { useEffect } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Skills = ({ mySkillsData }: TMySkillsDataProp) => {

  const listSkill = mySkillsData;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('#ScrollSkill', {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: '0deg',
      scrollTrigger: {
        trigger: '#areaSkill',
        start: 'top 1200px',
        end: 'bottom 1200px',
        scrub: true
      }
    })
    return () => { gsap.killTweensOf("#ScrollSkill") }
  }, [])

  return (
    <>
      <TitleSection name='Soft Skills' />
      <section className='h-full mt-10 mb-10'>
        <div className='min-h-screen h-full flex flex-col justify-center items-center gap-8 md:gap-20 md:grid md:grid-cols-2 lg:grid-cols-[300px,300px,300px]' id='areaProject'>
          {
            listSkill.map((item, index) => {
              return (
                <div key={index}>
                  <ListSkills item={item} />
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Skills