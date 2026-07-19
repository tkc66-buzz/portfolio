import { Hero } from "@/components/Hero";
import { TableOfContents } from "@/components/TableOfContents";
import { MobileMenu } from "@/components/MobileMenu";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { getPortfolio } from "@/content/portfolio";

export default async function Home() {
  const { profile } = await getPortfolio();
  return (
    <div
      className="page-main min-h-screen bg-[#111] px-3 pb-10 sm:px-4 md:px-8 [--menu-offset:5rem]"
      style={{ paddingTop: "var(--page-top-pt, 2.5rem)" }}
    >
      {/* Mobile hamburger menu - uses portal, visibility controlled by START gate */}
      <MobileMenu />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <Hero profileBody={profile.body} />
        <div className="start-gated flex flex-col gap-10">
          <TableOfContents />
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
