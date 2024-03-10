import { TitleSection } from '@/components/TitleSection';
import ProjectList from '@/components/pages/projects/projectList';
import { getPageData } from '@/context/useHygraph';

export default async function ProjectsPage() {
  const { page: pageData } = await getPageData();
  return (
    <>
      <TitleSection name='Projetos' />
      <div className='flex items-center justify-center mx-10 min-h-screen h-full'>
        <div className='grid grid-cols-1 h-full gap-5 md:grid-cols-4'>
          <ProjectList pageData={pageData} />
        </div>
      </div>
    </>
  )
}
