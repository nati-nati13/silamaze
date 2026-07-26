import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type SwitchProps = Omit<React.ComponentProps<'button'>, 'onChange'> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

function Switch({ className, checked, onCheckedChange, ...props }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked === true}
      data-slot="switch"
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-muted',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'absolute top-1 left-1 h-4 w-4 rounded-full bg-background transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
}

export { Switch };
