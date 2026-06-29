import { Droplets, Hand, Pencil, Sparkles, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { SERVICES, type Service } from '@/shared/const/services.const';

const ICON_MAP: Record<Service['icon'], LucideIcon> = {
  sparkles: Sparkles,
  droplets: Droplets,
  hand: Hand,
  pencil: Pencil,
  zap: Zap,
};

export const ServicesSection = () => {
  const [featured, ...rest] = SERVICES;
  const FeaturedIcon = ICON_MAP[featured.icon];

  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <header className="mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary">
            ჩვენი სერვისები
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            სრული მოვლა თქვენთვის
          </h2>
          <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
          <p className="mt-4 text-base text-muted-foreground max-w-xl">
            პროფესიული კოსმეტოლოგიური სერვისები კვალიფიციური სპეციალისტებისგან
          </p>
        </header>

        <Card className="mb-6 group gap-0 overflow-hidden transition-shadow duration-300 hover:shadow-md">
          <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-start">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <FeaturedIcon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {featured.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest.map((service) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <Card
                key={service.id}
                className="group gap-0 transition-shadow duration-300 hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </CardHeader>
                <CardContent>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/servesebi">ყველა სერვისი</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
