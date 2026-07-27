'use client';

import { CalendarCheck, Gift, Package, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { CallbackForm } from '@/features/callback/components/callback-form';
import { Button } from '@/shared/components/ui/button';
import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';
import { IconBadge } from '@/shared/components/ui/icon-badge';

type GiftCardHeroFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const HERO_FEATURES: GiftCardHeroFeature[] = [
  {
    icon: Package,
    title: 'პრემიუმ შეფუთვა',
    description: 'სერტიფიკატი გაცემულია მდიდრული, საჩუქრად მზა დიზაინით.',
  },
  {
    icon: CalendarCheck,
    title: 'მოქმედებს 1 წელი',
    description: 'გაცემიდან სრული ერთი წლის განმავლობაში აქტიურია.',
  },
  {
    icon: Sparkles,
    title: 'მომსახურების თავისუფალი არჩევანი',
    description: 'მიმღები თავად ირჩევს ნებისმიერ პროცედურას ან კურსს.',
  },
];

export const GiftCardHero = () => {
  const [contactOpen, setContactOpen] = useState(false);

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
            <EyebrowLabel>PREMIUM GIFT EXPERIENCE</EyebrowLabel>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              <span className="block">აჩუქეთ სილამაზე.</span>
              <span className="block">აჩუქეთ ზრუნვა.</span>
              <span className="block">აჩუქეთ არჩევანის თავისუფლება.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Dermako-ს სასაჩუქრე სერტიფიკატი იდეალური საჩუქარია დაბადების დღის, იუბილეს, ან
              კორპორატიული მადლობის გადასახდელად — მიმღებს ეძლევა ნებისმიერი პროცედურის
              თავისუფალი არჩევანის საშუალება.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" onClick={() => setContactOpen(true)}>
                დაგვიკავშირდით
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/kontakti">იხილეთ ფილიალი</Link>
              </Button>
            </div>

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
            aria-label="Dermako-ს პრემიუმ სასაჩუქრე სერტიფიკატი — რეალური ვიზუალი მალე დაემატება"
            className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-5xl
              border border-brand-academy/30 bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl"
          >
            <IconBadge size="lg" className="bg-brand-academy text-primary">
              <Gift aria-hidden="true" />
            </IconBadge>
            <span className="absolute bottom-6 text-xs font-semibold tracking-widest text-primary-foreground/70 uppercase">
              პრემიუმ სასაჩუქრე სერტიფიკატი
            </span>
          </div>
        </div>

        <CallbackForm
          defaultInterestType="სასაჩუქრე ბარათი"
          open={contactOpen}
          onOpenChange={setContactOpen}
        />
      </div>
    </section>
  );
};
