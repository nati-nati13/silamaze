import { Facebook, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { FACEBOOK_URL, LOCATIONS } from '@/shared/const/contacts.const';

import { LocationMaps } from './location-maps';

export const ContactSection = () => {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              მოგვინახულეთ
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-background sm:text-5xl">
              ჩვენი მისამართები
            </h2>
            <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-background/60 max-w-sm">
              ორ ქალაქში გთავაზობთ იდენტურ პრემიუმ სერვისს. დაჯავშნეთ ვიზიტი ახლავე.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4">
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-background/80 transition-colors hover:text-primary"
              >
                <Facebook className="size-5" aria-hidden="true" />
                Facebook-ზე შეტყობინება
              </Link>
              <Button asChild>
                <Link href="/kontakti">სრული კონტაქტი</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.city}
                className="flex items-start gap-4 rounded-lg border border-background/10 p-6 transition-colors duration-300 hover:border-primary/40"
              >
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-heading text-xl font-bold text-background">{loc.city}</p>
                  <p className="mt-1 text-sm text-background/60">{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <LocationMaps />
        </div>
      </div>
    </section>
  );
};
