import { type ReactNode } from 'react';

import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';

type ShowcaseSectionProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export const ShowcaseSection = ({ eyebrow, title, description, children }: ShowcaseSectionProps) => {
  return (
    <section className="border-t border-border py-16 first:border-t-0 first:pt-0">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <EyebrowLabel>{eyebrow}</EyebrowLabel>
        <h2 className="mt-4 font-heading text-3xl font-bold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
};
