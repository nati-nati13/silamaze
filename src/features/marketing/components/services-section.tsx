import { Droplets, Hand, Pencil, Sparkles, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { SERVICES, type Service } from '@/shared/const/services.const';

const ICON_MAP: Record<Service['icon'], LucideIcon> = {
  sparkles: Sparkles,
  droplets: Droplets,
  hand: Hand,
  pencil: Pencil,
  zap: Zap,
};

export const ServicesSection = () => {
  return (
    <section
      id="slide-services"
      className="snap-always snap-start h-screen relative flex items-center overflow-hidden bg-background"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2 pt-16 lg:pt-0">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              ჩვენი სერვისები
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              სრული მოვლა
              <br />
              <span className="text-primary italic">თქვენთვის</span>
            </h2>
            <div className="mt-5 h-px w-16 bg-primary/50" aria-hidden="true" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-xs">
              პროფესიული კოსმეტოლოგიური სერვისები კვალიფიციური
              სპეციალისტებისგან.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/servesebi">ყველა სერვისი</Link>
              </Button>
            </div>
          </div>

          <ul className="lg:col-span-3 flex flex-col divide-y divide-border/40">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon];
              return (
                <li
                  key={service.id}
                  className="group flex items-start gap-5 py-5 transition-colors duration-300 first:pt-0 last:pb-0 hover:text-primary"
                >
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
