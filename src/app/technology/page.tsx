import { Suspense } from 'react';
import Technology from '@/components/pages/Technology';
import { getPageData } from '@/context/useHygraph';
import TechnologySkeleton from '@/components/skeletons/technology-skeleton';

async function TechnologyContent() {
  const { page: pageData } = await getPageData();
  if (!pageData) return null;
  return (
    <div className='w-full h-full'>
      <Technology pageData={pageData} />
    </div>
  );
}

export default function TechnologyPage() {
  return (
    <Suspense fallback={<TechnologySkeleton />}>
      <TechnologyContent />
    </Suspense>
  );
}