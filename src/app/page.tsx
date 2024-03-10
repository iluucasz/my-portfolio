import { TitleSection } from "@/components/TitleSection";
import { Footer } from "@/components/footer";
import Contact from "@/components/pages/Contact";
import Experience from "@/components/pages/Experience";
import Technology from "@/components/pages/Technology";
import Projects from "@/components/pages/projects";
import Skills from "@/components/pages/skills";
import { getPageData } from "@/context/useHygraph";
import { TMyExperience } from "@/types/experience-info";
import { TMySkills } from "@/types/mySkill-info";
import { HomePageInfo } from "@/types/page-info";
import Image from "next/image";
import loading from '../../public/images/loading.gif';
import About from "../components/pages/About";

export type TPageDataProp = {
  pageData: HomePageInfo
}
export type TExperienceDataProp = {
  experienceData: TMyExperience[]
}

export type TMySkillsDataProp = {
  mySkillsData: TMySkills[]
}

export default async function Home() {
  const { page: pageData, myExperiences: experienceData, mySkills: mySkillsData } = await getPageData()

  if (!pageData) {
    return (
      <div className="absolute top-2/4 left-2/4 z-10">
        <Image width={200} height={200} src={loading} alt="loading" />
      </div>
    )
  }

  return (
    <>
      <TitleSection name="Sobre" />
      <About pageData={pageData} />
      <Technology pageData={pageData} />
      <Projects pageData={pageData} />
      <Experience experienceData={experienceData} />
      <Skills mySkillsData={mySkillsData} />
      <Contact />
      <Footer />
    </>
  )
}
