import { TitleSection } from '@/components/TitleSection';
import Projects from '@/components/pages/projects';
import ProjectList from '@/components/pages/projects/projectList';
import { getPageData } from '@/context/useHygraph';

export default async function ProjectsPage() {
  const { page: pageData } = await getPageData();
  return (
    <>
      <Projects pageData={pageData} />
    </>
  )
}
