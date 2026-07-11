'use client';

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Hand,
  Pencil,
  Sparkles,
  Syringe,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { EnrollButton } from '@/features/enrollment/components/enroll-button';
import { Button } from '@/shared/components/ui/button';
import { COURSES, type Course } from '@/shared/const/courses.const';

const ICON_MAP: Record<Course['icon'], LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  pencil: Pencil,
  syringe: Syringe,
  hand: Hand,
};

export const CoursesCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('article');
    const step = card ? card.clientWidth + 24 : track.clientWidth / 2;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="mb-8 flex justify-end gap-2.5">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollByCard(-1)}
          aria-label="წინა კურსი"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollByCard(1)}
          aria-label="შემდეგი კურსი"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
      >
        {COURSES.map((course) => {
          const Icon = ICON_MAP[course.icon];
          return (
            <article
              key={course.id}
              className="group flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl
                border border-border bg-background transition-all duration-300
                hover:-translate-y-1.5 hover:border-brand-green/50 sm:w-80"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                {course.image ? (
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="20rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex size-full items-center justify-center bg-gradient-to-br
                      from-brand-green to-primary"
                  >
                    <Icon
                      className="size-10 text-primary-foreground/80"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {course.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                  <Link
                    href="/akademia"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green
                      transition-colors hover:text-foreground"
                  >
                    დაწვრილებით
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <EnrollButton courseId={course.id} courseTitle={course.title} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
