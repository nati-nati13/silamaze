'use client';

import { useState } from 'react';

import { CallbackForm } from '@/features/callback/components/callback-form';
import { Button } from '@/shared/components/ui/button';

export const GiftCardCtaBanner = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="bg-primary py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-6 text-center sm:px-10">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
          მზად ხართ განაცოცხლებული საჩუქრისთვის?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/75">
          დაგვიკავშირდით და სიამოვნებით დაგეხმარებით საჭირო ვარიანტის შერჩევაში.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="bg-brand-academy text-primary hover:bg-brand-academy/90"
            onClick={() => setContactOpen(true)}
          >
            დაგვიკავშირდით
          </Button>
        </div>

        <CallbackForm
          defaultInterestType="სასაჩუქრე ბარათი"
          open={contactOpen}
          onOpenChange={setContactOpen}
        />
      </div>
    </section>
  );
};
