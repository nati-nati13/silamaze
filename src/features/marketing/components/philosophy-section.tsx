import { ArrowRight, GraduationCap, Sparkles, Trophy, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card';
import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';
import { IconBadge } from '@/shared/components/ui/icon-badge';
import { PHILOSOPHY_PILLARS, type PhilosophyPillar } from '@/shared/const/philosophy.const';

const ICON_MAP: Record<PhilosophyPillar['icon'], LucideIcon> = {
  beauty: Sparkles,
  academy: GraduationCap,
  expertise: Trophy,
};

export const PhilosophySection = () => {
  return (
    <section id="slide-philosophy" className="relative bg-card py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2">
          <div>
            <EyebrowLabel>OUR PHILOSOPHY</EyebrowLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Beauty begins with <span className="italic text-brand-green">confidence</span>.
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:justify-self-end">
            ჩვენი ფილოსოფია ეფუძნება რწმენას, რომ ნამდვილი სილამაზე თავდაჯერებულობიდან
            იწყება — ამიტომ ვაერთიანებთ მეცნიერულ მიდგომას, პროფესიულ განათლებასა და
            ინდივიდუალურ ზრუნვას ერთ სივრცეში.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PHILOSOPHY_PILLARS.map((pillar) => {
            const Icon = ICON_MAP[pillar.icon];
            return (
              <Card key={pillar.title}>
                <CardContent className="flex flex-col gap-4">
                  <IconBadge size="md">
                    <Icon aria-hidden="true" />
                  </IconBadge>
                  <CardTitle className="font-heading text-xl">{pillar.title}</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                  <Link
                    href={pillar.href}
                    className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-academy"
                  >
                    მეტის ნახვა
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
