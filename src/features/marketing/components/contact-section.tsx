import { Facebook, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { FACEBOOK_URL, LOCATIONS } from '@/shared/const/contacts.const';
import { LocationMaps } from './location-maps';

export const ContactSection = () => {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <header className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
            მოგვინახულეთ
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-background sm:text-5xl">
            ჩვენი მისამართები
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="rounded-lg border border-background/10 p-8 text-center"
            >
              <MapPin className="mx-auto size-8 text-primary mb-4" aria-hidden="true" />
              <p className="font-heading text-xl font-bold text-background">{loc.city}</p>
              <p className="mt-2 text-sm text-background/70">{loc.address}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <LocationMaps />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-background/80 transition-colors hover:text-primary"
          >
            <Facebook className="size-5" aria-hidden="true" />
            გამოგვიგზავნეთ შეტყობინება Facebook-ზე
          </Link>
          <Button asChild>
            <Link href="/kontakti">სრული კონტაქტი</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
