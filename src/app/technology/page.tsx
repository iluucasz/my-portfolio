import Technology from '@/components/pages/Technology';
import { getPageData } from '@/context/useHygraph';

export default async function TechnologyPage() {
  const { page: pageData } = await getPageData();
  return (
    <div className='w-full h-full'>
      <Technology pageData={pageData} />
    </div>
  )
}