import { TitleSection } from '@/components/TitleSection'
import SkillsList from '@/components/skills_list'
import React from 'react'

const Skills = () => {
  return (
    <>
      <TitleSection name='Soft Skills' />
      <section className='my-24'>
        <div className='flex items-center justify-center h-full'>
          <ul className='grid grid-cols-2 gap-6'>
            {
              Array.from({ length: 6 }).map((_, index) => {
                return (
                  <SkillsList key={index} />
                )
              })
            }
          </ul>
        </div>
      </section>
    </>
  )
}

export default Skills