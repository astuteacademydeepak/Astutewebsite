import { Hero, AudiencePathway, Destinations, MedicalPathway, WhyAstute, JourneyTimeline, TestimonialsSection, Partners, FreeAssessments, EventsSection, BlogSection, FaqSection, FinalCta } from "../components/HomeSections";

export default function Home({ onOpenLead }) {
  return (
    <>
      <Hero onOpenLead={onOpenLead} />
      <AudiencePathway onOpenLead={onOpenLead} />
      <Destinations />
      <MedicalPathway />
      <WhyAstute />
      <JourneyTimeline />
      <TestimonialsSection />
      <Partners />
      <FreeAssessments onOpenLead={onOpenLead} />
      <EventsSection />
      <BlogSection />
      <FaqSection />
      <FinalCta onOpenLead={onOpenLead} />
    </>
  );
}
