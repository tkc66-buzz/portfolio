import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111] px-4 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}
