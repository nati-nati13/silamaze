'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import { AVAILABLE_TIMES, BOOKING_LOCATIONS } from '@/shared/const/booking.const';
import { http } from '@/shared/lib/http';

type Props = {
  serviceName: string;
};

export const BookingModal = ({ serviceName }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<BookingType>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      service: serviceName,
      location: 'თბილისი',
      date: '',
      time: '',
      name: '',
      phone: '',
    },
  });

  const handleOpen = () => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent('/servesebi')}`);
      return;
    }
    form.reset({
      service: serviceName,
      location: 'თბილისი',
      date: '',
      time: '',
      name: session.user?.name ?? '',
      phone: '',
    });
    setSuccess(false);
    setError(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onSubmit = async (data: BookingType) => {
    setLoading(true);
    setError(null);
    try {
      await http.post('/bookings', data);
      setSuccess(true);
    } catch {
      setError('შეცდომა. სცადე კვლავ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="w-full font-semibold" size="sm">
        დაჯავშნა
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-border/60 shadow-xl">
              <CardHeader className="pb-2 text-center relative">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="დახურვა"
                >
                  <X className="size-5" />
                </button>
                <p className="font-heading text-3xl font-bold tracking-widest text-foreground">DERMAKO</p>
                <p className="text-xs font-semibold tracking-widest uppercase text-secondary">ACADEMY</p>
                <div className="mt-4 h-px w-12 bg-secondary mx-auto" aria-hidden="true" />
                <p className="mt-4 font-heading text-xl font-semibold text-foreground">სერვისის ჯავშანი</p>
              </CardHeader>

              <CardContent>
                {success ? (
                  <div className="py-8 text-center">
                    <p className="font-heading text-4xl font-bold text-secondary mb-3">✓</p>
                    <p className="font-heading text-xl font-semibold text-foreground">
                      ჯავშანი დადასტურებულია!
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground mb-6">
                      ჯავშანი წარმატებით განთავსდა.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" onClick={handleClose}>
                        დახურვა
                      </Button>
                      <Button
                        onClick={() => {
                          handleClose();
                          router.push('/dashboard');
                        }}
                      >
                        ჩემი ჯავშნები
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1.5">
                          სერვისი
                        </p>
                        <p className="rounded-md border border-input bg-muted px-3 py-2 text-sm font-medium text-foreground">
                          {serviceName}
                        </p>
                      </div>

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
                                    className={`rounded-md border px-3 py-3 text-sm font-medium transition-colors text-left ${
                                      field.value === loc
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border text-muted-foreground hover:border-primary/40'
                                    }`}
                                  >
                                    {loc === 'თბილისი'
                                      ? 'თბილისი\nვაჟა-ფშაველას 8'
                                      : 'საგარეჯო\nერეკლე II-ის 49'}
                                  </button>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                                თარიღი
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  min={new Date().toISOString().split('T')[0]}
                                  {...field}
                                />
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
                                  <option value="">— დრო —</option>
                                  {AVAILABLE_TIMES.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                  ))}
                                </NativeSelect>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

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

                      {error && (
                        <p className="text-sm font-medium text-destructive">{error}</p>
                      )}

                      <Button type="submit" className="w-full font-semibold" disabled={loading}>
                        {loading ? 'განხილვაში...' : 'დაჯავშნა'}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
