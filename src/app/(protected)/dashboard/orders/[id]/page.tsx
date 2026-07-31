import { notFound } from 'next/navigation';

import { OrderPaymentBadge } from '@/features/order/components/order-payment-badge';
import { OrderStatusBadge } from '@/features/order/components/order-status-badge';
import { OrderStatusForm } from '@/features/order/components/order-status-form';
import { getOrderByIdService } from '@/features/order/service/order.service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { formatDateTime } from '@/shared/utils/format';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'შეკვეთის დეტალები — Admin',
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailAdminPage({ params }: PageProps) {
  const { id } = await params;
  const { data, status } = await getOrderByIdService(id);

  if (status === 404 || !('id' in data)) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">შეკვეთის დეტალები</h1>
        <div className="flex items-center gap-2">
          <OrderStatusBadge status={data.status} />
          <OrderPaymentBadge paymentStatus={data.paymentStatus} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground">კლიენტი</p>
            <p className="text-sm font-medium text-foreground">{data.customerName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">ტელეფონი</p>
            <p className="text-sm font-medium text-foreground">{data.customerPhone}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">თარიღი</p>
            <p className="text-sm font-medium text-foreground">{formatDateTime(data.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>პროდუქტი</TableHead>
              <TableHead>რაოდენობა</TableHead>
              <TableHead>ერთეულის ფასი</TableHead>
              <TableHead>ფასდაკლებით</TableHead>
              <TableHead>ქვე-ჯამი</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  ამ შეკვეთას პროდუქტები არ აქვს.
                </TableCell>
              </TableRow>
            ) : (
              data.items.map((item, index) => (
                <TableRow key={`${item.productName}-${index}`}>
                  <TableCell className="font-medium text-foreground">{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unitPrice} ₾</TableCell>
                  <TableCell>{item.discountPrice != null ? `${item.discountPrice} ₾` : '—'}</TableCell>
                  <TableCell>{item.subtotal} ₾</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <p className="text-lg font-semibold text-foreground">ჯამი: {data.totalAmount} ₾</p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8">
        <OrderStatusForm order={data} />
      </div>
    </div>
  );
}
