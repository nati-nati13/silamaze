import { Palette, Send, ShieldCheck, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';
import { IconBadge } from '@/shared/components/ui/icon-badge';

type GiftCardHeroFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const HERO_FEATURES: GiftCardHeroFeature[] = [
  {
    icon: Send,
    title: 'მყისიერი გაგზავნა',
    description: 'ელექტრონული ბარათი მიმღებს პირდაპირ ელ-ფოსტაზე ეგზავნება წამებში.',
  },
  {
    icon: Palette,
    title: 'სრული პერსონალიზაცია',
    description: 'აირჩიეთ დიზაინი, თანხა და დაურთეთ პირადი მილოცვის ტექსტი.',
  },
  {
    icon: ShieldCheck,
    title: '12 თვე მოქმედების ვადა',
    description: 'ბარათი აქტიურია გაცემიდან სრული ერთი წლის განმავლობაში.',
  },
];

export const GiftCardHero = () => {
  return (
    <section className="bg-background pt-8 pb-16 sm:pt-10 sm:pb-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            მთავარი
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">სასაჩუქრე ბარათი</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <EyebrowLabel>DERMAKO GIFT CARD</EyebrowLabel>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              შექმენით ექსკლუზიური{' '}
              <span className="italic text-brand-green">სასაჩუქრე ბარათი</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              აჩუქეთ სილამაზე — კლინიკის პრემიუმ პროცედურებზე ან აკადემიის პროფესიულ
              კურსებზე. აირჩიეთ ნომინალი, დააპერსონალიზეთ და შეუკვეთეთ წამებში.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {HERO_FEATURES.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-3">
                  <IconBadge size="sm">
                    <feature.icon aria-hidden="true" />
                  </IconBadge>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            role="img"
            aria-label="დერმაკოს სასაჩუქრე ბარათის ვიზუალი — მალე დაემატება"
            className="relative aspect-4/3 overflow-hidden rounded-5xl border border-border bg-muted shadow-2xl"
          >
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              სურათის ადგილი
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
