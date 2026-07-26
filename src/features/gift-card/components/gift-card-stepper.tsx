import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

const STEPS = [
  'ბარათის ტიპი',
  'თანხის არჩევა',
  'დიზაინი',
  'მონაცემები',
  'მიმღების ინფო',
  'შეჯამება',
];

type GiftCardStepperProps = {
  activeStep: number;
};

export const GiftCardStepper = ({ activeStep }: GiftCardStepperProps) => {
  return (
    <ol className="flex w-full items-start justify-between gap-2">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const isComplete = step < activeStep;
        const isActive = step === activeStep;

        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
            <div className="flex w-full items-center">
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                  isActive && 'border-primary bg-primary text-primary-foreground',
                  isComplete && 'border-primary bg-primary/10 text-primary',
                  !isActive && !isComplete && 'border-border bg-card text-muted-foreground'
                )}
              >
                {isComplete ? <Check className="size-4" aria-hidden="true" /> : step}
              </span>
              {step < STEPS.length && (
                <span
                  className={cn('mx-2 h-px flex-1', isComplete ? 'bg-primary' : 'bg-border')}
                  aria-hidden="true"
                />
              )}
            </div>
            <span
              className={cn(
                'text-xs font-semibold uppercase tracking-wide',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
};
