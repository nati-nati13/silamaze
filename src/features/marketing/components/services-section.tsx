import { Hand, Pencil, Sparkles, Syringe, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { SERVICES, type Service } from '@/shared/const/services.const';

const ICON_MAP: Record<Service['icon'], LucideIcon> = {
  sparkles: Sparkles,
  syringe: Syringe,
  hand: Hand,
  pencil: Pencil,
  zap: Zap,
};

export const ServicesSection = () => {
  return (
    <section id="slide-services" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">Beauty Space</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            ესთეტიკური <span className="italic text-brand-green">მომსახურება</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            პროფესიონალური პროცედურები ჩვენს კლინიკაში — კვალიფიციური
            სპეციალისტებისგან.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <article
                key={service.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8
                  transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/50"
              >
                <div className="absolute left-0 top-0 h-0.5 w-0 bg-brand-green transition-all duration-500 group-hover:w-full" />
                <div className="flex items-center gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold leading-tight text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      ფასი
                    </span>
                    <strong className="font-heading text-base font-bold text-foreground">
                      დაზუსტდება
                    </strong>
                  </span>
                  <Button size="sm" asChild className="font-semibold">
                    <Link href="/kontakti">დაჯავშნა</Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
