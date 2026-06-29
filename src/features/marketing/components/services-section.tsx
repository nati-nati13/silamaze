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
  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <header className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
            ჩვენი სერვისები
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            სრული მოვლა თქვენთვის
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            პროფესიული კოსმეტოლოგიური სერვისები კვალიფიციური სპეციალისტებისგან
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
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
                  <p className="mt-4 text-sm font-semibold text-secondary">ფასი: ––</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/servesebi">ყველა სერვისი</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
