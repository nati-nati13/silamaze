import { GiftCardHero } from '@/features/gift-card/components/gift-card-hero';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const GiftCardPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GiftCardHero />
      </main>
      <Footer />
    </div>
  );
};
