import Experience from "@/components/pages/Experience";
import About from "../components/pages/About";
import { TitleSection } from "@/components/TitleSection";
import Technology from "@/components/pages/Technology";
import Projects from "@/components/pages/projects";
import Contact from "@/components/pages/Contact";
import { Footer } from "@/components/footer";
import Skills from "@/components/pages/skills";


export default function Home() {

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
