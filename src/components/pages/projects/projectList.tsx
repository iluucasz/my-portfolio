'use client'
import { TPageDataProp } from '@/app/page';
import { TLight } from '@/types/higthLigthProjects';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineTag } from 'react-icons/md';
import ModalExperience from './modalProject';

const ProjectList = ({ pageData }: TPageDataProp) => {
  const [openModalId, setOpenModalId] = useState<null | number>(null);

  const pathname = usePathname()

  const toggleModal = (projectId: number) => {
    if (openModalId === projectId) {
      setOpenModalId(null);
    } else {
      setOpenModalId(projectId);
    }
  };

  const LIST_PROJECTS = pageData?.highLightProjects ?? [];

  const displayedProjects = pathname === '/' ? LIST_PROJECTS.slice(0, 3) : LIST_PROJECTS;

  return (
    <>
      {displayedProjects.map((item: TLight, index: number) => (
        <div key={index}>
          {openModalId === index && (
            <ModalExperience item={item} setOpen={() => setOpenModalId(null)} key={0} />
          )}
          <div className="group relative cursor-pointer items-center justify-center rounded-xl overflow-hidden transition-shadow hover:shadow-xl border-2 border-transparent hover:border-2 hover:border-red-900 hover:shadow-black/30">
            <div className="h-96 w-72">
              <Image
                className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={item.imageProject.url}
                alt={item.slug}
                width={300}
                height={300}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>

            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
              <h1 className="flex gap-1 items-center font-dmserif text-3xl font-bold text-red-900">
                <MdOutlineTag />
                {item.title}
              </h1>
              <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.shortDescription}
              </p>
              <button
                onClick={() => toggleModal(index)}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Ver projeto...
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectList;
