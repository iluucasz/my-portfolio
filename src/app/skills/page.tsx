import Skills from '@/components/pages/skills';
import { getPageData } from '@/context/useHygraph';

export default async function SkillsPage() {
  const { mySkills: mySkillsData } = await getPageData()
  return (
    <>
      <Skills mySkillsData={mySkillsData} />
    </>
  )
}