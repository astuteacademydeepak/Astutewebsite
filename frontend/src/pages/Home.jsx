import { Hero, AudiencePathway, Destinations, MedicalPathway, WhyAstute, JourneyTimeline, TestimonialsSection, FreeAssessments, EventsSection, BlogSection, FaqSection, FinalCta } from "../components/HomeSections";

export default function Home({ onOpenLead, onOpenPathway }) {
  return (
    <>
      <Hero onOpenLead={onOpenLead} onOpenPathway={onOpenPathway} />
      <AudiencePathway onOpenLead={onOpenLead} />
      <Destinations />
      <MedicalPathway />
      <WhyAstute />
      <JourneyTimeline />
      <TestimonialsSection />
      <FreeAssessments onOpenLead={onOpenLead} onOpenPathway={onOpenPathway} />
      <EventsSection />
      <BlogSection />
      <FaqSection />
      <FinalCta onOpenLead={onOpenLead} />
    </>
  );
}
