import { Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

const VARIANTS = [
  { variant: 'default' as const, label: 'Primary' },
  { variant: 'outline' as const, label: 'Outline' },
  { variant: 'gold' as const, label: 'Gold / Soft' },
  { variant: 'secondary' as const, label: 'Secondary' },
  { variant: 'ghost' as const, label: 'Ghost' },
  { variant: 'link' as const, label: 'Link' },
  { variant: 'destructive' as const, label: 'Destructive' },
];

export const ButtonShowcase = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Variants — default state
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Disabled state
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} disabled>
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs">დაჯავშნა</Button>
          <Button size="sm">დაჯავშნა</Button>
          <Button size="default">დაჯავშნა</Button>
          <Button size="lg">დაჯავშნა</Button>
          <Button size="icon" aria-label="დამატება">
            <Plus className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Real usage — header CTAs
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm">
            სასაჩუქრე ბარათი
          </Button>
          <Button variant="default" size="sm">
            დაჯავშნა
          </Button>
        </div>
      </div>
    </div>
  );
};
