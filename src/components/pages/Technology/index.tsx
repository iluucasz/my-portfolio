import { TitleSection } from '@/components/TitleSection'
import React from 'react'
import Techs from './techs';
import { TPageDataProp } from '@/app/page';

const Technology = ({ pageData }: TPageDataProp) => {
  return (
    <>
      <TitleSection name='Tecnologias' />
      <section className='flex flex-col items-center mt-20 h-[480px]'>
        <div className='grid grid-cols-3 gap-4 lg:max-w-[900px]'>
          <Techs pageData={pageData} />
        </div>
      </section>
    </>
  )
}

export default Technology;