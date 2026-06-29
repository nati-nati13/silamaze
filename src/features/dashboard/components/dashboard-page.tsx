'use client';

import { BookOpen, Calendar, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { Booking } from '@/features/booking/types/booking.types';
import { Enrollment } from '@/features/enrollment/types/enrollment.types';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { STATUS_LABELS } from '@/shared/const/booking.const';
import { cn } from '@/shared/lib/utils';

type DashboardUser = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
};

type DashboardPageProps = {
  user: DashboardUser;
  bookings: Booking[];
  enrollments: Enrollment[];
};

type Tab = 'bookings' | 'courses' | 'profile';

const TAB_CONFIG: { id: Tab; label: string; icon: typeof Calendar }[] = [
  { id: 'bookings', label: 'ჩემი ჯავშნები', icon: Calendar },
  { id: 'courses', label: 'ჩემი კურსები', icon: BookOpen },
  { id: 'profile', label: 'პროფილი', icon: User },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-secondary/20 text-secondary',
  confirmed: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
};

export const DashboardPage = ({ user, bookings, enrollments }: DashboardPageProps) => {
  const [tab, setTab] = useState<Tab>('bookings');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-heading text-xl font-bold tracking-widest text-foreground">DERMAKO</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-secondary">ACADEMY</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">გამოსვლა</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-foreground">
            გამარჯობა, {user.name}!
          </h1>
        </div>

        <div className="flex gap-1 border-b border-border mb-8">
          {TAB_CONFIG.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px',
                tab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'bookings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">ჩემი ჯავშნები</h2>
              <Button size="sm" asChild>
                <Link href="/dajavshna">+ ახალი ჯავშანი</Link>
              </Button>
            </div>

            {bookings.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="mx-auto size-8 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">ჯავშნები არ გაქვს</p>
                  <Button size="sm" className="mt-4" asChild>
                    <Link href="/dajavshna">ჯავშნის განთავსება</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <Card key={b.id} className="gap-0">
                    <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-4">
                      <div>
                        <p className="font-semibold text-foreground">{b.service}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {b.location} · {b.date} · {b.time}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
                          STATUS_COLORS[b.status]
                        )}
                      >
                        {STATUS_LABELS[b.status]}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">ჩემი კურსები</h2>
              <Button size="sm" variant="outline" asChild>
                <Link href="/akademia">კურსების ნახვა</Link>
              </Button>
            </div>

            {enrollments.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="mx-auto size-8 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">კურსებში არ ხარ ჩარიცხული</p>
                  <Button size="sm" className="mt-4" asChild>
                    <Link href="/akademia">კურსების ნახვა</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {enrollments.map((e) => (
                  <Card key={e.id} className="gap-0">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-heading text-base font-semibold leading-snug">
                          {e.courseTitle}
                        </CardTitle>
                        <span
                          className={cn(
                            'shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
                            STATUS_COLORS[e.status]
                          )}
                        >
                          {STATUS_LABELS[e.status]}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        ჩარიცხვის თარიღი:{' '}
                        {e.enrolledAt ? new Date(e.enrolledAt).toLocaleDateString('ka-GE') : '—'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'profile' && (
          <div className="max-w-md">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6">პროფილი</h2>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
                    სახელი
                  </p>
                  <p className="text-sm font-medium text-foreground">{user.name ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
                    ელ. ფოსტა
                  </p>
                  <p className="text-sm font-medium text-foreground">{user.email ?? '—'}</p>
                </div>
                {user.phone && (
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
                      ტელეფონი
                    </p>
                    <p className="text-sm font-medium text-foreground">{user.phone}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};
