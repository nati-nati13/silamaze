'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { BookingSchema, BookingType } from '@/features/booking/validations/booking.validation';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { NativeSelect } from '@/shared/components/ui/select';
import { AVAILABLE_TIMES, BOOKING_LOCATIONS, BOOKING_SERVICES } from '@/shared/const/booking.const';
import { http } from '@/shared/lib/http';

export const BookingForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<BookingType>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      service: '',
      location: 'თბილისი',
      date: '',
      time: '',
      name: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (session?.user?.name) {
      form.setValue('name', session.user.name);
    }
  }, [session, form]);

  const onSubmit = async (data: BookingType) => {
    setLoading(true);
    setError(null);
    try {
      await http.post('/bookings', data);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch {
      setError('შეცდომა. სცადე კვლავ.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-lg border-border/60 shadow-sm text-center">
        <CardContent className="py-12">
          <p className="font-heading text-3xl font-bold text-secondary mb-2">✓</p>
          <p className="font-heading text-xl font-semibold text-foreground">ჯავშანი დადასტურებულია!</p>
          <p className="mt-2 text-sm text-muted-foreground">
            გადადი Dashboard-ზე ჯავშნის სანახავად...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg border-border/60 shadow-sm">
      <CardHeader className="pb-2 text-center">
        <p className="font-heading text-3xl font-bold tracking-widest text-foreground">DERMAKO</p>
        <p className="text-xs font-semibold tracking-widest uppercase text-secondary">ACADEMY</p>
        <div className="mt-4 h-px w-12 bg-secondary mx-auto" aria-hidden="true" />
        <p className="mt-4 font-heading text-xl font-semibold text-foreground">სერვისის ჯავშანი</p>
        <p className="text-sm text-muted-foreground">შეავსე ფორმა ჯავშნის განსათავსებლად</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    სერვისი
                  </FormLabel>
                  <FormControl>
                    <NativeSelect {...field}>
                      <option value="">— აირჩიე სერვისი —</option>
                      {BOOKING_SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    ფილიალი
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      {BOOKING_LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => field.onChange(loc)}
                          className={`rounded-md border px-4 py-3 text-sm font-medium transition-colors ${
                            field.value === loc
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border text-muted-foreground hover:border-primary/40'
                          }`}
                        >
                          {loc === 'თბილისი' ? 'თბილისი — ვაჟა-ფშაველას 8' : 'საგარეჯო — ერეკლე II-ის 49'}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    თარიღი
                  </FormLabel>
                  <FormControl>
                    <Input type="date" min={new Date().toISOString().split('T')[0]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    დრო
                  </FormLabel>
                  <FormControl>
                    <NativeSelect {...field}>
                      <option value="">— აირჩიე დრო —</option>
                      {AVAILABLE_TIMES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    სახელი
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="შენი სახელი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    ტელეფონი
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+995 5XX XXX XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <Button type="submit" className="w-full font-semibold" disabled={loading}>
              {loading ? 'განხილვაში...' : 'ჯავშნის გაგზავნა'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
