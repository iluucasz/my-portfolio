'use client'
import { TitleSection } from '@/components/TitleSection'
import React from 'react'
import Techs from './techs';

const Technology = () => {
  return (
    <>
      <TitleSection name='Tecnologias' />
      <section className='flex flex-col items-center justify-center h-[755px]'>
        <div className='grid grid-cols-3 gap-4 lg:max-w-[900px]'>
          <Techs />
        </div>
      </section>
    </>
  )
}

export default Technology;