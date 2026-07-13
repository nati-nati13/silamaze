'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import {
  CourseCard,
  type CarouselTone,
} from '@/features/marketing/components/course-card';
import { COURSES } from '@/shared/const/courses.const';

const ARROW_TONE: Record<CarouselTone, string> = {
  dark: `border-primary-foreground/30 text-primary-foreground
    hover:border-primary-foreground/60 hover:bg-primary-foreground/10`,
  light: 'border-foreground/30 text-foreground hover:border-foreground/60 hover:bg-foreground/5',
};

type CoursesCarouselProps = {
  header?: ReactNode;
  tone?: CarouselTone;
};

export const CoursesCarousel = ({
  header,
  tone = 'dark',
}: CoursesCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const arrowClass = `inline-flex size-10 items-center justify-center rounded-full border
    transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-brand-academy ${ARROW_TONE[tone]}`;

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('article');
    const step = card ? card.clientWidth + 24 : track.clientWidth / 2;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const card = track.querySelector('article');
        const step = card ? card.clientWidth + 24 : track.clientWidth / 2;
        track.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">{header}</div>
        <div className="flex gap-2.5">
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByCard(-1)}
            aria-label="წინა კურსი"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={arrowClass}
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
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-academy"
      >
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} tone={tone} />
        ))}
      </div>
    </div>
  );
};
