import {
  ArrowRight,
  Hand,
  Pencil,
  Sparkles,
  Syringe,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Course } from '@/shared/const/courses.const';

const ICON_MAP: Record<Course['icon'], LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  pencil: Pencil,
  syringe: Syringe,
  hand: Hand,
};

export type CarouselTone = 'dark' | 'light';

type CardToneClasses = {
  card: string;
  imageFallback: string;
  icon: string;
  title: string;
  body: string;
  divider: string;
  pending: string;
  link: string;
};

const TONE_MAP: Record<CarouselTone, CardToneClasses> = {
  dark: {
    card: 'border-primary-foreground/10 bg-primary-foreground/5 hover:border-brand-academy/40',
    imageFallback: 'bg-primary-foreground/10',
    icon: 'text-primary-foreground/60',
    title: 'text-primary-foreground',
    body: 'text-primary-foreground/70',
    divider: 'border-primary-foreground/10',
    pending: 'text-primary-foreground/60',
    link: 'text-primary-foreground hover:text-brand-academy',
  },
  light: {
    card: 'border-border bg-card hover:border-brand-green/50',
    imageFallback: 'bg-brand-green/10',
    icon: 'text-brand-green/50',
    title: 'text-foreground',
    body: 'text-muted-foreground',
    divider: 'border-border',
    pending: 'text-muted-foreground',
    link: 'text-foreground hover:text-brand-green',
  },
};

type CourseCardProps = {
  course: Course;
  tone: CarouselTone;
};

export const CourseCard = ({ course, tone }: CourseCardProps) => {
  const toneClasses = TONE_MAP[tone];
  const Icon = ICON_MAP[course.icon];

  return (
    <article
      className={`group flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl
        border transition-all duration-300 hover:-translate-y-1 sm:w-80 lg:w-96 ${toneClasses.card}`}
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
          <div
            className={`flex size-full items-center justify-center ${toneClasses.imageFallback}`}
          >
            <Icon className={`size-10 ${toneClasses.icon}`} aria-hidden="true" />
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
          className={`line-clamp-3 min-h-14 font-heading text-xl font-semibold leading-snug
            tracking-normal ${toneClasses.title}`}
        >
          {course.title}
        </h3>
        <p className={`mt-3 mb-6 line-clamp-3 text-sm leading-relaxed ${toneClasses.body}`}>
          {course.description}
        </p>

        <div
          className={`mt-auto flex items-center justify-between gap-3 border-t pt-5 ${toneClasses.divider}`}
        >
          {course.price ? (
            <span className="font-heading text-lg font-semibold text-brand-academy">
              {course.price}
            </span>
          ) : (
            <span className={`text-sm ${toneClasses.pending}`}>
              მალე დაზუსტდება
            </span>
          )}
          <Link
            href="/akademia"
            className={`inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold
              transition-colors focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-brand-academy ${toneClasses.link}`}
          >
            დეტალურად
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
