import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';
import { PRESS_ITEMS } from '@/shared/const/press.const';

export const PressPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="bg-muted py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Dermako Academy
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-foreground sm:text-6xl">
              პრესა
            </h1>
            <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <ul className="flex flex-col divide-y divide-border">
              {PRESS_ITEMS.map((item) => (
                <li key={item.id} className="py-10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                      {item.source}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    {item.title}
                  </h2>
                  {item.url !== '#' && (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-primary hover:underline"
                    >
                      სრულად წაკითხვა
                      <ExternalLink className="size-3" aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
