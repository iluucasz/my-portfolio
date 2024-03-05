import { TitleSection } from '@/components/TitleSection'
import ListSkills from '@/components/skills_list/list_skill'
import React from 'react'

const Skills = () => {
  return (
    <>
      <TitleSection name='Soft Skills' />
      <section className='my-24 h-[750px]'>
        <div className='flex items-center justify-center h-full'>
          <ListSkills/>
        </div>
      </section>
    </>
  )
}

export default Skills