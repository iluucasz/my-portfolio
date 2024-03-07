import { TitleSection } from "@/components/TitleSection";
import { Footer } from "@/components/footer";
import Contact from "@/components/pages/Contact";
import Experience from "@/components/pages/Experience";
import Technology from "@/components/pages/Technology";
import Projects from "@/components/pages/projects";
import Skills from "@/components/pages/skills";
import { getPageData } from "@/context/useHygraph";
import About from "../components/pages/About";
import { HomePageInfo } from "@/types/page-info";

export type TPageDataProp = {
  pageData: HomePageInfo
}

export default async function Home() {
  const { page: pageData } = await getPageData()

  return (
    <>
      <TitleSection name="Sobre" />
      <About pageData={pageData} />
      <Technology pageData={pageData} />
      <Projects pageData={pageData} />
      <Experience pageData={pageData} />
      <Skills pageData={pageData} />
      <Contact />
      <Footer />
    </>
  )
}
