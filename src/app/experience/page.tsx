import { Suspense } from 'react';
import Experience from '@/components/pages/Experience';
import { getPageData } from '@/context/useHygraph';
import ExperienceSkeleton from '@/components/skeletons/experience-skeleton';

export const revalidate = 60;

async function ExperienceContent() {
  const { myExperiences: experienceData } = await getPageData();
  if (!experienceData?.length) return null;
  return <Experience experienceData={experienceData} />;
}

export default function ExperiencePage() {
  return (
    <Suspense fallback={<ExperienceSkeleton />}>
      <ExperienceContent />
    </Suspense>
  );
}