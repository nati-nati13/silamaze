import {
  ArrowLeft,
  Banknote,
  Clock,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { EnrollButton } from '@/features/enrollment/components/enroll-button';
import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';
import type { Course } from '@/shared/const/courses.const';

const PENDING_VALUE = 'მალე დაზუსტდება';

type CourseDetailPageProps = {
  course: Course;
};

type CourseMeta = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export const CourseDetailPage = ({ course }: CourseDetailPageProps) => {
  const meta: CourseMeta[] = [
    {
      icon: Clock,
      label: 'ხანგრძლივობა',
      value: course.duration ?? PENDING_VALUE,
    },
    { icon: Banknote, label: 'ფასი', value: course.price ?? PENDING_VALUE },
    {
      icon: Users,
      label: 'ადგილები',
      value:
        course.seats !== undefined
          ? `დარჩენილია ${course.seats} ადგილი`
          : PENDING_VALUE,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto w-full max-w-3xl px-6 sm:px-10">
            <Link
              href="/akademia"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground
                transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              ყველა კურსი
            </Link>

            <p className="eyebrow mt-10 text-brand-academy">Dermako Academy</p>
            <h1
              className="mt-4 font-heading text-4xl font-semibold leading-snug tracking-normal
                text-foreground sm:text-5xl"
            >
              {course.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {course.description}
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-academy">
                    <item.icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </dt>
                  <dd className="mt-3 font-heading text-lg font-semibold text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 max-w-xs">
              <EnrollButton courseId={course.id} courseTitle={course.title} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
