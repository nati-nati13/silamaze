import { Pencil, Sparkles, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { EnrollButton } from '@/features/enrollment/components/enroll-button';

import { Button } from '@/shared/components/ui/button';
import { COURSES, type Course } from '@/shared/const/courses.const';

const ICON_MAP: Record<Course['icon'], LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  pencil: Pencil,
};

export const CoursesSection = () => {
  return (
    <section
      id="slide-courses"
      className="snap-always snap-start h-screen relative flex items-center overflow-hidden bg-muted"
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="absolute -top-8 -left-4 font-heading text-9xl font-black text-foreground leading-none tracking-tighter">
          ACADEMY
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Dermako Academy
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              პროფესიული
              <br />
              <span className="text-primary italic">კურსები</span>
            </h2>
            <div className="mt-5 h-px w-16 bg-primary/50" aria-hidden="true" />
          </div>
          <Button variant="outline" asChild className="self-start sm:self-auto">
            <Link href="/akademia">ყველა კურსი</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COURSES.map((course, index) => {
            const Icon = ICON_MAP[course.icon];
            return (
              <div
                key={course.id}
                className="group relative flex flex-col gap-6 rounded-lg border border-border/40 bg-card/40 p-8 transition-all duration-500 hover:border-primary/50 hover:bg-card"
              >
                <div className="absolute top-0 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />

                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-5xl font-black text-foreground/5 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <EnrollButton courseId={course.id} courseTitle={course.title} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
