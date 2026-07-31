export const ORDER_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_PAYMENT_STATUSES = ['unpaid', 'paid', 'refunded'] as const;

export type OrderPaymentStatus = (typeof ORDER_PAYMENT_STATUSES)[number];
