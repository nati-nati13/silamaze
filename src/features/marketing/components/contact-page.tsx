import { Facebook, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';
import { FACEBOOK_URL, LOCATIONS } from '@/shared/const/contacts.const';

const FACEBOOK_LINK_CLASS =
  'inline-flex items-center gap-3 rounded-lg border border-border px-8 py-4 text-sm font-semibold ' +
  'text-foreground transition-colors hover:border-primary hover:text-primary';

export const ContactPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="bg-muted py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-academy">
              დაგვიკავშირდი
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-foreground sm:text-6xl">
              კონტაქტი
            </h1>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
              {LOCATIONS.map((loc) => {
                const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&hl=ka&z=16&output=embed`;
                return (
                  <div key={loc.city} className="rounded-lg border border-border p-10">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="size-6 text-primary shrink-0" aria-hidden="true" />
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        {loc.city}
                      </h2>
                    </div>
                    <p className="mt-2 text-base text-muted-foreground">{loc.address}</p>
                    <Link
                      href={`tel:${loc.phone.replace(/\s/g, '')}`}
                      className="mt-3 inline-flex items-center gap-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="size-4 text-primary" aria-hidden="true" />
                      {loc.phone}
                    </Link>
                    <div className="mt-6 overflow-hidden rounded-lg">
                      <iframe
                        title={`Dermako Academy — ${loc.city}`}
                        src={mapSrc}
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-academy mb-6">
                სოციალური ქსელები
              </p>
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={FACEBOOK_LINK_CLASS}
              >
                <Facebook className="size-5" aria-hidden="true" />
                Dermako Academy — Facebook
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
