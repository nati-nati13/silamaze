import { ArrowRight, GraduationCap, ShoppingBag, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { OFFERINGS, type Offering } from '@/shared/const/offerings.const';

const ICON_MAP: Record<Offering['icon'], LucideIcon> = {
  graduation: GraduationCap,
  sparkles: Sparkles,
  shopping: ShoppingBag,
};

type ToneClasses = {
  card: string;
  kicker: string;
  chip: string;
  title: string;
  body: string;
  cta: string;
  soon: string;
};

const TONE_MAP: Record<Offering['tone'], ToneClasses> = {
  green: {
    card: 'bg-primary border-transparent',
    kicker: 'text-primary-foreground/75',
    chip: 'bg-primary-foreground/15 text-primary-foreground',
    title: 'text-primary-foreground',
    body: 'text-primary-foreground/85',
    cta: 'bg-primary-foreground text-primary hover:bg-primary-foreground/90',
    soon: 'bg-primary-foreground/15 text-primary-foreground',
  },
  card: {
    card: 'bg-card border-border',
    kicker: 'text-brand-academy',
    chip: 'bg-brand-green/10 text-brand-green',
    title: 'text-foreground',
    body: 'text-muted-foreground',
    cta: 'bg-primary text-primary-foreground hover:bg-primary/90',
    soon: 'bg-muted text-brand-academy',
  },
  beige: {
    card: 'bg-secondary border-border',
    kicker: 'text-brand-academy',
    chip: 'bg-card text-brand-green',
    title: 'text-foreground',
    body: 'text-muted-foreground',
    cta: 'bg-primary text-primary-foreground hover:bg-primary/90',
    soon: 'bg-card text-brand-academy border border-border',
  },
};

export const OfferingsSection = () => {
  return (
    <section id="slide-offerings" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">ერთი სივრცე</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            სამი პროფესიონალური <span className="italic text-brand-green">მიმართულება</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            დერმაკო აერთიანებს სამ დამოუკიდებელ მიმართულებას — სწავლას,
            მომსახურებასა და პროდუქციას.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OFFERINGS.map((offering) => {
            const Icon = ICON_MAP[offering.icon];
            const tone = TONE_MAP[offering.tone];
            return (
              <div
                key={offering.id}
                className={`group flex flex-col rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-1.5 ${tone.card}`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-widest ${tone.kicker}`}
                >
                  {offering.kicker}
                </p>
                <span
                  className={`mt-5 inline-flex size-14 items-center justify-center rounded-xl ${tone.chip}`}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className={`mt-6 font-heading text-2xl font-semibold ${tone.title}`}>
                  {offering.title}
                </h3>
                <p className={`mt-2 flex-1 text-sm leading-relaxed ${tone.body}`}>
                  {offering.description}
                </p>

                <div className="mt-8">
                  {offering.comingSoon ? (
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest ${tone.soon}`}
                    >
                      მალე
                    </span>
                  ) : (
                    <Link
                      href={offering.href ?? '/'}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${tone.cta}`}
                    >
                      {offering.cta}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
