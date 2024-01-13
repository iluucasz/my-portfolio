import Image, { StaticImageData } from 'next/image'
import React from 'react'

type TExperienceItem = {
  src: string | StaticImageData;
  institute: string,
  name: string,
  time: string,
  description: string
}

const ExperienceItem = ({ src, institute, name, time, description }: TExperienceItem) => {
  return (
    <div className='grid grid-cols-[40px,1fr] overflow-x gap-4 md:gap-10'>
      <div className='flex flex-col items-center'>
        <div className='rounded-full border-2 border-blue-400 p-1'>
          <Image src={src} alt='logotipo' width={40} height={40} className='rounded-full' />
        </div>

        <div className='h-full w-[1px] bg-blue-400' />
      </div>

      <div className='w-[380px]'>
        <div className='flex flex-col gap-2 text-sm'>
          <a href="http://" target="_blank" className='text-blue-400 capitalize hover:text-slate-900 transition-colors'>@{institute}</a>
          <h4 className='text-white semibold capitalize'>{name}</h4>
          <span className='text-blue-400'>{time}</span>
          <p className='text-gray-500 capitalize'>
            {description}
          </p>
        </div>
      </div>
    </div>

  )
}

export default ExperienceItem