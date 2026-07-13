import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';

export const ProductsPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="bg-background py-32 sm:py-40">
          <div className="mx-auto w-full max-w-2xl px-6 text-center sm:px-10">
            <span
              className="mx-auto flex size-16 items-center justify-center rounded-full
                border border-brand-academy/30 bg-card text-brand-academy"
            >
              <ShoppingBag className="size-6" aria-hidden="true" />
            </span>
            <p className="eyebrow mt-8 text-brand-academy">Dermako Products</p>
            <h1
              className="mt-4 font-heading text-4xl font-semibold leading-snug tracking-normal
                text-foreground sm:text-5xl"
            >
              მალე დაგვემატება
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              პროფესიონალური კოსმეტიკური ხაზი გზაშია — ინოვაციური ფორმულები
              ყოველდღიური და პროფესიული გამოყენებისთვის. თვალი ადევნეთ
              სიახლეებს.
            </p>
            <Link
              href="/"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <span
                className="underline decoration-foreground/30 underline-offset-8
                  transition-colors group-hover:decoration-brand-academy"
              >
                მთავარ გვერდზე დაბრუნება
              </span>
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
