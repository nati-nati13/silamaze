import { Phone } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { PHONE_TEL } from '@/shared/const/contacts.const';

export const CtaBand = () => {
  return (
    <section id="slide-cta" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:py-20">
          <h2 className="relative mx-auto max-w-xl font-heading text-3xl font-semibold leading-tight text-primary-foreground sm:text-4xl">
            ჩაეწერე კურსზე ან დაჯავშნე ვიზიტი
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/75">
            დაგვიტოვე ნომერი — დაგირეკავთ და დაგეხმარებით სწორი კურსის ან
            პროცედურის არჩევაში.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Button
              size="lg"
              asChild
              className="bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/90"
            >
              <Link href={`tel:${PHONE_TEL}`}>
                <Phone className="size-4" aria-hidden="true" />
                დაგვირეკეთ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
