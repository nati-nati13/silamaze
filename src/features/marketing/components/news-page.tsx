import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';
import { NEWS_ITEMS } from '@/shared/const/news.const';

export const NewsPage = () => {
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
              სიახლეები
            </h1>
            <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <ul className="flex flex-col divide-y divide-border">
              {NEWS_ITEMS.map((item) => (
                <li key={item.id} className="py-10">
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                    {item.date}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
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
