import { BadgeCheck, Check, Sparkles, Users, type LucideIcon } from 'lucide-react';
import Image from 'next/image';

import { ABOUT_FEATURES, ABOUT_IMAGE, type AboutFeature } from '@/shared/const/about.const';

const ICON_MAP: Record<AboutFeature['icon'], LucideIcon> = {
  check: Check,
  users: Users,
  certificate: BadgeCheck,
  sparkles: Sparkles,
};

export const AboutSection = () => {
  return (
    <section id="slide-about" className="relative bg-card py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brand-academy">რატომ დერმაკო</p>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              სწავლა, რომელიც <span className="italic text-brand-green">პროფესიაში</span>{' '}
              გადადის
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              ჩვენთან თეორია მხოლოდ დასაწყისია — გამოცდილება მოდის პრაქტიკიდან,
              რეალურ კლიენტებთან, იმავე კლინიკაში, სადაც ჩვენი გუნდი მუშაობს.
            </p>

            <div className="mt-8 flex flex-col">
              {ABOUT_FEATURES.map((feature) => {
                const Icon = ICON_MAP[feature.icon];
                return (
                  <div
                    key={feature.title}
                    className="flex gap-4 border-b border-border py-5 last:border-b-0"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl
              bg-gradient-to-br from-brand-green to-primary shadow-2xl"
          >
            {ABOUT_IMAGE && (
              <Image
                src={ABOUT_IMAGE}
                alt="დერმაკო აკადემია — სწავლება კლინიკის გარემოში"
                fill
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover"
              />
            )}
            <div
              className="absolute inset-x-6 bottom-6 rounded-xl border border-primary-foreground/25
                bg-primary-foreground/10 p-6 backdrop-blur-sm"
            >
              <p className="font-heading text-lg font-semibold leading-relaxed text-primary-foreground">
                პრაქტიკა რეალურ კლიენტებზე — სწავლა ჩვენსავე კლინიკაში
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
