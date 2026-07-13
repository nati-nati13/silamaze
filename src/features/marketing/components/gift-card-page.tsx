import { CheckCircle, Facebook, Gift } from 'lucide-react';
import Link from 'next/link';

import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';
import { Button } from '@/shared/components/ui/button';
import { FACEBOOK_URL } from '@/shared/const/contacts.const';
import { GIFT_CARD_CONDITIONS, GIFT_CARD_NOMINALS } from '@/shared/const/gift-card.const';

export const GiftCardPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="bg-muted py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Dermako Academy
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-foreground sm:text-6xl">
              სასაჩუქრე ბარათი
            </h1>
            <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-xl">
              აჩუქე სილამაზე. Dermako Academy-ის სასაჩუქრე ბარათი — პრემიუმ კოსმეტოლოგიური
              სერვისების საჩუქარი ნებისმიერ ოკეზიაზე.
            </p>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <header className="mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                ნომინალები
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                აირჩიე ბარათი
              </h2>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {GIFT_CARD_NOMINALS.map((nominal) => (
                <div
                  key={nominal.id}
                  className="group flex flex-col gap-4 rounded-lg border border-border bg-background p-8 transition-shadow duration-300 hover:shadow-md hover:border-primary/40"
                >
                  <Gift
                    className="size-8 text-primary/60 group-hover:text-primary transition-colors duration-300"
                    aria-hidden="true"
                  />
                  <p className="font-heading text-5xl font-bold text-foreground">
                    {nominal.amount}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {nominal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                  შეძენა
                </p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  როგორ შევიძინო?
                </h2>
                <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  სასაჩუქრე ბარათის შეძენისთვის დაგვიკავშირდი Facebook-ზე ან ეწვიე ერთ-ერთ
                  ფილიალს. ბარათი გაიცემა ადგილზე ან გამოგეგზავნება.
                </p>
                <div className="mt-8 flex flex-col items-start gap-4">
                  <Link
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Facebook className="size-5" aria-hidden="true" />
                    Facebook-ზე შეტყობინება
                  </Link>
                  <Button asChild>
                    <Link href="/kontakti">ფილიალების მისამართები</Link>
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                  პირობები
                </p>
                <ul className="space-y-3">
                  {GIFT_CARD_CONDITIONS.map((condition) => (
                    <li key={condition} className="flex items-start gap-3">
                      <CheckCircle
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-foreground">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
