'use client'
import { TitleSection } from '@/components/TitleSection';
import ExperienceItem from './experience_item';
import { TPageDataProp } from '@/app/page';


const Experience = ({ pageData }: TPageDataProp) => {

  // const subTitle = experienceData ? experienceData[0].subtitle : null;

  return (
    <section className="flex flex-col h-[755px]">

      <TitleSection name='Experiência' />

      <div className="flex flex-col justify-center gap-6 mt-20">

        <div className='flex flex-col gap-2 max-w-[380px]'>
          <h3 className='text-white font-semibold text-2xl text-center'>Formação e experiência</h3>
          {/* <p className='font-normal text-lg text-center text-blue-400'>{subTitle}</p> */}
        </div>

        <div className='flex flex-col gap-4'>
          <ExperienceItem pageData={pageData} />
        </div>

      </div>
    </section>
  )
}

export default Experience;