import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-background flex items-center overflow-hidden">
      <div
        className="absolute top-0 right-0 size-96 rounded-full bg-primary/5 translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 size-72 rounded-full bg-secondary/5 -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10">
        <p className="animate-rise text-xs font-semibold tracking-widest uppercase text-secondary">
          სილამაზე & კოსმეტოლოგია
        </p>

        <h1 className="animate-rise animate-rise-1 mt-4 font-heading text-7xl font-bold leading-none text-foreground sm:text-9xl">
          Dermako
          <br />
          <span className="text-primary">Academy</span>
        </h1>

        <div
          className="animate-rise animate-rise-2 mt-8 h-px w-24 bg-secondary"
          aria-hidden="true"
        />

        <p className="animate-rise animate-rise-2 mt-6 text-xl font-medium text-foreground sm:text-2xl">
          სილამაზე. ხელოვნება. სრულყოფილება.
        </p>

        <p className="animate-rise animate-rise-3 mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Dermako Academy გთავაზობთ პრემიუმ კოსმეტოლოგიურ სერვისებს და პროფესიულ კურსებს
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
    </section>
  );
};
