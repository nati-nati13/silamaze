import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { LOCATIONS } from '@/shared/const/contacts.const';

export const BranchesSection = () => {
  return (
    <section id="slide-branches" className="relative bg-muted py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">ფილიალები</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            გვნახავთ ორ <span className="italic text-brand-green">ქალაქში</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            დაგვიკავშირდი ან ეწვიე ადგილზე — გაჩვენებთ სივრცეს და დაგეხმარებით
            არჩევანში.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-video w-full bg-background">
                <iframe
                  title={`Dermako Academy — ${loc.city}`}
                  src={`https://maps.google.com/maps?q=${loc.mapQuery}&hl=ka&z=16&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full border-0"
                />
              </div>

              <div className="p-7 sm:p-8">
                <h3 className="font-heading text-2xl font-semibold text-foreground">
                  {loc.city}
                </h3>
                <div className="mt-5 flex flex-col gap-3.5 text-sm text-muted-foreground">
                  <span className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-brand-green"
                      aria-hidden="true"
                    />
                    {loc.address}
                  </span>
                  <span className="flex items-start gap-3">
                    <Phone
                      className="mt-0.5 size-4 shrink-0 text-brand-green"
                      aria-hidden="true"
                    />
                    {loc.phone}
                  </span>
                  <span className="flex items-start gap-3">
                    <Clock
                      className="mt-0.5 size-4 shrink-0 text-brand-green"
                      aria-hidden="true"
                    />
                    {loc.hours}
                  </span>
                </div>

                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${loc.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-foreground"
                >
                  Google Maps-ზე გახსნა
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
