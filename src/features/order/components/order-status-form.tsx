'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { Order } from '@/features/order/types/order.types';
import {
  OrderStatusUpdateSchema,
  type OrderStatusUpdateType,
} from '@/features/order/validations/order.validation';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { NativeSelect } from '@/shared/components/ui/select';
import { ORDER_PAYMENT_STATUSES, ORDER_STATUSES } from '@/shared/const/order.const';
import { http } from '@/shared/lib/http';

type Props = {
  order: Order;
};

export const OrderStatusForm = ({ order }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<OrderStatusUpdateType>({
    resolver: zodResolver(OrderStatusUpdateSchema),
    defaultValues: {
      status: order.status,
      paymentStatus: order.paymentStatus,
    },
  });

  const onSubmit = async (values: OrderStatusUpdateType) => {
    setError(null);
    setSuccess(false);
    try {
      await http.patch(`/orders/${order.id}`, values);
      setSuccess(true);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'შეცდომა. სცადეთ კვლავ.';
      setError(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>სტატუსი</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>გადახდის სტატუსი</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    {ORDER_PAYMENT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        {success && <p className="text-sm font-medium text-primary">სტატუსი განახლდა.</p>}

        <div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'ინახება...' : 'სტატუსის განახლება'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
