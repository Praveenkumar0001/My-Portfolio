import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
// import { Responsibilities} from "@/components/achievements"
import { Responsibilities } from "@/components/responsibilities"
// import { ScrollToTop } from "@/components/scroll-to-top"
import { CustomCursor } from "@/components/custom-cursor"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        {/* <Achievements/> */}
        <Responsibilities />
        <Contact />
      </main>
      <Footer />
      {/* <ScrollToTop /> */}
    </div>
  )
}
