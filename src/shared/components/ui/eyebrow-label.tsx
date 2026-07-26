import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function EyebrowLabel({ className, children, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="eyebrow-label"
      className={cn(
        'inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-brand-academy uppercase',
        className
      )}
      {...props}
    >
      <span className="h-px w-6 bg-brand-academy" aria-hidden="true" />
      {children}
    </span>
  );
}

export { EyebrowLabel };
