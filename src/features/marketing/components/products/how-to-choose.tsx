import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { PRODUCT_HOW_TO_STEPS } from '@/shared/const/products-page.const';

export const ProductHowToChoose = () => {
  return (
    <section className="bg-card py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              როგორ შევარჩიოთ სწორი პროდუქტი
            </h2>

            <div className="mt-8 flex flex-col gap-6">
              {PRODUCT_HOW_TO_STEPS.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-academy
                      font-heading text-base font-bold text-primary"
                  >
                    {item.step}
                  </span>
                  <div>
                    <p className="font-heading text-lg font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="mt-8" asChild>
              <Link href="/kontakti">კონსულტაციის მიღება</Link>
            </Button>
          </div>

          {/* TODO: replace with real image */}
          <div className="aspect-4/3 rounded-2xl border border-border bg-muted" />
        </div>
      </div>
    </section>
  );
};
