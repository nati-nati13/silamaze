import { AboutSection } from '@/features/marketing/components/about-section';
import { BranchesSection } from '@/features/marketing/components/branches-section';
import { CoursesSection } from '@/features/marketing/components/courses-section';
import { CtaBand } from '@/features/marketing/components/cta-band';
import { FaqSection } from '@/features/marketing/components/faq-section';
import { HeroSection } from '@/features/marketing/components/hero-section';
import { LandingHeader } from '@/features/marketing/components/landing-header';
import { OfferingsSection } from '@/features/marketing/components/offerings-section';
import { ReservationSection } from '@/features/marketing/components/reservation-section';
import { ServicesSection } from '@/features/marketing/components/services-section';
import { TestimonialsSection } from '@/features/marketing/components/testimonials-section';
import { Footer } from '@/shared/components/layout/footer';

export const HomePage = () => {
  return (
    <div className="bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <OfferingsSection />
        <CoursesSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ReservationSection />
        <FaqSection />
        <BranchesSection />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
};
