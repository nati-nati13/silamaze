import type { OrderPaymentStatus } from '@/shared/const/order.const';
import { cn } from '@/shared/lib/utils';

const PAYMENT_LABELS: Record<OrderPaymentStatus, string> = {
  unpaid: 'გადაუხდელი',
  paid: 'გადახდილი',
  refunded: 'დაბრუნებული',
};

const PAYMENT_CLASSES: Record<OrderPaymentStatus, string> = {
  unpaid: 'bg-muted text-muted-foreground',
  paid: 'bg-primary/10 text-primary',
  refunded: 'bg-destructive/10 text-destructive',
};

type Props = {
  paymentStatus: OrderPaymentStatus;
};

export const OrderPaymentBadge = ({ paymentStatus }: Props) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
        PAYMENT_CLASSES[paymentStatus]
      )}
    >
      {PAYMENT_LABELS[paymentStatus]}
    </span>
  );
};
