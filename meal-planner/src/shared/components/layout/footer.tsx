import { Facebook, MapPin } from 'lucide-react';
import Link from 'next/link';

import { APP_NAME } from '@/shared/const/app.const';
import { FACEBOOK_URL, LOCATIONS } from '@/shared/const/contacts.const';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <p className="font-heading text-2xl font-bold tracking-widest text-background">
              DERMAKO
            </p>
            <p className="mt-1 text-xs font-semibold tracking-widest uppercase text-secondary">
              ACADEMY
            </p>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              სილამაზე, კოსმეტოლოგია და პროფესიული განათლება.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-secondary mb-4">
              მისამართები
            </p>
            <ul className="space-y-3">
              {LOCATIONS.map((loc) => (
                <li key={loc.city} className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-background">{loc.city}</p>
                    <p className="text-sm text-background/60">{loc.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-secondary mb-4">
              სოციალური
            </p>
            <Link
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-primary"
            >
              <Facebook className="size-4" aria-hidden="true" />
              Facebook
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8">
          <p className="text-center text-xs text-background/40">
            © 2025 {APP_NAME}. ყველა უფლება დაცულია.
          </p>
        </div>
      </div>
    </footer>
  );
};
