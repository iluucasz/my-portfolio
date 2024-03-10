import { TExperienceDataProp } from '@/app/page';
import { TMyExperience } from '@/types/experience-info';
import Image from 'next/image';

const ExperienceItem = ({ experienceData }: TExperienceDataProp) => {

  const LIST_EXPERIENCE = experienceData;

  return (
    <>
      {
        LIST_EXPERIENCE?.map((item: TMyExperience, index: number) => {
          return (
            <div className='flex gap-4 mx-14' key={index}>
              <div className='flex gap-4'>

                <div className='flex flex-col justify-center'>
                  <Image src={item.iconInstitute.url} alt='logotipo' width={40} height={40} className='min-h-12 min-w-12 rounded-full object-cover border-2 border-blue-500' />
                </div>

                <div className='h-full w-[1px] bg-blue-400' />
              </div>

              <div className='w-[380px]'>
                <div className='flex flex-col gap-2 text-lg'>
                  <a href={item.linkInstitute} target="_blank" className='text-blue-400 capitalize hover:text-slate-900 transition-colors'>@{item.nameInstitute}</a>
                  <h4 className='text-white semibold capitalize'>{item.titleInstitute}</h4>
                  <span className='text-blue-400'>Começo: {item.dateStart}</span>
                  <span className='text-blue-400'>Fim: {item.dateEnd}</span>
                  <p className='text-gray-500 capitalize xl:w-[600px]'>
                    {item.descriptionExperience}
                  </p>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default ExperienceItem