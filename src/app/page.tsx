import { Hero } from "@/components/Hero";
import { TableOfContents } from "@/components/TableOfContents";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WritingSection } from "@/components/sections/WritingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111] px-4 py-10 [--menu-offset:9.5rem] [--menu-top:0.75rem] md:px-8 md:[--menu-offset:8rem] md:[--menu-top:1rem]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <Hero />
        <div className="start-gated flex flex-col gap-10">
          <TableOfContents />
          <ProfileSection />
          <WorkSection />
          <WritingSection />
          <ActivitiesSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
