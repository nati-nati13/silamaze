'use client';

import { Hand, Pencil, Sparkles, Syringe, Zap, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  SERVICE_FILTERS,
  SERVICES,
  type Service,
  type ServiceCategory,
} from '@/shared/const/services.const';

const ICON_MAP: Record<Service['icon'], LucideIcon> = {
  sparkles: Sparkles,
  syringe: Syringe,
  hand: Hand,
  pencil: Pencil,
  zap: Zap,
};

export const ServicesSection = () => {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory | 'all'>('all');

  const filteredServices =
    activeFilter === 'all'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeFilter);

  return (
    <section id="slide-services" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">ესთეტიკური კლინიკა</p>
          <h2
            className="mt-4 font-heading text-4xl font-semibold leading-snug tracking-normal
              text-foreground sm:text-5xl"
          >
            <span className="block">Dermako Beauty</span>
            <span className="block">მომსახურებები</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            აღმოაჩინეთ უახლესი აპარატურული და საინექციო პროცედურები სახისა და
            სხეულისთვის, შექმნილი თქვენი ინდივიდუალური სილამაზისთვის.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SERVICE_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors
                  duration-200 focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring ${
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground/70 hover:border-brand-green/50 hover:text-foreground'
              }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <article
                key={service.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card
                  transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/50"
              >
                <div className="absolute left-0 top-0 z-10 h-0.5 w-0 bg-brand-green transition-all duration-500 group-hover:w-full" />

                {service.image && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-8 pb-0">
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
                </div>

                <div className="m-8 mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
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
