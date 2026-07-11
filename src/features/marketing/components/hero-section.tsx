import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

const NOTES = ['დაფუძნდა 2025', 'ჩვენივე კლინიკა', 'თბილისი & საგარეჯო'];

export const HeroSection = () => {
  return (
    <section
      id="slide-hero"
      className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow animate-rise text-brand-academy">
              სილამაზის სივრცე · თბილისი & საგარეჯო
            </p>

            <h1
              className="animate-rise animate-rise-1 mt-8 font-heading text-5xl font-semibold
                leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              ისწავლე. იბრწყინე.{' '}
              <span className="relative inline-block whitespace-nowrap text-brand-green">
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

            <p className="animate-rise animate-rise-2 mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              ერთ სივრცეში — პროფესიული კურსები, ესთეტიკური მომსახურება და
              პროფესიონალური პროდუქცია. თბილისსა და საგარეჯოში.
            </p>

            <div className="animate-rise animate-rise-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="font-semibold">
                <Link href="#slide-courses">
                  კურსების ნახვა
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#slide-services">
                  <Sparkles className="size-4" aria-hidden="true" />
                  დაჯავშნე ვიზიტი
                </Link>
              </Button>
            </div>

            <div className="animate-rise animate-rise-4 mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              {NOTES.map((note, index) => (
                <span key={note} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      className="size-1 rounded-full bg-brand-green/60"
                      aria-hidden="true"
                    />
                  )}
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-in relative mx-auto w-full max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-photo.webp"
                alt="დერმაკო აკადემიის სპეციალისტი კოსმეტოლოგიური პროცედურის დროს"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
