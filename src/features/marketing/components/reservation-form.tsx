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
import { COURSES } from '@/shared/const/courses.const';
import { http } from '@/shared/lib/http';

const TABS = [
  { value: 'service' as const, label: 'ესთეტიკური სერვისი' },
  { value: 'course' as const, label: 'აკადემიის კურსი' },
];

export const ReservationForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ReservationType>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      type: 'service',
      name: '',
      phone: '',
      selection: '',
      date: '',
      time: '',
      message: '',
    },
  });

  const type = form.watch('type');
  const isCourse = type === 'course';

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
      if (!session) {
        // anonymous lead — staff confirms by phone
        await http.post('/bookings/public', {
          service: serviceName,
          date: values.date,
          time: values.time,
          name: values.name,
          phone: values.phone,
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
          location: 'თბილისი',
          date: values.date,
          time: values.time,
          name: values.name,
          phone: values.phone,
          message: values.message,
        });
      }
      setSuccess(true);
      form.reset({ ...form.getValues(), name: '', phone: '', selection: '', date: '', time: '', message: '' });
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
        <Button className="mt-6" variant="outline" onClick={() => setSuccess(false)}>
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

      <div className="mt-6 grid grid-cols-2 gap-3">
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
          <ReservationFields control={form.control} isCourse={isCourse} />

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <Button type="submit" className="w-full font-semibold" size="lg" disabled={loading}>
            {loading ? 'იგზავნება...' : 'გაგზავნა'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
