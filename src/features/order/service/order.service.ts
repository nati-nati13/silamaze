import { orderRepository } from '@/features/order/repository/order.repository';
import { Order, OrderListResult } from '@/features/order/types/order.types';
import { OrderQueryType, OrderStatusUpdateType } from '@/features/order/validations/order.validation';
import { ServiceResult } from '@/shared/types/common';

function toOrder(doc: {
  _id: { toString(): string };
  customerName: string;
  customerPhone: string;
  items?:
    | {
        productId: { toString(): string };
        productName: string;
        quantity: number;
        unitPrice: number;
        discountPrice?: number | null;
        subtotal: number;
      }[]
    | null;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt?: Date | string;
}): Order {
  return {
    id: doc._id.toString(),
    customerName: doc.customerName,
    customerPhone: doc.customerPhone,
    items: (doc.items ?? []).map((item) => ({
      productId: item.productId.toString(),
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discountPrice: item.discountPrice ?? null,
      subtotal: item.subtotal,
    })),
    totalAmount: doc.totalAmount,
    status: doc.status as Order['status'],
    paymentStatus: doc.paymentStatus as Order['paymentStatus'],
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : '',
  };
}

export async function listOrdersForAdminService(
  query: OrderQueryType
): Promise<ServiceResult<OrderListResult>> {
  const limit = 20;
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;
  if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;

  const skip = (query.page - 1) * limit;

  const [docs, total] = await Promise.all([
    orderRepository.find(filter, skip, limit),
    orderRepository.count(filter),
  ]);

  return {
    data: {
      orders: docs.map(toOrder),
      total,
      page: query.page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    status: 200,
  };
}

export async function getOrderByIdService(id: string): Promise<ServiceResult<Order>> {
  const doc = await orderRepository.findById(id);
  if (!doc) return { data: { error: 'NOT_FOUND' }, status: 404 };
  return { data: toOrder(doc), status: 200 };
}

export async function updateOrderStatusService(
  id: string,
  input: OrderStatusUpdateType
): Promise<ServiceResult<Order>> {
  const current = await orderRepository.findById(id);
  if (!current) return { data: { error: 'NOT_FOUND' }, status: 404 };

  const updated = await orderRepository.updateById(id, input);
  return { data: toOrder(updated!), status: 200 };
}
