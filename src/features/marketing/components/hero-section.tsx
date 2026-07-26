import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';
import { IconBadge } from '@/shared/components/ui/icon-badge';

export const HeroSection = () => {
  return (
    <section id="slide-hero" className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <EyebrowLabel className="animate-rise">PREMIUM AESTHETIC CARE</EyebrowLabel>

            <h1
              className="animate-rise animate-rise-1 mt-8 max-w-xl font-heading text-5xl font-semibold
                leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              <span className="block">Beauty.</span>
              <span className="block">Education.</span>
              <span className="block">Excellence.</span>
            </h1>

            <p className="animate-rise animate-rise-2 mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              დერმაკო — სილამაზე, რომელიც ეყრდნობა მეცნიერებას, ხარისხსა და ინდივიდუალურ მიდგომას.
            </p>

            <div className="animate-rise animate-rise-3 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button variant="default" size="lg" asChild>
                <Link href="/dajavshna">
                  <span aria-hidden="true">📅</span> დაჯავშნა
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/servesebi">
                  ჩვენი სერვისები <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="animate-fade-in relative mx-auto w-full max-w-md">
            <div className="relative aspect-3/4 overflow-hidden rounded-5xl border border-border shadow-2xl">
              <Image
                src="/images/hero-photo.webp"
                alt="დერმაკო აკადემიის სპეციალისტი კოსმეტოლოგიური პროცედურის დროს"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover"
              />
            </div>

            <button
              type="button"
              className="group absolute -right-4 -bottom-4 flex flex-col items-center gap-2"
              aria-label="Watch our story"
            >
              <IconBadge size="lg" className="transition-transform duration-200 group-hover:-translate-y-1">
                <Play className="fill-current" aria-hidden="true" />
              </IconBadge>
              <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold tracking-widest text-foreground uppercase shadow-sm">
                Watch our story
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
