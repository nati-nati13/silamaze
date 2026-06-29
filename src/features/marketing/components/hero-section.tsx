import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-background flex items-center overflow-hidden">
      <span
        className="absolute -left-4 top-16 font-heading text-9xl font-bold text-foreground/5 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        DERMAKO
      </span>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-24">
          <div>
            <p className="animate-rise text-xs font-semibold tracking-widest uppercase text-primary">
              სილამაზე & კოსმეტოლოგია
            </p>

            <h1 className="animate-rise animate-rise-1 mt-4 font-heading text-7xl font-bold leading-none text-foreground sm:text-8xl">
              Dermako
              <br />
              <span className="text-primary">Academy</span>
            </h1>

            <div
              className="animate-rise animate-rise-2 mt-8 h-px w-16 bg-primary"
              aria-hidden="true"
            />

            <p className="animate-rise animate-rise-2 mt-6 text-xl font-medium text-foreground sm:text-2xl">
              სილამაზე. ხელოვნება. სრულყოფილება.
            </p>

            <p className="animate-rise animate-rise-3 mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              პრემიუმ კოსმეტოლოგიური სერვისები და პროფესიული კურსები — თბილისსა და საგარეჯოში.
            </p>

            <div className="animate-rise animate-rise-4 mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="font-semibold">
                <Link href="/servesebi">
                  სერვისები
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/akademia">კურსები</Link>
              </Button>
            </div>
          </div>

          <div
            className="hidden lg:flex items-center justify-center animate-fade-in"
            aria-hidden="true"
          >
            <div className="relative size-96">
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <div className="absolute inset-8 rounded-full border border-primary/15" />
              <div className="absolute inset-16 rounded-full border border-primary/25" />
              <div className="absolute inset-24 rounded-full border-2 border-primary/40" />
              <div className="absolute inset-32 rounded-full border-2 border-primary/50 bg-primary/5" />
              <div className="absolute inset-40 rounded-full bg-primary/20" />
              <div className="absolute inset-44 rounded-full bg-primary/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
