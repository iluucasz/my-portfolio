import { TPageDataProp } from '@/app/page'
import { useFetchData } from '@/hooks'
import { TLight } from '@/types/higthLigthProjects'
import Image from 'next/image'
import React from 'react'
import { MdOutlineTag } from 'react-icons/md'


const ProjectList = ({ pageData }: TPageDataProp) => {

  const LIST_PROJECTS = pageData?.highLightProjects ?? [];

  return (
    <>
      {
        LIST_PROJECTS.map((item: TLight) => {
          return (
            <div key={item.slug} className="group relative cursor-pointer items-center justify-center rounded-xl overflow-hidden  transition-shadow hover:shadow-xl border-2 border-transparent hover:border-2 hover:border-red-900 hover:shadow-black/30">
              <div className="h-96 w-72">
                <Image className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={item.imageProject.url} alt={item.slug} width={300} height={300} />
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>

              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className="flex gap-1 items-center font-dmserif text-3xl font-bold text-red-900"><MdOutlineTag />{item.title}</h1>
                <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.shortDescription}
                </p>
                <button className="rounded-full bg-slate-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">Ver Projeto..</button>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default ProjectList;