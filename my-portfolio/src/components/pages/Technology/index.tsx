import { TitleSection } from '@/components/TitleSection'
import React from 'react'
import Techs from './techs';
import { FaReact } from 'react-icons/fa';
import { TbBrandTypescript } from "react-icons/tb";
import { RiJavascriptLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";
import { BsFiletypeScss } from "react-icons/bs";
import { SiPrisma } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { FaNode } from "react-icons/fa";

let LIST_TECHS = [
  {
    icon: < TbBrandTypescript />,
    name: 'Typescript',
    startDate: '2023-06-01',
  },
  {
    icon: <RiJavascriptLine />,
    name: 'Javascript',
    startDate: '2023-05-01'
  },
  {
    icon: <FaReact />,
    name: 'React',
    startDate: '2023-06-01'
  },
  {
    icon: <TbBrandNextjs />,
    name: 'NextJs',
    startDate: '2023-08-01'
  },
  {
    icon: <SiPrisma />,
    name: 'Prisma',
    startDate: '2023-09-01'
  },
  {
    icon: <SiPostgresql />,
    name: 'PostgreSQL',
    startDate: '2023-10-01'
  },
  {
    icon: <FaNode />,
    name: 'Node',
    startDate: '2023-08-01'
  },
  {
    icon: <SiTailwindcss />,
    name: 'Tailwind',
    startDate: '2023-06-01'
  },
  {
    icon: <BsFiletypeScss />,
    name: 'Sass',
    startDate: '2023-05-01'
  },

];

const Technology = () => {
  return (
    <>
      <TitleSection name='Tecnologias' />
      <section className='flex flex-col items-center justify-center h-[755px]'>
        <div className='grid grid-cols-3 gap-4 lg:max-w-[900px]'>
          {
            LIST_TECHS.map((item) => {
              return (
                <Techs key={item.name} tech={{
                  icon: item.icon,
                  name: item.name,
                  startDate: item.startDate
                }} />
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Technology;