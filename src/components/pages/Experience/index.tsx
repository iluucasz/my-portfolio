'use client'
import { TitleSection } from '@/components/TitleSection';
import ExperienceItem from './experience_item';
import { TExperienceDataProp } from '@/app/page';


const Experience = ({ experienceData }: TExperienceDataProp) => {
  const subTitle = experienceData[0]?.subtitle;

  return (
    <>
      <TitleSection name='Experiência' />
      <section className="flex flex-col items-center w-full min-h-[755px] py-8">
        <div className="flex flex-col justify-center items-center w-full gap-6">

          <div className='flex flex-col gap-2 mt-20 w-full lg:w-[500px]'>
            <h3 className='text-white font-semibold text-2xl text-center lg:text-4xl'>Formação e experiência</h3>
            <p className='font-normal text-lg text-center text-blue-400'>{subTitle}</p>
          </div>

          <div className='flex flex-col gap-4 mt-10 w-full max-w-[380px]'>
            <ExperienceItem experienceData={experienceData} />
          </div>

        </div>
      </section>
    </>
  )
}

export default Experience;