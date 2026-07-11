import { ArrowRight, BookOpen, Sparkle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

const HIGHLIGHTS = [
  {
    icon: BookOpen,
    title: 'აკადემია',
    subtitle: 'პროფესიული სწავლება',
  },
  {
    icon: Sparkles,
    title: 'ესთეტიკა',
    subtitle: 'პრემიუმ მომსახურება',
  },
];

export const HeroSection = () => {
  return (
    <section
      id="slide-hero"
      className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />

      <p
        className="writing-vertical absolute top-1/2 left-4 z-10 hidden rotate-180 -translate-y-1/2
          text-xs font-semibold tracking-widest uppercase text-foreground/30 lg:block"
        aria-hidden="true"
      >
        Dermako Beauty & Academy
      </p>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow animate-rise flex items-center gap-3 text-brand-academy">
              <span className="h-px w-8 bg-brand-academy" aria-hidden="true" />
              სილამაზის სივრცე · თბილისი & საგარეჯო
            </p>

            <h1
              className="animate-rise animate-rise-1 mt-8 font-heading text-5xl font-semibold
                leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              <span className="block">ისწავლე.</span>
              <span className="block">იბრწყინე.</span>
              <span className="relative block w-fit text-brand-green">
                განვითარდი.
                <svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-2 w-full overflow-visible"
                >
                  <path
                    d="M2 8 C 40 2, 90 2, 130 6 S 180 10, 198 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="animate-rise animate-rise-2 mt-8 max-w-sm text-lg leading-relaxed text-muted-foreground">
              ერთ სივრცეში — პროფესიული კურსები, ესთეტიკური მომსახურება და
              პროფესიონალური განვითარება.
            </p>

            <div className="animate-rise animate-rise-3 mt-10 flex flex-wrap items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-foreground/40 bg-transparent px-8 font-semibold text-foreground hover:bg-foreground/5"
              >
                <Link href="#slide-courses">კურსების ნახვა</Link>
              </Button>
              <Link
                href="#slide-reservation"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
              >
                <span className="underline decoration-foreground/30 underline-offset-8 transition-colors group-hover:decoration-brand-academy">
                  დაჯავშნე ვიზიტი
                </span>
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="animate-rise animate-rise-4 mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2">
              {HIGHLIGHTS.map((highlight) => (
                <div key={highlight.title} className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-brand-academy">
                    <highlight.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {highlight.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {highlight.subtitle}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in relative mx-auto w-full max-w-md">
            <div
              className="absolute top-1/2 -left-12 z-10 hidden size-24 -translate-y-1/2 items-center
                justify-center rounded-full border border-brand-academy/30 bg-background shadow-lg sm:flex"
              aria-hidden="true"
            >
              <span className="flex size-16 items-center justify-center rounded-full border border-brand-academy/50 text-brand-academy">
                <Sparkle className="size-5" />
              </span>
            </div>

            <div className="relative aspect-3/4 overflow-hidden rounded-5xl shadow-2xl">
              <Image
                src="/images/hero-photo.webp"
                alt="დერმაკო აკადემიის სპეციალისტი კოსმეტოლოგიური პროცედურის დროს"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8 pt-20">
                <p className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/80">
                  პრაქტიკული სწავლება
                </p>
                <p className="mt-3 font-heading text-2xl italic leading-snug text-primary-foreground">
                  ინდივიდუალური მიდგომა და თანამედროვე აპარატურა
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
