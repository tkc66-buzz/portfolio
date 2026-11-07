import { Hero } from "@/components/Hero";
import { TableOfContents } from "@/components/TableOfContents";
import { MobileMenu } from "@/components/MobileMenu";
import { RevealObserver } from "@/components/RevealObserver";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WritingSection } from "@/components/sections/WritingSection";

export default function Home() {
  return (
    <div className="min-h-screen [--menu-offset:5rem]">
      {/* Mobile hamburger menu - uses portal */}
      <MobileMenu />
      <TableOfContents />

      <main>
        <Hero />
        <WorkSection />
        <WritingSection />
        <ActivitiesSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <RevealObserver />
    </div>
  );
}
