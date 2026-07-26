import { AboutSection } from '@/features/marketing/components/about-section';
import { AcademyAboutSection } from '@/features/marketing/components/academy-about-section';
import { AcademyCtaBand } from '@/features/marketing/components/academy-cta-band';
import { BranchesSection } from '@/features/marketing/components/branches-section';
import { CoursesSection } from '@/features/marketing/components/courses-section';
import { CtaBand } from '@/features/marketing/components/cta-band';
import { FaqSection } from '@/features/marketing/components/faq-section';
import { GalleryPreviewSection } from '@/features/marketing/components/gallery-preview-section';
import { HeroSection } from '@/features/marketing/components/hero-section';
import { OfferingsSection } from '@/features/marketing/components/offerings-section';
import { PhilosophySection } from '@/features/marketing/components/philosophy-section';
import { ReservationSection } from '@/features/marketing/components/reservation-section';
import { ServicesSection } from '@/features/marketing/components/services-section';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';
import { Reveal } from '@/shared/components/ui/reveal';

export const HomePage = () => {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <HeroSection />
        <Reveal>
          <PhilosophySection />
        </Reveal>
        <Reveal>
          <AcademyAboutSection />
        </Reveal>
        <Reveal>
          <OfferingsSection />
        </Reveal>
        <Reveal>
          <CoursesSection />
        </Reveal>
        <Reveal>
          <ServicesSection />
        </Reveal>
        <Reveal>
          <AcademyCtaBand />
        </Reveal>
        <Reveal>
          <GalleryPreviewSection />
        </Reveal>
        <Reveal>
          <AboutSection />
        </Reveal>
        <Reveal>
          <ReservationSection />
        </Reveal>
        <Reveal>
          <FaqSection />
        </Reveal>
        <Reveal>
          <BranchesSection />
        </Reveal>
        <Reveal>
          <CtaBand />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
};
