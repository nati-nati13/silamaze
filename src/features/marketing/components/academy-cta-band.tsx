import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export const AcademyCtaBand = () => {
  return (
    <section className="relative bg-background pb-20 sm:pb-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div
          className="flex flex-col items-start gap-8 rounded-3xl bg-primary p-10 sm:p-12
            lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-academy">სამომავლო პერსპექტივა</p>
            <h2
              className="mt-3 font-heading text-2xl font-semibold leading-snug tracking-normal
                text-primary-foreground sm:text-3xl"
            >
              გნებავთ თავად შეისწავლოთ ესთეტიკური კოსმეტოლოგია?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
              დერმაკო აკადემიაში თქვენ გაივლით სრულ თეორიულ და პრაქტიკულ
              სწავლებას რეალურ მოდელებზე.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-brand-academy font-semibold text-primary-foreground
              hover:bg-brand-academy/90"
          >
            <Link href="/akademia">სასწავლო კურსების ნახვა</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
