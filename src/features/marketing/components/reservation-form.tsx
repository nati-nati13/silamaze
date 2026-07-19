'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ReservationSchema,
  ReservationType,
} from '@/features/booking/validations/reservation.validation';
import { ReservationFields } from '@/features/marketing/components/reservation-fields';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { RESERVATION_DISCLAIMER } from '@/shared/const/booking.const';
import { COURSES } from '@/shared/const/courses.const';
import { GIFT_CARD_NOMINALS } from '@/shared/const/gift-card.const';
import { http } from '@/shared/lib/http';

const TABS = [
  { value: 'service' as const, label: 'ესთეტიკური სერვისი' },
  { value: 'course' as const, label: 'აკადემიის კურსი' },
  { value: 'giftcard' as const, label: 'სასაჩუქრე ბარათი' },
];

export const ReservationForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [giftCardCode, setGiftCardCode] = useState<string | null>(null);

  const form = useForm<ReservationType>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      type: 'service',
      location: 'თბილისი',
      name: '',
      phone: '',
      email: '',
      selection: '',
      customAmount: '',
      date: '',
      time: '',
      message: '',
    },
  });

  const type = form.watch('type');

  const setType = (next: (typeof TABS)[number]['value']) => {
    form.setValue('type', next);
    form.setValue('selection', '');
  };

  const onSubmit = async (values: ReservationType) => {
    setLoading(true);
    setError(null);

    const course = COURSES.find((c) => c.id === values.selection);
    const serviceName = values.type === 'course' ? course?.title ?? values.selection : values.selection;

    try {
      if (values.type === 'giftcard') {
        const nominal = GIFT_CARD_NOMINALS.find((n) => n.id === values.selection);
        const giftCardAmount =
          values.selection === 'custom'
            ? `${(values.customAmount ?? '').trim()} ₾`
            : nominal?.amount ?? values.selection;
        const res = await http.post<{ giftCardCode: string }>('/gift-cards/public', {
          amount: giftCardAmount,
          usage: values.usage,
          delivery: values.delivery,
          address: values.delivery === 'ბეჭდური' ? values.address : '',
          name: values.name,
          phone: values.phone,
          email: values.email,
          message: values.message,
        });
        setGiftCardCode(res?.giftCardCode ?? null);
      } else if (!session) {
        // anonymous lead — staff confirms by phone
        await http.post('/bookings/public', {
          service: serviceName,
          location: values.location,
          date: values.date,
          time: values.time,
          name: values.name,
          phone: values.phone,
          email: values.email,
          message: values.message,
        });
      } else if (values.type === 'course') {
        await http.post('/enrollments', {
          courseId: values.selection,
          courseTitle: serviceName,
        });
      } else {
        await http.post('/bookings', {
          service: serviceName,
          location: values.location,
          date: values.date,
          time: values.time,
          name: values.name,
          phone: values.phone,
          message: values.message,
        });
      }
      setSuccess(true);
      form.reset({
        ...form.getValues(),
        name: '',
        phone: '',
        email: '',
        selection: '',
        customAmount: '',
        date: '',
        time: '',
        message: '',
        usage: undefined,
        delivery: undefined,
        address: '',
      });
    } catch {
      setError('შეცდომა. სცადეთ კვლავ.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-border bg-card p-9 text-center shadow-sm">
        <p className="font-heading text-4xl font-bold text-brand-green">✓</p>
        <p className="mt-3 font-heading text-xl font-semibold text-foreground">
          განაცხადი მიღებულია!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          ჩვენი გუნდი მალე დაგიკავშირდებათ.
        </p>
        {giftCardCode && (
          <div className="mt-6 rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              ბარათის კოდი
            </p>
            <p className="mt-1 font-mono text-lg font-bold tracking-wider text-foreground">
              {giftCardCode}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              შეინახეთ ეს კოდი — დაგჭირდებათ ბარათის გასააქტიურებლად.
            </p>
          </div>
        )}
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => { setSuccess(false); setGiftCardCode(null); }}
        >
          ახალი განაცხადი
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-9">
      <h3 className="font-heading text-2xl font-semibold text-foreground">
        სწრაფი ონლაინ რეზერვაცია
      </h3>
      <div className="mt-6 h-px w-full bg-border" aria-hidden="true" />

      <div className="mt-6 grid grid-cols-3 gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setType(tab.value)}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
              type === tab.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:border-brand-green/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <ReservationFields control={form.control} type={type} />

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <Button type="submit" className="w-full font-semibold" size="lg" disabled={loading}>
            {loading ? 'იგზავნება...' : 'დასტური და გაგზავნა'}
          </Button>

          <p className="text-xs leading-relaxed text-muted-foreground">
            {RESERVATION_DISCLAIMER}
          </p>
        </form>
      </Form>
    </div>
  );
};
