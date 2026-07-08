import { Hand, Pencil, Sparkles, Syringe, Zap, type LucideIcon } from 'lucide-react';

import { EnrollButton } from '@/features/enrollment/components/enroll-button';
import { COURSES, type Course } from '@/shared/const/courses.const';

const ICON_MAP: Record<Course['icon'], LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  pencil: Pencil,
  syringe: Syringe,
  hand: Hand,
};

export const CoursesSection = () => {
  return (
    <section id="slide-courses" className="relative bg-card py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">Academy</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            პროფესიული <span className="italic text-brand-green">კურსები</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            ხუთი პროფესიული კურსი — ინტენსიური პრაქტიკული სწავლება რეალურ
            მოდელებზე, ინდივიდუალური მენტორობით.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => {
            const Icon = ICON_MAP[course.icon];
            return (
              <article
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background p-8
                  transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green/50"
              >
                <div className="absolute left-0 top-0 h-0.5 w-0 bg-brand-green transition-all duration-500 group-hover:w-full" />
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold text-foreground">
                  {course.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                  <span
                    className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1
                      text-xs font-semibold uppercase tracking-widest text-brand-academy"
                  >
                    პროფესიული
                  </span>
                  <EnrollButton courseId={course.id} courseTitle={course.title} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
