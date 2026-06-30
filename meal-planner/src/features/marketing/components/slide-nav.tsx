'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  { id: 'slide-hero', label: 'მთავარი' },
  { id: 'slide-stats', label: 'ციფრები' },
  { id: 'slide-services', label: 'სერვისები' },
  { id: 'slide-courses', label: 'კურსები' },
  { id: 'slide-contact', label: 'კონტაქტი' },
];

export const SlideNav = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SLIDES.forEach((slide, index) => {
      const el = document.getElementById(slide.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { threshold: 0.5 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 items-center"
      aria-label="სლაიდ ნავიგაცია"
    >
      {SLIDES.map((slide, index) => (
        <button
          key={slide.id}
          onClick={() => scrollTo(slide.id)}
          aria-label={slide.label}
          title={slide.label}
          className={`rounded-full transition-all duration-300 ${
            active === index
              ? 'w-2 h-8 bg-primary'
              : 'w-2 h-2 bg-foreground/30 hover:bg-foreground/60'
          }`}
        />
      ))}
    </nav>
  );
};
