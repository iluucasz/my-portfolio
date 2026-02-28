import { Suspense } from 'react';
import ProjectGallery from '@/components/pages/projects/projectGallery';
import { getPageData } from '@/context/useHygraph';
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton';

export const revalidate = 60;

async function ProjectsContent() {
  const { page: pageData } = await getPageData();
  if (!pageData) return null;
  return <ProjectGallery pageData={pageData} />;
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsContent />
    </Suspense>
  );
}
