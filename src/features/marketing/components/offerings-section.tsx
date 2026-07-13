import {
  ArrowRight,
  GraduationCap,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { BrandPhilosophyImage } from '@/features/marketing/components/brand-philosophy-image';
import { OFFERINGS, type Offering } from '@/shared/const/offerings.const';

const ICON_MAP: Record<Offering['icon'], LucideIcon> = {
  sparkle: Sparkles,
  graduation: GraduationCap,
  shopping: ShoppingBag,
};

export const OfferingsSection = () => {
  return (
    <section id="slide-offerings" className="relative bg-card py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-academy">ბრენდის ფილოსოფია</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            ერთიანი პრემიუმ ბრენდი სამი მიმართულებით
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            დერმაკო არის სილამაზის ინდუსტრიის თანამედროვე ეკოსისტემა, რომელიც
            აერთიანებს მაღალტექნოლოგიურ ესთეტიკურ მომსახურებას, პროფესიულ
            განათლებას და პრემიუმ კლასის კოსმეტიკურ პროდუქციას. ჩვენი მიზანია
            ერთ სივრცეში შევქმნათ ხარისხზე, ცოდნასა და შედეგზე დაფუძნებული
            გამოცდილება როგორც მომხმარებლებისთვის, ისე მომავალი
            პროფესიონალებისთვის.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <BrandPhilosophyImage />

          <div className="flex flex-col gap-6">
            {OFFERINGS.map((offering, index) => {
              const Icon = ICON_MAP[offering.icon];
              return (
                <article
                  key={offering.id}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all
                    duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="inline-flex size-12 shrink-0 items-center justify-center
                        rounded-xl border border-border bg-background text-brand-academy"
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl font-semibold text-foreground">
                        {index + 1}. {offering.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-academy">
                        {offering.label}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {offering.description}
                  </p>

                  <Link
                    href={offering.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold
                      text-foreground transition-colors hover:text-brand-green"
                  >
                    {offering.cta}
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
