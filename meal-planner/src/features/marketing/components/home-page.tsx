import { ContactSection } from '@/features/marketing/components/contact-section';
import { CoursesSection } from '@/features/marketing/components/courses-section';
import { HeroSection } from '@/features/marketing/components/hero-section';
import { LandingHeader } from '@/features/marketing/components/landing-header';
import { ServicesSection } from '@/features/marketing/components/services-section';
import { SlideNav } from '@/features/marketing/components/slide-nav';
import { StatStrip } from '@/features/marketing/components/stat-strip';

export const HomePage = () => {
  return (
    <div className="dark relative h-screen overflow-hidden">
      <LandingHeader />
      <SlideNav />
      <main className="h-full overflow-y-scroll snap-y snap-mandatory">
        <HeroSection />
        <StatStrip />
        <ServicesSection />
        <CoursesSection />
        <ContactSection />
      </main>
    </div>
  );
};
