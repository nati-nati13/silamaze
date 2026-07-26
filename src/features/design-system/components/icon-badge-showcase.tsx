import { Heart, Sparkles, Star } from 'lucide-react';

import { IconBadge } from '@/shared/components/ui/icon-badge';

export const IconBadgeShowcase = () => {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <div className="flex flex-col items-center gap-3">
        <IconBadge size="sm">
          <Sparkles aria-hidden="true" />
        </IconBadge>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">sm</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <IconBadge size="md">
          <Star aria-hidden="true" />
        </IconBadge>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">md</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <IconBadge size="lg">
          <Heart aria-hidden="true" />
        </IconBadge>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">lg</p>
      </div>

      <div className="relative ml-4">
        <div className="flex size-32 items-center justify-center rounded-2xl border border-border bg-card text-sm text-muted-foreground">
          floating on card corner
        </div>
        <IconBadge size="sm" className="absolute -right-3 -top-3">
          <Star aria-hidden="true" />
        </IconBadge>
      </div>
    </div>
  );
};
