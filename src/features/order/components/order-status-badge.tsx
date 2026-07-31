import type { OrderStatus } from '@/shared/const/order.const';
import { cn } from '@/shared/lib/utils';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'მოლოდინში',
  confirmed: 'დადასტურებული',
  completed: 'დასრულებული',
  cancelled: 'გაუქმებული',
};

const STATUS_CLASSES: Record<OrderStatus, string> = {
  pending: 'bg-brand-academy/10 text-brand-academy',
  confirmed: 'bg-primary/10 text-primary',
  completed: 'bg-brand-green/15 text-brand-green',
  cancelled: 'bg-destructive/10 text-destructive',
};

type Props = {
  status: OrderStatus;
};

export const OrderStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
        STATUS_CLASSES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};
