import { ContactSection } from '@/features/marketing/components/contact-section';
import { CoursesSection } from '@/features/marketing/components/courses-section';
import { HeroSection } from '@/features/marketing/components/hero-section';
import { ServicesSection } from '@/features/marketing/components/services-section';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <CoursesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
