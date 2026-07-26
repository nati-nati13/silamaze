import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type IconBadgeProps = React.ComponentProps<'div'> & {
  size?: 'sm' | 'md' | 'lg';
};

const SIZE_CLASSES: Record<NonNullable<IconBadgeProps['size']>, string> = {
  sm: 'size-8 [&_svg]:size-4',
  md: 'size-11 [&_svg]:size-5',
  lg: 'size-14 [&_svg]:size-6',
};

function IconBadge({ className, size = 'md', ...props }: IconBadgeProps) {
  return (
    <div
      data-slot="icon-badge"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm',
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    />
  );
}

export { IconBadge };
