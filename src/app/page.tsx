import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import NetworkDemo from "@/components/NetworkDemo";
import SnakeGameSection from "@/components/SnakeGameSection";
import Education from "@/components/Education";
import TechStack from "@/components/TechStack";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <TechStack />
        <Skills />
        <Projects />
        <NetworkDemo />
        <SnakeGameSection />
        <Philosophy />
        <Contact />
      </main>
    </>
  );
}
