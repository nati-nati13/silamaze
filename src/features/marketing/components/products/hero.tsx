import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';

export const ProductsHero = () => {
  return (
    <section className="bg-background pt-8 pb-16 sm:pt-10 sm:pb-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <EyebrowLabel>პროფესიონალური მოვლა</EyebrowLabel>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              პროფესიონალური მოვლა თქვენი კანისთვის
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              ვმართავთ შერჩეული კოსმეტიკა და პროფესიონალური კონსულტაცია განსხვავებული,
              ბალანსირებული კანისთვის.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <Link href="/kontakti">კონსულტაციის მიღება</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/kontakti">დაგვიკავშირდით</Link>
              </Button>
            </div>
          </div>

          {/* TODO: replace with real image */}
          <div className="aspect-4/3 rounded-2xl border border-border bg-muted" />
        </div>
      </div>
    </section>
  );
};
