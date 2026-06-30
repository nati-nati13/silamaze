'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { useRegister } from '@/features/auth/hooks/use-register';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { SignUpSchema, SignUpType } from '@/features/auth/validations/auth.validation';
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

export const SignUpForm = () => {
  const { register } = useRegister();
  const { loading, error } = useAuthStore();

  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '' },
  });

  return (
    <Card className="w-full max-w-md border-border/60 shadow-sm">
      <CardHeader className="pb-2 text-center">
        <p className="font-heading text-3xl font-bold tracking-widest text-foreground">DERMAKO</p>
        <p className="text-xs font-semibold tracking-widest uppercase text-secondary">ACADEMY</p>
        <div className="mt-4 h-px w-12 bg-secondary mx-auto" aria-hidden="true" />
        <p className="mt-4 font-heading text-xl font-semibold text-foreground">რეგისტრაცია</p>
        <p className="text-sm text-muted-foreground">შეიყვანე შენი მონაცემები</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(register)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    სახელი და გვარი
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="სახელი გვარი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    ელ. ფოსტა
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
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
                    <Input type="tel" placeholder="+995 5XX XXX XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    პაროლი
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full font-semibold" disabled={loading}>
              {loading ? 'რეგისტრაცია...' : 'ანგარიშის შექმნა'}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground tracking-wider">ან</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            >
              Google-ით რეგისტრაცია
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              უკვე გაქვს ანგარიში?{' '}
              <Link
                href="/login"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                შესვლა
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
