import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

import { CoursesCarousel } from '@/features/marketing/components/courses-carousel';
import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';
import { Button } from '@/shared/components/ui/button';
import { FACEBOOK_URL } from '@/shared/const/contacts.const';

const WHY_US = [
  'გამოცდილი, სერტიფიცირებული ინსტრუქტორები',
  'პრაქტიკული სწავლება თანამედროვე აპარატებზე',
  'სერტიფიკატი კურსის დასრულებისას',
  'მცირე ჯგუფები — ინდივიდუალური მიდგომა',
  'კარიერული კონსულტაცია',
];

export const AcademyPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <CoursesCarousel
              tone="light"
              header={
                <>
                  <p className="eyebrow text-brand-academy">
                    აკადემიის პროგრამები
                  </p>
                  <h1
                    className="mt-4 font-heading text-4xl font-semibold leading-snug tracking-normal
                      text-foreground sm:text-5xl"
                  >
                    პროფესიული კურსები
                  </h1>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    შეისწავლე ესთეტიკური კოსმეტოლოგია, ლაზერული ეპილაცია,
                    პერმანენტული მაკიაჟი და მასაჟი პრაქტიკაზე ორიენტირებული
                    სასწავლო პროგრამებით.
                  </p>
                </>
              }
            />
          </div>
        </section>

        <section className="py-24 bg-muted">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-academy">
                  რატომ Dermako
                </p>
                <h2 className="mt-3 font-heading text-4xl font-bold text-foreground">
                  ჩვენი უპირატესობები
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Dermako Academy-ში გარანტირებულად მიიღებ მაღალი ხარისხის განათლებას.
                </p>
              </div>
              <ul className="space-y-4">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
              მზად ხარ დაიწყო?
            </h2>
            <p className="mt-4 text-base text-primary-foreground/80">
              დაგვიკავშირდი Facebook-ზე ან ეწვიე ჩვენ ერთ-ერთ ფილიალს.
            </p>
            <div className="mt-8">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  Facebook-ზე დაკავშირება
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
