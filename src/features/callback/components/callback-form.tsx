'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  PublicCallbackSchema,
  PublicCallbackType,
} from '@/features/callback/validations/callback.validation';
import { Button } from '@/shared/components/ui/button';
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
import { CALLBACK_INTEREST_TYPES } from '@/shared/const/callback.const';
import { PHONE_NUMBER, PHONE_TEL } from '@/shared/const/contacts.const';
import { http } from '@/shared/lib/http';

const TEXTAREA_CLASS =
  'flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ' +
  'transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ' +
  'focus-visible:ring-ring';

const DirectPhone = () => (
  <p className="mt-5 text-sm text-primary-foreground/80">
    ან დაგვიკავშირდით:{' '}
    <Link href={`tel:${PHONE_TEL}`} className="font-semibold text-primary-foreground underline">
      {PHONE_NUMBER}
    </Link>
  </p>
);

export const CallbackForm = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PublicCallbackType>({
    resolver: zodResolver(PublicCallbackSchema),
    defaultValues: { name: '', phone: '', message: '', consent: false },
  });

  const onSubmit = async (values: PublicCallbackType) => {
    setError(null);
    try {
      await http.post('/callbacks/public', values);
      setSuccess(true);
    } catch {
      setError('შეცდომა. სცადეთ კვლავ.');
    }
  };

  if (success) {
    return (
      <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-background p-8 text-center">
        <p className="font-heading text-2xl font-bold text-brand-green">✓</p>
        <p className="mt-3 text-base font-medium text-foreground">
          მადლობა! თქვენი ნომერი მივიღეთ და მალე დაგიკავშირდებით.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="relative mt-8 flex flex-col items-center">
        <Button
          size="lg"
          onClick={() => setOpen(true)}
          className="bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/90"
        >
          <Phone className="size-4" aria-hidden="true" />
          დაგვიკავშირდი
        </Button>
        <DirectPhone />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-background p-6 text-left sm:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>სახელი</FormLabel>
                <FormControl>
                  <Input placeholder="მაგ: ნინო ბერიძე" {...field} />
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
                <FormLabel>ტელეფონის ნომერი *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="მაგ: 599 12 34 56" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ინტერესის ტიპი *</FormLabel>
                <FormControl>
                  <NativeSelect {...field} value={field.value ?? ''}>
                    <option value="">— აირჩიეთ —</option>
                    {CALLBACK_INTEREST_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>მოკლე შეტყობინება</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={2}
                    placeholder="არასავალდებულო"
                    className={TEXTAREA_CLASS}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-1 size-4 shrink-0 rounded border-input accent-primary"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal leading-snug text-muted-foreground">
                    ვეთანხმები, რომ Dermako დამიკავშირდეს მითითებულ ნომერზე.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'იგზავნება...' : 'გაგზავნა'}
          </Button>
        </form>
      </Form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        ან დაგვიკავშირდით:{' '}
        <Link href={`tel:${PHONE_TEL}`} className="font-semibold text-foreground underline">
          {PHONE_NUMBER}
        </Link>
      </p>
    </div>
  );
};
