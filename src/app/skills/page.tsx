import { Suspense } from 'react';
import Skills from '@/components/pages/skills';
import { getPageData } from '@/context/useHygraph';
import SkillsSkeleton from '@/components/skeletons/skills-skeleton';

export const revalidate = 60;

async function SkillsContent() {
  const { mySkills: mySkillsData } = await getPageData();
  if (!mySkillsData?.length) return null;
  return <Skills mySkillsData={mySkillsData} />;
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<SkillsSkeleton />}>
      <SkillsContent />
    </Suspense>
  );
}