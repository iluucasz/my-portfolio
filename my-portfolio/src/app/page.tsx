import Experience from "@/components/pages/Experience";
import About from "../components/pages/About";
import { TitleSection } from "@/components/TitleSection";
import Technology from "@/components/pages/Technology";
import Projects from "@/components/pages/projects";
import Contact from "@/components/pages/Contact";
import { Footer } from "@/components/footer";
import Skills from "@/components/pages/skills";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

const getPageData = async () => {
  const query = `
 query MyQuery {
    page(where: { slug: "home" }) {
    iam {
        text
      }
    introduction {
        raw
      }
    knownTechs {
        name
        iconSvg
        startDate
      }
    technologies {
        name
      }
    }
  }
 `

  return fetchHygraphQuery(query)
}

export default async function Home() {

  return (
    <>
      <TitleSection name="Sobre" />
      <About />
      <Technology />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}
