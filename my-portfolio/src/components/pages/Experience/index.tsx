import { TitleSection } from '@/components/TitleSection';
import React from 'react'
import ExperienceItem from './experience_item';
import anhanguera from "../../../../public/images/anhanguera.png"


const Experience = () => {
  return (
    <section className="flex flex-col h-full">

      <TitleSection name='Experiência' />

      <div className="flex justify-center gap-6 mt-20">

        <div className='flex flex-col gap-2 max-w-[380px]'>
          <h3 className='text-white font-semibold text-3xl'>Formação e experiência</h3>
          <p className='font-normal text-lg text-blue-400'>Atualmente estou aberto a novos desafios.</p>
        </div>



        <div className='flex flex-col gap-4 h-[755px] overflow-auto'>
          {
            Array.from({ length: 5 }).map((_, index) => {
              return (
                <ExperienceItem key={index} institute='anhanguera' name='desenvolvimento Mobile' time='2021-06-08 / 2024-06-08' description='Faculdade de desenvolvimento mobile com objetivo de compreender toda área arquitetural de um smartphone' src={anhanguera} />
              )
            })
          }
        </div>

      </div>
    </section>
  )
}

export default Experience;