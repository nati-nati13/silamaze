import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export const HeroSection = () => {
  return (
    <section
      id="slide-hero"
      className="snap-always snap-start h-screen relative flex items-center overflow-hidden bg-background"
    >
      <span
        className="absolute -right-8 top-0 font-heading text-9xl font-black text-foreground/3 select-none pointer-events-none leading-none tracking-tighter"
        aria-hidden="true"
      >
        DERMAKO
      </span>

      <div
        className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"
        aria-hidden="true"
      />
      <div
        className="absolute left-8 top-0 bottom-0 w-px bg-primary/10"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl pt-16">
          <p className="animate-rise text-xs font-semibold tracking-widest uppercase text-primary">
            სილამაზე &amp; კოსმეტოლოგია
          </p>

          <h1 className="animate-rise animate-rise-1 mt-6 font-heading text-7xl font-black leading-none text-foreground sm:text-8xl lg:text-9xl">
            Dermako
            <br />
            <span className="text-primary italic">Academy</span>
          </h1>

          <div
            className="animate-line-grow mt-8 h-px bg-primary/50 max-w-xs"
            aria-hidden="true"
          />

          <p className="animate-rise animate-rise-2 mt-8 text-xl font-light tracking-wide text-foreground/80 sm:text-2xl">
            სილამაზე. ხელოვნება. სრულყოფილება.
          </p>

          <p className="animate-rise animate-rise-3 mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
            პრემიუმ კოსმეტოლოგიური სერვისები და პროფესიული კურსები —
            თბილისსა და საგარეჯოში.
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
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
        aria-hidden="true"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-foreground/30">
          scroll
        </span>
        <div className="w-px h-10 bg-primary/40" />
      </div>
    </section>
  );
};
