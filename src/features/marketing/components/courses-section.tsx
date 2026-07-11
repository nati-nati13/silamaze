import { CoursesCarousel } from '@/features/marketing/components/courses-carousel';

export const CoursesSection = () => {
  return (
    <section id="slide-courses" className="relative bg-card py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-academy">აკადემიის პროგრამები</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-snug tracking-normal text-foreground sm:text-5xl">
            პროფესიული <span className="italic text-brand-green">კურსები</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            შეისწავლე ესთეტიკური კოსმეტოლოგია, ლაზერული ეპილაცია, პერმანენტული
            მაკიაჟი და მასაჟი პრაქტიკაზე ორიენტირებული სასწავლო პროგრამებით.
          </p>
        </div>

        <div className="mt-14">
          <CoursesCarousel />
        </div>
      </div>
    </section>
  );
};
