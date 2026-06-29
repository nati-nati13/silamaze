import { Pencil, Sparkles, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { EnrollButton } from '@/features/enrollment/components/enroll-button';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { COURSES, type Course } from '@/shared/const/courses.const';

const ICON_MAP: Record<Course['icon'], LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  pencil: Pencil,
};

export const CoursesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <header className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
            Dermako Academy
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            პროფესიული კურსები
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            ისწავლე პროფესიონალებისგან. დამოწმებული სერტიფიკატი. კარიერული გარანტია.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COURSES.map((course) => {
            const Icon = ICON_MAP[course.icon];
            return (
              <Card
                key={course.id}
                className="group relative gap-0 overflow-hidden border-secondary/20 transition-shadow duration-300 hover:shadow-lg"
              >
                <div
                  className="absolute top-0 left-0 h-1 w-full bg-secondary"
                  aria-hidden="true"
                />
                <CardHeader className="pt-8 pb-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </CardHeader>
                <CardContent>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="mt-6">
                    <EnrollButton courseId={course.id} courseTitle={course.title} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/akademia">მეტი კურსების შესახებ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
