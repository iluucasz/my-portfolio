'use client'
import { CmsIcon } from "@/components/csm-icon";
import { TLight } from "@/types/higthLigthProjects";
import Image from "next/image";

type TItemProp = {
  item: TLight;
  key: number
}


const ModalExperience = ({ item, key, setOpen }: TItemProp & { setOpen: (open: boolean) => void }) => {

  const List_Tech = item.technologies;
  const List_Socical = item.socialMedias;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-950/30 " key={key}>
      <div className="w-[360px] lg:w-[600px] shadow-2xl">

        <div className="bg-white rounded-lg shadow dark:bg-slate-950">

          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Projeto
            </h3>
            <button type="button" onClick={() => setOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="timeline-modal">
              x
            </button>
          </div>

          <div className="p-4 md:p-8">
            <ol className="relative border-s border-gray-200 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">
              <li className="mb-10 ms-8 flex flex-col gap-4">
                <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                    {item.slug}
                  </span>
                </h3>
                <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Criado em {item.dateProject}</time>

                <div className="flex justify-center my-5 border-2 border-gray-500">
                  <Image width={400} height={400} src={item.imageProject.url} alt="imagem do projeto" className="object-fill w-300 h-300" />
                </div>

                <div>
                  <p className="text-blue-500">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="flex h-14 gap-5 overflow-x-auto overflow-y-hidden">
                  {
                    List_Tech.map((item, index) => {
                      return (
                        <span className="py-2 px-3 gap-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer" key={index}>
                          {item.name}
                          <CmsIcon icon={item.iconSvg} height="30px" width="30px" />
                        </span>
                      )
                    })
                  }
                </div>
              </li>
            </ol>
            <div className="h-20 ">
              {List_Socical.map((item, index) => {
                return (
                  <a key={index} className="flex items-center justify-center gap-5 bg-slate-800 rounded-md p-5" href={item.url} target="_blank">
                    <CmsIcon icon={item.iconSvg} height="20px" width="20px" />
                    <p className="text-lg font-bold text-zinc-50">Linkedin</p>
                  </a>
                )
              })}
            </div>
            <a href={item.linkForGit} className="text-white inline-flex w-full h-20 items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" target="_blank">Ver Projeto...</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalExperience;