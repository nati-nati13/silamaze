import {
  ArrowRight,
  Award,
  BookOpen,
  CircleCheck,
  Hand,
  Lightbulb,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import {
  ACADEMY_CARDS,
  ACADEMY_FEATURES,
  type AcademyCard,
  type AcademyFeature,
} from '@/shared/const/academy.const';

const FEATURE_ICON_MAP: Record<AcademyFeature['icon'], LucideIcon> = {
  practice: CircleCheck,
  certificate: Award,
  individual: Users,
  programs: BookOpen,
};

const CARD_ICON_MAP: Record<AcademyCard['icon'], LucideIcon> = {
  practice: Hand,
  individual: Users,
  method: Lightbulb,
};

export const AcademyAboutSection = () => {
  return (
    <section id="slide-academy" className="relative bg-primary py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-brand-academy">Dermako Academy</p>
            <h2
              className="mt-5 font-heading text-4xl font-semibold leading-snug tracking-normal
                text-primary-foreground sm:text-5xl"
            >
              <span className="block">სად იწყება პროფესიული</span>
              <span className="block">სრულყოფილება</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75">
              დერმაკო აკადემია ქმნის პრაქტიკაზე ორიენტირებულ სასწავლო გარემოს,
              სადაც თეორიული ცოდნა, თანამედროვე მეთოდები და რეალურ მოდელებზე
              მუშაობა ერთიანდება. პროგრამები შექმნილია მათთვის, ვისაც სურს
              პროფესიული უნარების განვითარება და სილამაზის ინდუსტრიაში
              თავდაჯერებული კარიერის დაწყება.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {ACADEMY_FEATURES.map((feature) => {
                const Icon = FEATURE_ICON_MAP[feature.icon];
                return (
                  <div key={feature.title} className="flex gap-3">
                    <Icon
                      className="mt-1 size-5 shrink-0 text-brand-academy"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-semibold leading-snug text-primary-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/65">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Button
                asChild
                size="lg"
                className="bg-brand-academy font-semibold text-primary-foreground hover:bg-brand-academy/90"
              >
                <Link href="/akademia">შეარჩიე სასწავლო კურსი</Link>
              </Button>
              <Link
                href="/kontakti"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground"
              >
                <span
                  className="underline decoration-primary-foreground/30 underline-offset-8
                    transition-colors group-hover:decoration-brand-academy"
                >
                  გაიარე კონსულტაცია
                </span>
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 content-start gap-5 sm:grid-cols-2">
            {ACADEMY_CARDS.map((card, index) => {
              const Icon = CARD_ICON_MAP[card.icon];
              return (
                <article
                  key={card.title}
                  className={`flex flex-col rounded-2xl border border-primary-foreground/10
                    bg-primary-foreground/5 p-7 transition-colors duration-300
                    hover:border-brand-academy/40 ${index === 2 ? 'sm:col-span-2' : ''}`}
                >
                  <span
                    className="inline-flex size-11 items-center justify-center rounded-lg
                      bg-brand-academy/15 text-brand-academy"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3
                    className="mt-5 font-heading text-xl font-semibold leading-snug tracking-normal
                      text-primary-foreground"
                  >
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
