import Link from 'next/link';

import { OrderPaymentBadge } from '@/features/order/components/order-payment-badge';
import { OrderStatusBadge } from '@/features/order/components/order-status-badge';
import { listOrdersForAdminService } from '@/features/order/service/order.service';
import { OrderQuerySchema } from '@/features/order/validations/order.validation';
import { Button } from '@/shared/components/ui/button';
import { NativeSelect } from '@/shared/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { ORDER_PAYMENT_STATUSES, ORDER_STATUSES } from '@/shared/const/order.const';
import { formatDateTime } from '@/shared/utils/format';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'შეკვეთები — Admin',
};

type PageProps = {
  searchParams: Promise<{ page?: string; status?: string; paymentStatus?: string }>;
};

export default async function OrdersAdminPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const query = OrderQuerySchema.parse(rawParams);

  const { data } = await listOrdersForAdminService(query);
  const result = 'orders' in data ? data : { orders: [], total: 0, page: 1, totalPages: 1 };

  const pageHref = (targetPage: number) => {
    const qs = new URLSearchParams();
    qs.set('page', String(targetPage));
    if (query.status) qs.set('status', query.status);
    if (query.paymentStatus) qs.set('paymentStatus', query.paymentStatus);
    return `/dashboard/orders?${qs.toString()}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">შეკვეთები</h1>

      <form method="GET" className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">სტატუსი</label>
          <NativeSelect name="status" defaultValue={query.status ?? ''} className="w-48">
            <option value="">— ყველა —</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </NativeSelect>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">გადახდის სტატუსი</label>
          <NativeSelect name="paymentStatus" defaultValue={query.paymentStatus ?? ''} className="w-48">
            <option value="">— ყველა —</option>
            {ORDER_PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </NativeSelect>
        </div>

        <Button type="submit" variant="outline">
          ფილტრი
        </Button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>კლიენტი</TableHead>
              <TableHead>ტელეფონი</TableHead>
              <TableHead>ჯამი</TableHead>
              <TableHead>სტატუსი</TableHead>
              <TableHead>გადახდა</TableHead>
              <TableHead>თარიღი</TableHead>
              <TableHead className="text-right">მოქმედება</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                  შეკვეთა ვერ მოიძებნა.
                </TableCell>
              </TableRow>
            ) : (
              result.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-foreground">{order.customerName}</TableCell>
                  <TableCell>{order.customerPhone}</TableCell>
                  <TableCell>{order.totalAmount} ₾</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <OrderPaymentBadge paymentStatus={order.paymentStatus} />
                  </TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/orders/${order.id}`}>დეტალები</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {result.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {query.page > 1 ? (
            <Button variant="outline" asChild>
              <Link href={pageHref(query.page - 1)}>წინა</Link>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              წინა
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {query.page} / {result.totalPages}
          </span>
          {query.page < result.totalPages ? (
            <Button variant="outline" asChild>
              <Link href={pageHref(query.page + 1)}>შემდეგი</Link>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              შემდეგი
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
