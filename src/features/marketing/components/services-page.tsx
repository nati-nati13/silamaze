import { LandingHeader } from '@/features/marketing/components/landing-header';
import { ServicesSection } from '@/features/marketing/components/services-section';
import { Footer } from '@/shared/components/layout/footer';

export const ServicesPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};
