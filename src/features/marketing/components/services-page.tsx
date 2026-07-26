import { ServicesSection } from '@/features/marketing/components/services-section';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const ServicesPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};
