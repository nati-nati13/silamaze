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
    <section className="py-24 bg-foreground">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <header className="mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary">
            Dermako Academy
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-background sm:text-5xl">
            პროფესიული კურსები
          </h2>
          <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
          <p className="mt-4 text-base text-background/60 max-w-xl">
            ისწავლე პროფესიონალებისგან. დამოწმებული სერტიფიკატი. კარიერული გარანტია.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COURSES.map((course) => {
            const Icon = ICON_MAP[course.icon];
            return (
              <div
                key={course.id}
                className="group flex flex-col gap-6 rounded-lg border border-background/10 p-8 transition-colors duration-300 hover:border-primary/50 hover:bg-background/5"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-background">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-background/60">
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

        <div className="mt-12">
          <Button
            variant="ghost"
            size="lg"
            asChild
            className="text-background/80 hover:text-background hover:bg-background/10"
          >
            <Link href="/akademia">მეტი კურსების შესახებ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
