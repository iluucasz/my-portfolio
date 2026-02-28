import { Suspense } from 'react';
import Projects from '@/components/pages/projects';
import { getPageData } from '@/context/useHygraph';
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton';

export const revalidate = 60;

async function ProjectsContent() {
  const { page: pageData } = await getPageData();
  if (!pageData) return null;
  return <Projects pageData={pageData} />;
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsContent />
    </Suspense>
  );
}
