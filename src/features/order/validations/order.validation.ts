import { z } from 'zod';

import { ORDER_PAYMENT_STATUSES, ORDER_STATUSES } from '@/shared/const/order.const';

export const OrderStatusUpdateSchema = z.object({
  status: z.enum(ORDER_STATUSES).optional(),
  paymentStatus: z.enum(ORDER_PAYMENT_STATUSES).optional(),
});

export type OrderStatusUpdateType = z.infer<typeof OrderStatusUpdateSchema>;

export const OrderQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  status: z.enum(ORDER_STATUSES).optional(),
  paymentStatus: z.enum(ORDER_PAYMENT_STATUSES).optional(),
});

export type OrderQueryType = z.infer<typeof OrderQuerySchema>;
