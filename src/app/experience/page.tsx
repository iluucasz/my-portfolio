import Experience from '@/components/pages/Experience';
import { getPageData } from '@/context/useHygraph';

export default async function ExperiencePage() {
  const { myExperiences: experienceData } = await getPageData();
  return (
    <>
      <Experience experienceData={experienceData} />
    </>
  )
}