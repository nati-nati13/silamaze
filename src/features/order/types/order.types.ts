import { OrderPaymentStatus, OrderStatus } from '@/shared/const/order.const';

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountPrice: number | null;
  subtotal: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  createdAt: string;
};

export type OrderListResult = {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
};
