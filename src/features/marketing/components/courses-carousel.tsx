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
import { useRef, type ReactNode } from 'react';

import { COURSES, type Course } from '@/shared/const/courses.const';

const ICON_MAP: Record<Course['icon'], LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  pencil: Pencil,
  syringe: Syringe,
  hand: Hand,
};

type CoursesCarouselProps = {
  header?: ReactNode;
};

const ARROW_CLASS = `inline-flex size-10 items-center justify-center rounded-full border
  border-primary-foreground/30 text-primary-foreground transition-colors duration-200
  hover:border-primary-foreground/60 hover:bg-primary-foreground/10
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-academy`;

export const CoursesCarousel = ({ header }: CoursesCarouselProps) => {
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
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">{header}</div>
        <div className="flex gap-2.5">
          <button
            type="button"
            className={ARROW_CLASS}
            onClick={() => scrollByCard(-1)}
            aria-label="წინა კურსი"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={ARROW_CLASS}
            onClick={() => scrollByCard(1)}
            aria-label="შემდეგი კურსი"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="კურსების კარუსელი"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-academy"
      >
        {COURSES.map((course) => {
          const Icon = ICON_MAP[course.icon];
          return (
            <article
              key={course.id}
              className="group flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl
                border border-primary-foreground/10 bg-primary-foreground/5 transition-all
                duration-300 hover:-translate-y-1 hover:border-brand-academy/40 sm:w-80 lg:w-96"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                {course.image ? (
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="24rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-primary-foreground/10">
                    <Icon
                      className="size-10 text-primary-foreground/60"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <span
                  className="absolute top-4 left-4 rounded-md bg-primary/85 px-3 py-1.5 text-xs
                    font-semibold tracking-widest uppercase text-brand-academy"
                >
                  {course.duration ?? 'მალე დაზუსტდება'}
                </span>
                {course.seats !== undefined && (
                  <span
                    className="absolute bottom-4 left-4 rounded-md bg-primary/85 px-3 py-1.5 text-xs
                      font-semibold tracking-widest uppercase text-primary-foreground/90"
                  >
                    დარჩენილია {course.seats} ადგილი
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3
                  className="line-clamp-3 min-h-14 font-heading text-xl font-semibold leading-snug
                    tracking-normal text-primary-foreground"
                >
                  {course.title}
                </h3>
                <p className="mt-3 mb-6 line-clamp-3 text-sm leading-relaxed text-primary-foreground/70">
                  {course.description}
                </p>

                <div
                  className="mt-auto flex items-center justify-between gap-3 border-t
                    border-primary-foreground/10 pt-5"
                >
                  {course.price ? (
                    <span className="font-heading text-lg font-semibold text-brand-academy">
                      {course.price}
                    </span>
                  ) : (
                    <span className="text-sm text-primary-foreground/60">
                      მალე დაზუსტდება
                    </span>
                  )}
                  <Link
                    href={`/akademia/${course.id}`}
                    className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold
                      text-primary-foreground transition-colors hover:text-brand-academy
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-academy"
                  >
                    დეტალურად
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
