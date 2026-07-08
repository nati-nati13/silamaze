import { Hand, Pencil, Sparkles, Syringe, Zap, type LucideIcon } from 'lucide-react';

import { BookingModal } from '@/features/booking/components/booking-modal';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { SERVICES, type Service } from '@/shared/const/services.const';

const ICON_MAP: Record<Service['icon'], LucideIcon> = {
  sparkles: Sparkles,
  syringe: Syringe,
  hand: Hand,
  pencil: Pencil,
  zap: Zap,
};

export const ServicesPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
              Dermako Academy
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-foreground sm:text-6xl">
              სერვისები
            </h1>
            <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
              პრემიუმ კოსმეტოლოგიური სერვისები თბილისსა და საგარეჯოში
            </p>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => {
                const Icon = ICON_MAP[service.icon];
                return (
                  <Card
                    key={service.id}
                    className="group gap-0 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                    </CardHeader>
                    <CardContent>
                      <h2 className="font-heading text-xl font-semibold text-foreground">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <div className="mt-6 border-t border-border pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">ფასი</p>
                          <p className="font-heading text-lg font-bold text-secondary">––</p>
                        </div>
                        <BookingModal serviceName={service.title} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
