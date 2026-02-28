import { Suspense } from "react";
import { Footer } from "@/components/footer";
import Contact from "@/components/pages/Contact";
import Experience from "@/components/pages/Experience";
import Technology from "@/components/pages/Technology";
import Projects from "@/components/pages/projects";
import Skills from "@/components/pages/skills";
import Clouds from "@/components/clouds";
import { getPageData } from "@/context/useHygraph";
import { TMyExperience } from "@/types/experience-info";
import { TMySkills } from "@/types/mySkill-info";
import { HomePageInfo } from "@/types/page-info";
import About from "../components/pages/About";
import AboutSkeleton from "@/components/skeletons/about-skeleton";
import TechnologySkeleton from "@/components/skeletons/technology-skeleton";
import ProjectsSkeleton from "@/components/skeletons/projects-skeleton";
import ExperienceSkeleton from "@/components/skeletons/experience-skeleton";
import SkillsSkeleton from "@/components/skeletons/skills-skeleton";

export type TPageDataProp = {
  pageData: HomePageInfo
  id?: string
}
export type TExperienceDataProp = {
  experienceData: TMyExperience[]
}

export type TMySkillsDataProp = {
  mySkillsData: TMySkills[]
}

/* ── Async section wrappers ── */
async function AboutSection() {
  const { page: pageData } = await getPageData();
  if (!pageData) return null;
  return <About pageData={pageData} />;
}

async function TechnologySection() {
  const { page: pageData } = await getPageData();
  if (!pageData) return null;
  return <Technology pageData={pageData} />;
}

async function ProjectsSection() {
  const { page: pageData } = await getPageData();
  if (!pageData) return null;
  return <Projects pageData={pageData} />;
}

async function ExperienceSection() {
  const { myExperiences: experienceData } = await getPageData();
  if (!experienceData?.length) return null;
  return <Experience experienceData={experienceData} />;
}

async function SkillsSection() {
  const { mySkills: mySkillsData } = await getPageData();
  if (!mySkillsData?.length) return null;
  return <Skills mySkillsData={mySkillsData} />;
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<AboutSkeleton />}>
        <AboutSection />
      </Suspense>

      <div className="h-52 lg:h-72" />
      <div className="relative overflow-hidden">
        <Clouds id="clouds-tech-exp" />
        <div className="relative z-[1]">
          <Suspense fallback={<TechnologySkeleton />}>
            <TechnologySection />
          </Suspense>

          <div className="h-52 lg:h-72" />
          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectsSection />
          </Suspense>

          <div className="h-52 lg:h-72" />
          <Suspense fallback={<ExperienceSkeleton />}>
            <ExperienceSection />
          </Suspense>
        </div>
      </div>

      <div className="h-52 lg:h-72" />
      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsSection />
      </Suspense>

      <div className="h-52 lg:h-72" />
      <Contact />
      <Footer />
    </>
  )
}
