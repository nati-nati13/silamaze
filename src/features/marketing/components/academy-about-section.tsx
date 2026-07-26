import { Award, BookOpen, CircleCheck, Users, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';
import { IconBadge } from '@/shared/components/ui/icon-badge';
import { ACADEMY_FEATURES, type AcademyFeature } from '@/shared/const/academy.const';

const FEATURE_ICON_MAP: Record<AcademyFeature['icon'], LucideIcon> = {
  practice: CircleCheck,
  groups: Users,
  certificate: Award,
  environment: BookOpen,
};

export const AcademyAboutSection = () => {
  return (
    <section id="slide-academy" className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="rounded-3xl bg-primary p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <EyebrowLabel>DERMAKO ACADEMY</EyebrowLabel>
              <h2 className="mt-5 font-heading text-4xl font-semibold leading-snug text-primary-foreground sm:text-5xl">
                განათლება, რომელიც ქმნის პროფესიონალებს.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75">
                პრაქტიკაზე დაფუძნებული სწავლება, მცირე ჯგუფები და პროფესიული გარემო — მათთვის,
                ვისაც სურს სილამაზის ინდუსტრიაში ძლიერი კარიერის შექმნა.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-academy font-semibold text-primary-foreground hover:bg-brand-academy/90
                    focus-visible:border-primary-foreground focus-visible:ring-primary-foreground/50"
                >
                  <Link href="/akademia">იხილე აკადემია</Link>
                </Button>
                <Link
                  href="/akademia"
                  className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary-foreground
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50
                    focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  <span
                    className="underline decoration-primary-foreground/30 underline-offset-8
                      transition-colors group-hover:decoration-brand-academy"
                  >
                    კურსების ნახვა
                  </span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {ACADEMY_FEATURES.map((feature) => {
                const Icon = FEATURE_ICON_MAP[feature.icon];
                return (
                  <Card
                    key={feature.title}
                    className="gap-3 border-primary-foreground/10 bg-primary-foreground/5 py-7 text-primary-foreground shadow-none hover:shadow-none"
                  >
                    <CardContent className="flex flex-col gap-3">
                      <IconBadge size="md" className="bg-brand-academy/15 text-brand-academy">
                        <Icon aria-hidden="true" />
                      </IconBadge>
                      <h3 className="font-heading text-lg font-semibold leading-snug">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-primary-foreground/70">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
