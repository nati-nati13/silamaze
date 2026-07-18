import { GiftCardBuilder } from '@/features/gift-card/components/gift-card-builder';
import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';

export const GiftCardPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-brand-academy">Dermako Gift Card</p>
              <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                შექმენით ექსკლუზიური <span className="italic text-brand-green">სასაჩუქრე ბარათი</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                აჩუქეთ სილამაზე — კლინიკის პრემიუმ პროცედურებზე ან აკადემიის პროფესიულ
                კურსებზე. აირჩიეთ ნომინალი, დააპერსონალიზეთ და შეუკვეთეთ წამებში.
              </p>
            </div>

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
