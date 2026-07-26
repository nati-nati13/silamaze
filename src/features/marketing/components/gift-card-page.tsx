import { GiftCardBuilder } from '@/features/gift-card/components/gift-card-builder';
import { GiftCardHero } from '@/features/gift-card/components/gift-card-hero';
import { GiftCardStepper } from '@/features/gift-card/components/gift-card-stepper';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const GiftCardPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GiftCardHero />

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <GiftCardStepper activeStep={1} />

            <div className="mt-12">
              <GiftCardBuilder />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
